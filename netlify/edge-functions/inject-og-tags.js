// Netlify Edge Function to inject Open Graph and Twitter Card meta tags
// This runs BEFORE the page is served, so Twitter/Facebook crawlers see the correct tags

export default async (request, context) => {
  const url = new URL(request.url);
  
  console.log('Edge Function called for:', url.pathname, url.search);
  
  // Only process singleblog pages
  if (!url.pathname.includes('singleblog') && !url.pathname.includes('singleblog.html')) {
    console.log('Not a singleblog page, skipping');
    return context.next();
  }

  // Get slug from query params
  const slug = url.searchParams.get('slug');
  if (!slug) {
    console.log('No slug parameter found');
    return context.next();
  }
  
  console.log('Processing slug:', slug);

  // Fetch post data from Sanity
  const projectId = 'sszuldy6';
  const dataset = 'production';
  const apiVersion = '2024-01-01';
  
  const query = `*[_type == "post" && slug.current == "${slug}"][0] {
    title,
    excerpt,
    mainImage {
      asset {
        _ref
      }
    },
    publishedAt,
    slug
  }`;

  const sanityUrl = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(query)}`;

  try {
    const sanityResponse = await fetch(sanityUrl);
    const data = await sanityResponse.json();
    
    // Log for debugging (will appear in Netlify logs)
    console.log('Sanity response:', JSON.stringify({ 
      hasResult: !!data.result, 
      hasTitle: !!data.result?.title,
      hasImage: !!data.result?.mainImage 
    }));
    
    const post = data.result;

    if (!post || !post.title) {
      console.log('Post not found or missing title, slug:', slug);
      return context.next(); // Post not found, serve page as-is
    }

    // Generate image URL from Sanity reference
    function sanityImageUrl(source) {
      if (!source || !source.asset) {
        console.log('No image source or asset found');
        return 'https://wevolv3.com/images/LOGO.PNG';
      }
      
      const ref = source.asset._ref;
      if (!ref) {
        console.log('No _ref in asset');
        return 'https://wevolv3.com/images/LOGO.PNG';
      }
      
      // Parse Sanity image reference: image-{id}-{width}x{height}-{format}
      // Example: image-abc123-1920x1080-jpg
      const parts = ref.split('-');
      if (parts.length < 4) {
        console.log('Invalid image ref format:', ref);
        return 'https://wevolv3.com/images/LOGO.PNG';
      }
      
      const id = parts[1];
      const dimensions = parts[2];
      const format = parts.slice(3).join('-'); // Handle formats like 'webp' or 'jpg'
      
      const baseUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`;
      return `${baseUrl}?w=1200&h=630&fit=crop&auto=format`;
    }

    const imageUrl = sanityImageUrl(post.mainImage);
    const title = post.title;
    const description = post.excerpt || 'Read this article about Web3 marketing and growth strategies.';
    const pageUrl = `https://wevolv3.com${url.pathname}${url.search}`;
    
    // Log injected values for debugging
    console.log('Injecting OG tags:', { title, imageUrl, description: description.substring(0, 50) });

    // Fetch the original HTML
    const htmlResponse = await context.next();
    const html = await htmlResponse.text();

    // Inject meta tags
    const metaTags = `
      <!-- Injected by Edge Function for Social Sharing -->
      <meta property="og:type" content="article">
      <meta property="og:title" content="${title.replace(/"/g, '&quot;')}">
      <meta property="og:description" content="${description.replace(/"/g, '&quot;').substring(0, 200)}">
      <meta property="og:url" content="${pageUrl}">
      <meta property="og:image" content="${imageUrl}">
      <meta property="og:image:width" content="1200">
      <meta property="og:image:height" content="630">
      <meta property="og:site_name" content="Wevolv3">
      
      <meta name="twitter:card" content="summary_large_image">
      <meta name="twitter:title" content="${title.replace(/"/g, '&quot;')}">
      <meta name="twitter:description" content="${description.replace(/"/g, '&quot;').substring(0, 200)}">
      <meta name="twitter:image" content="${imageUrl}">
      
      <title>${title.replace(/</g, '&lt;').replace(/>/g, '&gt;')} | Wevolv3 Blog</title>
      <meta name="description" content="${description.replace(/"/g, '&quot;').substring(0, 160)}">
      <link rel="canonical" href="${pageUrl}">
    `;

    // Replace existing meta tags (including those with IDs) or inject before </head>
    // Use more aggressive regex to catch all variations
    const updatedHtml = html
      .replace(/<meta\s+property=["']og:title["'][^>]*>/gi, '')
      .replace(/<meta\s+property=["']og:description["'][^>]*>/gi, '')
      .replace(/<meta\s+property=["']og:url["'][^>]*>/gi, '')
      .replace(/<meta\s+property=["']og:image["'][^>]*>/gi, '')
      .replace(/<meta\s+name=["']twitter:title["'][^>]*>/gi, '')
      .replace(/<meta\s+name=["']twitter:description["'][^>]*>/gi, '')
      .replace(/<meta\s+name=["']twitter:image["'][^>]*>/gi, '')
      .replace(/<title[^>]*>.*?<\/title>/gi, '')
      .replace(/<meta\s+name=["']description["'][^>]*>/gi, '')
      .replace(/<link\s+rel=["']canonical["'][^>]*>/gi, '')
      .replace('</head>', `${metaTags}</head>`);

    return new Response(updatedHtml, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    console.error('Error injecting OG tags:', error);
    // On error, serve page as-is
    return context.next();
  }
};

