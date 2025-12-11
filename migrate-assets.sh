#!/bin/bash
# Script para migrar assets do Darkyn para web-main
# Execute este script no diretório pai que contém ambas as pastas

DARKYN_DIR="/Users/romulololico/Downloads/darkyn-creative-html-template-2025-01-20-13-10-24-utc/darkyn - package"
WEB_MAIN_DIR="/Users/romulololico/Downloads/web-main"

echo "🚀 Iniciando migração de assets..."

# Criar diretórios se não existirem
mkdir -p "$WEB_MAIN_DIR/css"
mkdir -p "$WEB_MAIN_DIR/js"
mkdir -p "$WEB_MAIN_DIR/images"
mkdir -p "$WEB_MAIN_DIR/fonts"

# Copiar CSS
echo "📁 Copiando CSS..."
cp "$DARKYN_DIR/css/"*.css "$WEB_MAIN_DIR/css/"

# Copiar JavaScript
echo "📁 Copiando JavaScript..."
cp "$DARKYN_DIR/js/"*.js "$WEB_MAIN_DIR/js/"

# Copiar imagens
echo "📁 Copiando imagens..."
cp -r "$DARKYN_DIR/images/"* "$WEB_MAIN_DIR/images/"

# Copiar fontes
echo "📁 Copiando fontes..."
cp "$DARKYN_DIR/fonts/"*.otf "$WEB_MAIN_DIR/fonts/"

# Copiar HTML
echo "📁 Copiando HTML..."
cp "$DARKYN_DIR/"*.html "$WEB_MAIN_DIR/"

echo "✅ Migração completa!"
echo ""
echo "Próximos passos:"
echo "1. cd $WEB_MAIN_DIR"
echo "2. git add ."
echo "3. git commit -m 'Migração para novo design Darkyn'"
echo "4. git push origin main"

