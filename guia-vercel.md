# Guia de Publicação no Vercel

Este guia explica como publicar seu site no Vercel, uma plataforma de hospedagem otimizada para aplicações React.

## Método 1: Deploy via Interface Web

1. **Crie uma conta no Vercel**
   - Acesse [vercel.com](https://vercel.com/) e crie uma conta gratuita
   - Você pode se cadastrar com GitHub, GitLab, Bitbucket ou email

2. **Importe seu projeto**
   - Na página inicial do Vercel, clique em "Add New..." > "Project"
   - Conecte sua conta do GitHub, GitLab ou Bitbucket (se ainda não estiver conectada)
   - Selecione o repositório do seu projeto
   - Se não tiver um repositório, você precisará criar um e fazer upload do seu código

3. **Configure as opções de build**
   - Framework Preset: Selecione "Vite" ou "Other"
   - Root Directory: `project` (se seu código estiver na pasta "project")
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Clique em "Deploy"

4. **Configure seu domínio personalizado**
   - Após o deploy, vá para "Settings" > "Domains"
   - Clique em "Add" e digite seu domínio
   - Siga as instruções para configurar os registros DNS:
     - Adicione os registros A ou CNAME conforme indicado pelo Vercel
     - Aguarde a verificação do domínio (pode levar alguns minutos)

5. **Verifique o HTTPS**
   - O Vercel configura automaticamente certificados SSL para seu domínio
   - Não é necessária nenhuma ação adicional

## Método 2: Deploy via CLI (linha de comando)

1. **Instale a CLI do Vercel**
   ```
   npm install -g vercel
   ```

2. **Faça login na sua conta**
   ```
   vercel login
   ```

3. **Navegue até a pasta do projeto e execute o deploy**
   ```
   cd caminho/para/seu/projeto
   vercel
   ```

4. **Siga as instruções interativas**
   - Confirme o diretório do projeto
   - Configure as mesmas opções de build mencionadas no Método 1
   - O Vercel fará o upload e deploy do seu projeto

5. **Configure seu domínio personalizado**
   - Use o comando: `vercel domains add seu-dominio.com`
   - Ou configure pelo painel web conforme o Método 1, passo 4

## Configurações importantes

### Arquivo vercel.json
Certifique-se de que o arquivo `vercel.json` está na raiz do seu projeto com a seguinte configuração:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Este arquivo garante que todas as rotas do seu aplicativo React funcionem corretamente.

## Solução de problemas comuns

### Problema com rotas (páginas 404 ao navegar)
- Verifique se o arquivo `vercel.json` está configurado corretamente
- Certifique-se de que está usando o React Router corretamente

### Problema com variáveis de ambiente
- Configure as variáveis de ambiente no painel do Vercel: "Settings" > "Environment Variables"
- Ou adicione um arquivo `.env.production` ao seu projeto antes do deploy

### Problema com build
- Verifique os logs de build para identificar erros
- Certifique-se de que todas as dependências estão listadas no `package.json`
- Verifique se o diretório raiz está configurado corretamente 