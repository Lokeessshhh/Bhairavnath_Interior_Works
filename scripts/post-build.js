import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const assetsDir = path.join(distDir, 'assets');

if (!fs.existsSync(assetsDir)) {
  console.error('Error: dist/assets directory not found!');
  process.exit(1);
}

// Find chunks
const files = fs.readdirSync(assetsDir);
const projectsChunk = files.find(f => f.startsWith('ProjectsPage-') && f.endsWith('.js'));
const processChunk = files.find(f => f.startsWith('ProcessPage-') && f.endsWith('.js'));
const testimonialsChunk = files.find(f => f.startsWith('TestimonialsPage-') && f.endsWith('.js'));

if (!projectsChunk) {
  console.error('Error: ProjectsPage chunk not found in dist/assets!');
  process.exit(1);
}
if (!processChunk) {
  console.error('Error: ProcessPage chunk not found in dist/assets!');
  process.exit(1);
}
if (!testimonialsChunk) {
  console.error('Error: TestimonialsPage chunk not found in dist/assets!');
  process.exit(1);
}

console.log(`Found chunks: ProjectsPage=${projectsChunk}, ProcessPage=${processChunk}, TestimonialsPage=${testimonialsChunk}`);

// Read dist/index.html
const indexPath = path.join(distDir, 'index.html');
if (!fs.existsSync(indexPath)) {
  console.error('Error: dist/index.html not found!');
  process.exit(1);
}

let indexContent = fs.readFileSync(indexPath, 'utf8');

// Inject the static modulepreload code
const injection = `    <link rel="modulepreload" crossorigin href="/assets/${projectsChunk}">\n    <link rel="modulepreload" crossorigin href="/assets/${processChunk}">\n    <link rel="modulepreload" crossorigin href="/assets/${testimonialsChunk}">`;

if (indexContent.includes('</head>')) {
  indexContent = indexContent.replace('</head>', `${injection}\n  </head>`);
  fs.writeFileSync(indexPath, indexContent, 'utf8');
  console.log(`Successfully injected static modulepreloads for ${projectsChunk}, ${processChunk}, and ${testimonialsChunk} into dist/index.html`);
} else {
  console.error('Error: Could not find </head> tag in dist/index.html');
  process.exit(1);
}
