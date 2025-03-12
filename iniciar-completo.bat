@echo off
echo Iniciando o website W3 (modo completo)...
echo.
echo Este script vai:
echo 1. Corrigir o problema da logo (se existir)
echo 2. Encerrar qualquer instancia anterior do servidor
echo 3. Iniciar o servidor na porta 5174
echo.
echo Aguarde...
echo.

echo Verificando a logo...
cd project\public

if exist logo.png.png (
  echo Renomeando logo.png.png para logo.png...
  if exist logo.png (
    del logo.png
  )
  rename logo.png.png logo.png
  echo Logo corrigida com sucesso!
) else (
  echo Arquivo logo.png.png nao encontrado.
  if exist logo.png (
    echo Arquivo logo.png ja existe. Nenhuma acao necessaria.
  ) else (
    echo ATENCAO: Nenhum arquivo de logo encontrado!
  )
)

echo.
echo Encerrando processos anteriores...
taskkill /f /im node.exe >nul 2>&1

echo.
echo Iniciando o servidor...
cd ..
npm run dev -- --port 5174

pause 