/**
 * Crédito institucional da Acritech.
 *
 * Mesmo padrão já usado nos projetos da Acritech (referência:
 * `C:\dev\beatriz-centro-cirurgico\src\components\AcritechCredit.jsx`): o texto
 * "Desenvolvido por" seguido do logotipo oficial em PNG transparente, recortado
 * por CSS (`.acritech-badge*` em `src/index.css`) para mostrar apenas a
 * assinatura. O arquivo do logotipo é usado sem alteração.
 */
const ACRITECH_URL = 'https://acritech.com.br';
const ACRITECH_LOGO = '/brand/acritech-logo-transparent.png';

type AcritechCreditProps = {
  theme?: 'dark' | 'light';
  mode?: 'standard' | 'compact';
  href?: string;
  logoSrc?: string;
};

export function AcritechCredit({
  theme = 'dark',
  mode = 'standard',
  href = ACRITECH_URL,
  logoSrc = ACRITECH_LOGO,
}: AcritechCreditProps) {
  return (
    <a
      className={`acritech-badge acritech-badge--${theme} acritech-badge--${mode}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Desenvolvido pela Acritech (abre em uma nova aba)"
    >
      <span>Desenvolvido por</span>
      <span className="acritech-badge__logo">
        <img src={logoSrc} alt="Acritech" loading="lazy" decoding="async" />
      </span>
    </a>
  );
}
