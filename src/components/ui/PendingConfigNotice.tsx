import { TriangleAlert } from 'lucide-react';

import { isDev } from '@/lib/env';
import { isWhatsAppEnabled } from '@/lib/whatsapp-config';

/**
 * Estado de configuração pendente, exibido apenas em desenvolvimento.
 * Em produção, os botões de WhatsApp simplesmente levam ao formulário.
 */
export function PendingConfigNotice() {
  if (isWhatsAppEnabled || !isDev) {
    return null;
  }

  return (
    <div
      role="status"
      className="flex items-start gap-2 bg-navy px-5 py-2.5 text-xs leading-relaxed text-ice/90 sm:justify-center"
    >
      <TriangleAlert aria-hidden className="mt-0.5 size-4 shrink-0 text-teal" />
      <p>
        <span className="font-semibold">Configuração pendente:</span> defina{' '}
        <code className="rounded bg-white/10 px-1 py-0.5">VITE_WHATSAPP_NUMBER</code> no{' '}
        <code className="rounded bg-white/10 px-1 py-0.5">.env</code> para ativar os links de
        WhatsApp. Sem número válido, os botões de orçamento levam ao formulário da página.
      </p>
    </div>
  );
}
