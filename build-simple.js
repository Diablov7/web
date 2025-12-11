#!/usr/bin/env node
/**
 * Build script simplificado para o blog Wevolv3
 * Consolida todos os passos de build em um único script
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Iniciando build simplificado do Wevolv3 Blog...\n');

const steps = [
  {
    name: '1. Injetar variáveis de ambiente',
    command: 'node build-inject-env.cjs',
    cwd: process.cwd()
  },
  {
    name: '2. Instalar dependências das Netlify Functions',
    command: 'npm install',
    cwd: path.join(process.cwd(), 'netlify/functions')
  },
  {
    name: '3. Build do Sanity Studio',
    command: 'npm install && npm run build',
    cwd: path.join(process.cwd(), 'sanity')
  },
  {
    name: '4. Copiar Studio para pasta de deploy',
    command: 'rm -rf ../studio && mkdir -p ../studio && cp -r dist/* ../studio/ && cp ../studio-redirects ../studio/_redirects',
    cwd: path.join(process.cwd(), 'sanity')
  }
];

let hasError = false;

for (const step of steps) {
  try {
    console.log(`📦 ${step.name}...`);
    execSync(step.command, { 
      cwd: step.cwd, 
      stdio: 'inherit',
      shell: true
    });
    console.log(`✅ ${step.name} - Concluído\n`);
  } catch (error) {
    console.error(`❌ Erro em: ${step.name}`);
    console.error(error.message);
    hasError = true;
    break;
  }
}

if (hasError) {
  console.error('\n❌ Build falhou!');
  process.exit(1);
} else {
  console.log('✅ Build concluído com sucesso!');
  process.exit(0);
}

