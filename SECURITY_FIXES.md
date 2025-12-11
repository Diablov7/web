# Correções de Segurança Aplicadas

## Bug 1: Credenciais Hardcoded ✅ CORRIGIDO

### Problema
A senha de admin (`M4r4cuj42020`) e o token do Sanity estavam hardcoded no arquivo HTML do cliente, expondo credenciais sensíveis.

### Solução
- Criadas **Netlify Functions** server-side:
  - `netlify/functions/blog-auth.js` - Autenticação do editor
  - `netlify/functions/create-post.js` - Criação de posts no Sanity
- Credenciais agora são lidas de variáveis de ambiente no servidor
- Cliente não tem mais acesso direto a senhas ou tokens

### Variáveis de Ambiente Necessárias no Netlify
Configure no Netlify Dashboard > Site settings > Environment variables:
- `ADMIN_PASSWORD` - Senha para acesso ao editor de blog
- `SANITY_TOKEN` - Token de escrita do Sanity (com permissões de criação)
- `SANITY_PROJECT_ID` - ID do projeto Sanity (opcional, já configurado)
- `SANITY_DATASET` - Dataset do Sanity (opcional, padrão: production)

---

## Bug 2: Configuração Hardcoded ✅ CORRIGIDO

### Problema
Project ID, dataset e configuração do Sanity estavam hardcoded em múltiplos arquivos HTML estáticos.

### Solução
- Criado script `build-inject-env.js` que injeta variáveis de ambiente durante o build
- Script é executado automaticamente antes do build do Sanity Studio
- Configurações podem ser alteradas via variáveis de ambiente sem modificar código

### Nota
O Project ID do Sanity é público por design (não é um segredo), mas agora pode ser configurado via variável de ambiente para facilitar mudanças entre ambientes.

---

## Bug 3: Redirect Catch-All Faltando ✅ CORRIGIDO

### Problema
O `netlify.toml` não tinha o redirect catch-all para SPA, causando 404 em rotas do React Router.

### Solução
- Adicionado redirect catch-all `/* -> /index.html` no `netlify.toml`
- Redirect está posicionado após todos os redirects específicos (blog, studio, admin)
- Garante que rotas do React Router funcionem corretamente em produção

---

## Como Configurar no Netlify

1. Acesse o Netlify Dashboard
2. Vá em **Site settings > Environment variables**
3. Adicione as seguintes variáveis:

```
ADMIN_PASSWORD=M4r4cuj42020
SANITY_TOKEN=skfdoK7BNlr1fFFjbtNDEvz94Tcm9xnYKpX5ZNZlDzXtelEiHpkS5Dd9iy32RdUmaz0BJMPkR5bjHRryHnm3bRBmW3H6tVlZhhUxX04d5howTMsKJvhv6PH7hPf9ZmGpPB7DgZ4mVftyHkpFmNbz9sUIO34j0Yi0Vo8XJLFebraMwwsXBrIF
SANITY_PROJECT_ID=sszuldy6
SANITY_DATASET=production
SANITY_API_VERSION=2024-01-01
```

4. Faça um novo deploy para aplicar as mudanças

---

## Arquivos Modificados

- `admin/blog-editor.html` - Removidas credenciais hardcoded, usa Netlify Functions
- `netlify/functions/blog-auth.js` - Nova function para autenticação
- `netlify/functions/create-post.js` - Nova function para criar posts
- `netlify.toml` - Adicionado redirect catch-all e script de build
- `build-inject-env.js` - Novo script para injetar variáveis de ambiente

---

## Testes

Após o deploy, teste:
1. Acesse `/admin/blog-editor` e faça login (deve usar a function)
2. Crie um post (deve usar a function server-side)
3. Acesse rotas do React Router (devem funcionar com o catch-all)

