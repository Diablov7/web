#!/bin/bash
cd /Users/romulololico/Desktop/web

echo "=== Verificando arquivos modificados ==="
git status --short

echo ""
echo "=== Adicionando arquivos ==="
git add studio/index.html _redirects netlify.toml _headers

echo ""
echo "=== Status após add ==="
git status --short

echo ""
echo "=== Fazendo commit ==="
git commit -m "🔧 Fix: Forçar redirects do Studio e remover bridge.js

- Remover bridge.js do studio/index.html (causa do redirecionamento)
- Adicionar force=true nos redirects do Studio
- /studio e /studio/* agora servem /studio/index.html corretamente
- Studio funciona standalone sem redirecionar para Dashboard"

echo ""
echo "=== Fazendo push ==="
git push origin main

echo ""
echo "✅ Commit e push concluídos!"
echo ""
echo "Aguarde 1-2 minutos para o deploy no Netlify"
echo "Depois teste: https://wevolv3.com/studio"

