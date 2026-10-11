import { MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

import { BrandLogo } from '@/components/ui/BrandLogo';
import { AcritechCredit } from '@/components/ui/AcritechCredit';
import { Container } from '@/components/ui/Container';
import { services } from '@/content/services';
import { site } from '@/content/site';
import { buildGeneralQuoteMessage, buildWhatsAppLink } from '@/lib/whatsapp';
import { whatsappDigits } from '@/lib/whatsapp-config';

export function SiteFooter() {
  const year = new Date().getFullYear();
  const whatsappLink = buildWhatsAppLink(whatsappDigits, buildGeneralQuoteMessage());

  return (
    <footer className="bg-navy text-ice">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="inline-flex rounded-2xl bg-ice p-4">
              <BrandLogo variant="lockup" height={70} />
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ice/70">
              {site.shortDescription}
            </p>
          </div>

          <nav aria-label="Serviços">
            <h2 className="text-sm font-semibold tracking-wide text-white uppercase">Serviços</h2>
            <ul className="mt-4 space-y-2 text-sm text-ice/75">
              {services.map((service) => (
                <li key={service.id}>
                  <Link className="transition hover:text-white" to="/#servicos">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold tracking-wide text-white uppercase">
              Atendimento
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-ice/75">
              {site.cities.map((city) => (
                <li key={city.name}>
                  {city.name} — {city.state}
                </li>
              ))}
            </ul>

            <h2 className="mt-6 text-sm font-semibold tracking-wide text-white uppercase">
              Contato
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-ice/75">
              {whatsappLink ? (
                <li>
                  <a
                    className="inline-flex items-center gap-2 transition hover:text-white"
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle aria-hidden className="size-4" />
                    WhatsApp
                  </a>
                </li>
              ) : null}
              <li>
                <Link className="transition hover:text-white" to="/#contato">
                  Formulário de orçamento
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-ice/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. Todos os direitos reservados.
          </p>
          <Link className="transition hover:text-white" to="/privacidade">
            Política de privacidade
          </Link>
        </div>

        <div className="mt-8 flex justify-center">
          <AcritechCredit />
        </div>
      </Container>
    </footer>
  );
}
