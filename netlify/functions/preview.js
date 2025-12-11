// Netlify Function para processar preview tokens do Sanity
export const handler = async (event, context) => {
  const { queryStringParameters } = event
  const { secret, slug, id } = queryStringParameters || {}

  const PREVIEW_SECRET = process.env.SANITY_PREVIEW_SECRET || 'M4r4cuj4-'

  // Debug logs (remover em produção se necessário)
  console.log('🔍 Preview Function Debug:')
  console.log('  - Secret recebido:', secret)
  console.log('  - Secret esperado:', PREVIEW_SECRET)
  console.log('  - Secret do env:', process.env.SANITY_PREVIEW_SECRET || 'não configurado')
  console.log('  - Slug:', slug)
  console.log('  - IDs iguais?', secret === PREVIEW_SECRET)

  // Validar secret (comparação case-sensitive)
  if (secret !== PREVIEW_SECRET) {
    return {
      statusCode: 401,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        error: 'Invalid preview secret',
        debug: {
          received: secret,
          expected: PREVIEW_SECRET,
          envSet: !!process.env.SANITY_PREVIEW_SECRET
        }
      }),
    }
  }

  if (!slug) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing slug' }),
    }
  }

  // Redirecionar para a página do blog com preview=true
  const previewUrl = `https://wevolv3.com/blog/${slug}?preview=true${id ? `&id=${id}` : ''}`

  return {
    statusCode: 302,
    headers: {
      Location: previewUrl,
    },
    body: '',
  }
}

