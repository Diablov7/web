// Netlify Function: Criar post no Sanity (server-side)
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export const handler = async (event, context) => {
  // CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders };
  }

  // Apenas permitir POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { title, excerpt, body, published, slug } = JSON.parse(event.body);
    
    // Validar dados
    if (!title || !body) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Title and body are required' })
      };
    }

    // Obter credenciais do ambiente
    const projectId = process.env.SANITY_PROJECT_ID;
    const dataset = process.env.SANITY_DATASET || 'production';
    const token = process.env.SANITY_TOKEN;
    const apiVersion = process.env.SANITY_API_VERSION || '2024-01-01';

    if (!projectId || !token) {
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Sanity configuration missing' })
      };
    }

    // Criar mutations
    const mutations = [{
      create: {
        _type: 'post',
        title,
        slug: { _type: 'slug', current: slug },
        excerpt: excerpt || title,
        body,
        published: published || false,
        publishedAt: new Date().toISOString()
      }
    }];

    // Fazer requisição para Sanity
    const response = await fetch(
      `https://${projectId}.api.sanity.io/v${apiVersion}/data/mutate/${dataset}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ mutations })
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        statusCode: response.status,
        headers: corsHeaders,
        body: JSON.stringify({ error: result.error?.description || 'Failed to create post' })
      };
    }

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ 
        success: true, 
        message: 'Post created successfully',
        result 
      })
    };
  } catch (error) {
    console.error('Error creating post:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Internal server error', details: error.message })
    };
  }
};

