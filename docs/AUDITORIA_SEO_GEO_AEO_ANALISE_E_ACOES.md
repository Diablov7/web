# Análise da Auditoria SEO, GEO e AEO – Wevolv3.com

**Documento de referência:** `Wevolv3.com_ Comprehensive SEO, GEO, and AEO Audit Report (English Market Focus).md`  
**Data da análise:** 26/02/2026

Este documento cruza as recomendações da auditoria com o estado atual do código e prioriza ações implementáveis no repositório.

---

## Resumo da auditoria

A auditoria cobre três frentes:

- **SEO:** tráfego orgânico e interpretação de conteúdo por motores de busca.
- **GEO (Generative Engine Optimization):** otimização para respostas de IA (Google AI Overviews, Perplexity, ChatGPT) — conteúdo factual, entidades claras, dados estruturados.
- **AEO (Answer Engine Optimization):** conteúdo em formato pergunta/resposta e dados estruturados para respostas diretas.

Objetivo: consolidar o site como referência em buscas em inglês e como fonte preferida para modelos de IA.

---

## Estado atual no código (verificado)

### Já implementado

| Item | Onde | Observação |
|------|------|------------|
| **Schema.org Organization** | `index.html` | Com logo, sameAs, contactPoint. |
| **Schema.org WebSite** | `index.html` | Com SearchAction para /blog. |
| **Schema.org BlogPosting** | `singleblog.html` (JS) | Injetado dinamicamente por post. |
| **OG e Twitter Cards** | Todas as páginas estáticas + edge para singleblog | Edge function para meta dinâmicos no blog. |
| **Alt em várias imagens** | index, about, singleblog, works | Logos de parceiros, serviços, depoimentos, autores. |
| **H1 “único” para SEO** | `index.html` | H1 oculto visualmente: "Wevolv3 - Web3 Marketing & Modular Advertising Agency". |
| **Título e meta** | index e outras | Title e description com foco em Web3/crypto. |

### Parcialmente implementado / a melhorar

| Item | Situação no código | Ação sugerida |
|------|--------------------|----------------|
| **H1 por página** | **index:** 1 H1 oculto + 2 H1 visíveis ("Web3", "Era"). **blog.html:** 1 H1 "Blog". **singleblog:** H1 dinâmico (título do post). **about/contact/works:** sem H1 explícito em algumas. | Unificar: uma única H1 por página (incluindo homepage); "Web3" e "Era" podem ser `<span>` ou H2 se quiser manter hierarquia. Garantir H1 em about, contact, works. |
| **Alt em imagens** | Vários `alt=""` (setas, back-to-top, ícones em termos/privacy/contact/works). | Preencher com descrições curtas (ex.: "Link to X", "Back to top"). |
| **Nomes de arquivos de imagem** | `1.png`, `2.png`, …, `hero-bg.jpg`, `arrow-down-right.png`. | Renomear para nomes descritivos (ex.: `forbes-media-partner.png`) e atualizar referências no HTML. |
| **Meta description** | Boa, mas genérica. | Revisar texto para ser mais “resposta direta” (AEO) e incluir CTA sutil. |

### Não implementado (recomendações da auditoria)

| Item | Fase da auditoria | Onde implementar |
|------|--------------------|-------------------|
| **Schema Service** | Fase 1 | Um JSON-LD por serviço (Community Management, ADS, Growth Hacking, etc.) em `index.html` ou em página de serviços. |
| **Schema Review** | Fase 1 | Um JSON-LD por depoimento (MAC, Jax, Mira, Alex) em `index.html` e `about.html`. |
| **Schema FAQPage** | Fase 1 (após criar FAQ) | Na página que tiver a seção FAQ. |
| **Seção FAQ** | Fase 2 | Nova seção em homepage e/ou about/contact com perguntas como: "What is a Web3 Marketing Agency?", "How can Wevolv3 help my crypto project grow?" |
| **Refino de conteúdo (TL;DR, definition boxes, takeaways)** | Fase 2 | Conteúdo no Sanity (blog) e texto nas páginas estáticas; não é mudança só de código. |
| **Citation building / E-E-A-T** | Fase 2 | Estratégia de links e guest posts; não é implementação no repo. |

