# 📝 Editor de Blog - Guia Rápido

## 🎯 Como Usar

### 1. Acessar o Editor

Acesse: `https://wevolv3.com/admin/blog-editor`

Ou localmente: `http://localhost:5173/admin/blog-editor`

### 2. Fazer Login

- Digite a senha configurada em `VITE_ADMIN_PASSWORD` (padrão: `wevolv3admin2025`)
- Clique em "Entrar"

### 3. Criar um Post

1. **Título**: Digite o título do post
2. **Resumo**: Breve descrição (aparece na listagem)
3. **Conteúdo HTML**: Cole o HTML completo do artigo
4. **Publicar**: Marque se quiser publicar imediatamente
5. Clique em **"Publicar Post"**

## 📋 Formato do HTML

Cole o HTML completo do artigo. Exemplo:

```html
<h1>Meu Primeiro Post</h1>
<p>Este é o primeiro parágrafo do post.</p>
<h2>Subtítulo</h2>
<p>Mais conteúdo aqui...</p>
<p>Outro parágrafo.</p>
```

O sistema converte automaticamente para o formato do Sanity.

## 🔑 Configurar Token do Sanity (Uma vez só)

Para que o editor funcione, você precisa criar um token de API no Sanity:

### Passo 1: Acessar Sanity

1. Acesse https://www.sanity.io/manage
2. Selecione seu projeto (`sszuldy6`)

### Passo 2: Criar Token

1. Vá em **Settings** > **API** > **Tokens**
2. Clique em **"Add API token"**
3. Dê um nome (ex: "Blog Editor")
4. Escolha **"Editor"** como permissão
5. Clique em **"Save"**
6. **Copie o token** (você só verá uma vez!)

### Passo 3: Adicionar no .env

Adicione no arquivo `.env`:

```
VITE_SANITY_TOKEN=seu_token_aqui
```

## ✅ Pronto!

Depois de configurar o token:
- Acesse `/admin/blog-editor`
- Faça login
- Cole seu HTML
- Publique!

## 🎨 Dicas

- **Títulos**: Use `<h1>`, `<h2>`, `<h3>` para títulos
- **Parágrafos**: Use `<p>` para parágrafos
- **Listas**: Use `<ul>`, `<ol>`, `<li>` para listas
- **Negrito**: Use `<strong>` ou `<b>`
- **Itálico**: Use `<em>` ou `<i>`

O sistema formata automaticamente!

---

**Super simples: Login → Colar HTML → Publicar! 🚀**

