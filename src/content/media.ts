/**
 * Fotos do site.
 *
 * Os arquivos devem ficar em `public/images/` com nomes estáveis, em três
 * formatos: `<base>.avif`, `<base>.webp` e `<base>.jpg`.
 *
 * Enquanto `enabled` for `false`, o bloco visual desenhado em CSS/SVG é
 * exibido no lugar. Isso evita apresentar fotos genéricas como se fossem da
 * operação real da Bujosa Clima: quando as fotos próprias (ou aprovadas)
 * estiverem prontas, basta colocá-las na pasta e trocar o valor para `true`.
 */
export const photoAssets = {
  hero: {
    enabled: false,
    base: '/images/hero-climatizacao-split',
    width: 1200,
    height: 900,
    visual: 'hero',
  },
  comercial: {
    enabled: false,
    base: '/images/comercial-climatizacao',
    width: 1200,
    height: 900,
    visual: 'ambient',
  },
  higienizacao: {
    enabled: false,
    base: '/images/higienizacao-split',
    width: 1200,
    height: 900,
    visual: 'detail',
  },
} as const;

export type PhotoAssetId = keyof typeof photoAssets;
