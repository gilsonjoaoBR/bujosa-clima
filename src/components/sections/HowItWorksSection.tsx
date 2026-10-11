import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { sections } from '@/content/site';
import { steps } from '@/content/steps';

export function HowItWorksSection() {
  return (
    <Section id="como-funciona" tone="white" labelledBy="como-funciona-titulo">
      <SectionHeading
        id="como-funciona-titulo"
        eyebrow={sections.steps.eyebrow}
        title={sections.steps.title}
        description={sections.steps.description}
      />

      <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <li
              key={step.title}
              className="relative rounded-3xl border border-navy/10 bg-ice/60 p-6 shadow-card"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-white text-brand shadow-sm">
                  <Icon aria-hidden className="size-5" />
                </span>
                <span className="text-sm font-semibold text-navy/35">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="mt-4 text-base font-semibold text-navy">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy/70">{step.description}</p>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
