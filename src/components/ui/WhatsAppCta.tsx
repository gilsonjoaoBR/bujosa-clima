import { MessageCircle } from 'lucide-react';
import type { ReactNode } from 'react';

import { buildWhatsAppLink } from '@/lib/whatsapp';
import { whatsappDigits } from '@/lib/whatsapp-config';
import { Cta, type CtaSize, type CtaVariant } from './Cta';

type WhatsAppCtaProps = {
  message: string;
  children?: ReactNode;
  variant?: CtaVariant;
  size?: CtaSize;
  className?: string;
  icon?: ReactNode;
};

/**
 * Só renderiza um link wa.me quando existe número válido configurado.
 * Caso contrário, leva o visitante ao formulário da própria página — nenhum
 * botão abre um contato inexistente.
 */
export function WhatsAppCta({
  message,
  children = 'Solicitar orçamento',
  variant = 'primary',
  size = 'md',
  className,
  icon = <MessageCircle aria-hidden className="size-4" />,
}: WhatsAppCtaProps) {
  const link = buildWhatsAppLink(whatsappDigits, message);

  return (
    <Cta
      href={link ?? '#contato'}
      external={link !== null}
      variant={variant}
      size={size}
      className={className}
      icon={icon}
    >
      {children}
    </Cta>
  );
}
