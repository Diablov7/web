# Script PowerShell para iniciar o projeto
Write-Host "Iniciando o website W3..." -ForegroundColor Cyan
Write-Host ""
Write-Host "Este script vai:" -ForegroundColor White
Write-Host "1. Encerrar qualquer instância anterior do servidor" -ForegroundColor White
Write-Host "2. Iniciar o servidor na porta 5174" -ForegroundColor White
Write-Host ""
Write-Host "Aguarde..." -ForegroundColor Yellow
Write-Host ""

# Tenta encerrar processos node.exe existentes
try {
    taskkill /f /im node.exe 2>$null
    Write-Host "Processos node.exe anteriores encerrados." -ForegroundColor Green
} catch {
    Write-Host "Nenhum processo node.exe encontrado para encerrar." -ForegroundColor Yellow
}

# Navega para a pasta do projeto
Set-Location -Path "$PSScriptRoot\project"

# Inicia o servidor na porta 5174
Write-Host "Iniciando o servidor na porta 5174..." -ForegroundColor Cyan
npm run dev -- --port 5174

# Pausa para manter a janela aberta em caso de erro
if ($LASTEXITCODE -ne 0) {
    Write-Host "Ocorreu um erro ao iniciar o servidor." -ForegroundColor Red
    Read-Host -Prompt "Pressione Enter para sair"
} 