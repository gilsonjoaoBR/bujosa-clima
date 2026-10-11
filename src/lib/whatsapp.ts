const BRAZIL_COUNTRY_CODE = '55';
const MOBILE_NINTH_DIGIT = '9';

export type QuoteRequestInput = {
  name: string;
  whatsapp: string;
  city: string;
  service: string;
  equipment?: string;
  description: string;
};

/**
 * Aceita um número em formatos livres ("+55 (21) 99999-9999", "5521999999999",
 * "005521999999999") e devolve apenas os dígitos no padrão E.164, ou null
 * quando o valor não é um número brasileiro válido.
 */
export function normalizePhoneNumber(raw?: string | null): string | null {
  if (!raw) {
    return null;
  }

  const digits = raw.replace(/\D+/g, '');
  const withoutInternationalPrefix = digits.startsWith('00') ? digits.slice(2) : digits;

  if (!withoutInternationalPrefix.startsWith(BRAZIL_COUNTRY_CODE)) {
    return null;
  }

  const nationalNumber = withoutInternationalPrefix.slice(BRAZIL_COUNTRY_CODE.length);
  const isLandline = nationalNumber.length === 10;
  const isMobile = nationalNumber.length === 11 && nationalNumber[2] === MOBILE_NINTH_DIGIT;

  if (!isLandline && !isMobile) {
    return null;
  }

  return withoutInternationalPrefix;
}

export function isWhatsAppConfigured(raw?: string | null): boolean {
  return normalizePhoneNumber(raw) !== null;
}

/**
 * Monta o link do WhatsApp. Devolve null quando não existe número válido
 * configurado, para que nenhum botão abra um contato inexistente.
 */
export function buildWhatsAppLink(number: string | null, message: string): string | null {
  const digits = normalizePhoneNumber(number);

  if (!digits) {
    return null;
  }

  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function buildGeneralQuoteMessage(): string {
  return 'Olá, Bujosa Clima! Gostaria de solicitar um orçamento.';
}

export function buildServiceQuoteMessage(serviceTitle: string): string {
  return `Olá, Bujosa Clima! Gostaria de solicitar um orçamento de ${serviceTitle.toLowerCase()}.`;
}

export function buildQuoteMessage(input: QuoteRequestInput): string {
  const lines = [
    'Olá, Bujosa Clima! Gostaria de solicitar um orçamento.',
    '',
    `Nome: ${input.name.trim()}`,
    `WhatsApp: ${input.whatsapp.trim()}`,
    `Cidade: ${input.city.trim()}`,
    `Serviço desejado: ${input.service.trim()}`,
  ];

  const equipment = input.equipment?.trim();
  if (equipment) {
    lines.push(`Modelo/capacidade do equipamento: ${equipment}`);
  }

  lines.push('', `Necessidade: ${input.description.trim()}`);

  return lines.join('\n');
}
