import { whatsappNumberRaw } from './env';
import { normalizePhoneNumber } from './whatsapp';

/**
 * Dígitos do WhatsApp resolvidos no build. Quando null, o site não cria nenhum
 * link wa.me e os botões de orçamento levam ao formulário da página.
 */
export const whatsappDigits = normalizePhoneNumber(whatsappNumberRaw);

export const isWhatsAppEnabled = whatsappDigits !== null;
