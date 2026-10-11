# Crédito institucional da Acritech (proposta)

## O que foi inspecionado

Inspeção **somente leitura** dos projetos locais da Acritech:

| Projeto | Resultado |
| --- | --- |
| `C:\dev\Acritech` (site institucional) | Rodapé em `src/components/Footer.jsx` com logo, descrição, páginas e bloco de contato — **não** existe linha de crédito "Desenvolvido por" |
| `C:\dev\acritech-agenda` | Nenhum componente de crédito institucional |
| `C:\dev\acritech-reviews` | Nenhum componente de crédito institucional (apenas rodapé de privacidade em HTML) |

Ou seja: **não existe um padrão de crédito pronto para reutilizar**. Como o
prompt pede aprovação antes de criar uma assinatura diferente, o que está no
rodapé é uma **proposta**.

## Identidade da Acritech usada como base

| Item | Valor |
| --- | --- |
| Logotipo oficial | `C:\dev\Acritech\src\assets\logo-acritech.png` (também em `public/logo-acritech.png`, arquivos idênticos) |
| Dimensões originais | 4268 × 2134 px, RGBA |
| SHA-256 do original | `5F5582FA44F45617512423FAB49ABA786FA6FC27D8389F08C1577E7A8E37E731` |
| Cor de marca | azul `#337ab7` (borda do logotipo, conforme `tailwind.config.js` e `index.css`) |
| Cinza institucional | `#565656` (fundo do logotipo e do rodapé do site da Acritech) |
| Tipografia | Inter (site institucional) |
| Contato oficial | WhatsApp `+55 (21) 98417-3233`, `contato@acritech.com.br`, `https://acritech.com.br` |

O arquivo original **não foi alterado**: a peça do crédito é gerada por
`scripts/prepare-acritech-credit.py`, que apenas lê o PNG oficial e grava uma
cópia redimensionada (360 px de largura) em `public/brand/acritech-logo.*`
(PNG, WebP e AVIF). Nenhum desenho, cor ou proporção foi modificado.

## Proposta aplicada

Linha discreta, centralizada na parte inferior do rodapé, abaixo do copyright
e do link de privacidade:

- logotipo oficial da Acritech com 26 px de altura, cantos levemente
  arredondados para acompanhar o formato original;
- texto "Desenvolvido por **Acritech**" em corpo pequeno, na mesma escala das
  demais linhas do rodapé;
- link para `https://acritech.com.br/` abrindo em nova aba, com nome acessível
  completo ("Desenvolvido por Acritech — Produtos e Soluções Tecnológicas");
- o logotipo é decorativo para leitores de tela (`alt=""`), porque o nome está
  no texto do link.

Sobre a tipografia: o nome "ACRITECH" já vive dentro do arquivo do logotipo,
que é usado sem alteração. O texto ao redor usa a tipografia do próprio site
da Bujosa Clima, como acontece no rodapé do site da Acritech, que usa Inter em
todo o conteúdo e reserva a marca para o arquivo do logotipo.

## Alternativas, se a proposta não for aprovada

1. Somente texto, sem logotipo: "Desenvolvido por Acritech", em azul `#337ab7`.
2. Logotipo apenas, sem texto, com `aria-label`.
3. Manter o crédito no rodapé do site da Acritech como padrão e replicar
   exatamente aquele bloco (logo + nome completo "Acritech Produtos e Soluções
   Tecnológicas").
4. Remover o crédito por completo (basta apagar o bloco e o componente).

## Situação

Aguardando aprovação. Enquanto não houver confirmação, o crédito permanece
como está (discreto, legível e sem alterar a marca).
