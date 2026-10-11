import { Link } from 'react-router-dom';

import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { Container } from '@/components/ui/Container';
import { site } from '@/content/site';
import { useDocumentMeta } from '@/lib/seo';
import { buildGeneralQuoteMessage, buildWhatsAppLink } from '@/lib/whatsapp';
import { whatsappDigits } from '@/lib/whatsapp-config';

export const PRIVACY_LAST_UPDATE = '11 de outubro de 2026';

export function PrivacyPolicyPage() {
  useDocumentMeta({
    title: 'Política de privacidade | Bujosa Clima',
    description:
      'Como a Bujosa Clima trata as informações enviadas pelo formulário de orçamento: nenhum dado é armazenado pelo site, o envio acontece diretamente no WhatsApp.',
    path: '/privacidade',
  });

  const whatsappLink = buildWhatsAppLink(whatsappDigits, buildGeneralQuoteMessage());

  return (
    <div>
      <SiteHeader />

      <main id="conteudo" className="bg-white py-14 sm:py-20">
        <Container className="max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">
            Bujosa Clima
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl">Política de privacidade</h1>
          <p className="mt-4 text-sm text-navy/60">
            Última atualização: {PRIVACY_LAST_UPDATE}
          </p>

          <div className="mt-10 grid gap-8 text-sm leading-relaxed text-navy/75">
            <section>
              <h2 className="text-lg font-semibold text-navy">1. Quais dados este site trata</h2>
              <p className="mt-3">
                Este site é uma página informativa. Ele não possui cadastro, login, área restrita,
                banco de dados ou sistema próprio de armazenamento. As únicas informações
                tratadas são aquelas que você digita voluntariamente no formulário de orçamento:
                nome, WhatsApp, cidade, serviço desejado, modelo ou capacidade do equipamento
                (opcional) e a descrição da necessidade.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-navy">2. Para onde vão os dados</h2>
              <p className="mt-3">
                Os dados informados são usados apenas para montar a mensagem de solicitação de
                orçamento. Essa mensagem é exibida por você no aplicativo WhatsApp, em uma conversa
                iniciada a partir do seu próprio número, e é você quem confirma o envio. Nada é
                enviado para servidores deste site.
              </p>
              <p className="mt-3">
                O WhatsApp é um serviço do Meta. Depois do envio, o tratamento das mensagens segue
                as políticas e os termos do próprio WhatsApp, que não são controlados pela Bujosa
                Clima.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-navy">
                3. Cookies, análises e serviços de terceiros
              </h2>
              <p className="mt-3">
                O site não utiliza cookies de análise, rastreamento, publicidade ou pixels de
                terceiros. Não há ferramentas de medição de audiência, newsletter ou envio de
                e-mails automáticos.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-navy">
                4. Hospedagem e registros técnicos
              </h2>
              <p className="mt-3">
                O site é publicado em servidor próprio. Como em qualquer serviço na internet, o
                servidor de hospedagem e o proxy podem registrar informações técnicas de acesso
                (como endereço IP e data/hora da requisição) para fins de segurança e
                funcionamento. Esses registros são mantidos apenas pelo tempo necessário a essas
                finalidades.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-navy">
                5. Seus direitos sobre dados pessoais
              </h2>
              <p className="mt-3">
                Como este site não armazena os dados preenchidos, o histórico do seu contato fica
                na conversa de WhatsApp iniciada por você. Você pode solicitar a qualquer momento
                a exclusão dessa conversa ou informações sobre o atendimento pelos mesmos canais
                de contato abaixo.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-navy">6. Alterações desta política</h2>
              <p className="mt-3">
                Se o funcionamento do site mudar — por exemplo, com a inclusão de novas formas de
                contato ou de ferramentas de medição — esta página será atualizada antes da
                mudança entrar em vigor.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-navy">7. Contato</h2>
              <p className="mt-3">
                Para falar sobre privacidade ou sobre um atendimento, use o formulário de
                orçamento da página inicial
                {whatsappLink ? (
                  <>
                    {' '}
                    ou o{' '}
                    <a
                      className="font-semibold text-brand underline"
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      atendimento pelo WhatsApp
                    </a>
                  </>
                ) : null}
                .
              </p>
            </section>
          </div>

          <div className="mt-12 rounded-3xl bg-ice px-6 py-6 text-sm text-navy/75">
            <p>
              <span className="font-semibold text-navy">{site.name}</span> — {site.tagline}.
              Atendimento em Maricá, São Gonçalo e Niterói (RJ).
            </p>
            <Link
              className="mt-3 inline-block font-semibold text-brand underline"
              to="/#contato"
            >
              Voltar para o formulário de orçamento
            </Link>
          </div>
        </Container>
      </main>

      <SiteFooter />
    </div>
  );
}
