#!/bin/bash
cd /Users/romulololico/Desktop/web

echo "=== Adicionando arquivos ==="
git add studio/index.html _headers netlify.toml

echo ""
echo "=== Status ==="
git status --short

echo ""
echo "=== Fazendo commit ==="
git commit -m "🔧 Fix: Remover bridge.js que redirecionava para Dashboard do Sanity

- Remover script bridge.js do studio/index.html
- Studio agora funciona de forma standalone em /studio
- Não redireciona mais para o Dashboard do Sanity
- Usuário pode editar o blog diretamente"

echo ""
echo "=== Fazendo push ==="
git push origin main

echo ""
echo "✅ Commit e push concluídos!"
echo ""
echo "Aguarde 1-2 minutos para o deploy no Netlify"
echo "Depois teste: https://wevolv3.com/studio"


