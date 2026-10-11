import { describe, expect, it } from 'vitest';

import { buildLocalBusinessSchema } from './schema';

describe('buildLocalBusinessSchema', () => {
  it('descreve a atividade com as cidades atendidas', () => {
    const schema = buildLocalBusinessSchema({
      siteUrl: 'https://bujosaclima.com.br/',
    }) as {
      url: string;
      areaServed: { name: string }[];
      hasOfferCatalog: { itemListElement: unknown[] };
    };

    expect(schema.url).toBe('https://bujosaclima.com.br/');
    expect(schema.areaServed.map((city) => city.name)).toEqual([
      'Maricá',
      'São Gonçalo',
      'Niterói',
    ]);
    expect(schema.hasOfferCatalog.itemListElement).toHaveLength(3);
  });

  it('não publica telefone quando o número não está configurado', () => {
    const schema = buildLocalBusinessSchema({ siteUrl: 'https://bujosaclima.com.br' });

    expect(schema).not.toHaveProperty('telephone');
    expect(schema).not.toHaveProperty('contactPoint');
  });

  it('não inventa dados não confirmados', () => {
    const schema = buildLocalBusinessSchema({
      siteUrl: 'https://bujosaclima.com.br',
      telephone: '5521999999999',
    });

    expect(schema.telephone).toBe('+5521999999999');
    expect(schema).not.toHaveProperty('address');
    expect(schema).not.toHaveProperty('geo');
    expect(schema).not.toHaveProperty('openingHoursSpecification');
    expect(schema).not.toHaveProperty('aggregateRating');
    expect(schema).not.toHaveProperty('priceRange');
  });
});
