'use client';

import { useEffect, useState } from 'react';

type Pieza = { titulo: string; sub: string };

const INTERVALO = 6000;

/**
 * Banner deslizable del wireframe. Rota solo, y los puntos permiten saltar a
 * una pieza. Se detiene con prefers-reduced-motion y mientras el puntero esta
 * encima, para que no cambie de golpe mientras alguien lee.
 */
export function BannerCarrusel({ piezas }: { piezas: Pieza[] }) {
  const [activa, setActiva] = useState(0);
  const [pausado, setPausado] = useState(false);

  useEffect(() => {
    if (piezas.length < 2 || pausado) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const t = setInterval(() => setActiva((i) => (i + 1) % piezas.length), INTERVALO);
    return () => clearInterval(t);
  }, [piezas.length, pausado]);

  const pieza = piezas[activa];

  return (
    <section
      className="banner"
      aria-roledescription="carrusel"
      aria-label="Destacados"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
    >
      <div aria-live="polite" aria-atomic="true">
        <h2 className="banner-titulo">{pieza.titulo}</h2>
        <p className="banner-sub">{pieza.sub}</p>
      </div>

      {piezas.length > 1 && (
        <div className="banner-puntos">
          {piezas.map((p, i) => (
            <button
              key={p.titulo}
              type="button"
              className="banner-punto"
              aria-current={i === activa}
              aria-label={`Ver: ${p.titulo}`}
              onClick={() => setActiva(i)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
