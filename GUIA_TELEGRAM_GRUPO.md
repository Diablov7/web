# Guia: Adicionar Bot ao Grupo do Telegram

## Passo 1: Adicionar o Bot ao Grupo

1. Abra o grupo do Telegram onde você quer receber as mensagens
2. Vá em **Configurações do Grupo** (ícone de engrenagem)
3. Clique em **Administradores** ou **Membros**
4. Clique em **Adicionar Membros**
5. Procure pelo seu bot usando o **@username** dele (ex: `@seu_bot_name`)
6. Adicione o bot ao grupo
7. **Importante**: Dê permissões de administrador ao bot (opcional, mas recomendado para evitar problemas)

## Passo 2: Obter o Chat ID do Grupo

### Método 1: Usando o Bot @userinfobot

1. Adicione o bot `@userinfobot` ao seu grupo
2. O bot automaticamente enviará uma mensagem com informações do grupo
3. Procure por `Chat ID` ou `chat.id` na mensagem
4. O chat ID de grupos geralmente começa com `-100` (ex: `-1001234567890`)

### Método 2: Usando o Bot @RawDataBot

1. Adicione o bot `@RawDataBot` ao seu grupo
2. O bot enviará os dados brutos do grupo em JSON
3. Procure por `"id"` ou `"chat":{"id"` no JSON
4. Copie o número (pode ser negativo para grupos)

### Método 3: Usando a API do Telegram diretamente

1. Envie uma mensagem no grupo
2. Acesse: `https://api.telegram.org/bot<SEU_BOT_TOKEN>/getUpdates`
3. Procure por `"chat":{"id"` no JSON retornado
4. O chat ID do grupo será um número negativo (ex: `-1001234567890`)

## Passo 3: Configurar Variável de Ambiente no Netlify

1. Acesse o **Netlify Dashboard**
2. Vá em **Site settings** → **Environment variables**
3. Encontre a variável `TELEGRAM_CHAT_ID`
4. Edite o valor para incluir múltiplos chat_ids separados por vírgula:

   **Formato:**
   ```
   CHAT_ID_1,CHAT_ID_2
   ```

   **Exemplo:**
   ```
   426197451,-1001234567890
   ```

5. Clique em **Save**
6. **Redeploy** o site para aplicar as mudanças

## Passo 4: Testar

1. Preencha o formulário de contato em `wevolv3.com/contact.html`
2. Envie o formulário
3. Verifique se a mensagem chegou em **ambos** os destinos:
   - Chat privado original
   - Novo grupo

## Notas Importantes

- **Chat IDs de grupos** geralmente começam com `-100` e são números longos
- **Chat IDs de canais** também são negativos
- **Chat IDs de chats privados** são números positivos
- Separe múltiplos chat_ids por **vírgula** sem espaços (ou com espaços, o código remove automaticamente)
- O bot precisa estar **adicionado ao grupo** antes de receber mensagens
- Se o bot não tiver permissões adequadas, pode não conseguir enviar mensagens

## Exemplo de Configuração

```
TELEGRAM_CHAT_ID = 426197451,-1001234567890
```

Isso enviará as mensagens para:
1. Chat privado: `426197451`
2. Grupo: `-1001234567890`

## Troubleshooting

### Bot não recebe mensagens no grupo
- Verifique se o bot está realmente adicionado ao grupo
- Verifique se o bot tem permissões para enviar mensagens
- Confirme que o chat_id está correto (pode ser negativo para grupos)

### Erro 403 (Forbidden)
- O bot pode não ter permissões no grupo
- Tente dar permissões de administrador ao bot

### Erro 400 (Bad Request)
- Verifique se o chat_id está correto
- Certifique-se de que o bot está no grupo

