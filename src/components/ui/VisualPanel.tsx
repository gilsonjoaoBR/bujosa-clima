import { cx } from '@/lib/cx';

type Variant = 'hero' | 'ambient' | 'detail';

const gradients: Record<Variant, string> = {
  hero: 'from-navy via-navy to-brand',
  ambient: 'from-navy-soft via-navy to-teal',
  detail: 'from-teal via-brand to-navy',
};

/**
 * Bloco visual desenhado em SVG com as cores institucionais. Substitui a foto
 * apenas enquanto não existem fotos próprias aprovadas — não imita fotografia
 * e não reproduz o monograma.
 */
export function VisualPanel({
  variant = 'hero',
  className,
}: {
  variant?: Variant;
  className?: string;
}) {
  const id = `visual-${variant}`;

  return (
    <div className={cx('relative size-full overflow-hidden', className)}>
      <div className={cx('absolute inset-0 bg-linear-to-br', gradients[variant])} />

      <svg
        aria-hidden
        viewBox="0 0 1200 900"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 size-full"
      >
        <defs>
          <linearGradient id={`${id}-wave-a`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#27A6A0" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#087EAF" stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id={`${id}-wave-b`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#F5FAFC" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#F5FAFC" stopOpacity="0.08" />
          </linearGradient>
          <radialGradient id={`${id}-glow`} cx="0.8" cy="0.15" r="0.7">
            <stop offset="0%" stopColor="#F5FAFC" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#F5FAFC" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="1200" height="900" fill={`url(#${id}-glow)`} />

        <g transform="translate(0 430)">
          <path
            d="M-40 120 C 220 20, 420 220, 700 140 C 940 72, 1080 150, 1240 96 L 1240 470 L -40 470 Z"
            fill={`url(#${id}-wave-a)`}
            opacity="0.9"
          />
          <path
            d="M-40 190 C 240 110, 460 280, 720 210 C 960 148, 1080 214, 1240 168 L 1240 470 L -40 470 Z"
            fill={`url(#${id}-wave-b)`}
          />
        </g>

        <g transform="translate(300 180)">
          <rect
            width="600"
            height="150"
            rx="28"
            fill="#F5FAFC"
            fillOpacity="0.14"
            stroke="#F5FAFC"
            strokeOpacity="0.5"
            strokeWidth="4"
          />
          <rect x="40" y="104" width="520" height="10" rx="5" fill="#F5FAFC" fillOpacity="0.55" />
          <rect x="40" y="38" width="330" height="12" rx="6" fill="#F5FAFC" fillOpacity="0.35" />
          <g stroke="#F5FAFC" strokeOpacity="0.45" strokeWidth="6" strokeLinecap="round">
            <path d="M180 250c0 26-26 34-26 58" />
            <path d="M300 250c0 26-26 34-26 58" />
            <path d="M420 250c0 26-26 34-26 58" />
          </g>
        </g>
      </svg>
    </div>
  );
}
