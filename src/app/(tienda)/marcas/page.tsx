import type { Metadata } from 'next';
import { MARCAS } from '@/components/tienda/data';

export const metadata: Metadata = {
  title: 'Marcas que nos acompañan · Yo Emprendedor',
  description: 'Emprendedoras que forman parte de Yo Emprendedor en San Miguel de Tucumán.',
};

/** Iniciales para las marcas que todavia no mandaron su logo. */
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
        {MARCAS.map(({ nombre, logo }) => (
          <article className="marca" key={nombre}>
            <div className="marca-logo" aria-hidden="true">
              {logo ? <img src={logo} alt="" width={300} height={300} loading="lazy" /> : iniciales(nombre)}
            </div>
            <p className="marca-nombre">{nombre}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
