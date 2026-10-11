import { cx } from '@/lib/cx';

const assets = {
  mark: {
    base: '/brand/bujosa-clima-simbolo',
    width: 391,
    height: 254,
    alt: 'Bujosa Clima',
  },
  lockup: {
    base: '/brand/bujosa-clima-logo',
    width: 589,
    height: 392,
    alt: 'Bujosa Clima — Soluções em Climatização',
  },
} as const;

type BrandLogoProps = {
  variant: keyof typeof assets;
  height: number;
  className?: string;
  priority?: boolean;
  alt?: string;
};

/**
 * Renderiza o arquivo de identidade visual derivado da arte aprovada.
 * Nenhum símbolo é recriado: são os mesmos arquivos, apenas recortados.
 */
export function BrandLogo({
  variant,
  height,
  className,
  priority = false,
  alt,
}: BrandLogoProps) {
  const asset = assets[variant];
  const width = Math.round((height * asset.width) / asset.height);

  return (
    <picture>
      <source srcSet={`${asset.base}.avif`} type="image/avif" />
      <source srcSet={`${asset.base}.webp`} type="image/webp" />
      <img
        src={`${asset.base}.png`}
        alt={alt ?? asset.alt}
        width={width}
        height={height}
        style={{ height, width: 'auto' }}
        className={cx('block', className)}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        {...(priority ? { fetchPriority: 'high' as const } : {})}
      />
    </picture>
  );
}
