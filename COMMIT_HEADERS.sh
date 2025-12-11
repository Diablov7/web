#!/bin/bash
cd /Users/romulololico/Desktop/web

echo "=== Adicionando arquivos ==="
git add _headers netlify.toml

echo ""
echo "=== Fazendo commit ==="
git commit -m "🔧 Fix: Corrigir headers do Studio para permitir embedding no Dashboard

- Remover X-Frame-Options: SAMEORIGIN que bloqueava embedding
- Usar apenas Content-Security-Policy: frame-ancestors
- Permitir embedding do Dashboard do Sanity (https://*.sanity.io)
- Baseado na documentação oficial: https://www.sanity.io/docs/dashboard/dashboard-configure"

echo ""
echo "=== Fazendo push ==="
git push origin main

echo ""
echo "✅ Commit e push concluídos!"

