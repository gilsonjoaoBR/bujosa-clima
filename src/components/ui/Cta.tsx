import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { cx } from '@/lib/cx';

export type CtaVariant = 'primary' | 'secondary' | 'ghost' | 'inverse';
export type CtaSize = 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-55';

const variantClasses: Record<CtaVariant, string> = {
  primary:
    'bg-linear-to-r from-brand to-teal text-white shadow-card hover:from-brand-strong hover:to-teal-strong hover:shadow-float',
  secondary:
    'border border-navy/15 bg-white text-navy hover:border-brand/45 hover:text-brand hover:shadow-card',
  ghost: 'text-navy hover:text-brand',
  inverse: 'bg-white text-navy hover:bg-ice-deep',
};

const sizeClasses: Record<CtaSize, string> = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

type CtaProps = {
  variant?: CtaVariant;
  size?: CtaSize;
  className?: string;
  children: ReactNode;
  icon?: ReactNode;
  href?: string;
  external?: boolean;
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
};

export function Cta({
  variant = 'primary',
  size = 'md',
  className,
  children,
  icon,
  href,
  external = false,
  type = 'button',
  onClick,
  disabled = false,
}: CtaProps) {
  const classes = cx(base, variantClasses[variant], sizeClasses[size], className);
  const content = (
    <>
      {icon}
      <span>{children}</span>
    </>
  );

  if (href && !disabled) {
    if (href.startsWith('/') || href.startsWith('#')) {
      const to = href.startsWith('#') ? { pathname: '/', hash: href } : href;

      return (
        <Link to={to} className={classes}>
          {content}
        </Link>
      );
    }

    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {content}
    </button>
  );
}
