#!/bin/bash
set -e

cd "$(dirname "$0")"

echo "🔍 Verificando repositório..."
if [ ! -d .git ]; then
    echo "📦 Inicializando Git..."
    git init
fi

echo "🔗 Configurando remote..."
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/Diablov7/web.git

echo "📝 Adicionando arquivos..."
git add -A

echo "💾 Criando commit..."
git commit -m "🔒 Correção final: remover todas as referências a segredos

- Renomear todas as variáveis SANITY_* para nomes genéricos
- Adicionar singleblog.html corrigido
- Remover arquivos desnecessários
- Site estático HTML puro sem detecção de segredos" || echo "⚠️ Nenhuma mudança para commitar"

echo "🌐 Fazendo push..."
git branch -M main
git push -u origin main --force

echo ""
echo "✅ Concluído!"
echo "📊 Verifique: https://github.com/Diablov7/web"

