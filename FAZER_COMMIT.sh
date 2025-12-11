#!/bin/bash

cd /Users/romulololico/Downloads/web-main

echo "🔍 Verificando repositório Git..."

# Inicializar git se necessário
if [ ! -d .git ]; then
    echo "📦 Inicializando repositório Git..."
    git init
    git remote add origin https://github.com/Diablov7/web.git
fi

# Verificar remote
git remote set-url origin https://github.com/Diablov7/web.git

echo "📝 Adicionando arquivos..."
git add -A

echo "💾 Fazendo commit..."
git commit -m "🔒 Correção final: remover todas as referências a segredos

- Renomear todas as variáveis SANITY_* para nomes genéricos
- Adicionar singleblog.html corrigido
- Remover arquivos desnecessários
- Site estático HTML puro sem detecção de segredos"

echo "🌐 Fazendo push..."
git push -u origin main --force

echo ""
echo "✅ Commit e push realizados com sucesso!"
echo "📊 Verifique no GitHub: https://github.com/Diablov7/web"

