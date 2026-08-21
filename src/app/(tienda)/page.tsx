import Link from 'next/link';
import { Truck, CreditCard } from 'lucide-react';
import { ProductoCard } from '@/components/tienda/ProductoCard';
import { BannerCarrusel } from '@/components/tienda/BannerCarrusel';
import { Carril } from '@/components/tienda/Carril';
import {
  CATEGORIAS,
  OFERTAS_DIA,
  FILAS_HOME,
  productosDe,
  nombreCategoria,
  CONTACTO,
  ENVIO_GRATIS_DESDE,
  formatearPrecio,
} from '@/components/tienda/data';

/**
 * Antes eran tres bloques de una linea, y el tercero repetia el retiro en el
 * local que ya anuncia el banner de arriba. Ahora son dos, con los datos que
 * el comprador necesita antes de decidir: cuanto cuesta el envio, cuando
 * llega, con que puede pagar. Todo a la vista, sin obligar a entrar a la
 * politica — el enlace queda para el que quiera el detalle completo.
 *
 * Cada dato sale de las politicas que redacto Anita: no agregar puntos aca
 * sin que esten escritos en `politicas.ts`.
 */
const SERVICIOS = [
  {
    icono: Truck,
    titulo: 'Envíos y retiro',
    href: '/envios',
    puntos: [
      { fuerte: 'Envío gratis', resto: `en compras de más de ${formatearPrecio(ENVIO_GRATIS_DESDE)}` },
      { fuerte: 'Retiro gratis en el local', resto: `de ${CONTACTO.direccion}` },
      { fuerte: 'De 24 a 48 hs hábiles', resto: 'en San Miguel de Tucumán y alrededores' },
      { fuerte: 'Enviamos a todo el país', resto: 'con el costo calculado antes de confirmar' },
    ],
  },
  {
    icono: CreditCard,
    titulo: 'Medios de pago',
    href: '/formas-de-pago',
    puntos: [
      { fuerte: '10% de descuento', resto: 'pagando por transferencia' },
      { fuerte: 'Hasta 3 cuotas sin interés', resto: 'con tarjeta de crédito' },
      { fuerte: 'Débito y dinero en cuenta', resto: 'a través de Mercado Pago' },
      { fuerte: 'Efectivo', resto: 'solo para compras en el local' },
    ],
  },
];

export default function TiendaHome() {
  return (
    <>
      <BannerCarrusel
        piezas={[
          { titulo: 'Marcas locales que crecen todos los días', sub: 'Descubrí productos de emprendedoras de Tucumán' },
          { titulo: 'Envío gratis en tu primera compra', sub: 'Sumate y recibilo donde estés' },
          { titulo: '3 cuotas sin interés', sub: 'Con todas las tarjetas' },
        ]}
      />

      <div className="contenedor">
        <div className="ofertas">
          {OFERTAS_DIA.map((oferta) => (
            <Link key={oferta.titulo} href={oferta.href} className="oferta">
              <span className="oferta-tag">Oferta del día</span>
              <p className="oferta-titulo">{oferta.titulo}</p>
            </Link>
          ))}
        </div>
      </div>

      <section className="categorias" aria-label="Categorías">
        <div className="contenedor">
          <Carril className="categorias-fila" etiqueta="rubros">
            {CATEGORIAS.map(({ slug, nombre, icono: Icono }) => (
              <Link key={slug} href={`/categoria/${slug}`} className="categoria">
                <span className="categoria-circulo">
                  <Icono size={24} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span className="categoria-nombre">{nombre}</span>
              </Link>
            ))}
          </Carril>
        </div>
      </section>

      <div className="contenedor">
        {FILAS_HOME.map((slug) => (
          <section className="fila" key={slug} aria-labelledby={`fila-${slug}`}>
            <div className="fila-head">
              <h2 className="fila-titulo" id={`fila-${slug}`}>{nombreCategoria(slug)}</h2>
              <Link href={`/categoria/${slug}`} className="fila-vertodo">ver todo</Link>
            </div>
            <Carril className="fila-carril" etiqueta={`productos de ${nombreCategoria(slug).toLowerCase()}`}>
              {productosDe(slug).map((producto) => (
                <ProductoCard key={producto.slug} producto={producto} />
              ))}
            </Carril>
          </section>
        ))}
      </div>

      <BannerCarrusel
        piezas={[
          { titulo: 'Más marcas para descubrir', sub: 'Cada mes se suman emprendimientos nuevos' },
          { titulo: 'Retirá gratis por el local', sub: '24 de Septiembre 734, San Miguel de Tucumán' },
        ]}
      />

      <div className="contenedor">
        <div className="servicios">
          {SERVICIOS.map(({ icono: Icono, titulo, href, puntos }) => (
            <section className="servicio" key={titulo} aria-labelledby={`serv-${href}`}>
              <div className="servicio-head">
                <span className="servicio-icono">
                  <Icono size={22} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h2 className="servicio-titulo" id={`serv-${href}`}>{titulo}</h2>
              </div>
              <ul className="servicio-lista">
                {puntos.map(({ fuerte, resto }) => (
                  <li key={fuerte}>
                    <strong>{fuerte}</strong> {resto}
                  </li>
                ))}
              </ul>
              <Link href={href} className="servicio-mas">Ver todos los detalles</Link>
            </section>
          ))}
        </div>
      </div>

      {/* Las dos puertas a la seccion de emprendedores: una va directo a los
          planes, la otra al arranque de la landing. */}
      <div className="ctas">
        <Link href="/quiero-vender#plans" className="cta-grande">¡Quiero vender!</Link>
        <Link href="/quiero-vender" className="cta-grande">¡Soy emprendedor!</Link>
      </div>
    </>
  );
}
