import { CircleCheck } from 'lucide-react';

import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { WhatsAppCta } from '@/components/ui/WhatsAppCta';
import { services } from '@/content/services';
import { sections } from '@/content/site';
import { buildServiceQuoteMessage } from '@/lib/whatsapp';

export function ServicesSection() {
  return (
    <Section id="servicos" tone="white" labelledBy="servicos-titulo">
      <SectionHeading
        id="servicos-titulo"
        eyebrow={sections.services.eyebrow}
        title={sections.services.title}
        description={sections.services.description}
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const Icon = service.icon;

          return (
            <article
              key={service.id}
              className="flex h-full flex-col rounded-3xl border border-navy/10 bg-ice/60 p-7 shadow-card transition hover:-translate-y-1 hover:border-brand/30 hover:shadow-float motion-reduce:hover:translate-y-0"
            >
              <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-linear-to-br from-brand to-teal text-white">
                <Icon aria-hidden className="size-6" />
              </span>

              <h3 className="mt-5 text-xl text-navy">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-navy/70">{service.summary}</p>

              <ul className="mt-5 grid gap-2.5 text-sm text-navy/75">
                {service.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2">
                    <CircleCheck aria-hidden className="mt-0.5 size-4 shrink-0 text-teal" />
                    {bullet}
                  </li>
                ))}
              </ul>

              <div className="mt-7 pt-1">
                <WhatsAppCta
                  message={buildServiceQuoteMessage(service.title)}
                  variant="secondary"
                  className="w-full"
                >
                  Solicitar orçamento
                </WhatsAppCta>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
