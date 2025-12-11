# 📊 Guia Completo: Configurar Google Analytics no Wevolv3

## 🎯 Passo 1: Criar Conta no Google Analytics

1. Acesse: https://analytics.google.com/
2. Clique em **"Começar a medir"** ou **"Start measuring"**
3. Faça login com sua conta Google

## 🏢 Passo 2: Criar Conta (Account)

1. **Nome da Conta**: "Wevolv3" (ou o nome que preferir)
2. Configure as opções de compartilhamento de dados (recomendo aceitar todas)
3. Clique em **"Próximo"**

## 📈 Passo 3: Criar Propriedade (Property)

1. **Nome da Propriedade**: "Wevolv3 Website"
2. **Fuso Horário**: Selecione o seu (ex: "America/Sao_Paulo")
3. **Moeda**: Selecione a sua (ex: "BRL" ou "USD")
4. Clique em **"Próximo"**

## 🏭 Passo 4: Configurar Informações do Negócio

1. **Setor**: Selecione "Tecnologia" ou "Marketing"
2. **Tamanho do Negócio**: Selecione o que se aplica
3. **Como pretende usar o Google Analytics**: 
   - ✅ Medir o desempenho do site
   - ✅ Entender os usuários
   - ✅ Otimizar o marketing
4. Clique em **"Criar"**

## ✅ Passo 5: Aceitar os Termos

1. Leia os Termos de Serviço
2. Aceite os termos
3. Configure as opções de dados (recomendo aceitar)

## 🔗 Passo 6: Criar Fluxo de Dados (Data Stream)

1. Você verá uma tela pedindo para **"Adicionar um fluxo"**
2. Selecione **"Web"** (ícone do globo)
3. Configure:
   - **URL do site**: `https://wevolv3.com`
   - **Nome do fluxo**: "Wevolv3 Website"
4. Clique em **"Criar fluxo"**

## 🔑 Passo 7: Obter o Measurement ID

Após criar o fluxo, você verá:

1. **Measurement ID**: Formato `G-XXXXXXXXXX` (ex: `G-ABC123XYZ`)
2. **Copie este ID** - você vai precisar dele!

## ⚙️ Passo 8: Adicionar ao Netlify

1. Acesse o painel do Netlify: https://app.netlify.com
2. Vá em **Site settings** → **Environment variables**
3. Clique em **"Add a variable"**
4. Adicione:
   - **Key**: `VITE_GA_MEASUREMENT_ID`
   - **Value**: `G-XXXXXXXXXX` (o ID que você copiou)
5. Clique em **"Save"**

## 🔧 Passo 9: Adicionar Código nas Páginas HTML

O código React já está preparado, mas precisamos adicionar nas páginas HTML estáticas também.

### Arquivos que precisam do código:
- `index.html`
- `blog.html`
- `blog-post.html`

## 📝 Passo 10: Verificar se Está Funcionando

1. Aguarde alguns minutos após adicionar o código
2. Acesse o Google Analytics
3. Vá em **Relatórios** → **Tempo real**
4. Acesse seu site (`https://wevolv3.com`)
5. Você deve ver sua visita aparecer em tempo real!

## 🎯 Próximos Passos

Após configurar:

1. **Aguarde 24-48 horas** para dados completos aparecerem
2. Configure **Eventos personalizados** (opcional)
3. Configure **Conversões** (se tiver objetivos específicos)
4. Explore os **Relatórios** disponíveis

## ❓ Problemas Comuns

### O Analytics não está rastreando?
- Verifique se o Measurement ID está correto no Netlify
- Verifique se o código foi adicionado nas páginas
- Use a extensão "Google Analytics Debugger" no Chrome

### Não vejo dados em tempo real?
- Aguarde alguns minutos
- Verifique se está acessando o site (não apenas o Analytics)
- Limpe o cache do navegador

### O código não está carregando?
- Verifique o console do navegador (F12)
- Verifique se há erros de JavaScript
- Verifique se a variável de ambiente está configurada

---

**Pronto!** Agora você tem o Google Analytics configurado. 🎉

