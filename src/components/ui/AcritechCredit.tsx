/**
 * Crédito institucional da Acritech.
 *
 * Proposta: usa o logotipo oficial da Acritech (arquivo original apenas
 * redimensionado por `scripts/prepare-acritech-credit.py`, sem redesenho e sem
 * alteração de cores) acompanhado do texto "Desenvolvido por Acritech", em
 * linha discreta e centralizada no rodapé. Não existe, nos projetos locais da
 * Acritech, um componente de crédito pronto para reutilizar — por isso esta
 * assinatura aguarda aprovação antes de ser considerada definitiva.
 */
export function AcritechCredit() {
  return (
    <a
      href="https://acritech.com.br/"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2.5 rounded-full px-3 py-1.5 text-xs text-ice/60 transition hover:text-ice"
    >
      <picture>
        <source srcSet="/brand/acritech-logo.avif" type="image/avif" />
        <source srcSet="/brand/acritech-logo.webp" type="image/webp" />
        <img
          src="/brand/acritech-logo.png"
          alt=""
          width={72}
          height={36}
          style={{ height: 26, width: 'auto' }}
          className="block rounded-[0.35rem]"
          loading="lazy"
          decoding="async"
        />
      </picture>
      <span>
        Desenvolvido por <span className="font-semibold text-ice/80">Acritech</span>
        <span className="sr-only"> — Produtos e Soluções Tecnológicas</span>
      </span>
    </a>
  );
}
