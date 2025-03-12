@echo off
echo Iniciando o website W3...
echo.
echo Este script vai:
echo 1. Encerrar qualquer instância anterior do servidor
echo 2. Iniciar o servidor na porta 5174
echo.
echo Aguarde...
echo.

taskkill /f /im node.exe >nul 2>&1

cd /d "%~dp0"
npm run dev

pause 