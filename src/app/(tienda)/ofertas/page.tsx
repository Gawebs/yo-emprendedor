import Link from 'next/link';
import type { Metadata } from 'next';
import { ProductoCard } from '@/components/tienda/ProductoCard';
import { PRODUCTOS } from '@/components/tienda/data';

export const metadata: Metadata = {
  title: 'Ofertas — Yo Emprendedor',
  description: 'Productos con descuento de marcas locales de Tucumán.',
};

export default function OfertasPage() {
  // Esta en oferta lo que tiene precio anterior: el descuento se lee del dato,
  // no de una lista aparte que haya que mantener sincronizada.
  const enOferta = PRODUCTOS.filter((p) => p.precioAntes);

  return (
    <div className="contenedor">
      <nav className="miga" aria-label="Miga de pan">
        <Link href="/">Home</Link>
        <span className="miga-sep">/</span>
        <span>Ofertas</span>
      </nav>

      <header className="cat-head">
        <h1 className="cat-titulo">Ofertas</h1>
        <p className="cat-cuenta">
          {enOferta.length === 0
            ? 'Por ahora no hay ofertas activas'
            : `${enOferta.length} ${enOferta.length === 1 ? 'producto' : 'productos'} con descuento`}
        </p>
      </header>

      {enOferta.length === 0 ? (
        <p className="vacio">
          Volvé pronto.{' '}
          <Link href="/" style={{ color: 'var(--dorado)', fontWeight: 600 }}>Ver todo el catálogo</Link>
        </p>
      ) : (
        <div className="grilla">
          {enOferta.map((p) => <ProductoCard key={p.slug} producto={p} />)}
        </div>
      )}
    </div>
  );
}
