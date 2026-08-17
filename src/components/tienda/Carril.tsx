'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Carrusel horizontal con flechas en ambos extremos, como pidio Anita para la
 * barra de rubros y para las filas de producto.
 *
 * Las flechas se ocultan cuando no hay a donde ir, y desaparecen del todo si
 * el contenido entra sin scrollear: una flecha que no hace nada confunde.
 */
export function Carril({
  children,
  className = '',
  etiqueta,
}: {
  children: ReactNode;
  className?: string;
  etiqueta: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [puedeIzq, setPuedeIzq] = useState(false);
  const [puedeDer, setPuedeDer] = useState(false);

  const revisar = () => {
    const el = ref.current;
    if (!el) return;
    const margen = 4; // tolerancia por redondeo de subpixeles
    setPuedeIzq(el.scrollLeft > margen);
    setPuedeDer(el.scrollLeft + el.clientWidth < el.scrollWidth - margen);
  };

  useEffect(() => {
    revisar();
    const el = ref.current;
    if (!el) return;

    el.addEventListener('scroll', revisar, { passive: true });
    const observer = new ResizeObserver(revisar);
    observer.observe(el);

    return () => {
      el.removeEventListener('scroll', revisar);
      observer.disconnect();
    };
  }, []);

  const mover = (direccion: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: direccion * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  const hayScroll = puedeIzq || puedeDer;

  return (
    <div className="carril-envoltorio">
      {hayScroll && (
        <button
          type="button"
          className="carril-flecha carril-flecha-izq"
          onClick={() => mover(-1)}
          disabled={!puedeIzq}
          aria-label={`Ver ${etiqueta} anteriores`}
        >
          <ChevronLeft size={20} aria-hidden="true" />
        </button>
      )}

      <div className={className} ref={ref}>
        {children}
      </div>

      {hayScroll && (
        <button
          type="button"
          className="carril-flecha carril-flecha-der"
          onClick={() => mover(1)}
          disabled={!puedeDer}
          aria-label={`Ver más ${etiqueta}`}
        >
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
