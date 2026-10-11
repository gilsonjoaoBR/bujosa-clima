import { MessageCircle } from 'lucide-react';

import { Cta } from '@/components/ui/Cta';
import { buildGeneralQuoteMessage, buildWhatsAppLink } from '@/lib/whatsapp';
import { whatsappDigits } from '@/lib/whatsapp-config';

/** CTA fixo no celular — só aparece quando existe número configurado. */
export function MobileWhatsAppBar() {
  const link = buildWhatsAppLink(whatsappDigits, buildGeneralQuoteMessage());

  if (!link) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-navy/10 bg-white/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur lg:hidden">
      <Cta
        href={link}
        external
        size="lg"
        className="w-full"
        icon={<MessageCircle aria-hidden className="size-5" />}
      >
        Orçamento pelo WhatsApp
      </Cta>
    </div>
  );
}
