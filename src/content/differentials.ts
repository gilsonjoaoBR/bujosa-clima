import {
  ClipboardCheck,
  GraduationCap,
  MessagesSquare,
  Receipt,
  UserRoundCheck,
  type LucideIcon,
} from 'lucide-react';

export type Differential = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const differentials: readonly Differential[] = [
  {
    title: 'Atendimento personalizado',
    description:
      'Cada solicitação é avaliada individualmente, com contato direto do primeiro contato até a conclusão do serviço.',
    icon: UserRoundCheck,
  },
  {
    title: 'Formação técnica',
    description:
      'Execução baseada em procedimentos técnicos de instalação e manutenção de ar-condicionado split.',
    icon: GraduationCap,
  },
  {
    title: 'Comunicação clara',
    description:
      'Você recebe explicações simples sobre o que será feito, quais são as condições e o que depende de avaliação.',
    icon: MessagesSquare,
  },
  {
    title: 'Orçamento transparente',
    description:
      'As condições e os valores são apresentados antes da execução, com o que está incluído em cada serviço.',
    icon: Receipt,
  },
  {
    title: 'Atenção aos procedimentos',
    description:
      'Cuidado com as etapas de instalação e manutenção previstas para cada equipamento, incluindo a organização do local.',
    icon: ClipboardCheck,
  },
];
