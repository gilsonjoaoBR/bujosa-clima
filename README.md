# Bujosa Clima — landing page comercial

Landing page de conversão da **Bujosa Clima — Soluções em Climatização**, com
atendimento em Maricá, São Gonçalo e Niterói (RJ). O objetivo do site é
receber solicitações de orçamento por WhatsApp.

Site estático, sem backend, sem banco de dados, sem autenticação, sem
rastreadores e sem serviços pagos.

## Stack

| Item | Escolha |
| --- | --- |
| Build | Vite 8 + React 19 + TypeScript 6 |
| Estilo | Tailwind CSS 4 (tokens da marca em `src/index.css`) |
| Ícones | lucide-react |
| Rotas | react-router-dom (`/` e `/privacidade`) |
| Formulário | react-hook-form + zod |
| Fonte | Montserrat Variable auto-hospedada (`@fontsource-variable/montserrat`) |
| Testes | Vitest (funções puras de WhatsApp e dados estruturados) |
| Publicação | Docker multi-stage (Node → Nginx) |

## Estrutura

```
src/
  components/
    layout/     cabeçalho, rodapé e CTA fixo do celular
    sections/   as seções da landing page (hero, serviços, diferenciais...)
    ui/         peças reutilizáveis (Cta, Section, BrandLogo, Photo...)
  content/      textos, serviços, diferenciais, FAQ, mídia e dados estruturados
  lib/          WhatsApp, ambiente, SEO em runtime e utilitários
  pages/        LandingPage, PrivacyPolicyPage, NotFoundPage
public/
  brand/        identidade visual derivada do arquivo aprovado
  images/       fotos do site (ver LEIA-ME.md da pasta)
docs/
  decisoes.md   registro das decisões técnicas
  identidade/   arquivo aprovado, derivados e validação visual
  validacao/    capturas de tela das verificações responsivas
scripts/
  extract-identity-assets.py   gera os derivados da identidade visual
  vite-plugin-seo.ts           canonical, Open Graph, JSON-LD, sitemap e robots
```

## Requisitos

- Node.js 22 (`node -v`)
- npm 10
- Python 3.10+ com Pillow, NumPy e SciPy — apenas para regerar os arquivos de
  identidade visual
- Docker — apenas para publicar

## Como rodar localmente

```bash
npm install
cp .env.example .env    # no PowerShell: Copy-Item .env.example .env
npm run dev
```

O servidor de desenvolvimento mostra o endereço local (por padrão
`http://localhost:5173`).

Outros comandos:

```bash
npm run typecheck   # TypeScript, sem emissão de arquivos
npm run lint        # ESLint
npm test            # testes unitários
npm run build       # typecheck + build de produção em dist/
npm run preview     # serve o build em http://localhost:4173
npm run brand:assets  # regera os derivados da identidade visual
```

## Variáveis de ambiente

Copiadas do `.env` e **embutidas no bundle durante o build**.

| Variável | Obrigatória | Descrição |
| --- | --- | --- |
| `VITE_WHATSAPP_NUMBER` | sim, para os CTAs funcionarem | Número do WhatsApp Business, só dígitos, com `55`. Ex.: `55` + DDD + número |
| `VITE_SITE_URL` | recomendada | URL pública canônica, sem barra no final. Usada em canonical, Open Graph, `sitemap.xml`, `robots.txt` e dados estruturados |

### O que acontece enquanto o número não está configurado

O site **não** cria nenhum link `wa.me`. Os botões de orçamento levam ao
formulário da própria página, o formulário fica com o envio desabilitado e
explica o motivo, e em desenvolvimento aparece uma faixa avisando que a
configuração está pendente. Assim nenhum visitante encontra um botão que abre
um contato inexistente. Detalhes em `docs/decisoes.md`.

## Como visualizar no navegador

1. `npm run dev` e abra o endereço local exibido no terminal.
2. Para ver exatamente o que vai para produção: `npm run build` e depois
   `npm run preview`, abrindo `http://localhost:4173`.
3. Com Docker:

```bash
docker build --build-arg VITE_WHATSAPP_NUMBER=55XXXXXXXXXXX -t bujosa-clima .
docker run --rm -p 8080:80 bujosa-clima
```

