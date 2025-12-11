# 🐛 Debug do Preview - Possíveis Causas

## ❌ Erro: "Invalid preview secret"

### Possíveis Causas:

#### 1. **Variável de Ambiente no Netlify não configurada ou valor diferente**
- **Sintoma**: O secret enviado não corresponde ao esperado
- **Solução**: 
  - Verifique no Netlify: Site settings → Environment variables
  - Confirme que `SANITY_PREVIEW_SECRET` existe
  - Confirme que o valor é exatamente `M4r4cuj4-` (sem espaços, case-sensitive)

#### 2. **Sanity Studio não foi rebuildado**
- **Sintoma**: O código antigo ainda está sendo usado
- **Solução**: 
  - O Sanity Studio precisa ser rebuildado no Netlify
  - Aguarde o deploy completar
  - Ou faça um hard refresh no browser (Ctrl+Shift+R ou Cmd+Shift+R)

#### 3. **Encoding na URL**
- **Sintoma**: Caracteres especiais podem estar sendo codificados incorretamente
- **Solução**: 
  - O `encodeURIComponent` já está sendo usado
  - Verifique se há caracteres especiais no secret que precisam de tratamento especial

#### 4. **Cache do Browser**
- **Sintoma**: O browser está usando código antigo em cache
- **Solução**: 
  - Limpe o cache do browser
  - Ou faça hard refresh (Ctrl+Shift+R)

#### 5. **Deploy não completou**
- **Sintoma**: As mudanças ainda não estão no servidor
- **Solução**: 
  - Verifique se o deploy no Netlify completou
  - Aguarde alguns minutos após o push

## 🔍 Como Debugar

### Passo 1: Verificar o Console do Browser
1. Abra o Sanity Studio
2. Abra o DevTools (F12)
3. Vá na aba Console
4. Clique no botão "👁 Preview"
5. Veja os logs que aparecem:
   - Deve mostrar o secret usado
   - Deve mostrar a URL completa

### Passo 2: Testar a Netlify Function Diretamente
Acesse no browser:
```
https://wevolv3.com/.netlify/functions/preview?secret=M4r4cuj4-&slug=test&id=test
```

**Resultados esperados:**
- ✅ Se redirecionar para `/blog/test?preview=true&id=test`: Secret está correto
- ❌ Se retornar `{"error":"Invalid preview secret"}`: Secret está errado ou não configurado

### Passo 3: Verificar Logs do Netlify
1. No Netlify, vá em Functions → preview
2. Veja os logs de execução
3. Os logs de debug devem mostrar:
   - Secret recebido
   - Secret esperado
   - Se são iguais

### Passo 4: Verificar Variável de Ambiente
1. No Netlify: Site settings → Environment variables
2. Procure `SANITY_PREVIEW_SECRET`
3. Verifique:
   - ✅ Existe?
   - ✅ Valor é `M4r4cuj4-`?
   - ✅ Está marcado como "Secret"?
   - ✅ Scopes incluem "Functions"?

## ✅ Checklist de Verificação

- [ ] Variável `SANITY_PREVIEW_SECRET` existe no Netlify
- [ ] Valor da variável é exatamente `M4r4cuj4-`
- [ ] Deploy no Netlify completou
- [ ] Sanity Studio foi rebuildado
- [ ] Cache do browser foi limpo
- [ ] Teste direto da função retorna sucesso

## 🔧 Solução Rápida

Se nada funcionar, tente:

1. **Remover a variável de ambiente e usar apenas o fallback:**
   - Remova `SANITY_PREVIEW_SECRET` do Netlify
   - O código usará o fallback `'M4r4cuj4-'`
   - Faça novo deploy

2. **Ou configurar a variável corretamente:**
   - No Netlify, configure `SANITY_PREVIEW_SECRET` = `M4r4cuj4-`
   - Certifique-se que está em "Functions" scope
   - Faça novo deploy

