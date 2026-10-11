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
| Aplicação no Coolify | **a criar** (ver abaixo) |
| Variáveis de build | `VITE_WHATSAPP_NUMBER=5521984173233`, `VITE_SITE_URL=https://bujosaclima.acritech.com.br` |

## Estado atual

- Código auditado e publicado no GitHub (sem segredos no histórico).
- Registro DNS criado e resolvendo.
- **Falta criar a aplicação no Coolify.** A criação não pôde ser feita por API:
  o token configurado responde `403 Missing required permissions: write`.
  Detalhes e o ajuste mínimo estão em "Acesso ao Coolify", abaixo.

## Acesso ao Coolify

Levantamento das conexões existentes nesta estação:

| Conexão | Tipo | O que permite |
| --- | --- | --- |
| `mcp acritech-lab` (Codex) | MCP local → módulo PowerShell → API Coolify | Leitura e deploy **apenas** dos recursos da allowlist do laboratório `booking-ux-hml` |
| Extensão `ron-niri.coolify-vscode` (VS Code) | `coolify.apiUrl` + `coolify.apiToken` nas configurações | Leitura (projetos, servidores, aplicações e logs); **escrita recusada** |
| Cofre DPAPI `%APPDATA%\acritech\credentials\store.json` | credenciais `coolify.url` e `coolify.token` | Usadas pelo módulo local; a allowlist de laboratório é dele |
| `mcp hostinger-vps` / `hostinger-dns` | API Hostinger | Inventário da VPS e escrita no DNS |

Com o token atual é possível ler tudo o que é necessário para montar a
aplicação (projeto, ambiente, servidor, destino, portas e padrão das landing
pages existentes), mas não criar nem alterar recursos.

**Ajuste mínimo para automatizar:** gerar no painel do Coolify (Keys & Tokens →
API tokens) um token com as permissões **read, write e deploy** e guardá-lo no
cofre local, sem passar pela linha de comando:

```powershell
cd $env:APPDATA\acritech\tools
.\Set-AcritechCredential.ps1 -Path coolify.token
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
| 2026-10-11 | `c87b8da` (público no `main`) | Código publicado no GitHub e registro DNS criado e resolvendo. Aplicação no Coolify ainda **não criada**: o acesso do agente é somente leitura e restrito ao laboratório, então esta etapa depende do painel. |

Depois de criar a aplicação e fazer o deploy, registre aqui o commit implantado,
o identificador (UUID) da aplicação e o resultado da validação.
