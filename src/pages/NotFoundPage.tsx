import { Link } from 'react-router-dom';

import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { Container } from '@/components/ui/Container';
import { Cta } from '@/components/ui/Cta';
import { useDocumentMeta } from '@/lib/seo';

export function NotFoundPage() {
  useDocumentMeta({
    title: 'Página não encontrada | Bujosa Clima',
    description: 'A página que você tentou abrir não existe.',
    path: '/',
  });

  return (
    <div>
      <SiteHeader />

      <main id="conteudo" className="bg-white py-24">
        <Container className="max-w-xl text-center">
          <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">
            Erro 404
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl">Não encontramos esta página</h1>
          <p className="mt-4 text-sm leading-relaxed text-navy/70">
            O endereço acessado não existe ou foi alterado. Você pode voltar para a página inicial
            e continuar a partir dos serviços e do formulário de orçamento.
          </p>
          <div className="mt-8 flex justify-center">
            <Cta href="/" size="lg">
              Voltar para o início
            </Cta>
          </div>
          <p className="mt-6 text-xs text-navy/60">
            Prefere ir direto ao ponto?{' '}
            <Link className="font-semibold text-brand underline" to="/#contato">
              Solicitar orçamento
            </Link>
          </p>
        </Container>
      </main>

      <SiteFooter />
    </div>
  );
}
