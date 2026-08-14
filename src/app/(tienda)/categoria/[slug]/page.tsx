import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ProductoCard } from '@/components/tienda/ProductoCard';
import { CATEGORIAS, productosDe, nombreCategoria } from '@/components/tienda/data';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CATEGORIAS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const existe = CATEGORIAS.some((c) => c.slug === slug);
  if (!existe) return { title: 'Categoría no encontrada — Yo Emprendedor' };

  return {
    title: `${nombreCategoria(slug)} — Yo Emprendedor`,
    description: `Productos de ${nombreCategoria(slug).toLowerCase()} de marcas locales de Tucumán.`,
  };
}

export default async function CategoriaPage({ params }: Props) {
  const { slug } = await params;
  if (!CATEGORIAS.some((c) => c.slug === slug)) notFound();

  const productos = productosDe(slug);

  return (
    <div className="contenedor">
      <nav className="miga" aria-label="Miga de pan">
        <Link href="/">Home</Link>
        <span className="miga-sep">/</span>
        <span>{nombreCategoria(slug)}</span>
      </nav>

      <header className="cat-head">
        <h1 className="cat-titulo">{nombreCategoria(slug)}</h1>
        <p className="cat-cuenta">
          {productos.length === 0
            ? 'Todavía no hay productos en esta categoría'
            : `${productos.length} ${productos.length === 1 ? 'producto' : 'productos'}`}
        </p>
      </header>

      {productos.length === 0 ? (
        <p className="vacio">
          Estamos sumando marcas a esta categoría.{' '}
          <Link href="/" style={{ color: 'var(--dorado)', fontWeight: 600 }}>Ver todo el catálogo</Link>
        </p>
      ) : (
        <div className="grilla">
          {productos.map((p) => (
            <ProductoCard key={p.slug} producto={p} />
          ))}
        </div>
      )}
    </div>
  );
}
