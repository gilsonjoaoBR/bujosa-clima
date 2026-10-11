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
- **Falta criar a aplicação no Coolify**: o acesso disponível nesta sessão é
  somente leitura e limitado ao laboratório, então a criação do recurso precisa
  ser feita pelo painel.

## Criar a aplicação no Coolify (painel)

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
| 2026-10-11 | a publicar | Código no GitHub e DNS pronto; aplicação no Coolify pendente de criação pelo painel |