Depois acesse `http://localhost:8080` (o healthcheck fica em `/healthz`).

## Identidade visual

O logotipo vem do arquivo aprovado no Google Drive, mantido em
`docs/identidade/BujosaClima_Identidade_Aprovada.png`. Os arquivos usados pelo
site são derivados desse original por recorte e remoção de fundo — nada é
redesenhado. A extração ainda precisa da sua aprovação formal; o passo a passo
e as validações visuais estão em `docs/identidade/DERIVADOS.md`.

## Fotos

Os espaços de foto estão preenchidos com blocos visuais desenhados em SVG com a
paleta oficial, porque ainda não existem fotos próprias aprovadas e não havia
geração de imagens disponível nesta sessão. Para trocar por fotos reais, siga
`public/images/LEIA-ME.md` (nomes dos arquivos e como ativar).

## SEO e performance

- `sitemap.xml` e `robots.txt` são gerados no build a partir de `VITE_SITE_URL`.
- Dados estruturados `HVACBusiness` apenas com informações confirmadas (nome,
  URL, serviços, cidades atendidas e telefone quando configurado).
- Imagens em AVIF/WebP quando existe alternativa; logos com `width`/`height`
  para evitar mudança de layout.
- Fontes auto-hospedadas, com subconjuntos carregados por `unicode-range`.
- Lazy loading fora da primeira dobra, `prefers-reduced-motion` respeitado e
  foco visível no teclado.

## Publicação (Coolify)

1. **Repositório**: aponte o Coolify para este repositório (build a partir do
   `Dockerfile`).
2. **Variáveis de build**: cadastre `VITE_WHATSAPP_NUMBER` e `VITE_SITE_URL`
   como *build arguments*. O Vite embute esses valores no bundle — alterá-los
   exige um novo build, não apenas um restart.
3. **Porta**: exponha a porta `80` do container.
4. **Healthcheck**: use `GET /healthz` (responde `200 ok`).
5. **Domínio e HTTPS**: aponte `bujosaclima.com.br` (e `www`, se for o caso)
   para o serviço no Coolify e deixe o proxy gerenciado emitir o certificado
   Let's Encrypt. O container serve HTTP na 80 e não lida com TLS.
6. **Deploy**: esta versão **não** publica em produção — a publicação depende
   da sua autorização.

## Primeiro envio para o GitHub

O projeto ainda não tem repositório remoto. Depois de criar o repositório vazio
(sugestão de nome: `bujosa-clima-landing`), rode:

```bash
git remote add origin git@github.com:<sua-conta>/bujosa-clima-landing.git
git push -u origin main
```

Antes de publicar, confirme que o repositório é privado ou que não há nada
sensível no histórico: a identidade visual aprovada está versionada em
`docs/identidade/`.

## Verificações executadas nesta versão

| Verificação | Resultado |
| --- | --- |
| `npm run typecheck` | sem erros |
| `npm run lint` | sem avisos |
| `npm test` | 15 testes em 2 arquivos — todos passando |
| `npm run build` | build gerado (JS ~132 kB gzip, CSS ~7 kB gzip) |
| `docker build` + execução local | imagem ~96 MB, container `healthy` |
| `GET /healthz` | `200 ok` |
| Rotas `/`, `/privacidade` e rota inexistente (SPA) | `200` com `index.html` |
| Cabeçalhos de segurança e de cache | presentes (CSP, `nosniff`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`) |
| Gzip no proxy | ativo para HTML, CSS e JS |
| Navegador real, desktop 1440 px e celular 390 px | layout conferido, menu mobile e CTA fixo funcionando, sem erros da aplicação no console sob a CSP |

Capturas em `docs/validacao/`.

## Dados ainda pendentes do cliente

1. Número do WhatsApp Business (`VITE_WHATSAPP_NUMBER`).
2. Aprovação da extração da identidade visual (`docs/identidade/DERIVADOS.md`).
3. Fotos próprias dos serviços (ver `public/images/LEIA-ME.md`).
4. Confirmação do domínio final para `VITE_SITE_URL`.

O site não publica CNPJ, endereço comercial, e-mail, horário de funcionamento,
preços, prazos, certificações, depoimentos ou números de clientes — nada disso
foi inventado e nada disso aparece enquanto não houver confirmação.
