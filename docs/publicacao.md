# Publicação — Bujosa Clima

Runbook da publicação na VPS da Acritech (Hostinger `srv1001797`, IP
`195.35.43.214`, Ubuntu 24.04, Coolify 4.4.6).

## Identificação

| Item | Valor |
| --- | --- |
| Repositório | `https://github.com/gilsonjoaoBR/bujosa-clima` (público) |
| Branch | `main` |
| URL pública | `https://bujosaclima.acritech.com.br` |
| Registro DNS | `bujosaclima.acritech.com.br` A → `195.35.43.214` (TTL 14400) |
| Build | `Dockerfile` (Node 22 → Nginx), porta interna 80 |
| Healthcheck | `GET /healthz` → `200 ok` |
| Aplicação no Coolify | `bujosa-clima` — UUID `eh5tolpdkciwqwbmyqakfro3` |
| Projeto / ambiente | My first project → production (servidor `localhost`, destino `coolify`) |
| Credencial de publicação | token dedicado `bujosa-clima` no cofre local, chave `coolify.bujosa_deploy` |
| Variáveis de build | `VITE_WHATSAPP_NUMBER=5521984173233`, `VITE_SITE_URL=https://bujosaclima.acritech.com.br` |

## Estado atual

**Publicado e validado em 11/10/2026.**

- Código auditado e publicado no GitHub (sem segredos no histórico).
- Registro DNS criado e resolvendo.
- Aplicação criada no Coolify e deploy concluído (`running:healthy`).
- HTTPS com certificado válido, HTTP redirecionando para HTTPS (302).
- Landing page respondendo em <https://bujosaclima.acritech.com.br>.

## Acesso ao Coolify

Levantamento das conexões existentes nesta estação:

| Conexão | Tipo | O que permite |
| --- | --- | --- |
| `mcp acritech-lab` (Codex) | MCP local → módulo PowerShell → API Coolify | Leitura e deploy **apenas** dos recursos da allowlist do laboratório `booking-ux-hml` |
| Extensão `ron-niri.coolify-vscode` (VS Code) | `coolify.apiUrl` + `coolify.apiToken` nas configurações | Leitura (projetos, servidores, aplicações e logs); **escrita recusada** |
| Cofre DPAPI `%APPDATA%\acritech\credentials\store.json` | credenciais `coolify.url` e `coolify.token` | Usadas pelo módulo local; a allowlist de laboratório é dele |
| `mcp hostinger-vps` / `hostinger-dns` | API Hostinger | Inventário da VPS e escrita no DNS |
| SSH para a VPS | chave `acritech-hml` (carregada no agente) autorizada no `srv1001797` | Acesso root ao host; não foi usado |

As três origens na estação (cofre `coolify.token`, `coolify.apiToken` das
configurações do VS Code e o segredo guardado pela extensão Coolify no
SecretStorage) contêm **o mesmo token**, `fingerprint 4c307b551bfb`, com
permissão apenas de leitura: a API responde
`403 Missing required permissions: write` para qualquer escrita. Com ele é
possível ler tudo o que é necessário para montar a aplicação (projeto,
ambiente, servidor, destino, portas e o padrão das landing pages existentes),
mas não criar nem alterar recursos.

Consulta somente leitura ao banco do Coolify (`personal_access_tokens`) em
11/10/2026 18:39 UTC:

| id | nome | permissões | criado em | último uso |
| --- | --- | --- | --- | --- |
| 2 | `coolify_vscode` | `["read"]` | 07/10 16:06 | 11/10 18:38 (sondagem) |
| 3 | `conexao_vscode` | `["deploy","read","read:sensitive","write"]` | 07/10 19:20 | 08/10 02:26 |

Ou seja: **existe** um token com escrita (`conexao_vscode`), mas o valor dele
não está gravado em nenhum lugar acessível desta estação (o Coolify guarda
apenas o hash) e o token em uso é o de leitura. Habilitar a escrita continua
dependendo de um destes caminhos: criar um token novo no painel e guardá-lo no
cofre, reinformar o valor do `conexao_vscode`, ou conceder as permissões
`write`/`deploy` ao token em uso (alteração em recurso compartilhado, que exige
autorização específica).

A limitação é do **token**, não da conta (o token pertence ao Root Team da
instância), do MCP nem da sessão: a API recusa antes de qualquer validação, e
autorizar escopo não muda isso.

**Ajuste mínimo para automatizar:** gerar no painel do Coolify (Keys & Tokens →
API tokens) um token com as permissões **read, write e deploy** e guardá-lo no
cofre local em uma chave nova, para não ampliar o escopo do token que o
laboratório usa hoje:

```powershell
cd $env:APPDATA\acritech\tools
.\Set-AcritechCredential.ps1 -Path coolify.token.bujosa
```

O valor é pedido em entrada oculta (não aparece na tela, no histórico nem no
log de processos de saída). Com isso a criação e o deploy podem ser feitos por
API, sem intervenção manual. O token atual das configurações do VS Code é
somente leitura e participa do Settings Sync, então **não** é o lugar adequado
para um token de escrita.

Enquanto isso, a criação manual pelo painel continua valendo — os valores
exatos estão na seção "Criar a aplicação no Coolify".

