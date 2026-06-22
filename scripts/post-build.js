import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const assetsDir = path.join(distDir, 'assets');

if (!fs.existsSync(assetsDir)) {
  console.error('Error: dist/assets directory not found!');
  process.exit(1);
}

// Find ProjectsPage chunk
const files = fs.readdirSync(assetsDir);
const projectsChunk = files.find(f => f.startsWith('ProjectsPage-') && f.endsWith('.js'));

if (!projectsChunk) {
  console.error('Error: ProjectsPage chunk not found in dist/assets!');
  process.exit(1);
}

console.log(`Found ProjectsPage chunk: ${projectsChunk}`);

// Read dist/index.html
const indexPath = path.join(distDir, 'index.html');
if (!fs.existsSync(indexPath)) {
  console.error('Error: dist/index.html not found!');
  process.exit(1);
}

let indexContent = fs.readFileSync(indexPath, 'utf8');

// Inject the dynamic modulepreload code
const injection = `
    <script>
      if (window.location.pathname === '/projects') {
        const link = document.createElement('link');
        link.rel = 'modulepreload';
        link.href = '/assets/${projectsChunk}';
        document.head.appendChild(link);
      }
    </script>
`;

if (indexContent.includes('</head>')) {
  indexContent = indexContent.replace('</head>', `${injection}\n  </head>`);
  fs.writeFileSync(indexPath, indexContent, 'utf8');
  console.log(`Successfully injected modulepreload for ${projectsChunk} into dist/index.html`);
} else {
  console.error('Error: Could not find </head> tag in dist/index.html');
  process.exit(1);
}
