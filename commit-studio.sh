#!/bin/bash
cd /Users/romulololico/Desktop/web

echo "=== Adicionando arquivos do Studio ==="
git add studio/
git add netlify.toml
git add _redirects
git add _headers

echo ""
echo "=== Status do Git ==="
git status --short

echo ""
echo "=== Fazendo commit ==="
git commit -m "✨ Add: Migrar Sanity Studio do projeto antigo para servir localmente

- Copiar estrutura completa do Studio (index.html, static files)
- Configurar netlify.toml para servir Studio em /studio
- Atualizar _redirects para servir Studio como SPA local
- Atualizar _headers para permitir iframe do Studio
- Remover studio.html (não mais necessário)
- Studio agora serve localmente em vez de redirect externo
- Baseado na estrutura do projeto antigo que funcionava"

echo ""
echo "=== Fazendo push ==="
git push origin main

echo ""
echo "✅ Commit e push concluídos!"

