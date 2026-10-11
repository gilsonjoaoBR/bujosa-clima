type LocalBusinessSchemaInput = {
  siteUrl: string;
  telephone?: string | null;
};

const CITIES = [
  { name: 'Maricá', state: 'RJ' },
  { name: 'São Gonçalo', state: 'RJ' },
  { name: 'Niterói', state: 'RJ' },
] as const;

const SERVICE_NAMES = [
  'Instalação de ar-condicionado split',
  'Manutenção preventiva e corretiva de ar-condicionado',
  'Higienização de ar-condicionado',
] as const;

/**
 * Dados estruturados com apenas informações confirmadas: não há endereço,
 * coordenadas, horário de funcionamento, avaliações ou preços. O telefone só é
 * publicado quando um número válido está configurado no build.
 */
export function buildLocalBusinessSchema({
  siteUrl,
  telephone,
}: LocalBusinessSchemaInput): Record<string, unknown> {
  const base = siteUrl.replace(/\/+$/, '');

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'HVACBusiness',
    '@id': `${base}/#bujosa-clima`,
    name: 'Bujosa Clima',
    alternateName: 'Bujosa Clima — Soluções em Climatização',
    url: `${base}/`,
    image: `${base}/og-bujosa-clima.png`,
    logo: `${base}/brand/bujosa-clima-logo.png`,
    description:
      'Instalação, manutenção preventiva e corretiva e higienização de ar-condicionado split em Maricá, São Gonçalo e Niterói (RJ).',
    areaServed: CITIES.map((city) => ({
      '@type': 'City',
      name: city.name,
      address: {
        '@type': 'PostalAddress',
        addressLocality: city.name,
        addressRegion: city.state,
        addressCountry: 'BR',
      },
    })),
    knowsAbout: SERVICE_NAMES,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Serviços de climatização',
      itemListElement: SERVICE_NAMES.map((name) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name },
      })),
    },
  };

  if (telephone) {
    schema.telephone = `+${telephone}`;
    schema.contactPoint = {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: `+${telephone}`,
      availableLanguage: 'Portuguese',
    };
  }

  return schema;
}