## Criar a aplicação no Coolify (painel)

Padrão seguido pelas landing pages já publicadas nesta instância: projeto
**My first project**, ambiente **production**, servidor **localhost**, destino
**coolify**, porta 80, build por Dockerfile. A app da Bujosa segue o mesmo
padrão, com healthcheck em `/healthz`.

1. **New Resource → Application → Public Repository**.
2. **Repository**: `https://github.com/gilsonjoaoBR/bujosa-clima`.
3. **Branch**: `main`.
4. **Build Pack**: `Dockerfile` (caminho `/Dockerfile`).
5. **Ports Exposes**: `80` (não publicar porta no host).
6. **Domains**: `https://bujosaclima.acritech.com.br`.
7. **Healthcheck**: caminho `/healthz`, porta 80, intervalo 30s.
8. **Build Arguments** (obrigatórios — o Vite embute no bundle):
   - `VITE_WHATSAPP_NUMBER=5521984173233`
   - `VITE_SITE_URL=https://bujosaclima.acritech.com.br`
9. **Persistent Storage**: nenhum. **Banco/Redis**: nenhum.
10. **Deploy** e acompanhar os logs até o container ficar `healthy`.

Projetos/ambientes da Acritech não devem ser alterados: a aplicação é
independente e usa apenas o proxy existente.

## Validação pós-deploy

```bash
curl -sS -o /dev/null -w '%{http_code}\n' https://bujosaclima.acritech.com.br/healthz
curl -sSI https://bujosaclima.acritech.com.br/ | Select-String 'HTTP/|content-security|cache-control'
curl -sS https://bujosaclima.acritech.com.br/ | Select-String 'rel="canonical"'
```

Conferir manualmente: home, `/privacidade`, favicon, rodapé com o crédito da
Acritech, carrossel, FAQ, formulário, os 9 CTAs de WhatsApp (devem abrir
`wa.me/5521984173233`) e o console do navegador sem erros.

## Atualização

1. Alterar o código, rodar `npm run typecheck && npm run lint && npm test`.
2. `git commit` e `git push origin main`.
3. No Coolify, **Deploy** da aplicação (o build usa os mesmos argumentos).

## Rollback

O site é estático e cada publicação é um build independente. Para voltar à
versão anterior:

1. Identificar o commit que estava no ar (registrado no histórico do Coolify,
   no campo de commit do deploy que funcionou).
2. `git revert --no-commit <commit-ruim> && git commit` **ou** fazer
   `git reset --hard <commit-bom>` em uma branch de correção — sempre
   preferindo `revert` para preservar o histórico.
3. `git push origin main` e **Deploy** no Coolify.
4. Se o build novo falhar, o Coolify mantém o container anterior em execução
   (deploy só substitui a imagem quando o build e o healthcheck passam); nesse
   caso, não é preciso fazer nada além de corrigir o código.

Como a aplicação não tem banco, volume ou estado, o rollback não envolve dados
e não afeta nenhuma outra aplicação da VPS.

## Registro de publicação

| Data | Commit | Resultado |
| --- | --- | --- |
| 2026-10-11 | `0021d66` | **Publicação concluída.** Repositório público, DNS resolvendo, aplicação `bujosa-clima` [eh5tolpdkciwqwbmyqakfro3] criada em My first project → production, deploy `5ie1wgolm7zjpmn6okanqtgh` finalizado (`running:healthy`) e validação em produção aprovada. |

### Validação em produção (11/10/2026)

| Verificação | Resultado |
| --- | --- |
| `GET /` | `200` · HTML da landing page |
| `GET /privacidade` | `200` · página da política |
| `GET /healthz` | `200` · `ok` |
| `GET /sitemap.xml` · `/robots.txt` · `/favicon.ico` | `200` cada |
| HTTPS / certificado | handshake válido, sem erro de verificação |
| HTTP → HTTPS | `302` para `https://bujosaclima.acritech.com.br/` |
| Canonical · Open Graph · JSON-LD | todos em `https://bujosaclima.acritech.com.br` |
| Sitemap · robots | apontando para o domínio publicado |
| Bundle | contém o número `5521984173233` e **nenhuma** referência ao domínio antigo |
| CTAs de WhatsApp | 9 links, todos `wa.me/5521984173233`, com a marca na mensagem |
| Carrossel · FAQ · formulário | carrossel em movimento, 18 perguntas, 7 campos no formulário |
| Rodapé | crédito da Acritech e logotipo da Bujosa presentes |
| Responsividade | sem rolagem horizontal em 390, 768 e 1440 px |
| Console do navegador | sem erros |
| Aplicações existentes | `acritech.com.br`, `www`, `agenda-hml`, `booking-ux-hml.agenda-hml`, `enfbeatrizbatista.com.br` e `manubujosa.com.br` seguem `200` |

Capturas: `docs/validacao/producao-desktop-1440.png` e
`docs/validacao/producao-mobile-390.png`.

### Atualizações futuras

O app usa a branch `main` do repositório. Depois de `git push`, basta disparar
**Deploy** na aplicação (ou configurar o webhook do repositório no Coolify para
deploy automático). Os argumentos de build já estão salvos na aplicação.
