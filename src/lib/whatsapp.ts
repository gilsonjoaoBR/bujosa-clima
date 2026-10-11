const BRAZIL_COUNTRY_CODE = '55';
const MOBILE_NINTH_DIGIT = '9';

export type QuoteRequestInput = {
  name: string;
  whatsapp: string;
  city: string;
  neighborhood?: string;
  service: string;
  equipment?: string;
  brand?: string;
  capacity?: string;
  technology?: string;
  unitDistance?: string;
  propertyType?: string;
  electricalPoint?: string;
  accessConditions?: string;
  description: string;
};

export const QUOTE_GREETING =
  'Olá! Vim pelo site da Bujosa Clima e gostaria de solicitar um orçamento';

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
  return `${QUOTE_GREETING} para instalação, manutenção ou higienização de ar-condicionado.`;
}

export function buildServiceQuoteMessage(subject: string): string {
  return `${QUOTE_GREETING} para ${subject}.`;
}

/** Acrescenta apenas as linhas realmente preenchidas, com marcador de item. */
function optionalLines(
  entries: ReadonlyArray<readonly [string, string | undefined]>,
): string[] {
  return entries
    .map(([label, value]) => [label, (value ?? '').trim()] as const)
    .filter(([, value]) => value.length > 0)
    .map(([label, value]) => `- ${label}: ${value}`);
}

export function buildQuoteMessage(input: QuoteRequestInput): string {
  const lines = [
    `${QUOTE_GREETING}.`,
    '',
    `Nome: ${input.name.trim()}`,
    `WhatsApp: ${input.whatsapp.trim()}`,
    `Cidade: ${input.city.trim()}`,
  ];

  const neighborhood = input.neighborhood?.trim();
  if (neighborhood) {
    lines.push(`Bairro: ${neighborhood}`);
  }

  lines.push(`Serviço desejado: ${input.service.trim()}`);

  const equipmentLines = optionalLines([
    ['Modelo', input.equipment],
    ['Marca', input.brand],
    ['Capacidade', input.capacity],
    ['Tecnologia', input.technology],
    ['Distância aproximada entre as unidades', input.unitDistance],
  ]);

  if (equipmentLines.length > 0) {
    lines.push('', 'Equipamento', ...equipmentLines);
  }

  const locationLines = optionalLines([
    ['Tipo de imóvel', input.propertyType],
    ['Ponto elétrico adequado', input.electricalPoint],
    ['Acesso e condições de instalação', input.accessConditions],
  ]);

  if (locationLines.length > 0) {
    lines.push('', 'Local', ...locationLines);
  }

  lines.push('', `Necessidade: ${input.description.trim()}`);

  return lines.join('\n');
}
