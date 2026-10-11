# Crédito institucional da Acritech

## Padrão utilizado

O crédito segue o **mesmo padrão já usado nos projetos da Acritech**, apontado
por você: `C:\dev\beatriz-centro-cirurgico`, arquivo
`src/components/AcritechCredit.jsx` com as classes `.acritech-badge*` de
`src/index.css`.

Esse padrão não existe em `C:\dev\Acritech`, `C:\dev\acritech-agenda` nem
`C:\dev\acritech-reviews` — a referência do Beatriz Centro Cirúrgico é a que
está viva e foi replicada aqui. A inspeção foi somente leitura; nada foi
alterado naquele projeto.

O componente é o mesmo: um link para `https://acritech.com.br` com o texto
"Desenvolvido por" seguido do logotipo oficial, com as props `theme`
(`dark`/`light`) e `mode` (`standard`/`compact`).

## Arquivo do logotipo

| Item | Valor |
| --- | --- |
| Arquivo usado | `public/brand/acritech-logo-transparent.png` |
| Origem | `C:\dev\beatriz-centro-cirurgico\public\brand\acritech-logo-transparent.png` |
| Dimensões | 500 × 500 px, RGBA (fundo transparente) |
| Área visível da arte | 436 × 224 px (faixa central) |
| Tamanho / SHA-256 | 70.054 bytes / `6300C4BBCF06F33CCEF0F23353C81D7C8BF5A8FCD852C7AD11B8D673888742FF` |

O arquivo é uma cópia fiel: nenhum redesenho, nenhuma alteração de cor e
nenhuma conversão de formato. O recorte da assinatura é feito por CSS
(`.acritech-badge__logo`), exatamente como no projeto de referência, então o PNG
original permanece intacto.

## Onde está no projeto

- `src/components/ui/AcritechCredit.tsx` — o componente.
- `src/index.css`, bloco `@layer components` — classes `.acritech-badge`,
  `.acritech-badge--dark`, `.acritech-badge--light`, `.acritech-badge--standard`,
  `.acritech-badge--compact` e `.acritech-badge__logo`.

Duas adaptações em relação à referência:

1. o alinhamento vertical do selo fica com o contêiner (`items-center`), sem as
   classes `self-start sm:self-auto`, que existiam para o rodapé daquele
   projeto;
2. o selo do modo `standard` (usado neste rodapé) foi ampliado a pedido: janela
   de 70 × 38 px sobre a imagem em 76 × 76 px, deslocada em
   `translate(-3px, -18.7px)`. O recorte foi recalculado para a arte aparecer
   inteira, com cerca de 2 px de respiro em cada lado — a versão anterior de
   58 × 26 px cortava aproximadamente 2 px da base da arte. O modo `compact`
   continua com as medidas originais da referência (58 × 26 px / 62 × 62 px).

A técnica de recorte, a transição de cor e a estrutura do componente seguem
idênticas ao padrão.

## Posição no rodapé

O crédito fica **na mesma linha** do copyright e do link de política de
privacidade, centralizado entre os dois:

```
© 2026 Bujosa Clima. Todos os direitos reservados.    Desenvolvido por [ACRITECH]    Política de privacidade
```

No desktop a linha usa `grid-cols-[1fr_auto_1fr]`: copyright à esquerda,
crédito na coluna central e link de privacidade à direita — assim o crédito
fica centralizado em relação à página, e não apenas no espaço livre. No celular
os três itens ficam empilhados e centralizados.

Medições feitas no Chrome a 1440 px: centro do crédito em 720 px com a página
centralizada em 720 px, na mesma linha do copyright e do link (o selo é mais
alto por causa da área de toque de 40 px). A 390 px o crédito fica centralizado
(195 de 195) e nada fica escondido atrás do botão fixo de WhatsApp.

Capturas: `docs/validacao/desktop-rodape-1440.png` e
`docs/validacao/mobile-rodape-390.png`.

## Como trocar

```tsx
<AcritechCredit theme="dark" mode="standard" />
```

- `theme="light"` usa o tom escuro, para rodapés claros;
- `mode="compact"` usa o selo menor (medidas originais da referência);
- `href` e `logoSrc` podem ser sobrescritos por prop, como no padrão original.
