# Decisões técnicas

Registro das escolhas feitas durante a v1.0, com o motivo de cada uma.

## 1. Repositório independente

O projeto foi criado em `C:\dev\bujosa-clima`, fora do repositório da Acritech,
como repositório próprio. A landing page é da Bujosa Clima: não há logotipo,
link ou referência pública à Acritech em nenhum arquivo do site. Nada de
containers, redes, bancos ou aplicações existentes foi alterado.

## 2. TypeScript 6.0.3 em vez de 7.0.2

O `typescript-eslint@8` declara suporte a `typescript >=4.8.4 <6.1.0`. Instalar
o TypeScript 7 quebraria o lint. Foi escolhida a versão mais recente suportada
(6.0.3) para manter typecheck **e** lint funcionando juntos. A migração para o
TypeScript 7 fica pendente de suporte na ferramenta de lint.

Consequência no `tsconfig.json`: `baseUrl` está depreciado no TypeScript 6, e o
alias `@/*` é resolvido por `paths` com caminhos relativos (`./src/*`).

## 3. Tailwind CSS v4 (configuração em CSS)

Sem `tailwind.config.js`: os tokens da marca ficam no bloco `@theme` de
`src/index.css` (azul-marinho `#102B46`, azul `#087EAF`, branco-gelo `#F5FAFC`,
verde-água `#27A6A0`). Menos arquivos de configuração e utilitários gerados
diretamente a partir da paleta oficial.

## 4. Fontes auto-hospedadas

Montserrat Variable via `@fontsource-variable/montserrat`: nenhuma requisição
para servidores de terceiros no carregamento da página, sem recurso pago e sem
`preconnect` externo. É também a família que mais se aproxima do desenho
tipográfico da assinatura aprovada; a assinatura em si continua sendo a imagem
oficial, não texto recomposto.

## 5. Identidade visual: só recorte, nunca redesenho

O logotipo é usado exclusivamente a partir do arquivo aprovado, recortado por
script (`docs/identidade/DERIVADOS.md`). Nenhum monograma, símbolo ou
assinatura foi recriado em CSS/SVG. Detalhes de uso e a pendência de aprovação
da extração estão registrados naquele documento.

## 6. WhatsApp: nenhum link falso

Toda a lógica fica em `src/lib/whatsapp.ts` (funções puras, testadas):

- `normalizePhoneNumber` aceita formatos livres e devolve apenas dígitos no
  padrão E.164 brasileiro, ou `null`;
- `buildWhatsAppLink` devolve `null` quando não há número válido;
- `VITE_WHATSAPP_NUMBER` é lida em `src/lib/env.ts` (módulo separado, para que
  a configuração do Vite possa importar as funções puras sem `import.meta.env`).

Comportamento sem número configurado:

| Situação | Comportamento |
| --- | --- |
| Desenvolvimento | Faixa de aviso "Configuração pendente" no topo da página |
| Produção | Nenhuma faixa; os botões de orçamento levam ao formulário da página |
| Formulário | Botão de envio desabilitado + aviso explicando que o número não foi configurado |

Ou seja: não existe botão que pareça funcional e abra um contato inexistente,
em nenhum ambiente. Um teste unitário cobre exatamente esse caso.

## 7. Formulário sem backend

`react-hook-form` + `zod` validam os campos no navegador; o envio apenas monta
uma mensagem organizada e abre o WhatsApp em nova aba. Não há armazenamento de
dados, cookies, analytics, pixels ou serviços de terceiros. A captura de
lead foi deliberadamente deixada fora desta versão.

## 8. SEO por build, não por runtime

Um plugin do Vite (`scripts/vite-plugin-seo.ts`) injeta no HTML de produção:
canonical, Open Graph/Twitter, dados estruturados (`HVACBusiness`, apenas com
informações confirmadas) e gera `sitemap.xml` e `robots.txt` a partir de
`VITE_SITE_URL`. Assim a URL canônica é configurável por ambiente e os
arquivos de SEO nunca ficam desatualizados em relação ao domínio publicado.

O telefone só entra nos dados estruturados quando existe número válido — os
testes em `src/content/schema.test.ts` garantem que endereço, coordenadas,
horário de funcionamento, avaliações e faixa de preço nunca sejam inventados.

Como o site é uma SPA, a rota `/privacidade` atualiza título, descrição e
canonical em tempo de execução. Rastreadores que executam JavaScript enxergam
os dados corretos; a evolução recomendada é pré-renderizar as rotas em build.

## 9. Fotos: nenhuma imagem genérica apresentada como serviço real

Não havia fotos próprias disponíveis e a geração de imagens não estava
disponível nesta sessão. Para não apresentar imagem de banco como se fosse da
operação — e para não retratar "técnicos" fictícios como equipe —, os espaços
de foto usam um bloco visual desenhado em SVG com a paleta oficial
(`src/components/ui/VisualPanel.tsx`).

O caminho para trocar por fotos reais está em `public/images/LEIA-ME.md`: basta
colocar os arquivos com os nomes previstos e marcar `enabled: true` em
`src/content/media.ts`. O componente `Photo` também cai no bloco visual se um
arquivo falhar, então a página nunca mostra imagem quebrada.

## 10. Botões de destaque sem verde de WhatsApp

Os CTAs usam o gradiente azul → verde-água da paleta aprovada, com o ícone do
WhatsApp indicando a ação. Um botão verde de WhatsApp fora da paleta
conflitaria com a identidade aprovada, que é prioridade máxima do projeto.

## 11. Docker e Nginx

Build multi-stage (Node 22 → Nginx) para imagem final de ~96 MB. Detalhes:

- `VITE_*` é resolvida em tempo de build; no Coolify isso significa variáveis
  de **build**, não de runtime;
- `/healthz` responde `200 ok` para o healthcheck do container;
- SPA com fallback para `index.html` (necessário para `/privacidade`);
- cabeçalhos de segurança (CSP, `X-Frame-Options`, `Referrer-Policy`,
  `Permissions-Policy`, `nosniff`) e cache por tipo de arquivo;
- o cache usa `expires` em vez de `add_header` nos locations porque
  `add_header` em um `location` substitui os cabeçalhos herdados do `server` —
  isso manteria as respostas de assets sem os cabeçalhos de segurança.

Nenhum deploy foi executado. A imagem foi construída e testada localmente.
