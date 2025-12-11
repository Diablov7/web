#!/bin/bash
cd /Users/romulololico/Downloads/web-main

echo "=== Adicionando arquivos ==="
git add -A

echo ""
echo "=== Fazendo commit ==="
git commit -m "🔧 Fix: Update Studio redirect to correct Sanity URL

- Updated redirects to use correct Sanity Studio URL
- Changed from wevolv3.sanity.studio to sanity.io/@omH6dEUOk/studio/...
- Removed iframe approach (X-Frame-Options: DENY prevents embedding)
- Now using direct 301 redirect to Sanity Studio"

echo ""
echo "=== Fazendo push ==="
git push origin main --force

echo ""
echo "✅ Commit concluído!"

