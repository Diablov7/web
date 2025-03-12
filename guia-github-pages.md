# Guia de Publicação no GitHub Pages

Este guia explica como publicar seu site no GitHub Pages, uma opção gratuita para hospedar sites estáticos diretamente do seu repositório GitHub.

## Método 1: Deploy manual

1. **Crie um repositório no GitHub**
   - Acesse [github.com](https://github.com/) e crie uma conta (se ainda não tiver)
   - Crie um novo repositório público com o nome: `seu-nome-de-usuario.github.io`
   - Ou crie um repositório com qualquer nome se preferir usar um subdiretório

2. **Prepare seu projeto para o GitHub Pages**
   - Execute o script `build-producao.bat` para gerar os arquivos otimizados
   - Certifique-se de que o arquivo `404.html` está na pasta `public` antes de fazer o build

3. **Configure o arquivo vite.config.js**
   - Se não estiver usando o repositório com formato `seu-nome-de-usuario.github.io`, você precisará configurar o caminho base
   - Abra o arquivo `project/vite.config.js` e adicione a propriedade `base`:
   ```js
   export default defineConfig({
     plugins: [react()],
     base: '/nome-do-repositorio/', // Adicione esta linha
     // ... outras configurações
   })
   ```

4. **Faça o upload dos arquivos**
   - Clone o repositório para sua máquina local
   - Copie todo o conteúdo da pasta `project/dist` para a pasta do repositório
   - Adicione, faça commit e push dos arquivos:
   ```
   git add .
   git commit -m "Deploy inicial"
   git push origin main
   ```

5. **Configure o GitHub Pages**
   - Vá para as configurações do repositório no GitHub
   - Navegue até "Pages" no menu lateral
   - Em "Source", selecione "Deploy from a branch"
   - Selecione a branch "main" e a pasta "/ (root)"
   - Clique em "Save"
   - Aguarde alguns minutos para o site ser publicado

## Método 2: Deploy automatizado com GitHub Actions

1. **Crie um repositório no GitHub**
   - Siga o passo 1 do Método 1

2. **Configure o arquivo vite.config.js**
   - Siga o passo 3 do Método 1, se necessário

3. **Crie o arquivo de workflow do GitHub Actions**
   - Crie uma pasta `.github/workflows` na raiz do seu projeto
   - Crie um arquivo chamado `deploy-github.yml` com o seguinte conteúdo:
   ```yml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [ main ]
     workflow_dispatch:

   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout
           uses: actions/checkout@v3

         - name: Set up Node.js
           uses: actions/setup-node@v3
           with:
             node-version: 18
             cache: 'npm'
             cache-dependency-path: './project/package-lock.json'

         - name: Install dependencies
           run: cd project && npm ci

         - name: Build
           run: cd project && npm run build

         - name: Deploy to GitHub Pages
           uses: JamesIves/github-pages-deploy-action@v4
           with:
             folder: project/dist
             branch: gh-pages
   ```

4. **Faça o upload do código fonte**
   - Faça upload de todo o código fonte do projeto (não apenas os arquivos de build)
   - Adicione, faça commit e push dos arquivos:
   ```
   git add .
   git commit -m "Configuração inicial"
   git push origin main
   ```

5. **Configure o GitHub Pages**
   - Vá para as configurações do repositório no GitHub
   - Navegue até "Pages" no menu lateral
   - Em "Source", selecione "Deploy from a branch"
   - Selecione a branch "gh-pages" e a pasta "/ (root)"
   - Clique em "Save"

## Configuração de domínio personalizado

1. **Adicione um arquivo CNAME**
   - Crie um arquivo chamado `CNAME` na pasta `project/public` antes de fazer o build
   - Adicione seu domínio no arquivo (exemplo: `seudominio.com`)

2. **Configure os registros DNS**
   - Acesse o painel de controle do seu registrador de domínio
   - Configure os seguintes registros DNS:
     - Registro A: `185.199.108.153`
     - Registro A: `185.199.109.153`
     - Registro A: `185.199.110.153`
     - Registro A: `185.199.111.153`
     - Registro CNAME: `www` apontando para `seu-nome-de-usuario.github.io`

3. **Ative o HTTPS**
   - No GitHub, vá para as configurações do repositório > Pages
   - Marque a opção "Enforce HTTPS"
   - Aguarde a emissão do certificado (pode levar até 24 horas)

## Solução de problemas comuns

### Problema com rotas (páginas 404 ao navegar)
- Verifique se o arquivo `404.html` está na pasta `public` antes de fazer o build
- Certifique-se de que está usando o React Router corretamente

### Problema com caminho base
- Se as imagens ou recursos não estão carregando, verifique se o `base` no `vite.config.js` está configurado corretamente
- Use caminhos relativos para recursos estáticos

### Problema com domínio personalizado
- Verifique se o arquivo CNAME está presente no build final
- Aguarde a propagação do DNS (pode levar até 48 horas)
- Verifique se os registros DNS estão configurados corretamente 