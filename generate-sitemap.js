#!/usr/bin/env node

/**
 * Script para gerar sitemap.xml dinamicamente a partir dos posts do Sanity
 * Execute: node generate-sitemap.js
 * 
 * Requer: Node.js e acesso à API do Sanity
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const PROJECT_ID = 'sszuldy6';
const DATASET = 'production';
const API_VERSION = '2021-06-07';
const BASE_URL = 'https://wevolv3.com';

// Páginas estáticas
const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'weekly', lastmod: new Date().toISOString().split('T')[0] },
  { url: '/about.html', priority: '0.8', changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
  { url: '/works.html', priority: '0.9', changefreq: 'weekly', lastmod: new Date().toISOString().split('T')[0] },
  { url: '/blog.html', priority: '0.9', changefreq: 'daily', lastmod: new Date().toISOString().split('T')[0] },
  { url: '/contact.html', priority: '0.7', changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
  { url: '/privacy.html', priority: '0.3', changefreq: 'yearly', lastmod: new Date().toISOString().split('T')[0] },
  { url: '/terms.html', priority: '0.3', changefreq: 'yearly', lastmod: new Date().toISOString().split('T')[0] },
];

// Query GROQ para buscar posts publicados
const query = encodeURIComponent(`
  *[_type == "post" && defined(slug.current) && (!defined(published) || published == true)] | order(_updatedAt desc) {
    "slug": slug.current,
    "updatedAt": _updatedAt,
    "publishedAt": publishedAt
  }
`);

const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${query}`;

console.log('🔄 Buscando posts do Sanity...');

https.get(url, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const result = JSON.parse(data);
      const posts = result.result || [];

      console.log(`✅ Encontrados ${posts.length} posts`);

      // Gerar XML do sitemap
      let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`;

      // Adicionar páginas estáticas
      staticPages.forEach(page => {
        xml += `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
      });

      // Adicionar posts do blog
      posts.forEach(post => {
        const slug = post.slug;
        const updatedAt = post.updatedAt || post.publishedAt || new Date().toISOString();
        const lastmod = updatedAt.split('T')[0];
        const postUrl = `${BASE_URL}/singleblog?slug=${slug}`;

        xml += `  <url>
    <loc>${postUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
      });

      xml += `</urlset>`;

      // Salvar sitemap.xml
      const sitemapPath = path.join(__dirname, 'sitemap.xml');
      fs.writeFileSync(sitemapPath, xml, 'utf8');

      console.log(`✅ Sitemap gerado com sucesso!`);
      console.log(`   📄 Arquivo: ${sitemapPath}`);
      console.log(`   📊 Total de URLs: ${staticPages.length + posts.length}`);
      console.log(`   📝 Posts incluídos: ${posts.length}`);
    } catch (error) {
      console.error('❌ Erro ao processar resposta:', error.message);
      process.exit(1);
    }
  });
}).on('error', (error) => {
  console.error('❌ Erro ao buscar posts:', error.message);
  process.exit(1);
});

