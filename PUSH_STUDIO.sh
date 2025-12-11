#!/bin/bash
echo "=== Verificando estado do Git ==="
git status

echo ""
echo "=== Adicionando arquivos ==="
git add -A

echo ""
echo "=== Fazendo commit ==="
git commit -m "✨ Add Sanity Studio redirect page at /studio"

echo ""
echo "=== Fazendo push ==="
git push origin main --force

echo ""
echo "=== Concluído! ==="
echo "Agora acesse: https://wevolv3.com/studio"

