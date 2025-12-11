// Netlify Function para buscar posts do Sanity (incluindo drafts em preview mode)
export const handler = async (event, context) => {
  const { queryStringParameters } = event
  const { slug, preview, id } = queryStringParameters || {}

  const SANITY_PROJECT_ID = process.env.VITE_SANITY_PROJECT_ID || 'sszuldy6'
  const SANITY_DATASET = process.env.VITE_SANITY_DATASET || 'production'
  const SANITY_TOKEN = process.env.VITE_SANITY_TOKEN
  const API_VERSION = '2024-01-01'

  if (!slug) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing slug parameter' }),
    }
  }

  // Sanitizar slug
  const sanitizedSlug = slug.replace(/['"<>]/g, '')

  let query
  const isPreview = preview === 'true'

  if (isPreview) {
    // Em preview mode, buscar drafts primeiro, depois publicados
    if (id) {
      // Se tiver ID específico (pode ser draft), buscar por ID
      query = `*[_id == "${id}" || _id == "drafts.${id}"][0] {
        _id,
        title,
        mainImage,
        publishedAt,
        body,
        excerpt,
        slug,
        categories[]->{title},
        published
      }`
    } else {
      // Buscar por slug, priorizando drafts
      query = `coalesce(
        *[_type == "post" && _id match "drafts.*" && slug.current == "${sanitizedSlug}"][0],
        *[_type == "post" && slug.current == "${sanitizedSlug}"][0]
      ) {
        _id,
        title,
        mainImage,
        publishedAt,
        body,
        excerpt,
        slug,
        categories[]->{title},
        published
      }`
    }
  } else {
    // Modo normal: apenas publicados
    query = `*[_type == "post" && slug.current == "${sanitizedSlug}" && published == true][0] {
      _id,
      title,
      mainImage,
      publishedAt,
      body,
      excerpt,
      slug,
      categories[]->{title},
      published
    }`
  }

  const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${SANITY_DATASET}?query=${encodeURIComponent(query)}`

  try {
    const headers = {
      'Content-Type': 'application/json',
    }

    // Adicionar token apenas em preview mode (para acessar drafts)
    if (isPreview && SANITY_TOKEN) {
      headers['Authorization'] = `Bearer ${SANITY_TOKEN}`
    }

    console.log('Fetching post:', { slug: sanitizedSlug, isPreview, hasToken: !!SANITY_TOKEN })

    const response = await fetch(url, { headers })

    if (!response.ok) {
      throw new Error(`Sanity API error: ${response.status}`)
    }

    const data = await response.json()

    if (data.error) {
      console.error('Sanity query error:', data.error)
      return {
        statusCode: 500,
        body: JSON.stringify({ error: data.error.message || 'Query error' }),
      }
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ post: data.result }),
    }
  } catch (error) {
    console.error('Error fetching post:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    }
  }
}

