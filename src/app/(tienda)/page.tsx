import Link from 'next/link';
import { Truck, CreditCard, Store } from 'lucide-react';
import { ProductoCard } from '@/components/tienda/ProductoCard';
import { BannerCarrusel } from '@/components/tienda/BannerCarrusel';
import { Carril } from '@/components/tienda/Carril';
import {
  CATEGORIAS,
  OFERTAS_DIA,
  FILAS_HOME,
  productosDe,
  nombreCategoria,
} from '@/components/tienda/data';

const SERVICIOS = [
  { icono: Truck, titulo: 'Envíos', texto: 'A todo el país' },
  { icono: CreditCard, titulo: 'Medios de pago', texto: 'Tarjetas y transferencia' },
  { icono: Store, titulo: 'Pickup gratis', texto: 'Retirá en San Miguel de Tucumán' },
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
          {SERVICIOS.map(({ icono: Icono, titulo, texto }) => (
            <div key={titulo}>
              <div className="servicio-icono">
                <Icono size={28} strokeWidth={1.5} aria-hidden="true" />
              </div>
              <p className="servicio-titulo">{titulo}</p>
              <p className="servicio-texto">{texto}</p>
            </div>
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
