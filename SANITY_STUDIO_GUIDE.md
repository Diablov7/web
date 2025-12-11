# 🎨 Guia Rápido do Sanity Studio

## 🚀 Como Usar

### 1. Iniciar o Sanity Studio

No terminal, execute:

```bash
npm run studio
```

O Sanity Studio abrirá automaticamente em `http://localhost:3333`

### 2. Fazer Login

Na primeira vez, você precisará fazer login:
- Clique em "Login" ou "Sign in"
- Use sua conta do Sanity (a mesma que criou o projeto)
- Autorize o acesso

### 3. Criar Conteúdo

Depois de logado, você verá o menu lateral com:
- **Post** - Para criar posts do blog
- **Author** - Para criar autores
- **Category** - Para criar categorias

## 📝 Criar seu Primeiro Post

### Passo 1: Criar um Autor (se ainda não tiver)

1. Clique em **"Author"** no menu
2. Clique em **"Create new"**
3. Preencha:
   - **Nome**: Seu nome ou nome do autor
   - **Imagem**: Faça upload de uma foto (opcional)
4. Clique em **"Publish"**

### Passo 2: Criar uma Categoria (se ainda não tiver)

1. Clique em **"Category"** no menu
2. Clique em **"Create new"**
3. Preencha:
   - **Título**: Ex: "Web3", "Marketing", "Tecnologia"
   - **Slug**: Será gerado automaticamente do título
4. Clique em **"Publish"**

### Passo 3: Criar um Post

1. Clique em **"Post"** no menu
2. Clique em **"Create new"**
3. Preencha todos os campos:

   - **Título**: Título do post
   - **Slug**: Será gerado automaticamente (ou edite manualmente)
   - **Autor**: Selecione um autor criado anteriormente
   - **Imagem Principal**: Faça upload de uma imagem de destaque
   - **Categorias**: Selecione uma ou mais categorias
   - **Data de Publicação**: Escolha a data
   - **Resumo**: Breve descrição do post (aparece na listagem)
   - **Conteúdo**: Escreva o conteúdo do post
     - Use o editor rico para formatar texto
     - Adicione imagens clicando no ícone de imagem
     - Use headings, listas, negrito, itálico, etc.
   - **Publicado**: Marque como `true` para publicar

4. Clique em **"Publish"** no canto superior direito

## ✅ Verificar no Blog

Depois de publicar:
1. Acesse `http://localhost:5173/blog` (seu site local)
2. O post deve aparecer na listagem!
3. Clique no post para ver a página completa

## 🎯 Dicas

- **Slug**: É a URL do post (ex: `/blog/meu-primeiro-post`)
- **Publicado**: Só posts marcados como `true` aparecem no blog
- **Imagens**: Use imagens de boa qualidade (recomendado: 1200x600px)
- **Resumo**: Escreva um resumo atrativo (aparece nos cards do blog)

## 🔧 Troubleshooting

### Studio não abre
- Verifique se a porta 3333 está livre
- Tente `cd sanity && npm run dev`

### Erro de login
- Certifique-se de estar usando a mesma conta do projeto
- Verifique se o Project ID está correto no `.env`

### Posts não aparecem
- Verifique se marcou "Publicado" como `true`
- Verifique se o Project ID e Dataset estão corretos no `.env`
- Recarregue a página do blog

---

**Pronto! Agora você pode criar posts facilmente! 🎉**

