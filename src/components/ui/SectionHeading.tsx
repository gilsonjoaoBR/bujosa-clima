import { cx } from '@/lib/cx';

export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  align = 'center',
  tone = 'light',
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  id?: string;
  align?: 'center' | 'left';
  tone?: 'light' | 'dark';
}) {
  return (
    <div
      className={cx(
        'max-w-2xl',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
      )}
    >
      {eyebrow ? (
        <p
          className={cx(
            'text-xs font-semibold tracking-[0.18em] uppercase',
            tone === 'dark' ? 'text-teal' : 'text-brand',
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className={cx(
          'mt-3 text-3xl sm:text-4xl',
          tone === 'dark' ? 'text-white' : 'text-navy',
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cx(
            'mt-4 text-base leading-relaxed',
            tone === 'dark' ? 'text-ice/80' : 'text-navy/70',
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
