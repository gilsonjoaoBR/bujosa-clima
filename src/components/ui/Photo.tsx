import { useState } from 'react';

import { photoAssets, type PhotoAssetId } from '@/content/media';
import { cx } from '@/lib/cx';
import { VisualPanel } from './VisualPanel';

type PhotoProps = {
  assetId: PhotoAssetId;
  alt: string;
  className?: string;
  priority?: boolean;
};

/**
 * Foto do site com degradação elegante: se o arquivo ainda não existe (ou
 * falha ao carregar), o bloco visual institucional assume o lugar.
 */
export function Photo({ assetId, alt, className, priority = false }: PhotoProps) {
  const [hasFailed, setHasFailed] = useState(false);
  const asset = photoAssets[assetId];

  if (!asset.enabled || hasFailed) {
    return <VisualPanel variant={asset.visual} className={className} />;
  }

  return (
    <picture>
      <source srcSet={`${asset.base}.avif`} type="image/avif" />
      <source srcSet={`${asset.base}.webp`} type="image/webp" />
      <img
        src={`${asset.base}.jpg`}
        alt={alt}
        width={asset.width}
        height={asset.height}
        className={cx('size-full object-cover', className)}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        {...(priority ? { fetchPriority: 'high' as const } : {})}
        onError={() => setHasFailed(true)}
      />
    </picture>
  );
}
