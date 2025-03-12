@echo off
echo Construindo o website W3 para producao...
echo.
echo Este script vai:
echo 1. Navegar para a pasta do projeto
echo 2. Construir uma versao otimizada para producao
echo 3. Gerar os arquivos na pasta 'dist'
echo.
echo Aguarde...
echo.

cd project
npm run build

echo.
echo Construcao concluida! Os arquivos estao na pasta 'project/dist'
echo.
echo Voce pode agora fazer upload desses arquivos para seu servico de hospedagem.
echo.
pause 