import { describe, expect, it } from 'vitest';

import { publishReviewStructuredData, testimonialSummary, testimonials } from './testimonials';

describe('depoimentos', () => {
  it('mantém os 20 depoimentos enviados pelo proprietário', () => {
    expect(testimonials).toHaveLength(20);
  });

  it('usa nota 5 em todos os depoimentos', () => {
    testimonials.forEach((testimonial) => {
      expect(testimonial.rating).toBe(5);
    });
  });

  it('não repete nomes nem identificadores', () => {
    const ids = new Set(testimonials.map((testimonial) => testimonial.id));
    const names = new Set(testimonials.map((testimonial) => testimonial.name));

    expect(ids.size).toBe(testimonials.length);
    expect(names.size).toBe(testimonials.length);
  });

  it('mantém textos preenchidos e distintos', () => {
    const texts = new Set(testimonials.map((testimonial) => testimonial.text));

    expect(texts.size).toBe(testimonials.length);
    testimonials.forEach((testimonial) => {
      expect(testimonial.text.trim().length).toBeGreaterThan(20);
    });
  });

  it('resume a nota agregada a partir da própria lista', () => {
    expect(testimonialSummary.total).toBe(testimonials.length);
    expect(testimonialSummary.ratingValue).toBe(5);
    expect(testimonialSummary.bestRating).toBe(5);
  });

  it('mantém a decisão de publicar avaliações de forma explícita', () => {
    // Booleano por decisão do proprietário; o risco de auto-avaliação está
    // documentado em src/content/testimonials.ts.
    expect(typeof publishReviewStructuredData).toBe('boolean');
  });
});
