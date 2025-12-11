#!/bin/bash

# Script de migração Darkyn para Wevolv3
echo "🚀 Iniciando migração..."

# Diretórios
DARKYN="/Users/romulololico/Downloads/darkyn-creative-html-template-2025-01-20-13-10-24-utc/darkyn - package"
WEBMAIN="/Users/romulololico/Downloads/web-main"

cd "$WEBMAIN"

# Criar diretórios
echo "📁 Criando diretórios..."
mkdir -p js
mkdir -p images
mkdir -p fonts

# Copiar CSS
echo "📄 Copiando CSS..."
cp "$DARKYN/css/layout.css" css/
cp "$DARKYN/css/style.css" css/
cp "$DARKYN/css/normalize.css" css/

# Copiar JS
echo "📄 Copiando JavaScript..."
cp "$DARKYN/js/jquery.min.js" js/
cp "$DARKYN/js/plugins.js" js/

# Copiar imagens
echo "🖼️ Copiando imagens..."
cp -r "$DARKYN/images/"* images/

# Copiar fontes
echo "🔤 Copiando fontes..."
cp "$DARKYN/fonts/"*.otf fonts/ 2>/dev/null || true

# Git
echo "📦 Fazendo commit..."
git add -A
git commit -m "🎨 Migração completa para novo design Darkyn - Wevolv3

- Substituição completa do site por template Darkyn
- Integração do blog Sanity mantida
- Atualização de todos os textos para Wevolv3
- Vídeo de background no hero
- Logo Wevolv3 integrada
- Cores atualizadas (teal/azul)
- Todos os HTMLs atualizados
- CSS e JS do template Darkyn"

echo "🌐 Fazendo push..."
git push origin main

echo "✅ Migração concluída!"

