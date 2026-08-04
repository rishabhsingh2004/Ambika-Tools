import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateSitemap() {
  try {
    const productsFilePath = path.join(__dirname, '../src/data/products.jsx');
    const content = fs.readFileSync(productsFilePath, 'utf-8');
    
    // Extract IDs from products.jsx
    const idRegex = /id:\s*["']([^"']+)["']/g;
    let match;
    const ids = [];
    while ((match = idRegex.exec(content)) !== null) {
      ids.push(match[1]);
    }
    
    const baseUrl = 'https://ambika-tools.vercel.app';
    const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
    
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/products</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`;

    // Add each product to the sitemap
    for (const id of ids) {
      xml += `  <url>
    <loc>${baseUrl}/products/item/${id}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>\n`;
    }

    xml += `</urlset>`;

    fs.writeFileSync(sitemapPath, xml);
    console.log('✅ sitemap.xml generated successfully at ' + sitemapPath);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    process.exit(1);
  }
}

generateSitemap();
