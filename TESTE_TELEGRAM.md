# 🧪 Como Testar a Integração com Telegram

## Opção 1: Testar Localmente (Recomendado)

### Passo 1: Iniciar o servidor local com Netlify Dev
```bash
cd /Users/romulololico/Desktop/web
netlify dev
```

Isso vai:
- Iniciar um servidor local (geralmente em `http://localhost:8888`)
- Carregar as Netlify Functions localmente
- Permitir testar o formulário sem fazer deploy

### Passo 2: Abrir o navegador
1. Acesse: `http://localhost:8888/contact.html`
2. Preencha o formulário:
   - Name: Seu nome
   - Last Name: Seu sobrenome
   - Email: seu@email.com
   - Phone Number: (opcional)
   - Telegram: @seuusuario (opcional)
   - Message: Mensagem de teste
3. Clique em "send"

### Passo 3: Verificar
- Você deve receber um alerta de sucesso
- A mensagem deve aparecer no Telegram (no chat configurado)
- O formulário deve ser resetado

---

## Opção 2: Testar em Produção (Após Deploy)

### Passo 1: Fazer commit e push
```bash
cd /Users/romulololico/Desktop/web
git add .
git commit -m "feat: Integração com Telegram bot para formulário de contato"
git push
```

### Passo 2: Aguardar deploy no Netlify
- O Netlify vai fazer deploy automaticamente
- Aguarde 1-2 minutos

### Passo 3: Testar no site
1. Acesse: `https://wevolv3.com/contact.html`
2. Preencha e envie o formulário
3. Verifique se a mensagem chegou no Telegram

---

## Opção 3: Testar a Function Diretamente (Avançado)

### Via cURL (Terminal)
```bash
curl -X POST http://localhost:8888/.netlify/functions/sendTelegram \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Teste",
    "email": "teste@example.com",
    "telegram": "@teste",
    "message": "Mensagem de teste"
  }'
```

### Via JavaScript no Console do Navegador
```javascript
fetch('/.netlify/functions/sendTelegram', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Teste',
    email: 'teste@example.com',
    telegram: '@teste',
    message: 'Mensagem de teste'
  })
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
```

---

## 🔍 Troubleshooting

### Erro: "Function not found"
- Certifique-se de que o `netlify dev` está rodando
- Verifique se o arquivo está em `netlify/functions/sendTelegram.js`

### Erro: "Missing Telegram credentials"
- A função usa fallback hardcoded, então deve funcionar mesmo sem variáveis de ambiente
- Se não funcionar, verifique se o token e chat ID estão corretos no código

### Mensagem não chega no Telegram
- Verifique se o bot está ativo
- Verifique se o chat ID está correto
- Veja os logs no terminal onde o `netlify dev` está rodando

### Ver logs da função
Quando rodar `netlify dev`, os logs aparecerão no terminal. Procure por:
- `[sendTelegram]` - logs da função
- Erros do Telegram API

---

## ✅ Checklist de Teste

- [ ] Formulário envia sem erros
- [ ] Mensagem aparece no Telegram
- [ ] Formato da mensagem está correto
- [ ] Campos opcionais funcionam (Telegram, Phone)
- [ ] Validação de campos obrigatórios funciona
- [ ] Mensagem de sucesso aparece
- [ ] Formulário é resetado após envio
- [ ] Mensagem de erro aparece se houver problema

