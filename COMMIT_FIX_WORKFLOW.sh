#!/bin/bash
cd /Users/romulololico/Desktop/web

echo "=== Adicionando arquivos ==="
git add .github/workflows/update-sitemap.yml generate-sitemap.js

echo ""
echo "=== Status ==="
git status --short

echo ""
echo "=== Fazendo commit ==="
git commit -m "🔧 Fix: Corrigir GitHub Actions workflow para sitemap

Correções:
- Adicionar permissions: contents: write no workflow
- Usar GITHUB_TOKEN corretamente
- Melhorar tratamento de erros no script
- Adicionar verificação de status HTTP
- Adicionar verificação de erros da API Sanity
- Configurar fetch-depth: 0 para checkout completo

O workflow agora deve funcionar corretamente e fazer commit automático do sitemap quando houver mudanças."

echo ""
echo "=== Fazendo push ==="
git push origin main

echo ""
echo "✅ Commit e push concluídos!"
echo ""
echo "📋 O workflow será executado automaticamente após este push"
echo "   Verifique em: https://github.com/Diablov7/web/actions"

