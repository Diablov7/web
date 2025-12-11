import {createClient} from '@sanity/client'

export const handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json',
  }

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' }
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  const { slug, preview } = event.queryStringParameters || {}

  if (!slug) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Slug is required' }),
    }
  }

  try {
    const client = createClient({
      projectId: process.env.SANITY_PROJECT_ID || 'sszuldy6',
      dataset: process.env.SANITY_DATASET || 'production',
      apiVersion: process.env.SANITY_API_VERSION || '2024-01-01',
      useCdn: false, // Não usar CDN para drafts
      token: process.env.SANITY_TOKEN, // Token necessário para acessar drafts
    })

    let post

    // Query completa com todos os campos necessários
    const fullQuery = `{
      title,
      mainImage,
      publishedAt,
      body,
      excerpt,
      slug,
      categories[]->{title},
      published,
      _id
    }`

    if (preview === 'true') {
      // Em preview mode, buscar draft primeiro, depois publicado
      const draftQuery = `*[_type == "post" && _id match "drafts.*" && slug.current == $slug][0] ${fullQuery}`
      const publishedQuery = `*[_type == "post" && _id match "!drafts.*" && slug.current == $slug && published == true][0] ${fullQuery}`

      const [draft, published] = await Promise.all([
        client.fetch(draftQuery, { slug }),
        client.fetch(publishedQuery, { slug }),
      ])

      post = draft || published
    } else {
      // Modo normal: só buscar publicados
      const query = `*[_type == "post" && slug.current == $slug && published == true][0] ${fullQuery}`
      post = await client.fetch(query, { slug })
    }

    if (!post) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Post not found' }),
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ result: post }),
    }
  } catch (error) {
    console.error('Error fetching post:', error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message }),
    }
  }
}

