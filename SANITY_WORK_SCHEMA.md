# 📋 Schema Work/Project para Sanity CMS

## 🎯 Como Adicionar o Schema no Sanity Studio

### Passo 1: Acesse o Sanity Studio
1. Vá para: `https://www.sanity.io/@omH6dEUOk/studio/oz6fuqwi7pfb9q46syts438l/default`
2. Faça login na sua conta

### Passo 2: Adicionar o Schema "work"

No Sanity Studio, você precisa adicionar um novo tipo de documento. Siga estes passos:

#### Opção A: Via Interface (Mais Fácil)
1. No menu lateral, clique em **"Schema"** ou **"Structure"**
2. Clique em **"Add document type"** ou **"Create new"**
3. Nome do tipo: `work`
4. Título: `Work / Project`

#### Opção B: Via Código (Se tiver acesso ao código do Studio)
Adicione este arquivo em `schemas/work.js`:

```javascript
export default {
  name: 'work',
  title: 'Work / Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
      validation: (Rule) => Rule.required(),
      description: 'URL amigável (gerado automaticamente do título)'
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      description: 'Imagem principal do projeto (aparece na listagem e no topo da página de detalhes)'
    },
    {
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
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
      validation: (Rule) => Rule.required(),
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
      validation: (Rule) => Rule.required(),
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
    prepare(selection) {
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
```

### Passo 3: Adicionar ao index de schemas

Se estiver usando código, adicione em `schemas/index.js`:

```javascript
import work from './work'

export const schemaTypes = [
  // ... outros schemas existentes
  work,
]
```

---

## 📝 Como Usar (Após Criar o Schema)

### 1. Criar um Novo Projeto/Case

1. No Sanity Studio, clique em **"Work / Project"** no menu
2. Clique em **"Create new"**
3. Preencha os campos:

   **Campos Obrigatórios:**
   - **Project Title**: Nome do projeto
   - **Slug**: Será gerado automaticamente (ou edite manualmente)
   - **Main Image**: Imagem principal (arraste e solte)
   - **Short Description**: Descrição curta (máx 200 caracteres)
   - **Category**: Selecione uma categoria
   - **Year**: Ano do projeto
   - **Published**: ✅ Marque para publicar

   **Campos Opcionais:**
   - **Project Type**: Tipo de campanha
   - **Full Description**: Descrição completa (pode usar editor visual)
   - **Client Name**: Nome do cliente
   - **Results**: Métricas/resultados
   - **Featured**: Para aparecer na homepage
   - **Display Order**: Ordem de exibição

4. Clique em **"Publish"**

### 2. O Projeto Aparecerá Automaticamente

- ✅ Na página `/works.html` (todos os projetos)
- ✅ Na página inicial `/index.html` (apenas os "Featured")
- ✅ Na página de detalhes `/singlework.html?slug=nome-do-projeto`

---

## 🎨 Estrutura dos Campos

### Campos que Aparecem na Listagem (Homepage e Works)
- **Main Image** - Foto do projeto
- **Title** - Título
- **Short Description** - Descrição curta
- **Category** - Categoria (ex: "crypto marketing")

### Campos que Aparecem na Página de Detalhes
- Todos os campos acima +
- **Full Description** - Descrição completa com formatação
- **Project Type** - Tipo de projeto
- **Year** - Ano
- **Client Name** - Nome do cliente (se preenchido)
- **Results** - Métricas/resultados (se preenchido)

---

## 💡 Dicas

1. **Imagens**: Use imagens de alta qualidade (recomendado: 1200x800px)
2. **Short Description**: Seja conciso e impactante (aparece na listagem)
3. **Full Description**: Use o editor visual para formatar texto, adicionar imagens, links
4. **Featured**: Marque apenas os melhores cases para aparecer na homepage
5. **Order**: Use números baixos (0, 1, 2) para projetos mais importantes

---

## ✅ Checklist

- [ ] Schema "work" criado no Sanity Studio
- [ ] Primeiro projeto criado e publicado
- [ ] Projeto aparece em `/works.html`
- [ ] Projeto aparece na homepage (se marcado como Featured)
- [ ] Página de detalhes funciona corretamente

---

## 🆘 Problemas Comuns

**Projeto não aparece no site:**
- Verifique se está marcado como "Published"
- Verifique se o slug está preenchido
- Limpe o cache do navegador

**Imagem não aparece:**
- Verifique se a imagem foi enviada corretamente
- Aguarde alguns segundos para o processamento da imagem

**Erro ao salvar:**
- Verifique se todos os campos obrigatórios estão preenchidos
- Verifique se o slug é único

