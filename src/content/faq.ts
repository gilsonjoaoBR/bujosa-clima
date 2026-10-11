export type FaqItem = {
  question: string;
  answer: string;
};

export const faq: readonly FaqItem[] = [
  {
    question: 'Como solicito um orçamento?',
    answer:
      'Você pode preencher o formulário desta página ou chamar no WhatsApp. Nos dois caminhos a mensagem é organizada automaticamente com os dados que você informar e o envio acontece no próprio WhatsApp.',
  },
  {
    question: 'Quais informações devo enviar?',
    answer:
      'Cidade e local do serviço, o que você precisa (instalação, manutenção ou higienização) e, quando souber, o modelo ou a capacidade do equipamento. Uma descrição simples da necessidade e fotos do local ajudam na avaliação.',
  },
  {
    question: 'Vocês atendem residências e comércios?',
    answer:
      'Sim. O atendimento é voltado para residências e estabelecimentos comerciais de pequeno porte, como escritórios, salões de beleza, consultórios e lojas.',
  },
  {
    question: 'Vocês instalam equipamento que eu já comprei?',
    answer:
      'Sim. A instalação pode ser feita com o equipamento adquirido pelo cliente, sempre depois da avaliação das condições técnicas do local e do próprio equipamento.',
  },
  {
    question: 'É necessário avaliação prévia?',
    answer:
      'Na maior parte dos casos, sim. A avaliação das condições técnicas (local, infraestrutura e equipamento) é o que permite confirmar o escopo, o valor e a agenda do serviço.',
  },
  {
    question: 'Quais regiões são atendidas?',
    answer:
      'Maricá, São Gonçalo e Niterói, no Rio de Janeiro. A disponibilidade depende da região e da agenda.',
  },
];
