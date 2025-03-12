# Projeto Website com Animação de Gradiente

Este projeto contém um website moderno com animação de gradiente de fundo.

## Requisitos

- Node.js (versão 16 ou superior)
- NPM (normalmente instalado com o Node.js)

## Instruções para Iniciar o Projeto

### Método 1: Usando os scripts automatizados

1. Execute o script `iniciar-completo.bat` na pasta raiz do projeto.
2. O navegador abrirá automaticamente com o projeto em execução.

Se a porta padrão (5173) estiver em uso:
1. Execute o script `iniciar-porta-alternativa.bat` na pasta raiz do projeto.
2. O script encontrará uma porta livre automaticamente.

### Método 2: Comandos manuais

1. Abra um terminal na pasta raiz do projeto.
2. Execute os seguintes comandos:
   ```
   cd project
   npm install
   npm run dev
   ```
3. Abra o navegador e acesse `http://localhost:5173`

## Solução de Problemas

### Porta em uso

Se você receber um erro indicando que a porta está em uso:

1. Execute o script `encontrar-porta-livre.bat` para identificar uma porta disponível.
2. Use o comando `npm run dev -- --port XXXX` substituindo XXXX pela porta livre.

### Dependências

Se houver problemas com as dependências:

1. Navegue até a pasta do projeto: `cd project`
2. Remova a pasta node_modules: `rm -rf node_modules` (Linux/Mac) ou `rmdir /s /q node_modules` (Windows)
3. Limpe o cache do npm: `npm cache clean --force`
4. Reinstale as dependências: `npm install`

## Publicação do Site

Para publicar o site em produção, siga os passos abaixo:

1. Execute o script `build-producao.bat` para gerar os arquivos otimizados para produção.
2. Os arquivos otimizados serão gerados na pasta `project/dist`.

### Guias de Publicação

Criamos guias detalhados para publicar seu site em diferentes plataformas:

- [Guia de Publicação no Netlify](guia-netlify.md) - Recomendado para iniciantes
- [Guia de Publicação no Vercel](guia-vercel.md) - Ótimo para aplicações React
- [Guia de Publicação no GitHub Pages](guia-github-pages.md) - Opção gratuita
- [Guia de Publicação em Hospedagem Tradicional (cPanel)](guia-hospedagem-tradicional.md) - Para hospedagem compartilhada

Cada guia contém instruções passo a passo e soluções para problemas comuns.

## Estrutura do Projeto

```
project/
├── public/          # Arquivos estáticos
├── src/             # Código fonte
│   ├── components/  # Componentes React
│   ├── pages/       # Páginas da aplicação
│   └── App.jsx      # Componente principal
├── index.html       # Arquivo HTML principal
└── package.json     # Dependências e scripts
```

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para mais detalhes. 