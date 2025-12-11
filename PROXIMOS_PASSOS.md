# 🚀 Próximos Passos - Deploy das Melhorias

## ✅ 1. Commit e Push das Mudanças

Execute no terminal:

```bash
git add -A
git commit -m "feat: Migrar blog para Next.js SSG e implementar Sanity Presentation preview"
git push origin main
```

## ⏳ 2. Aguardar Deploy no Netlify

- O Netlify detectará automaticamente o push
- O build será executado usando `build-hybrid.cjs`
- Aguarde o deploy completar (geralmente 2-5 minutos)

## 🧪 3. Testar o Preview

Após o deploy:

1. Acesse o Sanity Studio: `https://wevolv3.com/studio`
2. Abra um post (ou crie um novo)
3. Clique no botão **"👁 Preview"** na barra de ações
4. Uma nova aba deve abrir com o preview do post

## ✅ 4. Verificar se Funcionou

### Checklist:
- [ ] Deploy completou sem erros no Netlify
- [ ] Blog está acessível em `https://wevolv3.com/blog`
- [ ] Posts individuais estão acessíveis em `https://wevolv3.com/blog/[slug]`
- [ ] Preview funciona no Sanity Studio
- [ ] Preview mostra drafts não publicados

## 🐛 Se Algo Der Errado

### Build falha no Netlify:
- Verifique os logs do build no Netlify
- Confirme que `SANITY_PREVIEW_SECRET` está configurado
- Verifique se todas as dependências estão no `package.json`

### Preview não funciona:
- Confirme que `SANITY_PREVIEW_SECRET` tem o valor correto
- Verifique se o valor é o mesmo no código (fallback)
- Tente fazer um novo deploy

### Blog não aparece:
- Verifique se o build do Next.js gerou arquivos em `out/blog/`
- Confirme os redirects no `netlify.toml`
- Verifique se há erros nos logs do build

## 📝 Notas

- O primeiro deploy pode demorar mais (instalação de dependências)
- Os arquivos antigos (`blog.html`, `blog-post.html`) ainda existem mas não são mais usados
- Redirects automáticos de `/blog.html` para `/blog` estão configurados

