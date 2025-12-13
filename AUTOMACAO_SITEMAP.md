# 🤖 Automação do Sitemap

Este documento explica como o sitemap é gerado automaticamente.

## 📋 Formas de Geração

### 1. Netlify Build (Automático) ⭐
**Quando**: A cada deploy no Netlify

O `netlify.toml` está configurado para executar o script durante o build:
```toml
command = "node generate-sitemap.js || echo 'Sitemap generation skipped'"
```

**Vantagens**:
- ✅ Automático a cada deploy
- ✅ Sempre atualizado quando você faz push
- ✅ Não requer configuração adicional

### 2. GitHub Actions (Automático)
**Quando**: 
- Diariamente às 2h UTC
- Quando há push na branch `main`
- Manualmente via GitHub Actions

**Localização**: `.github/workflows/update-sitemap.yml`

**Como executar manualmente**:
1. Vá para: https://github.com/Diablov7/web/actions
2. Clique em "Update Sitemap"
3. Clique em "Run workflow"
4. Selecione a branch `main`
5. Clique em "Run workflow"

**Vantagens**:
- ✅ Executa mesmo sem deploy
- ✅ Atualiza o sitemap mesmo se você não fizer deploy
- ✅ Commit automático se houver mudanças

### 3. Manual (Opcional)
**Quando**: Quando você quiser testar ou forçar atualização

```bash
cd /Users/romulololico/Desktop/web
node generate-sitemap.js
```

## 🔄 Fluxo Automático Recomendado

1. **Você publica um artigo no Sanity Studio**
2. **GitHub Actions executa diariamente** → Atualiza sitemap
3. **Você faz push de mudanças** → Netlify build → Atualiza sitemap
4. **Sitemap sempre atualizado!** ✅

## 📊 Verificar se está funcionando

1. **GitHub Actions**:
   - Vá para: https://github.com/Diablov7/web/actions
   - Veja se "Update Sitemap" está executando

2. **Netlify**:
   - Vá para o dashboard do Netlify
   - Veja os logs de build
   - Procure por "Sitemap gerado com sucesso"

3. **Sitemap**:
   - Acesse: https://wevolv3.com/sitemap.xml
   - Verifique se seus posts estão listados

## 🛠️ Troubleshooting

### GitHub Actions não executa
- Verifique se o arquivo `.github/workflows/update-sitemap.yml` existe
- Verifique se está na branch `main`
- Veja os logs em: Actions > Update Sitemap

### Netlify não gera sitemap
- Verifique se Node.js está disponível no Netlify
- Veja os logs de build no Netlify
- O script continuará mesmo se falhar (não quebra o build)

### Sitemap não atualiza
- Execute manualmente: `node generate-sitemap.js`
- Verifique se os posts estão publicados no Sanity
- Verifique se os posts têm `slug.current` definido

## 📝 Notas

- O sitemap é gerado a partir dos posts **publicados** no Sanity
- Posts em rascunho não aparecem no sitemap
- O sitemap inclui todas as páginas estáticas + posts do blog
- URLs dos posts: `https://wevolv3.com/singleblog?slug=...`


