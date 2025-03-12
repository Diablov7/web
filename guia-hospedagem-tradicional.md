# Guia de Publicação em Hospedagem Tradicional (cPanel)

Este guia explica como publicar seu site em serviços de hospedagem tradicionais que utilizam cPanel, Plesk ou interfaces similares.

## Preparação do projeto

1. **Construa o projeto para produção**
   - Execute o script `build-producao.bat` na pasta raiz do projeto
   - Isso criará uma pasta `project/dist` com os arquivos otimizados para produção

2. **Verifique os arquivos de configuração**
   - Certifique-se de que o arquivo `_redirects` está na pasta `public` antes de fazer o build
   - Se estiver usando hospedagem Apache, crie um arquivo `.htaccess` na pasta `public` com o seguinte conteúdo:
   ```
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

## Upload dos arquivos via cPanel

1. **Acesse o cPanel**
   - Entre no painel de controle da sua hospedagem (geralmente em `seudominio.com/cpanel`)
   - Faça login com suas credenciais fornecidas pelo provedor de hospedagem

2. **Acesse o Gerenciador de Arquivos**
   - No cPanel, procure e clique no ícone "Gerenciador de Arquivos"
   - Selecione o diretório raiz do seu site (geralmente `public_html` ou `www`)
   - Clique em "Go" ou "Ir"

3. **Faça o upload dos arquivos**
   - No Gerenciador de Arquivos, clique no botão "Upload"
   - Selecione todos os arquivos da pasta `project/dist` do seu computador
   - Aguarde o upload ser concluído
   - Alternativamente, você pode compactar os arquivos em um arquivo ZIP, fazer o upload do ZIP e depois extraí-lo diretamente no servidor

4. **Verifique as permissões dos arquivos**
   - Selecione todos os arquivos e pastas
   - Clique com o botão direito e selecione "Permissões" ou "Change Permissions"
   - Configure as permissões:
     - Arquivos: 644
     - Pastas: 755
   - Clique em "Change Permissions" para aplicar

## Upload dos arquivos via FTP

1. **Instale um cliente FTP**
   - Baixe e instale um cliente FTP como FileZilla, WinSCP ou Cyberduck
   - Esses programas permitem transferir arquivos entre seu computador e o servidor

2. **Configure a conexão FTP**
   - Abra o cliente FTP
   - Insira as informações de conexão fornecidas pelo seu provedor de hospedagem:
     - Servidor/Host: geralmente `ftp.seudominio.com`
     - Nome de usuário: seu nome de usuário FTP
     - Senha: sua senha FTP
     - Porta: geralmente 21 (padrão para FTP) ou 22 (para SFTP)
   - Clique em "Conectar" ou "Rápido Conectar"

3. **Navegue até o diretório raiz do site**
   - No painel remoto (servidor), navegue até a pasta raiz do seu site
   - Geralmente é `public_html`, `www`, `htdocs` ou `web`

4. **Faça o upload dos arquivos**
   - No painel local (seu computador), navegue até a pasta `project/dist`
   - Selecione todos os arquivos e arraste-os para o painel remoto
   - Aguarde a conclusão do upload

## Configuração de domínio e DNS

1. **Configure o domínio no painel da hospedagem**
   - No cPanel, procure por "Domínios" ou "Adicionar Domínio"
   - Adicione seu domínio se ainda não estiver configurado

2. **Configure os registros DNS**
   - Acesse o painel de controle do seu registrador de domínio (onde você comprou o domínio)
   - Configure os registros DNS para apontar para os servidores de nomes da sua hospedagem:
     - Opção 1: Use os nameservers da hospedagem (NS records)
     - Opção 2: Configure registros A apontando para o IP do servidor de hospedagem

3. **Aguarde a propagação do DNS**
   - As alterações de DNS podem levar até 48 horas para se propagar globalmente
   - Geralmente, a propagação ocorre em poucas horas

## Solução de problemas comuns

### Problema com rotas (páginas 404 ao navegar)
- Verifique se o arquivo `.htaccess` está configurado corretamente
- Certifique-se de que o mod_rewrite está habilitado no servidor Apache
- Para servidores Nginx, solicite ao suporte da hospedagem a configuração adequada

### Problema com permissões de arquivos
- Se o site exibir erros 403 (Forbidden), verifique as permissões dos arquivos
- Arquivos devem ter permissão 644 e pastas 755
- Nunca use 777 (permissão total) por razões de segurança

### Problema com HTTPS
- No cPanel, procure por "SSL/TLS" ou "Let's Encrypt"
- Instale um certificado SSL gratuito para seu domínio
- Configure o redirecionamento de HTTP para HTTPS

### Problema com cache do navegador
- Se você fez alterações que não aparecem, tente limpar o cache do navegador
- Ou adicione um parâmetro de versão aos seus recursos estáticos 