import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Photo } from '@/components/ui/Photo';
import { differentials } from '@/content/differentials';
import { sections } from '@/content/site';

export function DifferentialsSection() {
  return (
    <Section id="sobre" tone="ice" labelledBy="sobre-titulo">
      <SectionHeading
        id="sobre-titulo"
        eyebrow={sections.differentials.eyebrow}
        title={sections.differentials.title}
        description={sections.differentials.description}
      />

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {differentials.map((item) => {
          const Icon = item.icon;

          return (
            <li
              key={item.title}
              className="rounded-3xl border border-navy/10 bg-white p-6 shadow-card"
            >
              <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-ice text-brand">
                <Icon aria-hidden className="size-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-navy">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy/70">{item.description}</p>
            </li>
          );
        })}

        <li className="overflow-hidden rounded-3xl border border-white shadow-card">
          <div className="aspect-4/3 sm:aspect-auto sm:h-full sm:min-h-56">
            <Photo
              assetId="comercial"
              alt="Ambiente comercial com ar-condicionado split instalado na parede"
            />
          </div>
        </li>
      </ul>
    </Section>
  );
}
