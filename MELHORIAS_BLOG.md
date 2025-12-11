# 🚀 Melhorias Implementadas no Blog

## ✅ 1. Simplificação da Arquitetura - Next.js com SSG

### O que mudou:
- **Antes**: Arquivos HTML estáticos (`blog.html`, `blog-post.html`) com JavaScript complexo e redirects manuais
- **Agora**: Next.js com Static Site Generation (SSG) que gera HTML estático automaticamente

### Benefícios:
- ✅ **Menos complexidade**: Sem redirects manuais complexos
- ✅ **Melhor SEO**: Meta tags geradas automaticamente no build
- ✅ **Performance**: HTML pré-renderizado no build
- ✅ **Manutenção**: Código mais limpo e organizado
- ✅ **TypeScript**: Suporte nativo (opcional)

### Estrutura:
```
app/
├── layout.jsx          # Layout base
├── globals.css         # Estilos globais
├── blog/
│   ├── page.jsx        # Listagem de posts (SSG)
│   └── [slug]/
│       └── page.jsx    # Página individual (SSG)
lib/
└── sanity.js           # Cliente Sanity adaptado para Next.js
components/
└── blog/
    ├── PortableText.jsx    # Renderizador de conteúdo
    └── PreviewBanner.jsx    # Banner de preview
```

## ✅ 2. Preview Melhorado - Sanity Presentation

### O que mudou:
- **Antes**: Preview básico com token manual
- **Agora**: Integração com Sanity Presentation usando `@sanity/preview-url-secret`

### Benefícios:
- ✅ **URLs seguras**: Tokens criptografados para preview
- ✅ **Suporte a drafts**: Visualização de rascunhos não publicados
- ✅ **Integração nativa**: Funciona diretamente do Sanity Studio
- ✅ **Melhor UX**: Botão de preview no editor

### Como usar:
1. No Sanity Studio (`/studio`), ao editar um post
2. Clique no botão **"👁 Preview"** na barra de ações
3. Uma nova aba abre com o preview do post (mesmo se for draft)

### Configuração:
- Variável de ambiente: `SANITY_PREVIEW_SECRET` (configure no Netlify)
- O preview funciona automaticamente com o token configurado

## 📦 Build Híbrido

O projeto agora usa um **build híbrido**:
- **Site principal**: Continua estático (HTML/CSS/JS)
- **Blog**: Next.js com SSG (gera HTML estático no build)

### Scripts:
```bash
# Desenvolvimento do blog
npm run dev:blog      # Next.js dev server (porta 3000)

# Build
npm run build:blog    # Build apenas do blog
npm run build         # Build do site principal (Vite)
node build-hybrid.cjs  # Build completo (híbrido)
```

### Processo de Build:
1. Next.js gera páginas estáticas em `out/`
2. Arquivos são copiados para a estrutura correta
3. Sanity Studio é buildado
4. Variáveis de ambiente são injetadas
5. Tudo é servido como arquivos estáticos no Netlify

## 🔄 Migração dos Arquivos Antigos

Os arquivos antigos (`blog.html`, `blog-post.html`) ainda existem mas **não são mais usados**:
- O Netlify agora serve as páginas do Next.js
- Redirects automáticos de `/blog.html` para `/blog`
- Compatibilidade mantida para links antigos

## 🎯 Próximos Passos (Opcional)

1. **Remover arquivos antigos**: Após validar que tudo funciona, pode remover `blog.html` e `blog-post.html`
2. **Adicionar mais features**: Comentários, newsletter, etc. (conforme solicitado)
3. **Otimizações**: Image optimization, lazy loading, etc.

## 📝 Notas Importantes

- O blog agora está em **Next.js**, mas o site principal continua **estático**
- Todas as páginas do blog são **pré-renderizadas** no build (SSG)
- SEO mantido: Meta tags, Open Graph, Twitter Cards, Schema.org
- Preview funciona apenas com `SANITY_PREVIEW_SECRET` configurado

## ✅ Status do Build

O build foi testado e está funcionando! As páginas foram geradas com sucesso:
- `/blog` - Listagem de posts (Static)
- `/blog/[slug]` - Páginas individuais (SSG)
  - 3 posts foram pré-renderizados durante o build

## 🐛 Troubleshooting

### Preview não funciona:
- Verifique se `SANITY_PREVIEW_SECRET` está configurado no Netlify
- O secret deve ser o mesmo no Sanity Studio e no site

### Build falha:
- Verifique se todas as dependências estão instaladas: `npm install`
- Verifique se as variáveis de ambiente estão configuradas
- Se houver erro sobre `pages` e `app`, a pasta `src/pages` será temporariamente renomeada durante o build

### Páginas não aparecem:
- Verifique se o build do Next.js gerou arquivos em `out/blog/`
- Verifique os redirects no `netlify.toml`

### Erros de query durante build:
- Alguns erros de query podem aparecer durante o build (slugs não encontrados)
- Isso é normal se houver posts com slugs inválidos ou deletados
- O build continua e gera as páginas válidas

