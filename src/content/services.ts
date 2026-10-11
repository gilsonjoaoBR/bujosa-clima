import { AirVent, Sparkles, Wrench, type LucideIcon } from 'lucide-react';

export type Service = {
  id: string;
  title: string;
  summary: string;
  bullets: readonly string[];
  icon: LucideIcon;
  /** Trecho usado na mensagem de WhatsApp específica do serviço. */
  whatsappSubject: string;
};

export const services: readonly Service[] = [
  {
    id: 'instalacao',
    title: 'Instalação de Split',
    summary: 'Instalação de equipamentos residenciais e comerciais de pequeno porte.',
    bullets: [
      'Instalação de equipamentos residenciais e comerciais de pequeno porte.',
      'Orientação sobre posicionamento e condições de instalação.',
      'Avaliação das condições técnicas antes da confirmação do orçamento.',
    ],
    icon: AirVent,
    whatsappSubject: 'instalação de ar-condicionado split',
  },
  {
    id: 'manutencao',
    title: 'Manutenção Preventiva e Corretiva',
    summary: 'Verificações e intervenções de manutenção conforme a necessidade.',
    bullets: [
      'Verificações e intervenções de manutenção conforme a necessidade.',
      'Serviços condicionados à avaliação técnica e à capacidade operacional.',
    ],
    icon: Wrench,
    whatsappSubject: 'manutenção preventiva ou corretiva de ar-condicionado',
  },
  {
    id: 'higienizacao',
    title: 'Higienização',
    summary: 'Limpeza e higienização dos componentes acessíveis do equipamento.',
    bullets: [
      'Limpeza e higienização dos componentes acessíveis.',
      'Remoção de sujeiras e resíduos.',
      'Orientações sobre conservação e periodicidade da manutenção.',
    ],
    icon: Sparkles,
    whatsappSubject: 'higienização de ar-condicionado',
  },
];
