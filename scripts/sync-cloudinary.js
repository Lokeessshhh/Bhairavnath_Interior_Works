import https from 'https';
import fs from 'fs';
import path from 'path';

// Read config
const configPath = path.resolve('scripts/cloudinary.config.json');
if (!fs.existsSync(configPath)) {
  console.error('Error: scripts/cloudinary.config.json not found!');
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const { cloudName, apiKey, apiSecret, folderPriority, categoryMapping, excludeList = [], titleOverrides = {} } = config;

if (!cloudName || !apiKey || !apiSecret) {
  console.error('Error: Credentials missing in scripts/cloudinary.config.json');
  process.exit(1);
}

console.log(`Starting Cloudinary synchronization for cloud: ${cloudName}...`);

// Basic Auth header
const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
const headers = {
  'Authorization': `Basic ${auth}`,
  'Accept': 'application/json'
};

async function fetchAllResources() {
  let allResources = [];
  let nextCursor = null;
  let page = 1;

  do {
    console.log(`Fetching page ${page} of resources...`);
    let url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/image/upload?max_results=500`;
    if (nextCursor) {
      url += `&next_cursor=${encodeURIComponent(nextCursor)}`;
    }

    const response = await makeRequest(url);
    if (response.resources && response.resources.length > 0) {
      allResources = allResources.concat(response.resources);
      console.log(`Successfully fetched ${response.resources.length} resources.`);
    }

    nextCursor = response.next_cursor || null;
    page++;
  } while (nextCursor);

  return allResources;
}

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers }, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error(`Failed to parse response: ${e.message}`));
          }
        } else {
          reject(new Error(`API Error: Status ${res.statusCode} - ${data}`));
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

function getCleanTitle(publicId, category) {
  const parts = publicId.split('/');
  const filename = parts[parts.length - 1];
  
  // Replace underscores and hyphens with spaces
  let cleaned = filename.replace(/[-_]/g, ' ').trim();
  
  // Capitalize words
  cleaned = cleaned.split(' ').map(word => {
    if (!word) return '';
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');

  // Check if it is a random hash or too short
  const isGeneric = /^[a-zA-Z0-9]{10,}$/.test(filename) || /^\d+$/.test(filename);
  if (isGeneric || cleaned.length < 3) {
    return `${category} Project`;
  }
  return cleaned;
}

function extractFolder(publicId) {
  const parts = publicId.split('/');
  if (parts.length > 1) {
    // If it's inside Images/kitchen/photo -> Images/kitchen
    // If it's inside My work/photo -> My work
    if (parts[0] === 'Images') {
      return `Images/${parts[1]}`;
    }
    return parts[0];
  }
  return '';
}

async function run() {
  try {
    const rawResources = await fetchAllResources();
    console.log(`Total images fetched from Cloudinary: ${rawResources.length}`);

    // Map and group resources
    const projects = [];
    const aboutPhotos = [];

    rawResources.forEach((resource) => {
      // Check ignore / exclude filter list
      const shouldExclude = excludeList.some(term => resource.public_id.includes(term));
      if (shouldExclude) {
        console.log(`Skipping excluded resource: ${resource.public_id}`);
        return;
      }

      const folder = extractFolder(resource.public_id);
      
      if (folder === 'My Photos') {
        const title = titleOverrides[resource.public_id] || getCleanTitle(resource.public_id, 'Recognition');
        aboutPhotos.push({
          id: resource.public_id,
          image: resource.secure_url,
          title
        });
        return; // Skip adding to projects
      }

      // Determine category
      let category = 'Other';
      if (folder && categoryMapping[folder]) {
        category = categoryMapping[folder];
      } else if (folder) {
        // Fallback for subfolders of Images not explicitly listed
        const folderName = folder.replace('Images/', '');
        category = folderName.charAt(0).toUpperCase() + folderName.slice(1);
      }

      const title = titleOverrides[resource.public_id] || getCleanTitle(resource.public_id, category);

      // Determine bento size based on height/width ratio or randomly to look premium
      let size = 'square';
      const ratio = resource.width / resource.height;
      if (ratio > 1.4) {
        size = 'wide';
      } else if (ratio < 0.75) {
        size = 'tall';
      }

      projects.push({
        id: resource.public_id,
        title,
        category,
        folder,
        image: resource.secure_url,
        description: `Premium carpentry work by Bhairavnath Interior Works.`,
        size
      });
    });

    // Sort projects according to folderPriority
    projects.sort((a, b) => {
      const indexA = folderPriority.indexOf(a.folder);
      const indexB = folderPriority.indexOf(b.folder);

      // If both folders are in priority list, sort by priority index
      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
      }
      // If only A is in priority list, put it first
      if (indexA !== -1) return -1;
      // If only B is in priority list, put it first
      if (indexB !== -1) return 1;

      // Otherwise maintain original order (latest first)
      return 0;
    });

    // Write to JSON
    const dataDir = path.resolve('src/data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const outputPath = path.join(dataDir, 'cloudinaryImages.json');
    fs.writeFileSync(outputPath, JSON.stringify(projects, null, 2), 'utf8');
    console.log(`Success! Synchronized ${projects.length} portfolio images to ${outputPath}`);

    const aboutOutputPath = path.join(dataDir, 'aboutPhotos.json');
    fs.writeFileSync(aboutOutputPath, JSON.stringify(aboutPhotos, null, 2), 'utf8');
    console.log(`Success! Synchronized ${aboutPhotos.length} recognition photos to ${aboutOutputPath}`);

  } catch (err) {
    console.error('Error during synchronization:', err.message);
    process.exit(1);
  }
}

run();
