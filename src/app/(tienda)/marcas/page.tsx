import type { Metadata } from 'next';
import { MARCAS } from '@/components/tienda/data';

export const metadata: Metadata = {
  title: 'Marcas que nos acompañan — Yo Emprendedor',
  description: 'Emprendedoras que forman parte de Yo Emprendedor en San Miguel de Tucumán.',
};

/** Iniciales para el circulo, hasta que haya logos reales de cada marca. */
const iniciales = (nombre: string) =>
  nombre.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase();

export default function MarcasPage() {
  return (
    <div className="contenedor">
      <header className="marcas-head">
        <h1 className="marcas-titulo">Marcas que nos acompañan</h1>
        <p className="marcas-sub">Emprendedoras que forman parte de Yo Emprendedor</p>
      </header>

      <div className="marcas-grid">
        {MARCAS.map((marca) => (
          <article className="marca" key={marca}>
            <div className="marca-logo" aria-hidden="true">{iniciales(marca)}</div>
            <p className="marca-nombre">{marca}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
