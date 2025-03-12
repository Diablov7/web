@echo off
echo Iniciando o website W3 com porta alternativa...
echo.
echo Este script vai:
echo 1. Corrigir o problema da logo (se existir)
echo 2. Encerrar qualquer instancia anterior do servidor
echo 3. Tentar iniciar o servidor em portas alternativas (5175, 5176, 5177, 5178, 5179)
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

echo Tentando iniciar o servidor na porta 5175...
start cmd /c "npm run dev -- --port 5175 || echo Porta 5175 em uso, tentando proxima... && npm run dev -- --port 5176 || echo Porta 5176 em uso, tentando proxima... && npm run dev -- --port 5177 || echo Porta 5177 em uso, tentando proxima... && npm run dev -- --port 5178 || echo Porta 5178 em uso, tentando proxima... && npm run dev -- --port 5179 || echo Todas as portas estao em uso! && pause"

echo.
echo IMPORTANTE: Verifique a janela do terminal que foi aberta para ver qual porta esta sendo usada.
echo Acesse o site usando a URL mostrada no terminal (provavelmente http://localhost:5175 ou similar).
echo.
pause 