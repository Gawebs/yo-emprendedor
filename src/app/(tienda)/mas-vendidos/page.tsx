import Link from 'next/link';
import type { Metadata } from 'next';
import { ProductoCard } from '@/components/tienda/ProductoCard';
import { PRODUCTOS } from '@/components/tienda/data';

export const metadata: Metadata = {
  title: 'Más vendidos — Yo Emprendedor',
  description: 'Los productos que más eligen nuestros clientes.',
};

export default function MasVendidosPage() {
  // Sin ventas reales todavia, se muestra una seleccion fija. Cuando entre
  // Supabase esto pasa a ordenarse por unidades vendidas (pedido_items).
  const seleccion = PRODUCTOS.slice(0, 10);

  return (
    <div className="contenedor">
      <nav className="miga" aria-label="Miga de pan">
        <Link href="/">Home</Link>
        <span className="miga-sep">/</span>
        <span>Más vendidos</span>
      </nav>

      <header className="cat-head">
        <h1 className="cat-titulo">Más vendidos</h1>
        <p className="cat-cuenta">Lo que más eligen nuestros clientes</p>
      </header>

      <div className="grilla">
        {seleccion.map((p) => <ProductoCard key={p.slug} producto={p} />)}
      </div>
    </div>
  );
}
