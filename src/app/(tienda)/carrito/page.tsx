'use client';

import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag, Truck } from 'lucide-react';
import { useCarrito } from '@/contexts/CarritoContext';
import { formatearPrecio, ENVIO_GRATIS_DESDE } from '@/lib/tienda/precios';

export default function CarritoPage() {
  const { items, subtotal, cantidadTotal, cargado, cambiarCantidad, quitar, vaciar } = useCarrito();

  const faltaParaEnvioGratis = Math.max(0, ENVIO_GRATIS_DESDE - subtotal);

  if (!cargado) {
    return (
      <div className="contenedor">
        <p className="vacio">Cargando tu carrito…</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="contenedor">
        <nav className="miga" aria-label="Miga de pan">
          <Link href="/">Home</Link>
          <span className="miga-sep">/</span>
          <span>Carrito</span>
        </nav>
        <div className="carrito-vacio">
          <ShoppingBag size={44} strokeWidth={1.25} aria-hidden="true" />
          <h1 className="cat-titulo">Tu carrito está vacío</h1>
          <p>Todavía no agregaste productos.</p>
          <Link href="/" className="btn-carrito" style={{ maxWidth: 280, display: 'inline-block', textAlign: 'center' }}>
            Ver productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="contenedor">
      <nav className="miga" aria-label="Miga de pan">
        <Link href="/">Home</Link>
        <span className="miga-sep">/</span>
        <span>Carrito</span>
      </nav>

      <header className="cat-head">
        <h1 className="cat-titulo">Tu carrito</h1>
        <p className="cat-cuenta">
          {cantidadTotal} {cantidadTotal === 1 ? 'producto' : 'productos'}
        </p>
      </header>

      <div className="carrito-layout">
        <div>
          <ul className="carrito-items">
            {items.map((item) => (
              <li className="carrito-item" key={item.id}>
                <Link href={`/producto/${item.slug}`} className="carrito-foto" aria-hidden="true" tabIndex={-1} />

                <div className="carrito-datos">
                  <Link href={`/producto/${item.slug}`} className="carrito-nombre">{item.nombre}</Link>
                  {item.detalle && <p className="carrito-detalle">{item.detalle}</p>}
                  <p className="carrito-unitario">{formatearPrecio(item.precio)} c/u</p>
                </div>

                <div className="carrito-cantidad" role="group" aria-label={`Cantidad de ${item.nombre}`}>
                  <button type="button" onClick={() => cambiarCantidad(item.id, item.cantidad - 1)}
                          aria-label={`Quitar uno de ${item.nombre}`}>
                    <Minus size={15} aria-hidden="true" />
                  </button>
                  <span aria-live="polite">{item.cantidad}</span>
                  {/* Apagado al llegar al stock: el boton que no hace nada al
                      apretarlo se lee como que la pagina esta rota. */}
                  <button type="button" onClick={() => cambiarCantidad(item.id, item.cantidad + 1)}
                          disabled={item.stock !== undefined && item.cantidad >= item.stock}
                          aria-label={`Agregar uno de ${item.nombre}`}>
                    <Plus size={15} aria-hidden="true" />
                  </button>
                </div>
                {item.stock !== undefined && item.cantidad >= item.stock && (
                  <p className="carrito-tope">Es todo lo que hay disponible</p>
                )}

                <p className="carrito-subtotal">{formatearPrecio(item.precio * item.cantidad)}</p>

                <button type="button" className="carrito-quitar" onClick={() => quitar(item.id)}
                        aria-label={`Quitar ${item.nombre} del carrito`}>
                  <Trash2 size={17} aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>

          <button type="button" className="carrito-vaciar" onClick={vaciar}>Vaciar carrito</button>
        </div>

        <aside className="resumen" aria-label="Resumen de compra">
          <h2 className="resumen-titulo">Resumen</h2>

          <div className="resumen-fila">
            <span>Subtotal</span>
            <span>{formatearPrecio(subtotal)}</span>
          </div>

          {faltaParaEnvioGratis > 0 ? (
            <p className="resumen-aviso">
              <Truck size={16} aria-hidden="true" />
              Te faltan {formatearPrecio(faltaParaEnvioGratis)} para el envío gratis
            </p>
          ) : (
            <p className="resumen-aviso resumen-aviso-ok">
              <Truck size={16} aria-hidden="true" />
              Tu compra tiene envío gratis
            </p>
          )}

          <p className="resumen-nota">
            El costo de envío y los descuentos por medio de pago se calculan en el siguiente paso.
          </p>

          <Link href="/checkout" className="btn-carrito" style={{ display: 'block', textAlign: 'center' }}>
            Completar compra
          </Link>

          <Link href="/" className="resumen-seguir">Seguir comprando</Link>
        </aside>
      </div>
    </div>
  );
}
