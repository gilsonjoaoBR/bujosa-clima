import { ChevronDown } from 'lucide-react';

import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { faq } from '@/content/faq';
import { sections } from '@/content/site';

export function FaqSection() {
  return (
    <Section id="duvidas" tone="ice" labelledBy="duvidas-titulo">
      <SectionHeading
        id="duvidas-titulo"
        eyebrow={sections.faq.eyebrow}
        title={sections.faq.title}
        description={sections.faq.description}
      />

      <div className="mx-auto mt-10 max-w-3xl divide-y divide-navy/10 overflow-hidden rounded-3xl border border-navy/10 bg-white shadow-card">
        {faq.map((item) => (
          <details key={item.question} className="group px-6 py-1">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-base font-semibold text-navy marker:hidden">
              {item.question}
              <ChevronDown
                aria-hidden
                className="size-5 shrink-0 text-brand transition duration-200 group-open:rotate-180"
              />
            </summary>
            <p className="pb-5 text-sm leading-relaxed text-navy/70">{item.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
