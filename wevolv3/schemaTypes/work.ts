export default {
  name: 'work',
  title: 'Work / Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
      description: 'Nome do projeto/case (ex: "Web3 Campaign for DeFi Protocol")'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
      description: 'URL amigável (gerado automaticamente do título)'
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
      description: 'Imagem principal do projeto (aparece na listagem e no topo da página de detalhes)'
    },
    {
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.required().max(200),
      description: 'Descrição curta (aparece na página inicial e listagem) - máximo 200 caracteres'
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Crypto Marketing', value: 'crypto marketing'},
          {title: 'Blockchain', value: 'blockchain'},
          {title: 'Web3', value: 'web3'},
          {title: 'DeFi', value: 'defi'},
          {title: 'Token Launch', value: 'token launch'},
          {title: 'NFT Marketing', value: 'nft marketing'},
        ],
      },
      validation: (Rule: any) => Rule.required(),
      description: 'Categoria do projeto'
    },
    {
      name: 'projectType',
      title: 'Project Type',
      type: 'string',
      options: {
        list: [
          {title: 'Web3 Marketing Campaign', value: 'Web3 Marketing Campaign'},
          {title: 'DeFi Growth Strategy', value: 'DeFi Growth Strategy'},
          {title: 'Token Launch Campaign', value: 'Token Launch Campaign'},
          {title: 'Community Building', value: 'Community Building'},
          {title: 'Brand Strategy', value: 'Brand Strategy'},
        ],
      },
      description: 'Tipo de projeto/campanha'
    },
    {
      name: 'description',
      title: 'Full Description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
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
              title: 'Alt Text',
              type: 'string',
            },
          ],
        },
      ],
      description: 'Descrição completa do projeto (aparece na página de detalhes)'
    },
    {
      name: 'year',
      title: 'Year',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
      description: 'Ano do projeto (ex: "2024")'
    },
    {
      name: 'client',
      title: 'Client Name (Optional)',
      type: 'string',
      description: 'Nome do cliente (opcional, pode deixar vazio)'
    },
    {
      name: 'results',
      title: 'Results / Metrics (Optional)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'metric',
              title: 'Metric Name',
              type: 'string',
              description: 'Ex: "Community Growth", "Token Holders", "TVL Increase"'
            },
            {
              name: 'value',
              title: 'Value',
              type: 'string',
              description: 'Ex: "+500%", "10K+", "$50M"'
            },
          ],
        },
      ],
      description: 'Resultados/metricas do projeto (opcional)'
    },
    {
      name: 'published',
      title: 'Published',
      type: 'boolean',
      initialValue: false,
      description: 'Marque como publicado para aparecer no site'
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
      description: 'Marque para aparecer na página inicial'
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      description: 'Ordem de exibição (menor número aparece primeiro)'
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      category: 'category',
    },
    prepare(selection: any) {
      const {category} = selection
      return {
        ...selection,
        subtitle: category ? `${category}` : 'No category',
      }
    },
  },
  orderings: [
    {
      title: 'Order (Low to High)',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
    {
      title: 'Year (Newest)',
      name: 'yearDesc',
      by: [{field: 'year', direction: 'desc'}],
    },
  ],
}

