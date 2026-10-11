/** Altura aproximada do cabeçalho fixo, usada só para conferir o destino. */
const HEADER_OFFSET = 96;
const TOLERANCE = 120;

/**
 * Rola até uma seção pelo id.
 *
 * Primeiro tenta a rolagem suave. Alguns contextos não animam a rolagem — aba
 * em segundo plano, animações desativadas no sistema ou navegador sem suporte.
 * Nesses casos a animação simplesmente não acontece e a página não se move;
 * por isso a posição é conferida logo depois e, se o destino não foi
 * alcançado, a rolagem instantânea garante o resultado.
 */
export function scrollToSection(id: string): void {
  const target = document.getElementById(id);

  if (!target) {
    return;
  }

  target.scrollIntoView({ behavior: 'smooth', block: 'start' });

  window.setTimeout(() => {
    const top = target.getBoundingClientRect().top;
    const reachedTarget = top >= -TOLERANCE && top <= HEADER_OFFSET + TOLERANCE;

    if (!reachedTarget) {
      target.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  }, 450);
}
