const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

console.log('🚀 Iniciando build híbrido (Next.js Blog + Site Estático)...\n')

const srcPagesDir = path.join(process.cwd(), 'src', 'pages')
const srcPagesTempDir = path.join(process.cwd(), 'src', '_pages_temp')

const steps = [
  {
    name: '0. Renomear src/pages temporariamente (evita conflito com Next.js app/)',
    command: () => {
      if (fs.existsSync(srcPagesDir)) {
        if (fs.existsSync(srcPagesTempDir)) {
          execSync(`rm -rf "${srcPagesTempDir}"`, { stdio: 'inherit' })
        }
        fs.renameSync(srcPagesDir, srcPagesTempDir)
        console.log('✅ src/pages renomeado para src/_pages_temp')
      }
    },
    cwd: process.cwd()
  },
  {
    name: '1. Build do Next.js Blog (SSG)',
    command: 'npm run build:blog',
    cwd: process.cwd()
  },
  {
    name: '1.1 Restaurar src/pages',
    command: () => {
      if (fs.existsSync(srcPagesTempDir)) {
        if (fs.existsSync(srcPagesDir)) {
          execSync(`rm -rf "${srcPagesDir}"`, { stdio: 'inherit' })
        }
        fs.renameSync(srcPagesTempDir, srcPagesDir)
        console.log('✅ src/_pages_temp restaurado para src/pages')
      }
    },
    cwd: process.cwd()
  },
  {
    name: '2. Copiar arquivos do Next.js para estrutura correta',
    command: () => {
      const outDir = path.join(process.cwd(), 'out')
      
      if (!fs.existsSync(outDir)) {
        console.warn('⚠️ Diretório out/ não encontrado. Next.js build pode ter falhado.')
        return
      }
      
      // Copiar arquivos estáticos do Next.js (CSS, JS, etc) para a raiz
      const staticFiles = ['_next', 'blog']
      staticFiles.forEach(file => {
        const src = path.join(outDir, file)
        const dest = path.join(process.cwd(), file)
        if (fs.existsSync(src)) {
          if (fs.existsSync(dest)) {
            execSync(`rm -rf ${dest}`, { stdio: 'inherit' })
          }
          execSync(`cp -r ${src} ${dest}`, { stdio: 'inherit' })
          console.log(`✅ Copiado: ${file}`)
        }
      })
      
      // Copiar index.html do Next.js se existir (para fallback)
      const nextIndex = path.join(outDir, 'index.html')
      if (fs.existsSync(nextIndex)) {
        // Não sobrescrever o index.html principal, apenas manter como fallback
        console.log('ℹ️ Next.js index.html encontrado (mantido em out/)')
      }
      
      console.log('✅ Arquivos do Next.js copiados')
    },
    cwd: process.cwd()
  },
  {
    name: '3. Build do Sanity Studio',
    command: 'cd sanity && npm install && npm run build',
    cwd: process.cwd()
  },
  {
    name: '4. Injetar variáveis de ambiente',
    command: 'node build-inject-env.cjs',
    cwd: process.cwd()
  }
]

let hasError = false

for (const step of steps) {
  try {
    console.log(`📦 ${step.name}...`)
    if (typeof step.command === 'function') {
      step.command()
    } else {
      execSync(step.command, { 
        cwd: step.cwd, 
        stdio: 'inherit',
        shell: true
      })
    }
    console.log(`✅ ${step.name} - Concluído\n`)
  } catch (error) {
    console.error(`❌ Erro em: ${step.name}`)
    console.error(error.message)
    hasError = true
    break
  }
}

// Sempre restaurar src/pages em caso de erro ou sucesso
if (fs.existsSync(srcPagesTempDir) && !fs.existsSync(srcPagesDir)) {
  try {
    fs.renameSync(srcPagesTempDir, srcPagesDir)
    console.log('✅ src/pages restaurado após o build')
  } catch (e) {
    console.warn('⚠️ Não foi possível restaurar src/pages:', e.message)
  }
}

if (hasError) {
  console.error('\n❌ Build falhou!')
  process.exit(1)
} else {
  console.log('✅ Build híbrido concluído com sucesso!')
  console.log('📝 O blog está em /blog (Next.js SSG)')
  console.log('📝 O site principal continua estático')
  process.exit(0)
}

