'use client';

import { useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

/** Cuanto agranda el zoom sobre la foto ya encajada en la pantalla. */
const ZOOM = 2.5;

type Props = {
  fotos: string[];
  /** Cual se abre. El visor sigue navegando por su cuenta desde ahi. */
  inicial: number;
  nombre: string;
  /** Avisa a la ficha en que foto quedo, para que las dos digan lo mismo. */
  onCambiar: (i: number) => void;
  onCerrar: () => void;
};

/**
 * Ver la foto de un producto en grande, para mirarle la textura y las
 * terminaciones. En la ficha la imagen se ve a 552 px; aca ocupa hasta el 92%
 * de la pantalla, y con el zoom llega a 2,5 veces eso.
 *
 * **La nitidez depende del original.** Las fotos de blanqueria vinieron en
 * 640 px, asi que ampliadas se ven blandas: el visor no inventa detalle que la
 * foto no tiene. Las de muebles son de 1200 y aguantan bien. Que se note es
 * util, porque muestra cuales conviene pedirle de nuevo a Anita.
 */
export function VisorFotos({ fotos, inicial, nombre, onCambiar, onCerrar }: Props) {
  const [i, setI] = useState(inicial);
  const [zoom, setZoom] = useState(false);
  // Punto de la foto que queda bajo el cursor al ampliar, en porcentaje.
  const [foco, setFoco] = useState({ x: 50, y: 50 });
  const cerrarRef = useRef<HTMLButtonElement>(null);
  const arrastre = useRef<{ x: number; y: number; fx: number; fy: number } | null>(null);

  const mover = (paso: number) => {
    const siguiente = (i + paso + fotos.length) % fotos.length;
    setI(siguiente);
    setZoom(false);
    onCambiar(siguiente);
  };

  // Mientras el visor esta abierto la pagina de atras no se mueve, igual que
  // en el buscador. El foco arranca en Cerrar: es la salida.
  useEffect(() => {
    cerrarRef.current?.focus();
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Se vuelve a atar en cada foto porque las flechas dependen de cual es.
  useEffect(() => {
    const alTeclado = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCerrar();
      if (e.key === 'ArrowLeft') mover(-1);
      if (e.key === 'ArrowRight') mover(1);
    };
    window.addEventListener('keydown', alTeclado);
    return () => window.removeEventListener('keydown', alTeclado);
  }, [i]);

  /** Con la foto ampliada, el mouse la recorre: mover la cabeza no alcanza. */
  const alMover = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!zoom) return;
    const caja = e.currentTarget.getBoundingClientRect();
    setFoco({
      x: ((e.clientX - caja.left) / caja.width) * 100,
      y: ((e.clientY - caja.top) / caja.height) * 100,
    });
  };

  // En el celular no hay cursor que seguir, asi que la foto se arrastra.
  const alTocar = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!zoom) return;
    const t = e.touches[0];
    arrastre.current = { x: t.clientX, y: t.clientY, fx: foco.x, fy: foco.y };
  };
  const alArrastrar = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!zoom || !arrastre.current) return;
    const t = e.touches[0];
    const caja = e.currentTarget.getBoundingClientRect();
    const { x, y, fx, fy } = arrastre.current;
    setFoco({
      x: Math.min(100, Math.max(0, fx - ((t.clientX - x) / caja.width) * 100)),
      y: Math.min(100, Math.max(0, fy - ((t.clientY - y) / caja.height) * 100)),
    });
  };

  return (
    <div className="visor" role="dialog" aria-modal="true" aria-label={`Fotos de ${nombre}`}>
      <button type="button" className="visor-fondo" aria-label="Cerrar" onClick={onCerrar} />

      <div className="visor-barra">
        {fotos.length > 1 && (
          <span className="visor-contador">{i + 1} / {fotos.length}</span>
        )}
        <button
          type="button"
          className="visor-btn"
          aria-pressed={zoom}
          aria-label={zoom ? 'Alejar' : 'Ampliar'}
          onClick={() => setZoom(!zoom)}
        >
          {zoom ? <ZoomOut size={20} aria-hidden="true" /> : <ZoomIn size={20} aria-hidden="true" />}
        </button>
        <button
          type="button"
          className="visor-btn"
          aria-label="Cerrar"
          ref={cerrarRef}
          onClick={onCerrar}
        >
          <X size={20} aria-hidden="true" />
        </button>
      </div>

      {fotos.length > 1 && (
        <>
          <button
            type="button"
            className="visor-flecha visor-flecha-izq"
            aria-label="Foto anterior"
            onClick={() => mover(-1)}
          >
            <ChevronLeft size={26} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="visor-flecha visor-flecha-der"
            aria-label="Foto siguiente"
            onClick={() => mover(1)}
          >
            <ChevronRight size={26} aria-hidden="true" />
          </button>
        </>
      )}

      {/* Tocar la foto amplia y vuelve, que es lo que la gente prueba primero. */}
      <div
        className={`visor-foto${zoom ? ' visor-foto-zoom' : ''}`}
        onClick={() => setZoom(!zoom)}
        onMouseMove={alMover}
        onTouchStart={alTocar}
        onTouchMove={alArrastrar}
      >
        <img
          src={fotos[i]}
          alt={nombre}
          style={
            zoom
              ? { transform: `scale(${ZOOM})`, transformOrigin: `${foco.x}% ${foco.y}%` }
              : undefined
          }
        />
      </div>
    </div>
  );
}
