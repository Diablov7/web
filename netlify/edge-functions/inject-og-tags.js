// Netlify Edge Function to inject Open Graph and Twitter Card meta tags
// This runs BEFORE the page is served, so Twitter/Facebook crawlers see the correct tags

export default async (request, context) => {
  const url = new URL(request.url);
  
  // Only process singleblog pages
  if (!url.pathname.includes('singleblog') && !url.pathname.includes('singleblog.html')) {
    return context.next();
  }

  // Get slug from query params
  const slug = url.searchParams.get('slug');
  if (!slug) {
    return context.next();
  }

  // Fetch post data from Sanity
  const projectId = 'sszuldy6';
  const dataset = 'production';
  const apiVersion = '2024-01-01';
  
  const query = `*[_type == "post" && slug.current == $slug][0] {
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

  const sanityUrl = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(query)}&$slug="${slug}"`;

  try {
    const sanityResponse = await fetch(sanityUrl);
    const data = await sanityResponse.json();
    const post = data.result;

    if (!post || !post.title) {
      return context.next(); // Post not found, serve page as-is
    }

    // Generate image URL from Sanity reference
    function sanityImageUrl(source) {
      if (!source || !source.asset) return 'https://wevolv3.com/images/LOGO.PNG';
      const ref = source.asset._ref;
      const [, id, dimensions, format] = ref.split('-');
      return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}?w=1200&h=630&fit=crop`;
    }

    const imageUrl = sanityImageUrl(post.mainImage);
    const title = post.title;
    const description = post.excerpt || 'Read this article about Web3 marketing and growth strategies.';
    const pageUrl = `https://wevolv3.com/singleblog?slug=${slug}`;

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
    `;

    // Replace existing meta tags or inject before </head>
    const updatedHtml = html
      .replace(/<meta property="og:title"[^>]*>/gi, '')
      .replace(/<meta property="og:description"[^>]*>/gi, '')
      .replace(/<meta property="og:url"[^>]*>/gi, '')
      .replace(/<meta property="og:image"[^>]*>/gi, '')
      .replace(/<meta name="twitter:title"[^>]*>/gi, '')
      .replace(/<meta name="twitter:description"[^>]*>/gi, '')
      .replace(/<meta name="twitter:image"[^>]*>/gi, '')
      .replace(/<title>[^<]*<\/title>/gi, '')
      .replace(/<meta name="description"[^>]*>/gi, '')
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

