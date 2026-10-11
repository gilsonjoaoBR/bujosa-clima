import type { ReactNode } from 'react';

import { cx } from '@/lib/cx';
import { Container } from './Container';

type Tone = 'ice' | 'white' | 'navy';

const tones: Record<Tone, string> = {
  ice: 'bg-ice text-navy',
  white: 'bg-white text-navy',
  navy: 'bg-navy text-ice',
};

export function Section({
  id,
  tone = 'ice',
  className,
  containerClassName,
  labelledBy,
  children,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  labelledBy?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      // O recuo do cabeçalho fixo vem de `scroll-padding-top` no <html>, que
      // vale tanto para âncoras nativas quanto para `scrollIntoView`.
      className={cx('py-16 sm:py-20', tones[tone], className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