---

## Plano de ações priorizado (no repositório)

### Fase 1 – Técnico e Schema (implementável agora)

1. **H1**
   - Homepage: manter um único H1 (o oculto); trocar os dois `<h1>` visíveis ("Web3", "Era") por `<h2>` ou por elementos estilizados sem H1.
   - About, Contact, Works: garantir uma única H1 por página com foco na keyword principal da página.

2. **Alt text**
   - Substituir todos os `alt=""` por textos curtos e descritivos (ex.: "Go to X (Twitter)", "Back to top", "External link").

3. **Schema Service**
   - Adicionar em `index.html` um bloco `<script type="application/ld+json">` com um array de `Service` para cada solução (Community Management, ADS Placement, Growth Hacking, KOL, Design & Motion, Guerrilla Marketing, Listing, Crypto PR & Media), seguindo o exemplo da auditoria.

4. **Schema Review**
   - Adicionar em `index.html` (e opcionalmente em `about.html`) blocos JSON-LD do tipo `Review` para os depoimentos (MAC, Jax, Mira, Alex), com `itemReviewed` = serviço Wevolv3, `reviewRating`, `author`, `name` (texto do depoimento).

5. **Imagens**
   - Renomear arquivos genéricos (ex.: `1.png` → `forbes-media-partner.png`) e atualizar todos os `src` no projeto (incluindo about, index, etc.). Opcional: fazer em etapas para não quebrar cache.

6. **Meta description (homepage)**
   - Ajustar a meta description em `index.html` para um texto mais orientado a “resposta” e CTA, alinhado à recomendação AEO da auditoria.

### Fase 2 – Conteúdo e FAQ

7. **Seção FAQ**
   - Incluir bloco “Frequently Asked Questions” na homepage (e/ou about/contact) com 3–5 perguntas e respostas curtas.
   - Adicionar Schema `FAQPage` na mesma página, espelhando as perguntas e respostas.

8. **Blog (Sanity)**
   - Definir no Sanity (e, se necessário, no front) padrões para: introdução clara, TL;DR, definition boxes e takeaways. Isso é conteúdo + possível extensão do schema de post.

### Fase 3 – Monitoramento (fora do código)

- Search Console, rankings, citações em IA, backlinks e análise de concorrentes conforme a auditoria.

---

## Referência rápida – arquivos a alterar

| Ação | Arquivos |
|------|----------|
| H1 e hierarquia | `index.html`, `about.html`, `contact.html`, `works.html` |
| Alt vazios | `index.html`, `about.html`, `contact.html`, `works.html`, `terms.html`, `privacy.html`, `disclaimer.html`, `singlework.html`, `singleblog.html`, `blog.html` |
| Schema Service + Review | `index.html` |
| Schema FAQPage | `index.html` (após adicionar seção FAQ) |
| Meta description | `index.html` |
| Seção FAQ (HTML) | `index.html` (e opcionalmente about/contact) |
| Renomear imagens | `images/` + todos os HTML que referenciam |

---

## Conclusão

A auditoria está alinhada com o que o site já faz (Organization, WebSite, BlogPosting, OG, boa base de alt) e aponta melhorias claras: **um H1 por página**, **alt completo**, **Schema Service e Review**, **FAQ + FAQPage** e **nomes de imagens descritivos**. As fases 1 e 2 acima podem ser executadas diretamente no repositório; a fase 3 é de estratégia e ferramentas externas.

Se quiser, o próximo passo pode ser implementar em sequência: (1) H1 + alt, (2) Schema Service e Review, (3) FAQ + FAQPage, (4) renomeação de imagens e meta description.
