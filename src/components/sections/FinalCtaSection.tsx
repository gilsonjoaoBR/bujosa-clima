import { Container } from '@/components/ui/Container';
import { Cta } from '@/components/ui/Cta';
import { WhatsAppCta } from '@/components/ui/WhatsAppCta';
import { buildGeneralQuoteMessage } from '@/lib/whatsapp';

export function FinalCtaSection() {
  return (
    <section className="bg-white pb-16 sm:pb-20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-navy px-6 py-12 text-center shadow-float sm:px-12 sm:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-16 size-72 rounded-full bg-linear-to-br from-brand/40 to-teal/30 blur-3xl"
          />

          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl text-white sm:text-4xl">
              Vamos avaliar a climatização do seu espaço?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ice/80">
              Envie os dados do equipamento e do local. A Bujosa Clima responde com as condições e
              os próximos passos do atendimento.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <WhatsAppCta message={buildGeneralQuoteMessage()} size="lg" />
              <Cta href="#contato" variant="inverse" size="lg">
                Preencher formulário
              </Cta>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
