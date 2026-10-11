import { MobileWhatsAppBar } from '@/components/layout/MobileWhatsAppBar';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { DifferentialsSection } from '@/components/sections/DifferentialsSection';
import { FaqSection } from '@/components/sections/FaqSection';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { HowItWorksSection } from '@/components/sections/HowItWorksSection';
import { QuoteFormSection } from '@/components/sections/QuoteFormSection';
import { ServiceAreaSection } from '@/components/sections/ServiceAreaSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { PendingConfigNotice } from '@/components/ui/PendingConfigNotice';
import { site } from '@/content/site';
import { useDocumentMeta } from '@/lib/seo';
import { isWhatsAppEnabled } from '@/lib/whatsapp-config';

const PAGE_TITLE =
  'Bujosa Clima | Instalação, manutenção e higienização de ar-condicionado split';
const PAGE_DESCRIPTION =
  'Instalação, manutenção preventiva e corretiva e higienização de ar-condicionado split em Maricá, São Gonçalo e Niterói (RJ). Atendimento residencial e comercial. Solicite seu orçamento pelo WhatsApp.';

export function LandingPage() {
  useDocumentMeta({ title: PAGE_TITLE, description: PAGE_DESCRIPTION, path: '/' });

  return (
    <div className={isWhatsAppEnabled ? 'pb-24 lg:pb-0' : undefined}>
      <PendingConfigNotice />
      <SiteHeader />

      <main id="conteudo">
        <HeroSection />
        <ServicesSection />
        <DifferentialsSection />
        <HowItWorksSection />
        <ServiceAreaSection />
        <FaqSection />
        <QuoteFormSection />
        <FinalCtaSection />
      </main>

      <SiteFooter />
      <MobileWhatsAppBar />

      <p className="sr-only">
        Bujosa Clima — {site.tagline}. Atendimento em Maricá, São Gonçalo e Niterói, Rio de Janeiro.
      </p>
    </div>
  );
}
