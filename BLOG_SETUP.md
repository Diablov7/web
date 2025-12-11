# 🚀 Guia de Setup do Blog Wevolv3

Este guia vai te ajudar a configurar o blog in-house completo com Sanity CMS, Supabase e Google Analytics.

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Contas criadas em:
  - [Sanity.io](https://www.sanity.io/) (gratuito)
  - [Supabase.com](https://supabase.com/) (gratuito)
  - [Google Analytics](https://analytics.google.com/) (gratuito)

## 🔧 Passo 1: Instalar Dependências

As dependências já foram instaladas. Se precisar reinstalar:

```bash
npm install
```

## 🔑 Passo 2: Configurar Sanity CMS

1. Siga o guia em `SANITY_SETUP.md`
2. Crie o projeto no Sanity
3. Configure os schemas (Post, Author, Category)
4. Anote o **Project ID** e **Dataset**

## 🗄️ Passo 3: Configurar Supabase

1. Siga o guia em `SUPABASE_SETUP.md`
2. Crie o projeto no Supabase
3. Execute o SQL para criar a tabela `post_views`
4. Anote a **URL** e **anon key**

## 📊 Passo 4: Configurar Google Analytics

1. Acesse [Google Analytics](https://analytics.google.com/)
2. Crie uma propriedade GA4
3. Copie o **Measurement ID** (formato: G-XXXXXXXXXX)

## ⚙️ Passo 5: Configurar Variáveis de Ambiente

1. Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

2. Edite o arquivo `.env` e preencha com suas credenciais:

```env
VITE_SANITY_PROJECT_ID=seu_project_id_aqui
VITE_SANITY_DATASET=production

VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua_anon_key_aqui

VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

VITE_ADMIN_PASSWORD=senha_segura_aqui
```

## 🚀 Passo 6: Rodar o Projeto

```bash
npm run dev
```

O site estará disponível em `http://localhost:5173`

## 📝 Passo 7: Criar Primeiro Post

1. Acesse o Sanity Studio (local ou online)
2. Crie um novo post
3. Preencha todos os campos:
   - Título
   - Slug (gerado automaticamente)
   - Autor
   - Imagem principal
   - Categorias
   - Data de publicação
   - Resumo
   - Conteúdo
   - Marque como "Publicado"
4. Salve o post

O post aparecerá automaticamente em `/blog`!

## 📊 Passo 8: Acessar Dashboard de Analytics

1. Acesse `/admin/analytics`
2. Digite a senha configurada em `VITE_ADMIN_PASSWORD`
3. Veja estatísticas de visualizações de todos os posts

## 🎨 Personalização

### Cores e Estilo

O blog usa o design atual do site com:
- Glass morphism
- Gradientes (emerald, blue, purple)
- Fonte Orbitron
- Animações suaves

Para personalizar, edite os componentes em `src/components/Blog/`

### SEO

Cada post tem:
- Meta tags dinâmicas
- Schema.org (JSON-LD)
- Open Graph tags
- Twitter Cards

## 🔒 Segurança

- A senha do admin está em variável de ambiente
- Em produção, considere usar autenticação adequada
- O Supabase usa Row Level Security (RLS)

## 📚 Estrutura de Arquivos

```
src/
├── components/
│   └── Blog/
│       ├── BlogCard.jsx      # Card de post na listagem
│       ├── BlogPost.jsx       # Página individual
│       ├── PostViews.jsx      # Componente de visualizações
│       └── BlockContent.jsx   # Renderizador de conteúdo
├── pages/
│   ├── Blog.jsx               # Lista de posts
│   ├── BlogPost.jsx           # Página do post
│   └── Admin/
│       └── Analytics.jsx      # Dashboard de analytics
├── lib/
│   ├── sanity.js              # Cliente Sanity
│   ├── supabase.js            # Cliente Supabase
│   └── analytics.js            # Google Analytics
└── utils/
    └── blog.js                # Funções auxiliares
```

## 🐛 Troubleshooting

### Posts não aparecem
- Verifique se o post está marcado como "Publicado" no Sanity
- Verifique as variáveis de ambiente
- Verifique o console do navegador para erros

### Visualizações não funcionam
- Verifique se a tabela `post_views` foi criada no Supabase
- Verifique as políticas RLS no Supabase
- Verifique as variáveis de ambiente

### Google Analytics não funciona
- Verifique se o Measurement ID está correto
- Verifique o console do navegador
- Use o Google Analytics Debugger

## 📞 Suporte

Para dúvidas ou problemas, consulte:
- [Documentação do Sanity](https://www.sanity.io/docs)
- [Documentação do Supabase](https://supabase.com/docs)
- [Documentação do Google Analytics](https://developers.google.com/analytics)

---

**Pronto! Seu blog está configurado e funcionando! 🎉**

