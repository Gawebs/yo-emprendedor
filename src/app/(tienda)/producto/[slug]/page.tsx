import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { FichaProducto } from '@/components/tienda/FichaProducto';
import { ProductoCard } from '@/components/tienda/ProductoCard';
import {
  productoDetalle,
  relacionadosDe,
  nombreCategoria,
  PRODUCTOS,
  rubroPrincipal,
} from '@/components/tienda/data';

// En Next 16 los params de ruta llegan como Promise.
type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PRODUCTOS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const producto = productoDetalle(slug);
  if (!producto) return { title: 'Producto no encontrado · Yo Emprendedor' };

  return {
    title: `${producto.nombre} · Yo Emprendedor`,
    description: producto.descripcion,
  };
}

export default async function ProductoPage({ params }: Props) {
  const { slug } = await params;
  const producto = productoDetalle(slug);
  if (!producto) notFound();

  const relacionados = relacionadosDe(slug, rubroPrincipal(producto));

  return (
    <div className="contenedor">
      <nav className="miga" aria-label="Miga de pan">
        <Link href="/">Home</Link>
        <span className="miga-sep">/</span>
        <Link href={`/categoria/${rubroPrincipal(producto)}`}>{nombreCategoria(rubroPrincipal(producto))}</Link>
        <span className="miga-sep">/</span>
        <span>{producto.nombre}</span>
      </nav>

      <FichaProducto producto={producto} />

      <section className="detalles">
        <h2>Detalles del producto</h2>
        <div className="detalles-datos">
          <span>Código: {producto.codigo}</span>
          {producto.medidas && <span>Medidas: {producto.medidas}</span>}
        </div>
        <h2>Descripción</h2>
        <p>{producto.descripcion}</p>
      </section>

      {relacionados.length > 0 && (
        <section className="fila" aria-labelledby="relacionados">
          <div className="fila-head">
            <h2 className="fila-titulo" id="relacionados">Productos relacionados</h2>
          </div>
          <div className="fila-carril">
            {relacionados.map((p) => (
              <ProductoCard key={p.slug} producto={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
