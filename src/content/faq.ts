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
  {
    question: 'O gás refrigerante R32 é explosivo?',
    answer:
      'O R32 é classificado como refrigerante de baixa inflamabilidade (classe A2L). Isso significa que pode inflamar em determinadas condições, mas não deve ser descrito simplesmente como um gás explosivo. Sua utilização exige equipamentos compatíveis, instalação correta e procedimentos técnicos de segurança. A manutenção e o manuseio do circuito frigorífico devem ser realizados por profissionais capacitados.',
  },
  {
    question: 'De quanto em quanto tempo devo fazer manutenção preventiva?',
    answer:
      'A frequência depende do ambiente, da intensidade de uso e das recomendações do fabricante. A limpeza dos filtros pode ser necessária com maior frequência, enquanto uma avaliação preventiva completa pode ser programada periodicamente, muitas vezes a cada 6 ou 12 meses em ambientes residenciais, conforme as condições de uso. Ambientes comerciais ou com maior concentração de poeira podem exigir intervalos menores.',
  },
  {
    question: 'O orçamento de instalação inclui os materiais?',
    answer:
      'Sim. Nosso orçamento de instalação considera os materiais necessários ao serviço conforme as condições informadas e o escopo aprovado. Para calcular corretamente, precisamos conhecer a distância entre a unidade evaporadora (interna) e a condensadora (externa), além das condições do local. O orçamento discriminará o que está incluído e eventuais itens adicionais.',
  },
  {
    question: 'Por que vocês precisam saber a distância entre a evaporadora e a condensadora?',
    answer:
      'Essa distância influencia a quantidade de tubulação de cobre, isolamento térmico, cabos e outros materiais necessários. Também precisamos verificar o percurso, os desníveis e os limites previstos pelo fabricante do equipamento. Essas informações ajudam a elaborar um orçamento mais preciso e uma instalação adequada.',
  },
  {
    question: 'Qual é a diferença entre limpeza de filtros e higienização completa?',
    answer:
      'A limpeza dos filtros é uma tarefa periódica de conservação. A higienização técnica pode envolver outros componentes acessíveis, conforme o estado do equipamento e o procedimento indicado. O serviço necessário depende da avaliação das condições do aparelho.',
  },
  {
    question: 'Posso instalar a condensadora em qualquer lugar?',
    answer:
      'Não. A unidade externa precisa de ventilação adequada, suporte compatível, acesso seguro para manutenção e respeito às distâncias e orientações do fabricante. Também devem ser observadas as regras do condomínio e as condições estruturais do local.',
  },
  {
    question: 'O ar-condicionado precisa receber gás periodicamente?',
    answer:
      'Não como manutenção rotineira. O circuito frigorífico é projetado para operar sem reposições periódicas de fluido refrigerante. Se houver perda de refrigerante, é necessário investigar possíveis vazamentos e realizar o reparo apropriado antes de uma eventual reposição.',
  },
  {
    question: 'O que influencia o preço da instalação?',
    answer:
      'Os principais fatores são a capacidade e o modelo do equipamento, a distância entre as unidades, o percurso das tubulações, os suportes, as condições elétricas, o acesso ao local e a necessidade de serviços adicionais. Por isso, solicitamos informações e fotografias antes de confirmar o orçamento.',
  },
  {
    question: 'Vocês fazem instalação de aparelhos comprados pelo cliente?',
    answer:
      'Sim, desde que o equipamento seja compatível com as condições do local e a instalação possa ser executada conforme as orientações do fabricante e os requisitos de segurança.',
  },
  {
    question: 'Quanto tempo demora uma instalação?',
    answer:
      'O tempo depende das características do equipamento, da distância entre as unidades, das condições do imóvel e da complexidade do serviço. A previsão será informada após a avaliação das informações do local.',
  },
  {
    question: 'A instalação elétrica está incluída no orçamento?',
    answer:
      'O orçamento deve especificar o escopo contratado. Adequações elétricas, novos circuitos, disjuntores ou outras intervenções não devem ser presumidos como incluídos sem avaliação e descrição expressa.',
  },
  {
    question: 'Ar-condicionado inverter consome menos energia?',
    answer:
      'Equipamentos inverter podem oferecer maior eficiência energética em determinadas condições, especialmente quando operam por períodos prolongados. O consumo real depende da classificação de eficiência, capacidade adequada ao ambiente, temperatura selecionada, instalação e hábitos de uso.',
  },
];
