// Netlify Function: Gerar sitemap dinâmico com todos os artigos do Sanity
export const handler = async (event, context) => {
  const PROJECT_ID = process.env.SANITY_PROJECT_ID || 'sszuldy6';
  const DATASET = process.env.SANITY_DATASET || 'production';
  const API_VERSION = process.env.SANITY_API_VERSION || '2024-01-01';
  const BASE_URL = 'https://wevolv3.com';

  try {
    // Fetch all published posts
    const query = `*[_type == "post" && published == true] | order(publishedAt desc) {
      slug,
      publishedAt,
      _updatedAt
    }`;

    const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${encodeURIComponent(query)}`;
    const res = await fetch(url);
    
    if (!res.ok) {
      throw new Error(`Sanity API error: ${res.status}`);
    }
    
    const json = await res.json();
    
    if (json.error) {
      throw new Error(`Sanity query error: ${JSON.stringify(json.error)}`);
    }
    
    const posts = json.result || [];
    
    // Generate sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <!-- Homepage -->
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Blog listing -->
  <url>
    <loc>${BASE_URL}/blog</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Blog posts -->
  ${posts.map(post => {
    const slug = post.slug?.current || post.slug || '';
    if (!slug) return '';
    
    const postUrl = `${BASE_URL}/blog/${slug}`;
    const lastmod = post._updatedAt || post.publishedAt || new Date().toISOString();
    const lastmodDate = new Date(lastmod).toISOString().split('T')[0];
    
    return `  <url>
    <loc>${postUrl}</loc>
    <lastmod>${lastmodDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  }).filter(Boolean).join('\n')}
</urlset>`;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
      },
      body: sitemap
    };
  } catch (error) {
    console.error('Error generating sitemap:', error);
    
    // Return basic sitemap on error
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${BASE_URL}/blog</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`;
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/xml'
      },
      body: fallbackSitemap
    };
  }
};

