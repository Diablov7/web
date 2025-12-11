#!/bin/bash
set -e

cd /Users/romulololico/Downloads/web-main

echo "🔍 Verificando status do Git..."
git status

echo ""
echo "📝 Adicionando todos os arquivos..."
git add -A

echo ""
echo "💾 Criando commit forçado..."
git commit -m "🔧 Fix blog: Use Sanity API CDN (apicdn) for better CORS handling

- Changed from api.sanity.io to apicdn.sanity.io
- Added better error logging for CORS issues
- Improved error messages for debugging" || echo "⚠️ Nenhuma mudança detectada ou já commitado"

echo ""
echo "🌐 Fazendo push forçado..."
git push origin main --force

echo ""
echo "✅ Processo concluído!"
echo "📊 Verifique no GitHub: https://github.com/Diablov7/web"

