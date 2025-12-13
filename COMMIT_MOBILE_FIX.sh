#!/bin/bash
cd /Users/romulololico/Desktop/web

echo "=== Adicionando arquivo ==="
git add singleblog.html

echo ""
echo "=== Status ==="
git status --short

echo ""
echo "=== Fazendo commit ==="
git commit -m "🔧 Fix: Corrigir corte de texto na esquerda em artigos no mobile

- Adicionar padding adequado para mobile no .main-container
- Ajustar padding do .single-post-text-cell no mobile
- Garantir que texto não seja cortado na esquerda
- Melhorar legibilidade em dispositivos móveis"

echo ""
echo "=== Fazendo push ==="
git push origin main

echo ""
echo "✅ Commit e push concluídos!"
echo ""
echo "Aguarde 1-2 minutos para o deploy no Netlify"
echo "Teste em um dispositivo móvel: https://wevolv3.com/singleblog?slug=..."


