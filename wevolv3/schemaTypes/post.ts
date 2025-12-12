export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título',
      type: 'string',
      description: 'Título do artigo',
      validation: (Rule: any) => Rule.required(),
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
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'mainImage',
      title: 'Imagem de Header',
      type: 'image',
      description: 'Imagem principal do artigo (aparece no topo)',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'excerpt',
      title: 'Resumo',
      type: 'text',
      description: 'Breve descrição do artigo (aparece na listagem)',
      rows: 3,
    },
    {
      name: 'body',
      title: 'Conteúdo do Artigo',
      description: 'Use o editor visual. Cole de Word/Google Docs para converter automaticamente.',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'},
            ],
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
                    validation: (Rule: any) =>
                      Rule.uri({
                        allowRelative: true,
                        scheme: ['http', 'https', 'mailto', 'tel'],
                      }),
                  },
                ],
              },
            ],
          },
        },
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
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'categories',
      title: 'Categorias',
      type: 'array',
      description: 'Categorias do artigo (opcional)',
      of: [{type: 'reference', to: {type: 'category'}}],
    },
    {
      name: 'publishedAt',
      title: 'Data de Publicação',
      type: 'datetime',
      description: 'Data de publicação',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'published',
      title: 'Publicado',
      type: 'boolean',
      description: 'Marque para publicar o artigo',
      initialValue: false,
    },
  ],
  orderings: [
    {
      title: 'Data de Publicação, Novo',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      published: 'published',
    },
    prepare(selection: any) {
      const {title, media, published} = selection
      const status = published ? '✅ Publicado' : '📝 Rascunho'
      return {
        title: title || 'Sem título',
        subtitle: status,
        media: media,
      }
    },
  },
}

