export const site = {
  name: 'Bujosa Clima',
  tagline: 'Soluções em Climatização',
  shortDescription:
    'Instalação, manutenção e higienização de ar-condicionado split em Maricá, São Gonçalo e Niterói (RJ).',
  cities: [
    { name: 'Maricá', state: 'RJ' },
    { name: 'São Gonçalo', state: 'RJ' },
    { name: 'Niterói', state: 'RJ' },
  ],
  serviceAreaNote:
    'A disponibilidade depende da região e da agenda. Envie sua cidade e o local do serviço no contato para confirmar o atendimento.',
  nav: [
    { label: 'Início', href: '#inicio' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Atendimento', href: '#atendimento' },
    { label: 'Contato', href: '#contato' },
  ],
} as const;

export const hero = {
  eyebrow: 'Atendimento em Maricá, São Gonçalo e Niterói — RJ',
  title: 'Seu conforto começa com uma climatização bem-feita.',
  subtitle:
    'Instalação, manutenção e higienização de ar-condicionado split, com atendimento em Maricá, São Gonçalo e Niterói.',
  primaryCta: 'Solicitar orçamento',
  secondaryCta: 'Conhecer serviços',
  highlights: [
    'Atendimento residencial e comercial',
    'Avaliação das condições técnicas antes do orçamento',
    'Contato direto pelo WhatsApp',
  ],
  imageAlt:
    'Sala de estar com ar-condicionado split instalado na parede e ambiente iluminado',
} as const;

export const sections = {
  services: {
    eyebrow: 'Serviços',
    title: 'Três frentes de atendimento',
    description:
      'Serviços de climatização para residências e estabelecimentos comerciais de pequeno porte.',
  },
  differentials: {
    eyebrow: 'Sobre a Bujosa Clima',
    title: 'Como trabalhamos',
    description:
      'Uma operação em início de atividade, com atendimento próximo e atenção aos procedimentos de instalação e manutenção.',
  },
  steps: {
    eyebrow: 'Como funciona',
    title: 'Do primeiro contato ao agendamento',
    description: 'Um processo simples, com as informações confirmadas antes da execução.',
  },
  area: {
    eyebrow: 'Área de atendimento',
    title: 'Onde atendemos',
    description:
      'Atendimento residencial e comercial em três cidades do Rio de Janeiro.',
  },
  faq: {
    eyebrow: 'Dúvidas frequentes',
    title: 'Perguntas frequentes',
    description: 'O que costuma ser perguntado antes de solicitar um orçamento.',
  },
  quote: {
    eyebrow: 'Orçamento',
    title: 'Solicite seu orçamento',
    description:
      'Preencha os dados abaixo. A mensagem é organizada automaticamente e o envio acontece no WhatsApp.',
  },
} as const;
