import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const framesDir = path.resolve('public/frames');

if (!fs.existsSync(framesDir)) {
  console.error(`Error: Directory not found: ${framesDir}`);
  process.exit(1);
}

async function compress() {
  console.log('Reading WebP frames...');
  const files = fs.readdirSync(framesDir)
    .filter(file => file.endsWith('.webp'))
    .sort();

  console.log(`Found ${files.length} frames to process.`);
  
  let totalSaved = 0;
  let totalOriginalSize = 0;
  let totalNewSize = 0;

  for (const file of files) {
    const filePath = path.join(framesDir, file);
    const stat = fs.statSync(filePath);
    totalOriginalSize += stat.size;

    // Read image, resize if wider than 1280px, and compress WebP
    const buffer = fs.readFileSync(filePath);
    
    // We will save to a temporary buffer first
    const compressedBuffer = await sharp(buffer)
      .resize({ width: 1280, withoutEnlargement: true }) // Downscale to 720p/1080p if larger
      .webp({ quality: 70 }) // Compress quality
      .toBuffer();

    totalNewSize += compressedBuffer.length;
    
    // Write back
    fs.writeFileSync(filePath, compressedBuffer);
    
    const saved = stat.size - compressedBuffer.length;
    totalSaved += saved;

    console.log(`Processed ${file}: ${(stat.size / 1024).toFixed(1)} KB -> ${(compressedBuffer.length / 1024).toFixed(1)} KB (Saved ${(saved / 1024).toFixed(1)} KB)`);
  }

  console.log('\n--- COMPRESSION COMPLETE ---');
  console.log(`Original Total Size: ${(totalOriginalSize / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`New Total Size:      ${(totalNewSize / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Total Saved:         ${(totalSaved / (1024 * 1024)).toFixed(2)} MB (${((totalSaved / totalOriginalSize) * 100).toFixed(1)}% reduction!)`);
}

compress().catch(err => {
  console.error('Error during compression:', err);
});
