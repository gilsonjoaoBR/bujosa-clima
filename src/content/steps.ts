import { CalendarCheck, ClipboardList, MessagesSquare, ScanSearch, type LucideIcon } from 'lucide-react';

export type Step = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const steps: readonly Step[] = [
  {
    title: 'Cliente entra em contato',
    description: 'Você chama a Bujosa Clima pelo WhatsApp ou preenche o formulário desta página.',
    icon: MessagesSquare,
  },
  {
    title: 'Informa equipamento, local e necessidade',
    description:
      'Modelo ou capacidade do equipamento, cidade e local do serviço, além da descrição do que você precisa.',
    icon: ClipboardList,
  },
  {
    title: 'Recebe a avaliação e os próximos passos',
    description:
      'As informações são analisadas e a Bujosa Clima apresenta as condições e os próximos passos do atendimento.',
    icon: ScanSearch,
  },
  {
    title: 'Agendamento após a confirmação',
    description:
      'O serviço é agendado depois da confirmação das condições, do orçamento e da disponibilidade de agenda.',
    icon: CalendarCheck,
  },
];
