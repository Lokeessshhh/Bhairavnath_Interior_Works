import fs from 'fs';
import path from 'path';
import { initialArticles } from '../src/blogData.js';

const DOMAIN = 'https://www.bhairavnathinteriors.in';

const staticRoutes = [
  { path: '', changefreq: 'daily', priority: '1.0' },
  { path: '/about', changefreq: 'monthly', priority: '0.8' },
  { path: '/services', changefreq: 'monthly', priority: '0.8' },
  { path: '/projects', changefreq: 'weekly', priority: '0.9' },
  { path: '/process', changefreq: 'monthly', priority: '0.7' },
  { path: '/testimonials', changefreq: 'weekly', priority: '0.7' },
  { path: '/blog', changefreq: 'weekly', priority: '0.8' }
];

function generateSitemap() {
  const currentDate = new Date().toISOString().split('T')[0];
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Add static routes
  for (const route of staticRoutes) {
    xml += '  <url>\n';
    xml += `    <loc>${DOMAIN}${route.path}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    xml += '  </url>\n';
  }

  // Add dynamic blog articles
  for (const article of initialArticles) {
    xml += '  <url>\n';
    xml += `    <loc>${DOMAIN}/blog/${article.id}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += '    <changefreq>monthly</changefreq>\n';
    xml += '    <priority>0.6</priority>\n';
    xml += '  </url>\n';
  }

  xml += '</urlset>\n';

  const outputPath = path.resolve('public/sitemap.xml');
  fs.writeFileSync(outputPath, xml, 'utf8');
  console.log(`Successfully generated sitemap.xml with ${staticRoutes.length + initialArticles.length} URLs at ${outputPath}`);
}

generateSitemap();
