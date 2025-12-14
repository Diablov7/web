# Solução para Twitter Cards e Open Graph

## Problema
Quando você compartilha um artigo do blog no Twitter, não aparece a imagem de preview/embed como acontece com Medium e outros sites.

## Causa
O Twitter e Facebook fazem **scraping do HTML estático** ANTES do JavaScript executar. Como as meta tags Open Graph eram atualizadas via JavaScript após o carregamento, os crawlers só viam os valores padrão (sem imagem específica do post).

## Solução Implementada

### 1. Netlify Edge Function
Criada uma **Edge Function** (`netlify/edge-functions/inject-og-tags.js`) que:
- Intercepta requisições para `/singleblog?slug=...`
- Busca os dados do post no Sanity **ANTES** de servir a página
- Injeta as meta tags Open Graph e Twitter Cards corretas no HTML
- Garante que os crawlers vejam as tags corretas

### 2. Otimização de Imagens
- Imagens agora são geradas com dimensões otimizadas para social sharing (1200x630px)
- URL da imagem inclui parâmetros: `?w=1200&h=630&fit=crop&auto=format`

### 3. Meta Tags Injetadas
A Edge Function injeta as seguintes tags:
- `og:type` = "article"
- `og:title` = Título do post
- `og:description` = Resumo do post
- `og:url` = URL completa do post
- `og:image` = Imagem do post (1200x630px)
- `twitter:card` = "summary_large_image"
- `twitter:title`, `twitter:description`, `twitter:image`

## Como Funciona

1. **Usuário compartilha**: `https://wevolv3.com/singleblog?slug=meu-artigo`
2. **Twitter faz scraping**: Requisita a URL
3. **Edge Function intercepta**: Busca dados do post no Sanity
4. **HTML é modificado**: Meta tags são injetadas antes de servir
5. **Twitter vê as tags corretas**: Renderiza o card com imagem e título

## Configuração

A Edge Function está configurada no `netlify.toml`:
```toml
[[edge_functions]]
  function = "inject-og-tags"
  path = "/singleblog"
```

## Testando

### 1. Teste Local (após deploy)
Use o [Twitter Card Validator](https://cards-dev.twitter.com/validator):
1. Acesse: https://cards-dev.twitter.com/validator
2. Cole a URL do post: `https://wevolv3.com/singleblog?slug=seu-artigo`
3. Clique em "Preview card"
4. Deve aparecer a imagem e título do post

### 2. Teste no Facebook
Use o [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/):
1. Acesse: https://developers.facebook.com/tools/debug/
2. Cole a URL do post
3. Clique em "Debug"
4. Deve mostrar a imagem e informações corretas

### 3. Limpar Cache
Se você já compartilhou o link antes, o Twitter pode ter cacheado a versão antiga:
- Use o Twitter Card Validator para forçar uma nova validação
- Ou adicione `?v=2` na URL ao compartilhar

## Requisitos das Imagens

Para funcionar corretamente no Twitter:
- **Dimensões mínimas**: 1200x630px (recomendado)
- **Formato**: JPG ou PNG
- **Tamanho máximo**: 5MB
- **URL absoluta**: Deve começar com `https://`

## Troubleshooting

### Imagem não aparece
1. Verifique se a imagem do post no Sanity tem pelo menos 1200x630px
2. Verifique se a URL da imagem é absoluta (começa com `https://`)
3. Use o Twitter Card Validator para ver erros específicos

### Meta tags não estão sendo injetadas
1. Verifique se a Edge Function está deployada no Netlify
2. Verifique os logs do Netlify para erros
3. Certifique-se de que o slug do post está correto na URL

### Cache antigo
1. Use o Twitter Card Validator para limpar o cache
2. Adicione um parâmetro `?v=2` na URL ao compartilhar

## Próximos Passos

Após o deploy:
1. Teste com um post real usando o Twitter Card Validator
2. Compartilhe no Twitter e verifique se aparece o card
3. Se necessário, ajuste as dimensões das imagens no Sanity

## Notas Técnicas

- A Edge Function roda **antes** do HTML ser servido
- Funciona mesmo que o JavaScript esteja desabilitado
- Compatível com todos os crawlers (Twitter, Facebook, LinkedIn, etc.)
- Não afeta a performance (Edge Functions são muito rápidas)

