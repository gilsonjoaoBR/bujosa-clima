import { zodResolver } from '@hookform/resolvers/zod';
import { CircleAlert, CircleCheck, Info, MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';

import { Cta } from '@/components/ui/Cta';
import { Photo } from '@/components/ui/Photo';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { services } from '@/content/services';
import { sections, site } from '@/content/site';
import { buildQuoteMessage, buildWhatsAppLink } from '@/lib/whatsapp';
import { isWhatsAppEnabled, whatsappDigits } from '@/lib/whatsapp-config';

const OTHER_SERVICE = 'Outro serviço / ainda não sei';
const INSTALLATION_SERVICE = 'Instalação de Split';

const CAPACITY_OPTIONS = [
  '9.000 BTUs',
  '12.000 BTUs',
  '18.000 BTUs',
  '24.000 BTUs',
  '30.000 BTUs ou mais',
  'Não sei',
];

const TECHNOLOGY_OPTIONS = ['Inverter', 'Convencional', 'Não sei'];

const DISTANCE_OPTIONS = ['Até 3 m', 'Entre 3 e 5 m', 'Entre 5 e 10 m', 'Mais de 10 m', 'Não sei'];

const PROPERTY_OPTIONS = ['Residencial', 'Comercial', 'Outro'];

const YES_NO_OPTIONS = ['Sim', 'Não', 'Não sei'];

const TECHNICAL_FIELDS = [
  'brand',
  'capacity',
  'technology',
  'unitDistance',
  'propertyType',
  'electricalPoint',
  'accessConditions',
] as const;

const quoteSchema = z.object({
  name: z.string().min(2, 'Informe seu nome.'),
  whatsapp: z.string().min(10, 'Informe um número com DDD, como (21) 99999-9999.'),
  city: z.string().min(2, 'Informe a cidade onde o serviço será feito.'),
  neighborhood: z.string().optional(),
  service: z.string().min(1, 'Selecione o serviço desejado.'),
  equipment: z.string().optional(),
  brand: z.string().optional(),
  capacity: z.string().optional(),
  technology: z.string().optional(),
  unitDistance: z.string().optional(),
  propertyType: z.string().optional(),
  electricalPoint: z.string().optional(),
  accessConditions: z.string().optional(),
  description: z.string().min(10, 'Descreva a necessidade com um pouco mais de detalhe.'),
});

type QuoteFormValues = z.infer<typeof quoteSchema>;
type SubmitStatus = 'idle' | 'opened' | 'blocked';

const inputClasses =
  'w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-navy transition placeholder:text-navy/40 focus:border-brand focus:ring-2 focus:ring-brand/25 focus:outline-none';

const labelClasses = 'text-sm font-medium text-navy';
const errorClasses = 'mt-1.5 flex items-center gap-1.5 text-xs text-red-700';
const hintClasses = 'mt-1.5 text-xs text-navy/55';

export function QuoteFormSection() {
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      name: '',
      whatsapp: '',
      city: '',
      neighborhood: '',
      service: '',
      equipment: '',
      brand: '',
      capacity: '',
      technology: '',
      unitDistance: '',
      propertyType: '',
      electricalPoint: '',
      accessConditions: '',
      description: '',
    },
  });

  const selectedService = useWatch({ control, name: 'service' });
  const isInstallation = selectedService === INSTALLATION_SERVICE;

  // Ao trocar para um serviço que não é instalação, os dados técnicos deixam de
  // fazer sentido e não devem seguir na mensagem.
  useEffect(() => {
    if (isInstallation) {
      return;
    }

    TECHNICAL_FIELDS.forEach((field) => setValue(field, ''));
  }, [isInstallation, setValue]);

  const onSubmit = (values: QuoteFormValues) => {
    const link = buildWhatsAppLink(whatsappDigits, buildQuoteMessage(values));

    if (!link) {
      setStatus('blocked');
      return;
    }

    const opened = window.open(link, '_blank', 'noopener,noreferrer');
    setStatus(opened ? 'opened' : 'blocked');
  };

  return (
    <Section id="contato" tone="ice" labelledBy="contato-titulo">
      <SectionHeading
        id="contato-titulo"
        eyebrow={sections.quote.eyebrow}
        title={sections.quote.title}
        description={sections.quote.description}
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-5">
        <div className="rounded-3xl border border-navy/10 bg-white p-6 shadow-card sm:p-8 lg:col-span-3">
          <form noValidate className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClasses} htmlFor="nome">
                  Nome
                </label>
                <input
                  id="nome"
                  type="text"
                  autoComplete="name"
                  className={`mt-2 ${inputClasses}`}
                  placeholder="Como podemos te chamar?"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'nome-erro' : undefined}
                  {...register('name')}
                />
                {errors.name ? (
                  <p id="nome-erro" className={errorClasses}>
                    <CircleAlert aria-hidden className="size-3.5" />
                    {errors.name.message}
                  </p>
                ) : null}
              </div>

              <div>
                <label className={labelClasses} htmlFor="whatsapp">
                  WhatsApp
                </label>
                <input
                  id="whatsapp"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  className={`mt-2 ${inputClasses}`}
                  placeholder="(21) 99999-9999"
                  aria-invalid={Boolean(errors.whatsapp)}
                  aria-describedby={errors.whatsapp ? 'whatsapp-erro' : undefined}
                  {...register('whatsapp')}
                />
                {errors.whatsapp ? (
                  <p id="whatsapp-erro" className={errorClasses}>
                    <CircleAlert aria-hidden className="size-3.5" />
                    {errors.whatsapp.message}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClasses} htmlFor="cidade">
                  Cidade
                </label>
                <input
                  id="cidade"
                  type="text"
                  list="cidades-atendidas"
                  autoComplete="address-level2"
                  className={`mt-2 ${inputClasses}`}
                  placeholder="Maricá, São Gonçalo, Niterói..."
                  aria-invalid={Boolean(errors.city)}
                  aria-describedby={errors.city ? 'cidade-erro' : undefined}
                  {...register('city')}
                />
                <datalist id="cidades-atendidas">
                  {site.cities.map((city) => (
                    <option key={city.name} value={city.name} />
                  ))}
                </datalist>
                {errors.city ? (
                  <p id="cidade-erro" className={errorClasses}>
                    <CircleAlert aria-hidden className="size-3.5" />
                    {errors.city.message}
                  </p>
                ) : null}
              </div>

              <div>
                <label className={labelClasses} htmlFor="bairro">
                  Bairro <span className="font-normal text-navy/50">(opcional)</span>
                </label>
                <input
                  id="bairro"
                  type="text"
                  autoComplete="address-level3"
                  className={`mt-2 ${inputClasses}`}
                  placeholder="Bairro do serviço"
                  {...register('neighborhood')}
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClasses} htmlFor="servico">
                  Serviço desejado
                </label>
                <select
                  id="servico"
                  className={`mt-2 ${inputClasses}`}
                  aria-invalid={Boolean(errors.service)}
                  aria-describedby={errors.service ? 'servico-erro' : undefined}
                  defaultValue=""
                  {...register('service')}
                >
                  <option value="" disabled>
                    Selecione uma opção
                  </option>
                  {services.map((service) => (
                    <option key={service.id} value={service.title}>
                      {service.title}
                    </option>
                  ))}
                  <option value={OTHER_SERVICE}>{OTHER_SERVICE}</option>
                </select>
                {errors.service ? (
                  <p id="servico-erro" className={errorClasses}>
                    <CircleAlert aria-hidden className="size-3.5" />
                    {errors.service.message}
                  </p>
                ) : null}
              </div>

              <div>
                <label className={labelClasses} htmlFor="equipamento">
                  Modelo do equipamento{' '}
                  <span className="font-normal text-navy/50">(opcional)</span>
                </label>
                <input
                  id="equipamento"
                  type="text"
                  className={`mt-2 ${inputClasses}`}
                  placeholder="Ex.: LG Dual Inverter S4-Q12JA3AA"
                  {...register('equipment')}
                />
              </div>
            </div>

            {isInstallation ? (
              <fieldset className="rounded-2xl border border-brand/20 bg-ice/70 p-5">
                <legend className="px-2 text-sm font-semibold text-navy">
                  Dados da instalação
                </legend>

                <p className="flex items-start gap-2 text-xs leading-relaxed text-navy/70">
                  <Info aria-hidden className="mt-0.5 size-3.5 shrink-0 text-brand" />
                  Tudo aqui é opcional. Se não souber alguma informação, deixe em branco — dá para
                  confirmar pelo WhatsApp. Fotos do local também podem ser enviadas depois.
                </p>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelClasses} htmlFor="marca">
                      Marca do equipamento{' '}
                      <span className="font-normal text-navy/50">(opcional)</span>
                    </label>
                    <input
                      id="marca"
                      type="text"
                      className={`mt-2 ${inputClasses}`}
                      placeholder="Ex.: LG, Samsung, Daikin, Midea"
                      {...register('brand')}
                    />
                  </div>

                  <div>
                    <label className={labelClasses} htmlFor="capacidade">
                      Capacidade <span className="font-normal text-navy/50">(opcional)</span>
                    </label>
                    <select
                      id="capacidade"
                      className={`mt-2 ${inputClasses}`}
                      defaultValue=""
                      {...register('capacity')}
                    >
                      <option value="">Não informar</option>
                      {CAPACITY_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={labelClasses} htmlFor="tecnologia">
                      Inverter ou convencional?{' '}
                      <span className="font-normal text-navy/50">(opcional)</span>
                    </label>
                    <select
                      id="tecnologia"
                      className={`mt-2 ${inputClasses}`}
                      defaultValue=""
                      {...register('technology')}
                    >
                      <option value="">Não informar</option>
                      {TECHNOLOGY_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={labelClasses} htmlFor="distancia">
                      Distância entre evaporadora e condensadora{' '}
                      <span className="font-normal text-navy/50">(opcional)</span>
                    </label>
                    <select
                      id="distancia"
                      className={`mt-2 ${inputClasses}`}
                      defaultValue=""
                      aria-describedby="distancia-dica"
                      {...register('unitDistance')}
                    >
                      <option value="">Não informar</option>
                      {DISTANCE_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <p id="distancia-dica" className={hintClasses}>
                      Distância aproximada entre a unidade interna e a externa.
                    </p>
                  </div>

                  <div>
                    <label className={labelClasses} htmlFor="imovel">
                      Tipo de imóvel <span className="font-normal text-navy/50">(opcional)</span>
                    </label>
                    <select
                      id="imovel"
                      className={`mt-2 ${inputClasses}`}
                      defaultValue=""
                      {...register('propertyType')}
                    >
                      <option value="">Não informar</option>
                      {PROPERTY_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={labelClasses} htmlFor="ponto-eletrico">
                      Já existe ponto elétrico adequado?{' '}
                      <span className="font-normal text-navy/50">(opcional)</span>
                    </label>
                    <select
                      id="ponto-eletrico"
                      className={`mt-2 ${inputClasses}`}
                      defaultValue=""
                      aria-describedby="ponto-eletrico-dica"
                      {...register('electricalPoint')}
                    >
                      <option value="">Não informar</option>
                      {YES_NO_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <p id="ponto-eletrico-dica" className={hintClasses}>
                      Adequações elétricas não estão presumidas no orçamento.
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <label className={labelClasses} htmlFor="acesso">
                    Acesso e condições de instalação{' '}
                    <span className="font-normal text-navy/50">(opcional)</span>
                  </label>
                  <textarea
                    id="acesso"
                    rows={3}
                    className={`mt-2 ${inputClasses}`}
                    placeholder="Andar, escada, laje, distância até o ponto de instalação, fachada, condomínio..."
                    {...register('accessConditions')}
                  />
                </div>
              </fieldset>
            ) : null}

            <div>
              <label className={labelClasses} htmlFor="necessidade">
                Descrição da necessidade
              </label>
              <textarea
                id="necessidade"
                rows={4}
                className={`mt-2 ${inputClasses}`}
                placeholder="Conte o que precisa: instalação, manutenção, higienização, o local e o que já foi observado."
                aria-invalid={Boolean(errors.description)}
                aria-describedby={errors.description ? 'necessidade-erro' : undefined}
                {...register('description')}
              />
              {errors.description ? (
                <p id="necessidade-erro" className={errorClasses}>
                  <CircleAlert aria-hidden className="size-3.5" />
                  {errors.description.message}
                </p>
              ) : null}
            </div>

            <div className="rounded-2xl bg-ice px-4 py-3 text-xs leading-relaxed text-navy/70">
              O envio acontece pelo WhatsApp, com a mensagem organizada a partir dos dados acima.
              Este site não guarda essas informações em servidor, banco de dados ou serviços de
              terceiros. Veja a{' '}
              <Link className="font-semibold text-brand underline" to="/privacidade">
                política de privacidade
              </Link>
              .
            </div>

            {!isWhatsAppEnabled ? (
              <p className="flex items-start gap-2 rounded-2xl bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-900">
                <CircleAlert aria-hidden className="mt-0.5 size-4 shrink-0" />
                O envio pelo WhatsApp está indisponível: o número de atendimento ainda não foi
                configurado no build do site. Os dados preenchidos não são enviados por nenhum
                outro canal.
              </p>
            ) : null}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Cta
                type="submit"
                size="lg"
                disabled={!isWhatsAppEnabled || isSubmitting}
                icon={<MessageCircle aria-hidden className="size-5" />}
              >
                Enviar pelo WhatsApp
              </Cta>
              <p className="text-xs leading-relaxed text-navy/60 sm:max-w-xs">
                O orçamento considera os materiais conforme as informações enviadas e o escopo
                aprovado. A mensagem abre no WhatsApp para você revisar antes de enviar.
              </p>
            </div>

            {status === 'opened' ? (
              <p
                role="status"
                className="flex items-start gap-2 rounded-2xl bg-teal/10 px-4 py-3 text-sm text-navy"
              >
                <CircleCheck aria-hidden className="mt-0.5 size-4 shrink-0 text-teal" />
                Abrimos o WhatsApp em uma nova aba com a sua mensagem.
              </p>
            ) : null}

            {status === 'blocked' ? (
              <p
                role="alert"
                className="flex items-start gap-2 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-800"
              >
                <CircleAlert aria-hidden className="mt-0.5 size-4 shrink-0" />
                Não foi possível abrir o WhatsApp automaticamente. Verifique se o navegador
                bloqueou a nova aba e tente novamente.
              </p>
            ) : null}
          </form>
        </div>

        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-3xl border border-white shadow-card">
            <div className="aspect-4/3">
              <Photo
                assetId="higienizacao"
                alt="Equipamento de ar-condicionado split com o painel aberto para higienização"
              />
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-navy/10 bg-white p-6 shadow-card">
            <h3 className="text-base font-semibold text-navy">O que acontece depois do envio</h3>
            <ul className="mt-4 grid gap-3 text-sm text-navy/75">
              <li className="flex items-start gap-2">
                <CircleCheck aria-hidden className="mt-0.5 size-4 shrink-0 text-teal" />
                Analisamos as informações enviadas e respondemos com as condições do serviço.
              </li>
              <li className="flex items-start gap-2">
                <CircleCheck aria-hidden className="mt-0.5 size-4 shrink-0 text-teal" />
                Quando necessário, combinamos uma avaliação do local antes de confirmar o valor.
              </li>
              <li className="flex items-start gap-2">
                <CircleCheck aria-hidden className="mt-0.5 size-4 shrink-0 text-teal" />
                Você pode enviar fotos do local pelo WhatsApp para facilitar a avaliação.
              </li>
              <li className="flex items-start gap-2">
                <CircleCheck aria-hidden className="mt-0.5 size-4 shrink-0 text-teal" />
                O agendamento é feito após a confirmação do orçamento e da disponibilidade.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
