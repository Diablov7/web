# 🔧 Correção do Sistema de Preview

## ❌ Problema Identificado

O sistema de preview não funcionava porque:
1. O Next.js está configurado como **static export** (sem servidor)
2. O `@sanity/preview-url-secret` gera URLs que precisam ser processadas por um servidor
3. Não havia como processar os tokens de preview em static export

## ✅ Solução Implementada

### 1. Netlify Function para Preview
Criada `netlify/functions/preview.js` que:
- Valida o secret token
- Redireciona para a página do blog com `?preview=true`
- Funciona com static export

### 2. PreviewAction Simplificado
O `PreviewAction` agora:
- Gera URL para a Netlify Function
- Passa secret, slug e id como query params
- A função processa e redireciona

### 3. Suporte a Document ID
O `getPostBySlug` agora:
- Aceita `documentId` opcional
- Busca drafts pelo ID quando em preview mode
- Fallback para busca por slug

## 🔑 Variáveis de Ambiente Necessárias

Certifique-se de ter configurado no Netlify:

1. **SANITY_PREVIEW_SECRET** ✅ (já configurado)
   - Valor: `wevolv3-preview-secret-2024` (ou o que você configurou)

2. **SANITY_API_READ_TOKEN** ⚠️ (importante para drafts)
   - Este é o token do Sanity que permite ler drafts
   - Configure como `VITE_SANITY_TOKEN` ou `SANITY_API_READ_TOKEN`
   - Pode ser o mesmo token que você já usa

## 🧪 Como Testar

1. Aguarde o deploy completar no Netlify
2. Acesse: `https://wevolv3.com/studio`
3. Abra um post (ou crie um draft)
4. Clique no botão **"👁 Preview"**
5. Deve abrir uma nova aba com o preview

## 🐛 Se Ainda Não Funcionar

### Verificar no Console do Navegador:
1. Abra o DevTools (F12)
2. Vá na aba Console
3. Clique no botão Preview
4. Veja se há erros ou logs

### Verificar Variáveis de Ambiente:
- `SANITY_PREVIEW_SECRET` está configurado?
- `VITE_SANITY_TOKEN` ou `SANITY_API_READ_TOKEN` está configurado?
- Os valores estão corretos?

### Verificar Netlify Function:
- Acesse: `https://wevolv3.com/.netlify/functions/preview?secret=wevolv3-preview-secret-2024&slug=test&id=test`
- Deve redirecionar para `/blog/test?preview=true&id=test`

## 📝 Notas

- O preview funciona mesmo com static export
- Drafts são buscados usando o token do Sanity
- A validação do secret é feita na Netlify Function
- O preview é seguro e não expõe o secret no cliente

