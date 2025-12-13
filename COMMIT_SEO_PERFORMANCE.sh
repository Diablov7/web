#!/bin/bash
cd /Users/romulololico/Desktop/web

echo "=== Adicionando arquivos ==="
git add singleblog.html generate-sitemap.js readme.md

echo ""
echo "=== Status ==="
git status --short

echo ""
echo "=== Fazendo commit ==="
git commit -m "✨ Add: Melhorias de SEO e Performance para artigos

SEO:
- Adicionar Schema.org JSON-LD (BlogPosting) para artigos
- Corrigir URLs canônicas
- Melhorar meta tags dinâmicas com datas de publicação

Performance:
- Adicionar preload para imagem principal do artigo
- Adicionar fetchPriority='high' para imagem principal
- Adicionar decoding='async' para imagens do conteúdo
- Otimizar carregamento de imagens

Sitemap:
- Criar script generate-sitemap.js para gerar sitemap dinâmico
- Script busca posts do Sanity e gera sitemap.xml atualizado
- Incluir instruções no README

Todos os novos artigos agora serão:
- Indexados corretamente pelo Google
- Com Schema.org para rich snippets
- Com performance otimizada
- Incluídos no sitemap quando o script for executado"

echo ""
echo "=== Fazendo push ==="
git push origin main

echo ""
echo "✅ Commit e push concluídos!"
echo ""
echo "📝 Próximos passos:"
echo "1. Execute 'node generate-sitemap.js' após publicar novos artigos"
echo "2. Ou configure um cron job para executar automaticamente"
echo "3. Verifique o sitemap em: https://wevolv3.com/sitemap.xml"


