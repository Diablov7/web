#!/usr/bin/env node

/**
 * Script para injetar variáveis de ambiente em arquivos HTML estáticos durante o build
 * Substitui placeholders como {{SANITY_PROJECT_ID}} pelas variáveis de ambiente
 */

const fs = require('fs');
const path = require('path');

// Arquivos HTML que precisam de injeção de variáveis
const htmlFiles = [
  'blog.html',
  'blog-post.html',
  'index.html'
];

// Variáveis de ambiente a serem injetadas
const envVars = {
  SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID || 'sszuldy6',
  SANITY_DATASET: process.env.SANITY_DATASET || process.env.VITE_SANITY_DATASET || 'production',
  SANITY_API_VERSION: process.env.SANITY_API_VERSION || '2024-01-01',
  SANITY_PREVIEW_TOKEN: process.env.SANITY_TOKEN || process.env.VITE_SANITY_TOKEN || '',
  GA_MEASUREMENT_ID: process.env.VITE_GA_MEASUREMENT_ID || process.env.GA_MEASUREMENT_ID || ''
};

console.log('🔧 Injetando variáveis de ambiente nos arquivos HTML...');

htmlFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  Arquivo não encontrado: ${file}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Substituir placeholders ou valores hardcoded
  Object.entries(envVars).forEach(([key, value]) => {
    // Substituir placeholders {{KEY}}
    const placeholderRegex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
    if (content.includes(`{{${key}}}`)) {
      content = content.replace(placeholderRegex, value);
      modified = true;
    }

    // Substituir valores hardcoded do Project ID (apenas se diferente)
    if (key === 'SANITY_PROJECT_ID' && value !== 'sszuldy6') {
      const hardcodedRegex = /(const\s+(PROJECT_ID|SANITY_PROJECT_ID)\s*=\s*['"])sszuldy6(['"])/g;
      if (hardcodedRegex.test(content)) {
        content = content.replace(hardcodedRegex, `$1${value}$2`);
        modified = true;
      }
    }
    
    // Substituir placeholder do token de preview
    if (key === 'SANITY_PREVIEW_TOKEN' && value) {
      const tokenPlaceholder = /SANITY_PREVIEW_TOKEN_PLACEHOLDER/g;
      if (tokenPlaceholder.test(content)) {
        content = content.replace(tokenPlaceholder, value);
        modified = true;
      }
    }
    
    // Substituir placeholder do Google Analytics Measurement ID
    if (key === 'GA_MEASUREMENT_ID') {
      const gaPlaceholder = /VITE_GA_MEASUREMENT_ID_PLACEHOLDER/g;
      if (gaPlaceholder.test(content)) {
        content = content.replace(gaPlaceholder, value || 'VITE_GA_MEASUREMENT_ID_PLACEHOLDER');
        modified = true;
      }
    }
  });

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${file} atualizado`);
  } else {
    console.log(`ℹ️  ${file} sem alterações necessárias`);
  }
});

console.log('✅ Injeção de variáveis concluída!');

