import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ReviewCarousel } from '@/components/ui/ReviewCarousel';
import { testimonials } from '@/content/testimonials';

export function TestimonialsSection() {
  return (
    <Section id="avaliacoes" tone="white" labelledBy="avaliacoes-titulo" containerClassName="max-w-6xl">
      <SectionHeading
        id="avaliacoes-titulo"
        eyebrow="Avaliações"
        title="A confiança dos nossos clientes"
        description="Conheça as experiências de quem já contou com nossos serviços."
      />

      <div className="mt-12">
        <ReviewCarousel items={testimonials} />
      </div>
    </Section>
  );
}
