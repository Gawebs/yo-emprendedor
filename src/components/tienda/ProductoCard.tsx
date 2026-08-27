import Link from 'next/link';
import { estaAgotado, formatearPrecio, type Producto } from './data';

export function ProductoCard({ producto }: { producto: Producto }) {
  const agotado = estaAgotado(producto.slug);

  return (
    <Link href={`/producto/${producto.slug}`} className={`prod${agotado ? ' prod-agotado' : ''}`}>
      <div className="prod-foto">
        {/* Se sigue pudiendo entrar a la ficha: ahi se ve de que se trata y
            cuando vuelva a haber. Ocultarlo haria que el cliente creyera que
            no se vende mas. */}
        {agotado && <span className="prod-cinta-agotado">Agotado</span>}
        {/* Un producto puede llevar las dos etiquetas, una o ninguna. */}
        {(producto.oferta || producto.masVendido) && (
          <div className="prod-badges">
            {producto.oferta && <span className="prod-badge badge-oferta">Oferta</span>}
            {producto.masVendido && <span className="prod-badge badge-vendido">Más vendido</span>}
          </div>
        )}
        {/* Las fotos llegan ya optimizadas (webp de ~14 KB) y el bucket de
            Supabase las sirve por CDN, asi que van con <img> plano en vez de
            next/image: la optimizacion no ganaria nada y en el plan Hobby
            tiene cupo mensual. width y height evitan que la pagina salte
            mientras cargan. */}
        {producto.fotos?.[0] && (
          <img
            src={producto.fotos[0]}
            alt={producto.nombre}
            width={640}
            height={640}
            loading="lazy"
            decoding="async"
          />
        )}
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
