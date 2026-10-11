import { MapPin } from 'lucide-react';

import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { WhatsAppCta } from '@/components/ui/WhatsAppCta';
import { sections, site } from '@/content/site';
import { buildGeneralQuoteMessage } from '@/lib/whatsapp';

export function ServiceAreaSection() {
  return (
    <Section id="atendimento" tone="white" labelledBy="atendimento-titulo">
      <SectionHeading
        id="atendimento-titulo"
        eyebrow={sections.area.eyebrow}
        title={sections.area.title}
        description={sections.area.description}
      />

      <ul className="mt-12 grid gap-5 sm:grid-cols-3">
        {site.cities.map((city) => (
          <li
            key={city.name}
            className="flex items-center gap-4 rounded-3xl border border-navy/10 bg-ice/60 p-6 shadow-card"
          >
            <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-brand to-teal text-white">
              <MapPin aria-hidden className="size-5" />
            </span>
            <div>
              <p className="text-base font-semibold text-navy">{city.name}</p>
              <p className="text-sm text-navy/60">Rio de Janeiro — {city.state}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-col items-start gap-5 rounded-3xl border border-brand/15 bg-ice px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-2xl text-sm leading-relaxed text-navy/75">{site.serviceAreaNote}</p>
        <WhatsAppCta message={buildGeneralQuoteMessage()} className="shrink-0">
          Confirmar atendimento
        </WhatsAppCta>
      </div>
    </Section>
  );
}
