# 🔍 Análise: O que é necessário para o Sanity Studio

**Data:** 2025-01-20  
**Projeto:** Wevolv3  
**Project ID:** `sszuldy6`  
**Dataset:** `production`

---

## 📊 Situação Atual

### ✅ O que está funcionando:
1. **API do Sanity** - Funcionando corretamente
   - Project ID: `sszuldy6`
   - Dataset: `production`
   - Integração via API nos arquivos `blog.html` e `singleblog.html`
   - Queries GROQ funcionando

2. **URL Antiga do Studio**
   - URL: `https://sanity.io/@omH6dEUOk/studio/oz6fuqwi7pfb9q46syts438l/default`
   - Status: **301 (Redirect)** - A URL existe e redireciona
   - **Esta URL ainda funciona!**

3. **URL Nova do Studio**
   - URL: `https://sszuldy6.sanity.studio`
   - Status: **404 (Not Found)** - Studio não está deployado nesta URL

### ❌ O que está faltando:
1. **Sanity Studio não está deployado** na URL padrão (`sszuldy6.sanity.studio`)
2. **Não há arquivos de configuração do Studio** no projeto atual
3. **Não há `package.json`** com dependências do Sanity
4. **Não há estrutura de schemas** do Sanity Studio

---

## 🎯 Opções para Resolver

### Opção 1: Usar a URL Antiga (Mais Rápido) ✅ RECOMENDADO

**Vantagens:**
- ✅ Funciona imediatamente (já está deployada)
- ✅ Não requer configuração adicional
- ✅ Zero trabalho de migração

**Ação:**
- Reverter os redirects para usar a URL antiga:
  - `https://sanity.io/@omH6dEUOk/studio/oz6fuqwi7pfb9q46syts438l/default`

**Arquivos a modificar:**
- `studio.html`
- `_redirects`
- `netlify.toml`

---

### Opção 2: Deployar Studio no Projeto Atual (Mais Trabalho)

**O que é necessário:**

1. **Estrutura de Arquivos:**
   ```
   /studio/
     ├── sanity.config.js (ou .ts)
     ├── schemas/
     │   ├── index.js
     │   ├── post.js (schema do blog)
     │   └── ... (outros schemas)
     └── package.json
   ```

2. **package.json** com dependências:
   ```json
   {
     "name": "wevolv3-studio",
     "version": "1.0.0",
     "dependencies": {
       "sanity": "^3.x.x",
       "@sanity/vision": "^3.x.x"
     }
   }
   ```

3. **sanity.config.js:**
   ```javascript
   import {defineConfig} from 'sanity'
   import {deskTool} from 'sanity/desk'
   import schemas from './schemas'

   export default defineConfig({
     name: 'wevolv3',
     title: 'Wevolv3 Studio',
     projectId: 'sszuldy6',
     dataset: 'production',
     plugins: [deskTool()],
     schema: {
       types: schemas,
     },
   })
   ```

4. **Schemas** - Definir estrutura dos documentos (post, author, etc.)

5. **Deploy:**
   - Instalar dependências: `npm install`
   - Deploy no Sanity: `sanity deploy`
   - Configurar domínio customizado (opcional)

**Tempo estimado:** 1-2 horas

---

## 🔧 Recomendação

### **Usar a Opção 1 (URL Antiga)**

**Motivos:**
1. ✅ Funciona imediatamente
2. ✅ Não requer configuração adicional
3. ✅ O Studio já está configurado e funcionando na URL antiga
4. ✅ Zero risco de quebrar algo que já funciona

**Próximos passos:**
1. Reverter redirects para URL antiga
2. Testar acesso ao Studio
3. Se necessário, migrar o Studio depois (quando houver tempo)

---

## 📝 Checklist do que fazer AGORA

- [ ] Reverter `studio.html` para URL antiga
- [ ] Reverter `_redirects` para URL antiga  
- [ ] Reverter `netlify.toml` para URL antiga
- [ ] Testar acesso a `/studio`
- [ ] Verificar se o Studio abre corretamente

---

## 🔮 Para o Futuro (Opcional)

Se quiser migrar o Studio para o projeto atual:

1. **Trazer projeto antigo como referência**
   - Ver estrutura de schemas
   - Ver configurações customizadas
   - Ver plugins utilizados

2. **Criar estrutura do Studio no projeto atual**
   - Criar pasta `/studio`
   - Configurar `sanity.config.js`
   - Migrar schemas

3. **Deploy do Studio**
   - `sanity deploy`
   - Configurar URL customizada (opcional)

---

## ❓ Perguntas para Decidir

1. **A URL antiga ainda funciona para você?**
   - Se sim → Usar Opção 1
   - Se não → Precisamos investigar mais

2. **Você tem acesso ao projeto antigo?**
   - Se sim → Podemos migrar (Opção 2)
   - Se não → Usar Opção 1

3. **Você quer ter o Studio no mesmo repositório?**
   - Se sim → Opção 2 (mais trabalho)
   - Se não → Opção 1 (mais simples)

---

**Conclusão:** A solução mais rápida e segura é usar a URL antiga que já está funcionando. Podemos migrar o Studio depois se necessário.

