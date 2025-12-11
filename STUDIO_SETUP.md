# 🎨 Sanity Studio - Editor de Blog

O Sanity Studio está configurado para rodar em **`https://wevolv3.com/studio`**

## 📍 Como Acessar

Após o deploy no Netlify, acesse:
- **URL:** `https://wevolv3.com/studio`
- **Login:** Use sua conta do Sanity (mesma do painel)

## 🛠️ Como Funciona

1. **Editor Visual Completo**
   - Interface profissional tipo WordPress
   - Preview em tempo real
   - Upload de imagens
   - Gerenciamento de categorias e autores

2. **Build Automático**
   - O Netlify faz o build automaticamente no deploy
   - O Studio é compilado para a pasta `studio-dist/`
   - Servido em `/studio` no seu domínio

## 🔧 Configuração no Sanity

1. Acesse: https://www.sanity.io/manage
2. Vá em **Studios** > **Add studio**
3. Adicione a URL: `https://wevolv3.com/studio`
4. Salve

## 📝 Criar Posts

1. Acesse `https://wevolv3.com/studio`
2. Clique em **"Post"** no menu lateral
3. Clique em **"Create new"**
4. Preencha:
   - **Title** (obrigatório)
   - **Slug** (gerado automaticamente do título)
   - **Excerpt** (resumo)
   - **Main Image** (imagem principal)
   - **Body** (conteúdo - editor visual)
   - **Categories** (opcional)
   - **Author** (opcional)
   - **Published** (marque para publicar)
5. Clique em **"Publish"**

## 🎯 Vantagens do Studio

✅ **Editor Visual** - WYSIWYG completo  
✅ **Upload de Imagens** - Direto no editor  
✅ **Preview** - Veja como ficará antes de publicar  
✅ **Histórico** - Versões anteriores dos posts  
✅ **Acesso Remoto** - De qualquer lugar  
✅ **Interface Profissional** - Tipo WordPress  

## 🔄 Atualizar Studio

Se precisar atualizar o Studio:

```bash
cd sanity
npm install
npm run build
```

O build será feito automaticamente no Netlify no próximo deploy.

## ⚠️ Nota Importante

- O Studio é apenas o **editor** (painel administrativo)
- O **blog público** continua em `wevolv3.com/blog`
- **Analytics e SEO** funcionam normalmente
- O Studio **não afeta** o site público

