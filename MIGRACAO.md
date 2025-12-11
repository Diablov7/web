# 🚀 Instruções de Migração - Darkyn para Web-Main

## Passo a Passo para Completar a Migração

### 1. Abra o Terminal e execute os seguintes comandos:

```bash
# Navegue para o diretório Downloads
cd /Users/romulololico/Downloads

# Crie as pastas necessárias no web-main
mkdir -p web-main/css
mkdir -p web-main/js
mkdir -p web-main/images
mkdir -p web-main/fonts

# Copie os arquivos CSS
cp "darkyn-creative-html-template-2025-01-20-13-10-24-utc/darkyn - package/css/"*.css web-main/css/

# Copie os arquivos JavaScript
cp "darkyn-creative-html-template-2025-01-20-13-10-24-utc/darkyn - package/js/"*.js web-main/js/

# Copie as imagens
cp -r "darkyn-creative-html-template-2025-01-20-13-10-24-utc/darkyn - package/images/"* web-main/images/

# Copie as fontes
cp "darkyn-creative-html-template-2025-01-20-13-10-24-utc/darkyn - package/fonts/"*.otf web-main/fonts/

# Copie os arquivos HTML
cp "darkyn-creative-html-template-2025-01-20-13-10-24-utc/darkyn - package/"*.html web-main/
```

### 2. Após copiar os arquivos, faça o commit no Git:

```bash
cd /Users/romulololico/Downloads/web-main

# Verifique o status
git status

# Adicione todos os arquivos
git add .

# Faça o commit
git commit -m "🎨 Migração para novo design Darkyn - Wevolv3"

# Envie para o GitHub
git push origin main
```

### 3. Aguarde o deploy no Netlify

Após o push, o Netlify detectará automaticamente as mudanças e fará o deploy do novo site.

## Arquivos que serão substituídos:

- ✅ `index.html` - Página principal com novo design
- ✅ `about.html` - Página sobre
- ✅ `blog.html` - Lista de artigos (integrado com Sanity)
- ✅ `singleblog.html` - Artigo individual (integrado com Sanity)
- ✅ `works.html` - Portfólio
- ✅ `singlework.html` - Projeto individual
- ✅ `contact.html` - Contato
- ✅ `css/` - Todos os estilos CSS
- ✅ `js/` - JavaScript necessário
- ✅ `images/` - Todas as imagens
- ✅ `fonts/` - Fontes customizadas

## Arquivos que serão mantidos:

- `netlify/functions/` - Funções serverless (se necessário)
- `.gitignore` - Configuração do Git

## Verificação Final

Após o deploy, verifique:

1. ✅ Página inicial carrega corretamente
2. ✅ Vídeo do touro aparece no hero
3. ✅ Logo Wevolv3 está visível
4. ✅ Blog carrega artigos do Sanity
5. ✅ Artigos individuais abrem corretamente
6. ✅ Todas as páginas funcionam

## Suporte

Em caso de problemas, verifique:
- Console do navegador para erros JavaScript
- Network tab para arquivos não encontrados
- CORS do Sanity (deve incluir seu domínio)

