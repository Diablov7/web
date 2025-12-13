#!/bin/bash
cd /Users/romulololico/Desktop/web

echo "=== Adicionando arquivos ==="
git add .github/workflows/update-sitemap.yml package.json netlify.toml readme.md AUTOMACAO_SITEMAP.md

echo ""
echo "=== Status ==="
git status --short

echo ""
echo "=== Fazendo commit ==="
git commit -m "🤖 Add: Automação completa do sitemap

Automação:
- GitHub Actions para atualizar sitemap automaticamente
  - Executa diariamente às 2h UTC
  - Executa em push para main
  - Pode ser executado manualmente
  - Commit automático se houver mudanças

- Netlify Build Hook
  - Gera sitemap durante cada deploy
  - Sempre atualizado quando há push

- package.json criado com script npm run generate-sitemap

Documentação:
- README atualizado com instruções
- AUTOMACAO_SITEMAP.md com guia completo

Agora o sitemap é atualizado automaticamente:
✅ A cada deploy no Netlify
✅ Diariamente via GitHub Actions
✅ Quando há push na branch main
✅ Manualmente quando necessário"

echo ""
echo "=== Fazendo push ==="
git push origin main

echo ""
echo "✅ Commit e push concluídos!"
echo ""
echo "🎉 Automação configurada!"
echo ""
echo "📋 Próximos passos:"
echo "1. O sitemap será atualizado automaticamente a cada deploy"
echo "2. GitHub Actions executará diariamente às 2h UTC"
echo "3. Você pode executar manualmente em:"
echo "   https://github.com/Diablov7/web/actions"
echo ""
echo "📖 Veja AUTOMACAO_SITEMAP.md para mais detalhes"


