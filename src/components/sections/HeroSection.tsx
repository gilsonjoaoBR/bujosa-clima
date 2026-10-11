import { ArrowRight, CircleCheck, MapPin } from 'lucide-react';

import { Container } from '@/components/ui/Container';
import { Cta } from '@/components/ui/Cta';
import { Photo } from '@/components/ui/Photo';
import { WhatsAppCta } from '@/components/ui/WhatsAppCta';
import { hero, site } from '@/content/site';
import { buildGeneralQuoteMessage } from '@/lib/whatsapp';

export function HeroSection() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-ice pt-12 pb-16 sm:pt-16 sm:pb-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-24 size-[26rem] rounded-full bg-linear-to-br from-brand/15 to-teal/20 blur-3xl"
      />

      <Container className="relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="animate-rise">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white px-4 py-1.5 text-xs font-semibold text-brand">
            <MapPin aria-hidden className="size-3.5" />
            {hero.eyebrow}
          </p>

          <h1 className="mt-6 text-4xl leading-[1.12] sm:text-5xl">{hero.title}</h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-navy/70 sm:text-lg">
            {hero.subtitle}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <WhatsAppCta message={buildGeneralQuoteMessage()} size="lg" />
            <Cta
              href="#servicos"
              variant="secondary"
              size="lg"
              icon={<ArrowRight aria-hidden className="size-4" />}
            >
              {hero.secondaryCta}
            </Cta>
          </div>

          <ul className="mt-9 grid gap-3">
            {hero.highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-2.5 text-sm text-navy/75">
                <CircleCheck aria-hidden className="mt-0.5 size-4 shrink-0 text-teal" />
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="relative aspect-4/3 overflow-hidden rounded-3xl border border-white shadow-float">
            <Photo assetId="hero" alt={hero.imageAlt} priority />
          </div>

          <div className="absolute bottom-4 left-4 rounded-2xl bg-white/95 px-4 py-3 shadow-card backdrop-blur">
            <p className="text-[0.65rem] font-semibold tracking-[0.16em] text-brand uppercase">
              Área de atendimento
            </p>
            <p className="mt-1 text-sm font-medium text-navy">
              {site.cities.map((city) => city.name).join(' • ')}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
