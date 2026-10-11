# Identidade visual — arquivos derivados

## Arquivo de origem

| Item | Valor |
| --- | --- |
| Arquivo aprovado | `docs/identidade/BujosaClima_Identidade_Aprovada.png` |
| Origem | Google Drive — `Bujosa Clima / 01 - Identidade Visual / BujosaClima_Identidade_Aprovada.png` |
| Dimensões | 1536 × 1024 px, RGB |
| Tamanho / SHA-256 | 1.820.946 bytes / `171CD04143D43B22598227E42B4DF9E7DA099C0BE6FA2AA81C81407F59C919E0` |

O arquivo original foi baixado do Drive e é mantido **intacto** neste
repositório: nenhum script escreve nele.

## Como os derivados são gerados

```bash
python scripts/extract-identity-assets.py
```

O script:

1. abre o arquivo aprovado em modo leitura;
2. recorta a área do logotipo (janela `30,45 → 688,495`) parando antes do painel
   azul-marinho da apresentação, que também tem uma proteção contra colunas
   residuais da borda;
3. estima o fundo claro por ajuste de plano (o fundo da apresentação é um
   gradiente suave) e gera um canal alfa, preservando as cores originais;
4. separa o monograma do logotipo completo pela faixa vazia entre eles;
5. grava os derivados, o ícone, o favicon, a imagem de Open Graph e as
   validações visuais.

Nada é redesenhado, recolorido ou reescrito: o script só recorta, remove o
fundo e recompõe os mesmos elementos. O monograma é um desenho vazado (o fundo
aparece por dentro das letras), o que faz a extração transparente ficar
idêntica ao uso sobre fundo claro e sobre fundo azul-marinho — validado
comparando o resultado com o painel escuro da própria apresentação.

## Arquivos gerados

| Arquivo | Tamanho | Uso |
| --- | --- | --- |
| `public/brand/bujosa-clima-logo.png` / `.webp` / `.avif` | 589 × 392 | Logotipo completo (monograma + BUJOSA CLIMA + assinatura) |
| `public/brand/bujosa-clima-simbolo.png` / `.webp` / `.avif` | 391 × 254 | Monograma BC isolado |
| `public/brand/bujosa-clima-simbolo-chip.png` | 512 × 512 | Monograma sobre pastilha branco-gelo com cantos arredondados |
| `public/icon-512.png`, `public/icon-192.png`, `public/apple-touch-icon.png` | 512 / 192 / 180 | Ícones de aplicativo |
| `public/favicon.ico` | 16 / 32 / 48 | Favicon |
| `public/og-bujosa-clima.png` | 1200 × 630 | Pré-visualização em redes sociais |

## Onde cada peça é usada no site

| Peça | Local |
| --- | --- |
| Monograma | Cabeçalho (34 px de altura) |
| Logotipo completo | Rodapé, sobre pastilha branco-gelo (`#F5FAFC`) |
| Ícone + favicon | Aba do navegador, atalhos, iOS |
| Imagem OG | Open Graph e Twitter Card, também referenciada nos dados estruturados |

## Validação visual

Em `docs/identidade/validacao/`:

- `simbolo-sobre-navy-vs-painel-aprovado.png` — monograma extraído aplicado
  sobre `#102B46` ao lado do painel escuro original da apresentação. É o teste
  de fidelidade da extração.
- `lockup-sobre-branco-gelo.png` — logotipo completo sobre `#F5FAFC`.

## Situação da aprovação

Pendente de aprovação formal. Os derivados são usados na versão em
desenvolvimento para que a identidade apareça correta desde a primeira
revisão, mas a extração ainda não foi validada por você. Se algo precisar
mudar (recorte, margens, qual variação usar no cabeçalho), os ajustes ficam
concentrados em `scripts/extract-identity-assets.py` — o arquivo aprovado
continua intocado.

Observação de uso: a apresentação aprovada traz as variações horizontal,
vertical, ícone e monocromática. A horizontal só existe em baixa resolução
(~230 × 110 px), insuficiente para um logotipo nítido em telas retina, e por
isso o cabeçalho usa o monograma (equivalente à variação "ícone" aprovada) em
vez de uma versão horizontal reconstruída — reconstruir a assinatura seria
reinterpretar a marca.
