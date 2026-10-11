import { describe, expect, it } from 'vitest';

import { buildLocalBusinessSchema } from './schema';
import { testimonialSummary, testimonials } from './testimonials';

describe('buildLocalBusinessSchema', () => {
  it('descreve a atividade com as cidades atendidas', () => {
    const schema = buildLocalBusinessSchema({
      siteUrl: 'https://bujosaclima.acritech.com.br/',
    }) as {
      url: string;
      areaServed: { name: string }[];
      hasOfferCatalog: { itemListElement: unknown[] };
    };

    expect(schema.url).toBe('https://bujosaclima.acritech.com.br/');
    expect(schema.areaServed.map((city) => city.name)).toEqual([
      'Maricá',
      'São Gonçalo',
      'Niterói',
    ]);
    expect(schema.hasOfferCatalog.itemListElement).toHaveLength(3);
  });

  it('não publica telefone quando o número não está configurado', () => {
    const schema = buildLocalBusinessSchema({
      siteUrl: 'https://bujosaclima.acritech.com.br',
    });

    expect(schema).not.toHaveProperty('telephone');
    expect(schema).not.toHaveProperty('contactPoint');
  });

  it('não inventa dados não confirmados', () => {
    const schema = buildLocalBusinessSchema({
      siteUrl: 'https://bujosaclima.acritech.com.br',
      telephone: '5521999999999',
    });

    expect(schema.telephone).toBe('+5521999999999');
    expect(schema).not.toHaveProperty('address');
    expect(schema).not.toHaveProperty('geo');
    expect(schema).not.toHaveProperty('openingHoursSpecification');
    expect(schema).not.toHaveProperty('priceRange');
  });

  it('publica a nota agregada a partir dos depoimentos cadastrados', () => {
    const schema = buildLocalBusinessSchema({
      siteUrl: 'https://bujosaclima.acritech.com.br',
    }) as {
      aggregateRating?: { ratingValue: number; reviewCount: number; bestRating: number };
      review?: { author: { name: string }; reviewRating: { ratingValue: number } }[];
    };

    expect(schema.aggregateRating).toEqual({
      '@type': 'AggregateRating',
      ratingValue: testimonialSummary.ratingValue,
      bestRating: testimonialSummary.bestRating,
      worstRating: 1,
      reviewCount: testimonialSummary.total,
    });
    expect(schema.review).toHaveLength(testimonials.length);
    expect(schema.review?.[0]?.author.name).toBe(testimonials[0]?.name);
    expect(schema.review?.[0]?.reviewRating.ratingValue).toBe(5);
  });
});
