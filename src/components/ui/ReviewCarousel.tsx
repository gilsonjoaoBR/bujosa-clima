import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useCallback, useEffect, useRef } from 'react';

import type { Testimonial } from '@/content/testimonials';
import { usePrefersReducedMotion } from '@/lib/motion';

const AUTO_SPEED_PX_PER_SECOND = 26;
const JUMP_DURATION_MS = 420;
const RESUME_DELAY_MS = 1500;
const MAX_FRAME_DELTA_MS = 64;

type Tween = {
  from: number;
  to: number;
  startedAt: number;
  duration: number;
};

function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

function ReviewCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <li
      data-review-card
      className="w-[16.5rem] shrink-0 rounded-3xl border border-navy/10 bg-ice/60 p-6 shadow-card sm:w-[19.5rem]"
    >
      <figure className="flex h-full flex-col">
        <div className="flex items-center gap-2">
          <span aria-hidden className="flex gap-0.5 text-teal">
            {Array.from({ length: testimonial.rating }, (_, index) => (
              <Star key={index} className="size-4 fill-current" />
            ))}
          </span>
          <span className="sr-only">{`${testimonial.rating} de 5 estrelas`}</span>
        </div>

        <blockquote className="mt-4 grow text-sm leading-relaxed text-navy/75">
          “{testimonial.text}”
        </blockquote>

        <figcaption className="mt-5 flex items-center gap-3">
          <span
            aria-hidden
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-brand to-teal text-xs font-semibold text-white"
          >
            {initialsOf(testimonial.name)}
          </span>
          <span className="text-sm font-semibold text-navy">{testimonial.name}</span>
        </figcaption>
      </figure>
    </li>
  );
}

/**
 * Carrossel horizontal contínuo, escrito à mão para não adicionar dependência.
 *
 * - o movimento automático vai da esquerda para a direita e pausa com o mouse
 *   em cima, com foco pelo teclado, durante o arraste, com a aba oculta e
 *   quando a seção está fora da tela;
 * - quem pediu "reduzir movimento" no sistema não recebe movimento automático,
 *   e a navegação continua pelos botões (que saltam instantaneamente);
 * - a largura é controlada por transform dentro de um contêiner com
 *   `overflow: hidden`, então a página nunca ganha rolagem horizontal.
 */
