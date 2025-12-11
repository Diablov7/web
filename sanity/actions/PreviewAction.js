import {EyeOpenIcon} from '@sanity/icons'
import {definePreviewUrl} from '@sanity/preview-url-secret'

// Secret token para preview (deve ser configurado como variável de ambiente)
// Para produção, configure SANITY_PREVIEW_SECRET no Netlify
const PREVIEW_SECRET = process.env.SANITY_PREVIEW_SECRET || 'M4r4cuj4-'

// Action customizada para preview melhorado
export function PreviewAction(props) {
  const {draft, published, id} = props

  // Usar o draft (rascunho) se existir, senão o publicado
  const doc = draft || published

  // Só mostrar para posts
  if (!doc || doc._type !== 'post') {
    return null
  }

  // Precisa ter slug para fazer preview
  const slug = doc.slug?.current
  if (!slug) {
    return {
      label: 'Preview',
      icon: EyeOpenIcon,
      disabled: true,
      title: 'Add a slug first',
    }
  }

  // Base URL - usar localhost em dev, produção em prod
  const BASE_URL = typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:3000'
    : 'https://wevolv3.com'

  // Gerar preview URL usando Netlify Function para processar o token
  // A função valida o secret e redireciona para a página com ?preview=true
  const previewUrl = `${BASE_URL}/.netlify/functions/preview?secret=${encodeURIComponent(PREVIEW_SECRET)}&slug=${encodeURIComponent(slug)}&id=${encodeURIComponent(id)}`

  return {
    label: '👁 Preview',
    icon: EyeOpenIcon,
    onHandle: () => {
      console.log('🔍 Preview Action Debug:')
      console.log('  - Secret usado:', PREVIEW_SECRET)
      console.log('  - Secret do env:', process.env.SANITY_PREVIEW_SECRET || 'não disponível no browser')
      console.log('  - URL completa:', previewUrl)
      console.log('  - Document ID:', id)
      console.log('  - Slug:', slug)
      // Abrir preview em nova aba
      window.open(previewUrl, '_blank')
    },
  }
}
