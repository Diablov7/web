# Configuração do Sanity CMS

## Passo 1: Criar conta e projeto no Sanity

1. Acesse https://www.sanity.io/
2. Crie uma conta (gratuita)
3. Crie um novo projeto
4. Escolha um dataset (use "production")

## Passo 2: Obter credenciais

1. No dashboard do Sanity, vá em Settings > API
2. Copie o **Project ID**
3. Anote o nome do **Dataset** (geralmente "production")

## Passo 3: Criar schema de posts

No Sanity Studio, você precisa criar um schema para posts. Acesse o Sanity Studio localmente ou use o Sanity Studio online.

### Schema básico de Post:

```javascript
{
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'author',
      title: 'Autor',
      type: 'reference',
      to: {type: 'author'}
    },
    {
      name: 'mainImage',
      title: 'Imagem Principal',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'categories',
      title: 'Categorias',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}]
    },
    {
      name: 'publishedAt',
      title: 'Data de Publicação',
      type: 'datetime'
    },
    {
      name: 'excerpt',
      title: 'Resumo',
      type: 'text',
      rows: 4
    },
    {
      name: 'body',
      title: 'Conteúdo',
      type: 'array',
      of: [
        {
          type: 'block'
        },
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              title: 'Texto Alternativo',
              type: 'string'
            },
            {
              name: 'caption',
              title: 'Legenda',
              type: 'string'
            }
          ]
        }
      ]
    },
    {
      name: 'published',
      title: 'Publicado',
      type: 'boolean',
      initialValue: false
    }
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `por ${author}`}
    },
  },
}
```

### Schema de Author:

```javascript
{
  name: 'author',
  title: 'Autor',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nome',
      type: 'string'
    },
    {
      name: 'image',
      title: 'Imagem',
      type: 'image',
      options: {
        hotspot: true
      }
    }
  ]
}
```

### Schema de Category:

```javascript
{
  name: 'category',
  title: 'Categoria',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      }
    }
  ]
}
```

## Passo 4: Configurar variáveis de ambiente

Adicione as credenciais no arquivo `.env`:

```
VITE_SANITY_PROJECT_ID=seu_project_id
VITE_SANITY_DATASET=production
```

## Passo 5: Publicar posts

1. Acesse o Sanity Studio
2. Crie um novo post
3. Preencha todos os campos
4. Marque como "Publicado"
5. Salve

O post aparecerá automaticamente no blog!

