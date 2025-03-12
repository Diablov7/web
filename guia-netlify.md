# Guia de Publicação no Netlify

Este guia explica como publicar seu site no Netlify, um serviço de hospedagem gratuito e fácil de usar.

## Método 1: Deploy manual (mais simples)

1. **Construa o projeto para produção**
   - Execute o script `build-producao.bat` na pasta raiz do projeto
   - Isso criará uma pasta `project/dist` com os arquivos otimizados

2. **Crie uma conta no Netlify**
   - Acesse [netlify.com](https://www.netlify.com/) e crie uma conta gratuita
   - Você pode se cadastrar com GitHub, GitLab, Bitbucket ou email

3. **Faça o upload do site**
   - Na página inicial do Netlify, clique em "Add new site" > "Deploy manually"
   - Arraste e solte a pasta `project/dist` na área indicada
   - Aguarde o upload e processamento

4. **Configure seu domínio personalizado**
   - Vá para "Site settings" > "Domain management" > "Add custom domain"
   - Digite seu domínio (exemplo: seudominio.com) e clique em "Verify"
   - Siga as instruções para configurar os registros DNS:
     - Opção 1: Transfira a gestão de DNS para o Netlify (mais fácil)
     - Opção 2: Configure os registros CNAME no seu provedor de DNS atual

5. **Ative o HTTPS**
   - Vá para "Site settings" > "Domain management" > "HTTPS"
   - Clique em "Provision certificate" para ativar o SSL gratuito

## Método 2: Deploy contínuo via GitHub (mais avançado)

1. **Crie um repositório no GitHub**
   - Crie um novo repositório no GitHub
   - Faça upload do seu projeto para o repositório

2. **Conecte o Netlify ao GitHub**
   - Na página inicial do Netlify, clique em "Add new site" > "Import an existing project"
   - Escolha GitHub como provedor e autorize o Netlify
   - Selecione o repositório do seu projeto

3. **Configure as opções de build**
   - Build command: `cd project && npm run build`
   - Publish directory: `project/dist`
   - Clique em "Deploy site"

4. **Configure seu domínio personalizado**
   - Siga os mesmos passos do Método 1, itens 4 e 5

## Solução de problemas comuns

### Problema com rotas (páginas 404 ao navegar)
- Verifique se o arquivo `_redirects` está na pasta `public` antes de fazer o build
- O conteúdo deve ser: `/* /index.html 200`

### Problema com imagens ou recursos
- Certifique-se de que todas as imagens estão na pasta `public` ou são importadas no código
- Use caminhos relativos para recursos estáticos

### Problema com variáveis de ambiente
- Configure as variáveis de ambiente no painel do Netlify: "Site settings" > "Environment variables" 