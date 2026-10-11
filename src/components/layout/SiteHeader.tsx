import { Menu, MessageCircle, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { BrandLogo } from '@/components/ui/BrandLogo';
import { Container } from '@/components/ui/Container';
import { WhatsAppCta } from '@/components/ui/WhatsAppCta';
import { site } from '@/content/site';
import { buildGeneralQuoteMessage } from '@/lib/whatsapp';

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-navy/10 bg-ice/92 backdrop-blur-md">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-full focus:bg-navy focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Ir para o conteúdo
      </a>

      <Container className="flex h-16 items-center justify-between gap-4 lg:h-20">
        <Link
          to="/#inicio"
          className="flex items-center gap-3 rounded-xl"
          aria-label={`${site.name} — início`}
          onClick={() => setIsMenuOpen(false)}
        >
          <BrandLogo variant="mark" height={34} priority />
          <span className="sr-only">{site.name}</span>
        </Link>

        <nav aria-label="Navegação principal" className="hidden items-center gap-1 lg:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              to={`/${item.href}`}
              className="rounded-full px-3 py-2 text-sm font-medium text-navy/80 transition hover:bg-white hover:text-brand"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <WhatsAppCta
            message={buildGeneralQuoteMessage()}
            icon={<MessageCircle aria-hidden className="size-4" />}
          >
            Orçamento pelo WhatsApp
          </WhatsAppCta>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl border border-navy/15 bg-white p-2 text-navy transition hover:border-brand/40 hover:text-brand lg:hidden"
          aria-expanded={isMenuOpen}
          aria-controls="menu-mobile"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? (
            <X aria-hidden className="size-5" />
          ) : (
            <Menu aria-hidden className="size-5" />
          )}
          <span className="sr-only">{isMenuOpen ? 'Fechar menu' : 'Abrir menu'}</span>
        </button>
      </Container>

      {isMenuOpen ? (
        <div id="menu-mobile" className="border-t border-navy/10 bg-white lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                to={`/${item.href}`}
                className="rounded-xl px-3 py-3 text-base font-medium text-navy transition hover:bg-ice"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2">
              <WhatsAppCta
                message={buildGeneralQuoteMessage()}
                size="lg"
                className="w-full"
                icon={<MessageCircle aria-hidden className="size-5" />}
              >
                Orçamento pelo WhatsApp
              </WhatsAppCta>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
