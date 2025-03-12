@echo off
echo Corrigindo o problema da logo...
echo.

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
pause 