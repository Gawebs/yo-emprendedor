import Link from 'next/link';
import { formatearPrecio, type Producto } from './data';

export function ProductoCard({ producto }: { producto: Producto }) {
  return (
    <Link href={`/producto/${producto.slug}`} className="prod">
      <div className="prod-foto">
        {/* Un producto puede llevar las dos etiquetas, una o ninguna. */}
        {(producto.oferta || producto.masVendido) && (
          <div className="prod-badges">
            {producto.oferta && <span className="prod-badge badge-oferta">Oferta</span>}
            {producto.masVendido && <span className="prod-badge badge-vendido">Más vendido</span>}
          </div>
        )}
        {/* Sin foto todavia: el bloque gris hace de marcador hasta que haya imagenes reales. */}
      </div>
      <div className="prod-cuerpo">
        <p className="prod-nombre">{producto.nombre}</p>
        <div className="prod-precios">
          {producto.precioAntes && (
            <span className="prod-antes">{formatearPrecio(producto.precioAntes)}</span>
          )}
          <span className="prod-precio">{formatearPrecio(producto.precio)}</span>
        </div>
      </div>
    </Link>
  );
}
