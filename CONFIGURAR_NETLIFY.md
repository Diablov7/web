# 🔧 Como Configurar SANITY_PREVIEW_SECRET no Netlify

## 📝 Passo a Passo

### 1. **Key (Chave)**
✅ Já está preenchido: `SANITY_PREVIEW_SECRET`

### 2. **Secret (Valor Secreto)**
✅ Checkbox "Contains secret values" deve estar marcado (já está)

### 3. **Scopes (Escopos)**
Recomendação: **Selecione "All scopes"** (mais simples)

OU se preferir "Specific scopes":
- ✅ **Builds** - Necessário (o build precisa do secret)
- ✅ **Functions** - Necessário (se usar Netlify Functions)
- ⚠️ **Runtime** - Opcional (só se precisar em runtime)
- ❌ **Post processing** - Não necessário

### 4. **Values (Valores)**

**Opção Recomendada: "Same value for all deploy contexts"**

1. Selecione o radio button **"Same value for all deploy contexts"**
2. No campo que aparecer, digite um valor secreto seguro, por exemplo:
   ```
   wevolv3-preview-secret-2024
   ```
   Ou gere um valor mais seguro:
   ```
   wevolv3-preview-$(openssl rand -hex 16)
   ```

**OU se quiser valores diferentes:**

Selecione **"Different value for each deploy context"** e preencha:
- **Production**: `wevolv3-preview-secret-2024`
- **Deploy Previews**: `wevolv3-preview-secret-2024` (mesmo valor)
- **Branch deploys**: `wevolv3-preview-secret-2024` (mesmo valor)

### 5. **Importante!**

⚠️ **O valor que você colocar aqui DEVE ser o mesmo que está no código!**

No arquivo `sanity/actions/PreviewAction.js`, linha 6:
```javascript
const PREVIEW_SECRET = process.env.SANITY_PREVIEW_SECRET || 'wevolv3-preview-secret-2024'
```

Se você usar um valor diferente no Netlify, atualize também o fallback no código, ou remova o fallback para forçar o uso da variável de ambiente.

## ✅ Configuração Recomendada Final

- **Key**: `SANITY_PREVIEW_SECRET`
- **Secret**: ✅ Marcado
- **Scopes**: "All scopes" (ou "Specific scopes" com Builds + Functions)
- **Values**: "Same value for all deploy contexts"
- **Value**: `wevolv3-preview-secret-2024` (ou um valor mais seguro que você gerar)

## 🔒 Segurança

- Use um valor único e difícil de adivinhar
- Não compartilhe esse valor publicamente
- O mesmo valor deve ser usado em produção e previews para consistência

