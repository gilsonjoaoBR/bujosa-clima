# Fotos do site

Esta pasta está vazia de propósito. Enquanto não houver fotos próprias (ou
aprovadas), o site usa blocos visuais desenhados em SVG com as cores
institucionais — nenhuma imagem genérica é apresentada como se fosse da
operação real da Bujosa Clima.

## Como ativar as fotos

1. Coloque os arquivos nesta pasta com estes nomes exatos, em três formatos
   (`avif`, `webp` e `jpg`) partindo da mesma imagem:

| Uso | Arquivos |
| --- | --- |
| Hero principal | `hero-climatizacao-split.avif` / `.webp` / `.jpg` |
| Diferenciais (comercial) | `comercial-climatizacao.avif` / `.webp` / `.jpg` |
| Formulário (higienização) | `higienizacao-split.avif` / `.webp` / `.jpg` |

2. Abra `src/content/media.ts` e mude `enabled: false` para `true` nos itens
   correspondentes.

3. Rode `npm run build` de novo (as fotos ficam em `public/`, então são
   copiadas para `dist/` sem transformação).

## Especificação sugerida

- Proporção 4:3 (o componente reserva essa proporção, evitando mudança de
  layout).
- Lado maior entre 1600 px e 2000 px; qualidade 78–82 no WebP/JPEG.
- Sem pessoas identificáveis como se fossem a equipe da Bujosa Clima.
- Sem textos, marcas de terceiros ou logotipos embutidos na imagem.

Ponto de atenção: as fotos ficam em `public/`, portanto o nome do arquivo não
recebe hash do Vite. Ao substituir uma foto, mantenha o mesmo nome e ajuste o
cache do proxy/CDN se necessário (30 dias pela configuração de Nginx deste
projeto).
