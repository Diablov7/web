# 🚀 Guia Rápido: Como Adicionar Cases/Projetos

## ✅ O que foi implementado

Agora você pode gerenciar todos os cases/projetos diretamente no Sanity CMS, igual ao blog!

### 📍 Onde os projetos aparecem:

1. **Página Inicial (`/index.html`)** - Apenas projetos marcados como "Featured" (máximo 3)
2. **Página de Portfólio (`/works.html`)** - Todos os projetos publicados
3. **Página de Detalhes (`/singlework.html?slug=nome-do-projeto`)** - Detalhes completos do projeto

---

## 🎯 Passo a Passo: Adicionar um Novo Case

### 1️⃣ Acesse o Sanity Studio

Vá para: `https://www.sanity.io/@omH6dEUOk/studio/oz6fuqwi7pfb9q46syts438l/default`

### 2️⃣ Criar o Schema "work" (Apenas uma vez)

**⚠️ IMPORTANTE:** Se você ainda não criou o schema "work", siga as instruções em `SANITY_WORK_SCHEMA.md`

### 3️⃣ Criar um Novo Projeto

1. No menu lateral, clique em **"Work / Project"**
2. Clique em **"Create new"** ou **"New Work / Project"**
3. Preencha os campos:

#### 📋 Campos Obrigatórios:

- **Project Title** - Nome do projeto (ex: "DeFi Protocol Marketing Campaign")
- **Slug** - URL amigável (gerado automaticamente, mas pode editar)
- **Main Image** - Imagem principal (arraste e solte)
- **Short Description** - Descrição curta (máx 200 caracteres) - aparece na listagem
- **Category** - Selecione uma categoria (crypto marketing, blockchain, web3, etc.)
- **Year** - Ano do projeto (ex: "2024")
- **Published** - ✅ Marque para publicar

#### 📋 Campos Opcionais:

- **Project Type** - Tipo de campanha (ex: "Web3 Marketing Campaign")
- **Full Description** - Descrição completa (use o editor visual para formatar)
- **Client Name** - Nome do cliente
- **Results** - Métricas/resultados (ex: "+500% growth", "10K+ users")
- **Featured** - ✅ Marque para aparecer na homepage
- **Display Order** - Número para ordenar (menor = aparece primeiro)

### 4️⃣ Publicar

1. Clique em **"Publish"** no canto superior direito
2. Pronto! O projeto aparecerá automaticamente no site

---

## 🎨 Dicas de Uso

### Para aparecer na Homepage:
- Marque o campo **"Featured"** como ✅
- Máximo 3 projetos aparecem na homepage
- Ordem: use o campo **"Display Order"** (0, 1, 2)

### Imagens:
- **Tamanho recomendado:** 1200x800px
- **Formato:** JPG, PNG ou WebP
- A imagem será otimizada automaticamente pelo Sanity

### Short Description:
- Seja conciso e impactante
- Máximo 200 caracteres
- Aparece na listagem e na homepage

### Full Description:
- Use o editor visual para formatar
- Pode adicionar:
  - Títulos (H2, H3, H4)
  - Texto em negrito e itálico
  - Links
  - Imagens adicionais
  - Listas

### Categorias Disponíveis:
- Crypto Marketing
- Blockchain
- Web3
- DeFi
- Token Launch
- NFT Marketing

---

## 📱 Onde Cada Campo Aparece

### Na Listagem (Homepage e Works):
- ✅ Main Image
- ✅ Title
- ✅ Short Description (se disponível)
- ✅ Category

### Na Página de Detalhes:
- ✅ Main Image (grande, no topo)
- ✅ Title
- ✅ Project Type (se preenchido)
- ✅ Full Description (ou Short Description como fallback)
- ✅ Year
- ✅ Client Name (se preenchido)
- ✅ Results (se preenchido)

---

## 🔄 Editar um Projeto Existente

1. No Sanity Studio, vá em **"Work / Project"**
2. Clique no projeto que quer editar
3. Faça as alterações
4. Clique em **"Publish"** para salvar

**Nota:** As mudanças aparecem imediatamente no site após publicar!

---

## 🗑️ Despublicar um Projeto

1. Abra o projeto no Sanity Studio
2. Desmarque o campo **"Published"**
3. Clique em **"Publish"**

O projeto não aparecerá mais no site, mas ficará salvo no Sanity.

---

## ⚡ Exemplos de Uso

### Exemplo 1: Projeto Simples
```
Title: "DeFi Protocol Launch"
Short Description: "Comprehensive marketing campaign for a new DeFi protocol, resulting in 10K+ users in the first month."
Category: "DeFi"
Year: "2024"
Featured: ✅
```

### Exemplo 2: Projeto Completo
```
Title: "NFT Marketplace Brand Strategy"
Short Description: "Complete rebranding and marketing strategy for an NFT marketplace."
Category: "NFT Marketing"
Year: "2024"
Project Type: "Brand Strategy"
Client Name: "ArtChain Marketplace"
Full Description: [Editor visual com texto formatado, imagens, etc.]
Results:
  - Metric: "Community Growth"
    Value: "+300%"
  - Metric: "Monthly Volume"
    Value: "$2M+"
Featured: ✅
Display Order: 0
```

---

## 🆘 Problemas Comuns

### Projeto não aparece no site:
- ✅ Verifique se está marcado como "Published"
- ✅ Verifique se o slug está preenchido
- ✅ Limpe o cache do navegador (Ctrl+F5 ou Cmd+Shift+R)

### Imagem não aparece:
- ✅ Verifique se a imagem foi enviada corretamente
- ✅ Aguarde alguns segundos para o processamento
- ✅ Tente fazer upload novamente

### Erro ao salvar:
- ✅ Verifique se todos os campos obrigatórios estão preenchidos
- ✅ Verifique se o slug é único (não pode ter dois projetos com o mesmo slug)

### Projeto não aparece na homepage:
- ✅ Verifique se está marcado como "Featured"
- ✅ Verifique se há menos de 3 projetos "Featured" (máximo 3)
- ✅ Verifique o "Display Order" (menor número aparece primeiro)

---

## 📚 Arquivos Relacionados

- `SANITY_WORK_SCHEMA.md` - Instruções para criar o schema no Sanity
- `works.html` - Página de listagem de todos os projetos
- `singlework.html` - Página de detalhes de um projeto
- `index.html` - Homepage (mostra projetos "Featured")

---

## ✅ Checklist Rápido

Antes de adicionar seu primeiro projeto:

- [ ] Schema "work" criado no Sanity Studio (veja `SANITY_WORK_SCHEMA.md`)
- [ ] Acesso ao Sanity Studio configurado
- [ ] Imagens dos projetos preparadas

Ao criar um projeto:

- [ ] Title preenchido
- [ ] Slug gerado/verificado
- [ ] Main Image enviada
- [ ] Short Description escrita (máx 200 caracteres)
- [ ] Category selecionada
- [ ] Year preenchido
- [ ] Published marcado ✅
- [ ] Projeto publicado

---

## 🎉 Pronto!

Agora você pode gerenciar todos os cases/projetos diretamente no Sanity CMS, sem precisar editar código HTML!

Qualquer dúvida, consulte `SANITY_WORK_SCHEMA.md` para detalhes técnicos do schema.

