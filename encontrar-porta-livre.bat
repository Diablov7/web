@echo off
echo Iniciando o website W3 com deteccao automatica de porta livre...
echo.
echo Este script vai:
echo 1. Corrigir o problema da logo (se existir)
echo 2. Encerrar qualquer instancia anterior do servidor
echo 3. Encontrar uma porta livre e iniciar o servidor nela
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
cd ..

echo Procurando uma porta livre...
set PORT=5174

:CHECKPORT
netstat -an | find ":%PORT% " > nul
if %ERRORLEVEL% == 0 (
  echo Porta %PORT% ja esta em uso.
  set /a PORT+=1
  goto CHECKPORT
) else (
  echo Porta %PORT% esta livre!
)

echo.
echo Iniciando o servidor na porta %PORT%...
echo.
echo IMPORTANTE: Acesse o site em http://localhost:%PORT%
echo.
npm run dev -- --port %PORT%

pause 