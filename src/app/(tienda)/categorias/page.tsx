import Link from 'next/link';
import type { Metadata } from 'next';
import { CATEGORIAS, productosDe } from '@/components/tienda/data';

export const metadata: Metadata = {
  title: 'Categorías · Yo Emprendedor',
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

      <div className="cats-lista">
        {CATEGORIAS.map(({ slug, nombre, icono: Icono, sub, nota }) => {
          const cuenta = productosDe(slug).length;
          return (
            <section className="cat-bloque" key={slug}>
              <Link href={`/categoria/${slug}`} className="cat-bloque-head">
                <span className="categoria-circulo">
                  <Icono size={24} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span>
                  <span className="cat-card-nombre">{nombre}</span>
                  <span className="cat-card-cuenta">
                    {cuenta === 0 ? 'Próximamente' : `${cuenta} ${cuenta === 1 ? 'producto' : 'productos'}`}
                  </span>
                </span>
              </Link>

              {sub.length > 0 && (
                <ul className="subrubros">
                  {sub.map((s) => (
                    <li key={s}>
                      {/* Los subrubros todavia no filtran solos: llevan al rubro
                          hasta que los productos tengan subrubro cargado. */}
                      <Link href={`/categoria/${slug}`}>{s}</Link>
                    </li>
                  ))}
                </ul>
              )}

              {nota && <p className="cat-nota">{nota}</p>}
            </section>
          );
        })}
      </div>
    </div>
  );
}
