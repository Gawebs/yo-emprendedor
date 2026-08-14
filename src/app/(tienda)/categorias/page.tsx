import Link from 'next/link';
import type { Metadata } from 'next';
import { CATEGORIAS, productosDe } from '@/components/tienda/data';

export const metadata: Metadata = {
  title: 'Categorías — Yo Emprendedor',
  description: 'Explorá los productos por categoría: belleza, accesorios, deco, hogar y más.',
};

export default function CategoriasPage() {
  return (
    <div className="contenedor">
      <nav className="miga" aria-label="Miga de pan">
        <Link href="/">Home</Link>
        <span className="miga-sep">/</span>
        <span>Categorías</span>
      </nav>

      <header className="cat-head">
        <h1 className="cat-titulo">Categorías</h1>
        <p className="cat-cuenta">{CATEGORIAS.length} categorías para explorar</p>
      </header>

      <div className="cats-grid">
        {CATEGORIAS.map(({ slug, nombre, icono: Icono }) => {
          const cuenta = productosDe(slug).length;
          return (
            <Link href={`/categoria/${slug}`} className="cat-card" key={slug}>
              <span className="categoria-circulo">
                <Icono size={26} strokeWidth={1.75} aria-hidden="true" />
              </span>
              <span className="cat-card-nombre">{nombre}</span>
              <span className="cat-card-cuenta">
                {cuenta === 0 ? 'Próximamente' : `${cuenta} ${cuenta === 1 ? 'producto' : 'productos'}`}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
