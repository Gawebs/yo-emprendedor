import Link from 'next/link';
import type { Metadata } from 'next';
import { ProductoCard } from '@/components/tienda/ProductoCard';
import { buscarProductos, buscarRubros } from '@/lib/tienda/buscar';

type Props = { searchParams: Promise<{ q?: string }> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `"${q}" — Yo Emprendedor` : 'Buscar — Yo Emprendedor',
    // Los resultados de busqueda no aportan nada a un buscador y generan
    // paginas infinitas: se piden fuera del indice.
    robots: { index: false, follow: true },
  };
}

export default async function BuscarPage({ searchParams }: Props) {
  const { q = '' } = await searchParams;
  const consulta = q.trim();
  const productos = buscarProductos(consulta);
  const rubros = buscarRubros(consulta);

  return (
    <div className="contenedor">
      <nav className="miga" aria-label="Miga de pan">
        <Link href="/">Home</Link>
        <span className="miga-sep">/</span>
        <span>Buscar</span>
      </nav>

      <header className="cat-head">
        <h1 className="cat-titulo">
          {consulta ? <>Resultados para &ldquo;{consulta}&rdquo;</> : 'Buscar productos'}
        </h1>
        {consulta && (
          <p className="cat-cuenta">
            {productos.length === 0
              ? 'No encontramos productos'
              : `${productos.length} ${productos.length === 1 ? 'producto' : 'productos'}`}
          </p>
        )}
      </header>

      {rubros.length > 0 && (
        <div className="buscar-rubros">
          {rubros.map((r) => (
            <Link key={r.slug} href={`/categoria/${r.slug}`} className="buscar-rubro">
              Ver todo {r.nombre}
            </Link>
          ))}
        </div>
      )}

      {!consulta ? (
        <p className="vacio">Escribí qué estás buscando en la lupa de arriba.</p>
      ) : productos.length === 0 ? (
        <div className="vacio">
          <p>No encontramos productos que coincidan con tu búsqueda.</p>
          <p style={{ marginTop: '.75rem' }}>
            Probá con otra palabra o{' '}
            <Link href="/categorias" style={{ color: 'var(--dorado)', fontWeight: 600 }}>
              mirá los rubros
            </Link>.
          </p>
        </div>
      ) : (
        <div className="grilla">
          {productos.map((p) => <ProductoCard key={p.slug} producto={p} />)}
        </div>
      )}
    </div>
  );
}
