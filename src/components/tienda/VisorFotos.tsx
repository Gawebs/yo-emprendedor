'use client';

import { useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

/**
 * Los pasos del zoom: la foto entera, el doble y el triple y medio. Dos
 * niveles y no uno solo porque no es lo mismo mirar una costura que leer una
 * etiqueta, y no mas de dos porque a partir del tercer paso las fotos que
 * tenemos ya no dan mas detalle, solo mas pixel.
 */
const NIVELES = [1, 2, 3.5];

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
 * de la pantalla, y con el zoom llega a 3,5 veces eso.
 *
 * Con el zoom puesto la foto se arrastra con el mouse o con el dedo, con la
 * manito, que es como se mira una foto grande en cualquier lado.
 *
 * **La nitidez depende del original.** Las fotos de blanqueria vinieron en
 * 640 px, asi que ampliadas se ven blandas: el visor no inventa detalle que la
 * foto no tiene. Las de muebles son de 1200 y aguantan bien. Que se note es
 * util, porque muestra cuales conviene pedirle de nuevo a Anita.
 */
export function VisorFotos({ fotos, inicial, nombre, onCambiar, onCerrar }: Props) {
  const [i, setI] = useState(inicial);
  const [nivel, setNivel] = useState(0);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [arrastrando, setArrastrando] = useState(false);
  const cerrarRef = useRef<HTMLButtonElement>(null);
  const cajaRef = useRef<HTMLDivElement>(null);
  const desde = useRef<{ x: number; y: number; px: number; py: number; movio: boolean } | null>(null);

  const escala = NIVELES[nivel];
  const ampliada = escala > 1;

  /**
   * La foto no se puede arrastrar mas alla de su propio borde: pasado eso
   * quedaria mirando el fondo negro sin entender que paso.
   */
  const limitar = (x: number, y: number, e: number) => {
    const caja = cajaRef.current?.getBoundingClientRect();
    if (!caja) return { x: 0, y: 0 };
    const topeX = (caja.width * (e - 1)) / 2;
    const topeY = (caja.height * (e - 1)) / 2;
    return {
      x: Math.min(topeX, Math.max(-topeX, x)),
      y: Math.min(topeY, Math.max(-topeY, y)),
    };
  };

  const cambiarNivel = (siguiente: number) => {
    const n = Math.min(NIVELES.length - 1, Math.max(0, siguiente));
    setNivel(n);
    setPos(NIVELES[n] === 1 ? { x: 0, y: 0 } : limitar(pos.x, pos.y, NIVELES[n]));
  };

  const mover = (paso: number) => {
    const siguiente = (i + paso + fotos.length) % fotos.length;
    setI(siguiente);
    setNivel(0);
    setPos({ x: 0, y: 0 });
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

  /**
   * Mouse y dedo por el mismo camino: los eventos de puntero no distinguen, y
   * escribir dos veces lo mismo es como se desincronizan las dos.
   */
  const alAgarrar = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!ampliada) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    desde.current = { x: e.clientX, y: e.clientY, px: pos.x, py: pos.y, movio: false };
    setArrastrando(true);
  };

  const alArrastrar = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!desde.current) return;
    const dx = e.clientX - desde.current.x;
    const dy = e.clientY - desde.current.y;
    // Un temblor de tres pixeles al hacer clic no es un arrastre.
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) desde.current.movio = true;
    setPos(limitar(desde.current.px + dx, desde.current.py + dy, escala));
  };

  const alSoltar = () => {
    setArrastrando(false);
    // Si la foto se arrastro, soltar no tiene que cambiar el zoom.
    if (desde.current?.movio) {
      desde.current = null;
      return;
    }
    desde.current = null;
    cambiarNivel(nivel === NIVELES.length - 1 ? 0 : nivel + 1);
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
          aria-label="Alejar"
          disabled={nivel === 0}
          onClick={() => cambiarNivel(nivel - 1)}
        >
          <ZoomOut size={20} aria-hidden="true" />
        </button>
        {/* El nivel a la vista: si no, ampliar dos veces y que la segunda no
            haga nada se lee como que el visor se colgo. */}
        <span className="visor-nivel" aria-live="polite">
          {ampliada ? `${String(escala).replace('.', ',')}x` : '1x'}
        </span>
        <button
          type="button"
          className="visor-btn"
          aria-label="Ampliar"
          disabled={nivel === NIVELES.length - 1}
          onClick={() => cambiarNivel(nivel + 1)}
        >
          <ZoomIn size={20} aria-hidden="true" />
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

      {/* Tocar la foto pasa de nivel y vuelve al principio, que es lo que la
          gente prueba primero. Con el zoom puesto, arrastrarla la mueve. */}
      <div
        ref={cajaRef}
        className={
          'visor-foto' +
          (ampliada ? ' visor-foto-zoom' : '') +
          (arrastrando ? ' visor-foto-agarrada' : '')
        }
        onPointerDown={alAgarrar}
        onPointerMove={alArrastrar}
        onPointerUp={alSoltar}
        onPointerCancel={() => { desde.current = null; setArrastrando(false); }}
      >
        <img
          src={fotos[i]}
          alt={nombre}
          draggable={false}
          style={{ transform: `translate(${pos.x}px, ${pos.y}px) scale(${escala})` }}
        />
      </div>
    </div>
  );
}
