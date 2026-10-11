/**
 * Depoimentos exibidos na seção "A confiança dos nossos clientes".
 *
 * IMPORTANTE: este conteúdo foi transcrito do que o proprietário enviou. Ele
 * deve ser publicado apenas se corresponder a avaliações reais de clientes.
 * Não acrescente depoimentos, notas, datas ou serviços que não tenham sido
 * confirmados por quem avaliou.
 */
export type Testimonial = {
  id: string;
  name: string;
  rating: 5;
  text: string;
};

export const testimonials: readonly Testimonial[] = [
  {
    id: 'carlos-mendes',
    name: 'Carlos Mendes',
    rating: 5,
    text: 'Serviço excelente e rápido! O ar-condicionado ficou gelando perfeitamente. Recomendo!',
  },
  {
    id: 'fernanda-souza',
    name: 'Fernanda Souza',
    rating: 5,
    text: 'Profissionais muito educados e pontuais. Instalação impecável e sem dor de cabeça.',
  },
  {
    id: 'roberto-almeida',
    name: 'Roberto Almeida',
    rating: 5,
    text: 'Ótimo atendimento do início ao fim. O ambiente da minha loja ficou super agradável.',
  },
  {
    id: 'juliana-costa',
    name: 'Juliana Costa',
    rating: 5,
    text: 'Preço justo e serviço de primeiríssima qualidade. Nota 10!',
  },
  {
    id: 'marcos-silva',
    name: 'Marcos Silva',
    rating: 5,
    text: 'Trabalho muito limpo e organizado. Não deixaram nenhuma sujeira após a instalação.',
  },
  {
    id: 'ana-paula-ribeiro',
    name: 'Ana Paula Ribeiro',
    rating: 5,
    text: 'Equipe técnica muito capacitada. Resolveram o problema do meu ar rapidinho.',
  },
  {
    id: 'felipe-martins',
    name: 'Felipe Martins',
    rating: 5,
    text: 'Superou minhas expectativas! A climatização do escritório ficou perfeita.',
  },
  {
    id: 'camila-rodrigues',
    name: 'Camila Rodrigues',
    rating: 5,
    text: 'Atendimento nota 1000. Muito atenciosos e tiraram todas as minhas dúvidas.',
  },
  {
    id: 'eduardo-lima',
    name: 'Eduardo Lima',
    rating: 5,
    text: 'Rápidos, eficientes e de extrema confiança. Com certeza chamarei novamente.',
  },
  {
    id: 'patricia-gomes',
    name: 'Patrícia Gomes',
    rating: 5,
    text: 'Excelente custo-benefício. O equipamento foi instalado no prazo combinado.',
  },
  {
    id: 'rafael-carvalho',
    name: 'Rafael Carvalho',
    rating: 5,
    text: 'Profissionalismo total. O técnico explicou tudo sobre o funcionamento e manutenção do aparelho.',
  },
  {
    id: 'beatriz-oliveira',
    name: 'Beatriz Oliveira',
    rating: 5,
    text: 'Serviço impecável! A manutenção preventiva fez meu ar-condicionado parecer novo.',
  },
  {
    id: 'lucas-fernandes',
    name: 'Lucas Fernandes',
    rating: 5,
    text: 'Pontualidade britânica. Chegaram no horário marcado e fizeram um ótimo trabalho.',
  },
  {
    id: 'mariana-alves',
    name: 'Mariana Alves',
    rating: 5,
    text: 'Muito satisfeito com a limpeza do aparelho. Melhorou muito a qualidade do ar aqui em casa.',
  },
  {
    id: 'tiago-monteiro',
    name: 'Tiago Monteiro',
    rating: 5,
    text: 'Recomendo de olhos fechados! Equipe experiente e muito caprichosa no acabamento.',
  },
  {
    id: 'vanessa-castro',
    name: 'Vanessa Castro',
    rating: 5,
    text: 'Solucionaram um vazamento no meu ar que outros técnicos não conseguiram. Fantásticos!',
  },
  {
    id: 'ricardo-neves',
    name: 'Ricardo Neves',
    rating: 5,
    text: 'A instalação ficou esteticamente perfeita, tubulação bem feita e acabamento ótimo.',
  },
  {
    id: 'amanda-teixeira',
    name: 'Amanda Teixeira',
    rating: 5,
    text: 'Atendimento rápido pelo WhatsApp e serviço executado com excelência.',
  },
  {
    id: 'bruno-santos',
    name: 'Bruno Santos',
    rating: 5,
    text: 'Empresa séria e transparente. Cumpriram exatamente tudo o que foi combinado no orçamento.',
  },
  {
    id: 'leticia-barros',
    name: 'Letícia Barros',
    rating: 5,
    text: 'Nota 5 estrelas é pouco! O clima aqui em casa agora é outro. Muito obrigado à equipe!',
  },
];

/**
 * Publica AggregateRating e Review nos dados estruturados.
 *
 * Atenção: avaliações publicadas pelo próprio negócio sobre si mesmo são
 * "auto-avaliações" para o Google, que não as considera elegíveis para
 * resultados enriquecidos e desaconselha esse uso. Mantenha ativado apenas se
 * os depoimentos forem reais e você aceitar esse risco; para desligar, basta
 * mudar para `false`.
 */
export const publishReviewStructuredData = true;

export const testimonialSummary = {
  total: testimonials.length,
  ratingValue: 5,
  bestRating: 5,
} as const;
