export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'mainImage',
      title: 'Imagem de Header',
      type: 'image',
      description: 'Imagem principal do artigo (aparece no topo)',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'body',
      title: 'Conteúdo do Artigo',
      description: 'Use o editor visual. Cole de Word/Google Docs para converter automaticamente.',
      type: 'array',
      of: [
        {
          type: 'block',
          // Estilos disponíveis no editor
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'},
          ],
          // Marcas (formatação inline)
          marks: {
            // Formatação básica
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'},
              {title: 'Underline', value: 'underline'},
              {title: 'Strike', value: 'strike-through'},
            ],
            // Annotations (links, etc)
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'URL',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                    validation: (Rule) =>
                      Rule.uri({
                        allowRelative: true,
                        scheme: ['http', 'https', 'mailto', 'tel'],
                      }),
                  },
                  {
                    title: 'Abrir em nova aba',
                    name: 'blank',
                    type: 'boolean',
                    initialValue: true,
                  },
                ],
              },
            ],
          },
        },
        // Imagens inline no conteúdo
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              title: 'Texto Alternativo',
              type: 'string',
              description: 'Importante para SEO e acessibilidade',
            },
            {
              name: 'caption',
              title: 'Legenda',
              type: 'string',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Título',
      type: 'string',
      description: 'Título do artigo (pode ser extraído automaticamente do primeiro # do Markdown)',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      description: 'URL do artigo (gerado automaticamente do título)',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'excerpt',
      title: 'Resumo',
      type: 'text',
      description: 'Breve descrição do artigo (aparece na listagem). Pode ser extraído automaticamente do Markdown.',
      rows: 3,
    },
    {
      name: 'categories',
      title: 'Categorias',
      type: 'array',
      description: 'Categorias do artigo (opcional - pode ser detectado automaticamente)',
      of: [{type: 'reference', to: {type: 'category'}}],
    },
    {
      name: 'publishedAt',
      title: 'Data de Publicação',
      type: 'datetime',
      description: 'Data de publicação (sempre atualizada automaticamente para a data/hora atual)',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    },
    {
      name: 'published',
      title: 'Publicado',
      type: 'boolean',
      description: 'Marque para publicar o artigo. Use o botão "Publish" no topo da página para publicar.',
      initialValue: false,
    },
  ],
  // Ordenação padrão
  orderings: [
    {
      title: 'Data de Publicação, Novo',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
    {
      title: 'Data de Publicação, Antigo',
      name: 'publishedAtAsc',
      by: [{field: 'publishedAt', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      published: 'published',
      publishedAt: 'publishedAt',
    },
    prepare(selection) {
      const {title, media, published, publishedAt} = selection
      const date = publishedAt ? new Date(publishedAt).toLocaleDateString('pt-BR') : 'Sem data'
      const status = published ? '✅ Publicado' : '📝 Rascunho'
      return {
        title: title || 'Sem título',
        subtitle: `${status} • ${date}`,
        media: media,
      }
    },
  },
}
