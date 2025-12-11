# Sanity Studio - Deploy para Produção

## 🚀 Deploy no Sanity Hosting (Recomendado - Grátis)

### Passo 1: Fazer Login no Sanity CLI

```bash
cd sanity
npx sanity login
```

### Passo 2: Deploy

```bash
npm run deploy
```

Ou:

```bash
npx sanity deploy
```

### Passo 3: Escolher o Hostname

Quando perguntar o hostname, escolha algo como:
- `wevolv3-blog`
- `wevolv3-studio`
- Ou qualquer nome disponível

### Resultado

Você terá uma URL como:
- `https://wevolv3-blog.sanity.studio`

Acesse essa URL de qualquer lugar para criar/editar posts!

## 🔧 Alternativa: Deploy no Netlify/Vercel

Se preferir ter o Studio no mesmo domínio (`wevolv3.com/studio`):

1. Build do Studio:
```bash
cd sanity
npm run build
```

2. Configure no Netlify/Vercel:
   - Build command: `cd sanity && npm run build`
   - Publish directory: `sanity/dist`
   - Base directory: `/studio`

---

**Recomendação: Use o Sanity Hosting (Opção 1) - é mais fácil e gratuito!**