export function ReviewCarousel({ items }: { items: readonly Testimonial[] }) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const offsetRef = useRef(0);
  const halfWidthRef = useRef(0);
  const stepRef = useRef(320);
  const isPointerInsideRef = useRef(false);
  const isFocusInsideRef = useRef(false);
  const isDraggingRef = useRef(false);
  const isVisibleRef = useRef(true);
  const resumeAtRef = useRef(0);
  const tweenRef = useRef<Tween | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const writeTransform = useCallback(() => {
    const track = trackRef.current;

    if (track) {
      track.style.transform = `translate3d(${offsetRef.current.toFixed(2)}px, 0, 0)`;
    }
  }, []);

  const normalizeOffset = useCallback(() => {
    const half = halfWidthRef.current;

    if (half <= 0) {
      return;
    }

    while (offsetRef.current >= 0) {
      offsetRef.current -= half;
    }

    while (offsetRef.current < -half) {
      offsetRef.current += half;
    }
  }, []);

  const measure = useCallback(() => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const cards = track.querySelectorAll<HTMLElement>('[data-review-card]');

    if (cards.length > 1) {
      stepRef.current = Math.max(1, cards[1].offsetLeft - cards[0].offsetLeft);
    }

    // A trilha contém duas cópias da lista. O ciclo é a distância entre um card
    // e o seu clone, o que é mais estável do que dividir `scrollWidth` por dois
    // (a divisão pode ser feita antes de o layout estar completo).
    const firstCard = cards[0];
    const firstClone = cards[Math.floor(cards.length / 2)];
    const cycle =
      firstCard && firstClone
        ? firstClone.offsetLeft - firstCard.offsetLeft
        : track.scrollWidth / 2;

    if (cycle > 0) {
      const previousCycle = halfWidthRef.current;
      halfWidthRef.current = cycle;

      // Primeira medição confiável: começa no início de um ciclo.
      if (previousCycle <= 0) {
        offsetRef.current = 0;
      }
    }

    normalizeOffset();
    writeTransform();
  }, [normalizeOffset, writeTransform]);

  useEffect(() => {
    measure();
    void document.fonts?.ready.then(measure);

    const track = trackRef.current;

    if (!track || typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measure);
      return () => window.removeEventListener('resize', measure);
    }

    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, [measure]);

  useEffect(() => {
    let frame = 0;
    let lastFrame = performance.now();

    const shouldAutoAdvance = () => {
      if (prefersReducedMotion) return false;
      if (isPointerInsideRef.current || isFocusInsideRef.current || isDraggingRef.current) return false;
      if (!isVisibleRef.current || document.hidden) return false;
      return performance.now() >= resumeAtRef.current;
    };

    const tick = (now: number) => {
      const delta = Math.min(now - lastFrame, MAX_FRAME_DELTA_MS);
      lastFrame = now;

      const tween = tweenRef.current;

      if (tween) {
        const progress = tween.duration === 0 ? 1 : Math.min((now - tween.startedAt) / tween.duration, 1);
        const eased = 1 - (1 - progress) ** 3;
        offsetRef.current = tween.from + (tween.to - tween.from) * eased;

        if (progress >= 1) {
          tweenRef.current = null;
          normalizeOffset();
        }

        writeTransform();
      } else if (shouldAutoAdvance()) {
        offsetRef.current += (AUTO_SPEED_PX_PER_SECOND * delta) / 1000;
        normalizeOffset();
        writeTransform();
      }

      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [normalizeOffset, prefersReducedMotion, writeTransform]);

  useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    let dragStartX = 0;
    let dragStartOffset = 0;

    const handlePointerEnter = () => {
      isPointerInsideRef.current = true;
    };
    const handlePointerLeave = () => {
      isPointerInsideRef.current = false;
    };
    const handleFocusIn = () => {
      isFocusInsideRef.current = true;
    };
    const handleFocusOut = (event: FocusEvent) => {
      const nextTarget = event.relatedTarget as Node | null;
      isFocusInsideRef.current = Boolean(nextTarget && viewport.contains(nextTarget));
    };
    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType === 'mouse' && event.button !== 0) {
        return;
      }

      isDraggingRef.current = true;
      tweenRef.current = null;
      dragStartX = event.clientX;
      dragStartOffset = offsetRef.current;
      viewport.setPointerCapture(event.pointerId);
    };
    const handlePointerMove = (event: PointerEvent) => {
      if (!isDraggingRef.current) {
        return;
      }

      offsetRef.current = dragStartOffset + (event.clientX - dragStartX);
      normalizeOffset();
      writeTransform();
    };
    const handlePointerUp = (event: PointerEvent) => {
      if (!isDraggingRef.current) {
        return;
      }

      isDraggingRef.current = false;
      resumeAtRef.current = performance.now() + RESUME_DELAY_MS;

      if (viewport.hasPointerCapture(event.pointerId)) {
        viewport.releasePointerCapture(event.pointerId);
      }
    };

    viewport.addEventListener('pointerenter', handlePointerEnter);
    viewport.addEventListener('pointerleave', handlePointerLeave);
    viewport.addEventListener('pointerdown', handlePointerDown);
    viewport.addEventListener('pointermove', handlePointerMove);
    viewport.addEventListener('pointerup', handlePointerUp);
    viewport.addEventListener('pointercancel', handlePointerUp);
    viewport.addEventListener('focusin', handleFocusIn);
    viewport.addEventListener('focusout', handleFocusOut);

    return () => {
      viewport.removeEventListener('pointerenter', handlePointerEnter);
      viewport.removeEventListener('pointerleave', handlePointerLeave);
      viewport.removeEventListener('pointerdown', handlePointerDown);
      viewport.removeEventListener('pointermove', handlePointerMove);
      viewport.removeEventListener('pointerup', handlePointerUp);
      viewport.removeEventListener('pointercancel', handlePointerUp);
      viewport.removeEventListener('focusin', handleFocusIn);
      viewport.removeEventListener('focusout', handleFocusOut);
    };
  }, [normalizeOffset, writeTransform]);

  useEffect(() => {
    const region = viewportRef.current?.parentElement;

    if (!region || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.12 },
    );

    observer.observe(region);
    return () => observer.disconnect();
  }, []);

  const jump = useCallback(
    (direction: 1 | -1) => {
      const duration = prefersReducedMotion ? 0 : JUMP_DURATION_MS;
      const target = offsetRef.current - direction * stepRef.current;

      resumeAtRef.current = performance.now() + RESUME_DELAY_MS;

      if (duration === 0) {
        offsetRef.current = target;
        normalizeOffset();
        writeTransform();
        return;
      }

      tweenRef.current = {
        from: offsetRef.current,
        to: target,
        startedAt: performance.now(),
        duration,
      };
    },
    [normalizeOffset, prefersReducedMotion, writeTransform],
  );

  return (
    <div
      role="group"
      aria-roledescription="carrossel"
      aria-label="Avaliações de clientes"
      className="relative"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-linear-to-r from-white to-transparent sm:w-16" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-linear-to-l from-white to-transparent sm:w-16" />

      <div
        ref={viewportRef}
        className="cursor-grab overflow-hidden py-2 active:cursor-grabbing"
        style={{ touchAction: 'pan-y' }}
      >
        <div ref={trackRef} className="flex w-max gap-5 will-change-transform">
          <ul className="flex gap-5">
            {items.map((testimonial) => (
              <ReviewCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </ul>
          <ul aria-hidden className="flex gap-5">
            {items.map((testimonial) => (
              <ReviewCard key={`${testimonial.id}-clone`} testimonial={testimonial} />
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => jump(-1)}
          className="inline-flex size-11 items-center justify-center rounded-full border border-navy/15 bg-white text-navy transition hover:border-brand/40 hover:text-brand"
        >
          <ChevronLeft aria-hidden className="size-5" />
          <span className="sr-only">Ver avaliações anteriores</span>
        </button>
        <button
          type="button"
          onClick={() => jump(1)}
          className="inline-flex size-11 items-center justify-center rounded-full border border-navy/15 bg-white text-navy transition hover:border-brand/40 hover:text-brand"
        >
          <ChevronRight aria-hidden className="size-5" />
          <span className="sr-only">Ver próximas avaliações</span>
        </button>
      </div>
    </div>
  );
}
