'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Check } from 'lucide-react';
import { useCarrito } from '@/contexts/CarritoContext';
import {
  MODALIDADES,
  metodosPara,
  calcularResumen,
  descuentoPorPago,
  formatearPrecio,
  CUOTAS_SIN_INTERES,
  type Modalidad,
  type MetodoPago,
} from '@/lib/tienda/precios';
import { validarGiftCard, CODIGOS_DEMO, type GiftCard } from '@/lib/tienda/giftcards';

const PROVINCIAS_SIN_ENVIO_LOCAL = 'Tucumán';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, cargado, vaciar } = useCarrito();

  const [modalidad, setModalidad] = useState<Modalidad>('retiro_local');
  const [metodo, setMetodo] = useState<MetodoPago>('mercadopago');
  const [datos, setDatos] = useState({
    nombre: '', email: '', telefono: '',
    direccion: '', ciudad: '', provincia: PROVINCIAS_SIN_ENVIO_LOCAL, cp: '', notas: '',
  });
  const [enviando, setEnviando] = useState(false);

  const [codigoGift, setCodigoGift] = useState('');
  const [giftCard, setGiftCard] = useState<GiftCard | null>(null);
  const [errorGift, setErrorGift] = useState('');

  const aplicarGiftCard = () => {
    const resultado = validarGiftCard(codigoGift);
    if (resultado.ok) {
      setGiftCard(resultado.giftCard);
      setErrorGift('');
      return;
    }
    setGiftCard(null);
    setErrorGift(resultado.motivo);
  };

  const quitarGiftCard = () => {
    setGiftCard(null);
    setCodigoGift('');
    setErrorGift('');
  };

  const metodosDisponibles = useMemo(() => metodosPara(modalidad), [modalidad]);

  // Si cambia la modalidad y el metodo elegido deja de tener sentido
  // (efectivo en el local con envio a domicilio), se vuelve al primero valido.
  useEffect(() => {
    if (!metodosDisponibles.some((m) => m.id === metodo)) {
      setMetodo(metodosDisponibles[0].id);
    }
  }, [metodosDisponibles, metodo]);

  const resumen = calcularResumen(subtotal, modalidad, metodo, giftCard?.saldo ?? 0);
  const necesitaDireccion = modalidad !== 'retiro_local';

  // Cuanto habria descontado el medio de pago sin gift card, para poder avisar
  // que se eligio el beneficio mayor en vez de sumarlos.
  const descuentoPorPagoSiNoHubieraGift = descuentoPorPago(metodo, subtotal);

  const actualizar = (campo: keyof typeof datos) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setDatos((d) => ({ ...d, [campo]: e.target.value }));

  const confirmar = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);

    // Demo: el pedido se guarda en el navegador. Cuando entre Supabase, esto
    // pasa a ser una Server Action que inserta en `pedidos` y `pedido_items`,
    // y para Mercado Pago redirige a la preferencia de pago.
    const numero = 'YE-' + Math.floor(1000 + Math.random() * 9000);
    const pedido = {
      numero, items, ...datos, modalidad, metodo, resumen,
      fecha: new Date().toISOString(),
    };
    try {
      window.localStorage.setItem(`ye-pedido-${numero}`, JSON.stringify(pedido));
    } catch {
      // si no se puede guardar, igual se muestra la confirmacion
    }
    vaciar();
    router.push(`/pedido/${numero}`);
  };

  if (cargado && items.length === 0) {
    return (
      <div className="contenedor">
        <div className="carrito-vacio">
          <h1 className="cat-titulo">No hay nada para comprar</h1>
          <p>Agregá productos antes de completar la compra.</p>
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
        <Link href="/carrito">Carrito</Link>
        <span className="miga-sep">/</span>
        <span>Completar compra</span>
      </nav>

      <header className="cat-head">
        <h1 className="cat-titulo">Completar compra</h1>
      </header>

      <form className="carrito-layout" onSubmit={confirmar}>
        <div className="checkout-pasos">
          <section className="paso">
            <h2 className="paso-titulo"><span className="paso-num">1</span> Tus datos</h2>
            <div className="campos">
              <div className="campo">
                <label htmlFor="c-nombre">Nombre y apellido</label>
                <input id="c-nombre" required value={datos.nombre} onChange={actualizar('nombre')} />
              </div>
              <div className="campo">
                <label htmlFor="c-email">Email</label>
                <input id="c-email" type="email" required value={datos.email} onChange={actualizar('email')}
                       placeholder="nombre@email.com" />
              </div>
              <div className="campo">
                <label htmlFor="c-tel">Teléfono</label>
                <input id="c-tel" type="tel" required value={datos.telefono} onChange={actualizar('telefono')}
                       placeholder="381 214 6172" />
              </div>
            </div>
            <p className="paso-nota">Te avisamos por email cómo sigue tu pedido. No hace falta crear una cuenta.</p>
          </section>

          <section className="paso">
            <h2 className="paso-titulo"><span className="paso-num">2</span> Cómo lo recibís</h2>
            <div className="opciones-lista" role="radiogroup" aria-label="Modalidad de entrega">
              {MODALIDADES.map((m) => (
                <label key={m.id} className={`opcion-card${modalidad === m.id ? ' elegida' : ''}`}>
                  <input type="radio" name="modalidad" value={m.id} checked={modalidad === m.id}
                         onChange={() => setModalidad(m.id)} />
                  <span className="opcion-card-cuerpo">
                    <span className="opcion-card-nombre">{m.nombre}</span>
                    <span className="opcion-card-detalle">{m.detalle} · {m.demora}</span>
                  </span>
                  <span className="opcion-card-precio">
                    {m.costo === 0 ? 'Gratis' : formatearPrecio(m.costo)}
                  </span>
                </label>
              ))}
            </div>

            {necesitaDireccion && (
              <div className="campos" style={{ marginTop: '1.25rem' }}>
                <div className="campo">
                  <label htmlFor="c-dir">Dirección</label>
                  <input id="c-dir" required value={datos.direccion} onChange={actualizar('direccion')}
                         placeholder="Calle, número, piso" />
                </div>
                <div className="campo-fila">
                  <div className="campo">
                    <label htmlFor="c-ciudad">Ciudad</label>
                    <input id="c-ciudad" required value={datos.ciudad} onChange={actualizar('ciudad')} />
                  </div>
                  <div className="campo">
                    <label htmlFor="c-prov">Provincia</label>
                    <input id="c-prov" required value={datos.provincia} onChange={actualizar('provincia')} />
                  </div>
                  <div className="campo">
                    <label htmlFor="c-cp">Código postal</label>
                    <input id="c-cp" required value={datos.cp} onChange={actualizar('cp')} />
                  </div>
                </div>
              </div>
            )}
          </section>

          <section className="paso">
            <h2 className="paso-titulo"><span className="paso-num">3</span> Cómo pagás</h2>
            <div className="opciones-lista" role="radiogroup" aria-label="Medio de pago">
              {metodosDisponibles.map((m) => (
                <label key={m.id} className={`opcion-card${metodo === m.id ? ' elegida' : ''}`}>
                  <input type="radio" name="metodo" value={m.id} checked={metodo === m.id}
                         onChange={() => setMetodo(m.id)} />
                  <span className="opcion-card-cuerpo">
                    <span className="opcion-card-nombre">{m.nombre}</span>
                    <span className="opcion-card-detalle">{m.detalle}</span>
                  </span>
                  {m.conDescuento && <span className="opcion-card-badge">10% off</span>}
                </label>
              ))}
            </div>
            <div className="campo" style={{ marginTop: '1.25rem' }}>
              <label htmlFor="c-notas">Notas para el pedido <span className="opcion-nota">(opcional)</span></label>
              <textarea id="c-notas" rows={3} value={datos.notas} onChange={actualizar('notas')}
                        placeholder="Entre qué calles, horario de entrega, si es un regalo…" />
            </div>
          </section>
        </div>

        <aside className="resumen" aria-label="Resumen del pedido">
          <h2 className="resumen-titulo">Tu pedido</h2>

          <ul className="resumen-items">
            {items.map((i) => (
              <li key={i.id}>
                <span>{i.cantidad}× {i.nombre}</span>
                <span>{formatearPrecio(i.precio * i.cantidad)}</span>
              </li>
            ))}
          </ul>

          <div className="resumen-fila"><span>Subtotal</span><span>{formatearPrecio(resumen.subtotal)}</span></div>

          {resumen.descuentoPago > 0 && (
            <div className="resumen-fila resumen-descuento">
              <span>Descuento 10%</span><span>−{formatearPrecio(resumen.descuentoPago)}</span>
            </div>
          )}

          {resumen.descuentoGiftCard > 0 && (
            <div className="resumen-fila resumen-descuento">
              <span>Gift Card {giftCard?.codigo}</span>
              <span>−{formatearPrecio(resumen.descuentoGiftCard)}</span>
            </div>
          )}

          <div className="gift-bloque">
            {giftCard ? (
              <div className="gift-aplicada">
                <div>
                  <p className="gift-codigo">{giftCard.codigo}</p>
                  <p className="gift-saldo">
                    Saldo {formatearPrecio(giftCard.saldo)}
                    {giftCard.saldo > resumen.descuentoGiftCard && resumen.descuentoGiftCard > 0 && (
                      <> · queda {formatearPrecio(giftCard.saldo - resumen.descuentoGiftCard)} para otra compra</>
                    )}
                  </p>
                </div>
                <button type="button" className="gift-quitar" onClick={quitarGiftCard}>Quitar</button>
              </div>
            ) : (
              <>
                <label className="gift-label" htmlFor="c-gift">¿Tenés una Gift Card?</label>
                <div className="gift-fila">
                  <input
                    id="c-gift" className="gift-input" value={codigoGift}
                    onChange={(e) => { setCodigoGift(e.target.value); setErrorGift(''); }}
                    placeholder="YE-REGALO-10" autoComplete="off"
                  />
                  <button type="button" className="gift-aplicar" onClick={aplicarGiftCard}>Aplicar</button>
                </div>
                {errorGift && <p className="gift-error" role="alert">{errorGift}</p>}
                <p className="gift-demo">
                  Códigos de prueba: {CODIGOS_DEMO.map((g) => g.codigo).join(' · ')}
                </p>
              </>
            )}
          </div>

          {/* Politica de gift card, punto 6: no se combina con promociones. */}
          {giftCard && resumen.descuentoPago === 0 && descuentoPorPagoSiNoHubieraGift > 0 && (
            <p className="gift-aviso">
              La Gift Card no se combina con el 10% de transferencia o efectivo. Se aplicó la que más
              te conviene.
            </p>
          )}

          <div className="resumen-fila">
            <span>Envío</span>
            <span>
              {resumen.envio === 0
                ? (resumen.envioBonificado ? 'Bonificado' : 'Gratis')
                : formatearPrecio(resumen.envio)}
            </span>
          </div>

          <div className="resumen-total"><span>Total</span><span>{formatearPrecio(resumen.total)}</span></div>

          {metodo === 'mercadopago' && (
            <p className="resumen-cuotas">
              Hasta {CUOTAS_SIN_INTERES} cuotas sin interés de{' '}
              {formatearPrecio(resumen.total / CUOTAS_SIN_INTERES)}
            </p>
          )}

          <button type="submit" className="btn-carrito" disabled={enviando}>
            {enviando ? 'Confirmando…' : 'Confirmar pedido'}
          </button>

          <p className="resumen-nota" style={{ display: 'flex', gap: '.5rem', alignItems: 'flex-start' }}>
            <Check size={15} style={{ flexShrink: 0, marginTop: 3, color: 'var(--verde)' }} aria-hidden="true" />
            Al confirmar te contactamos para coordinar el pago y la entrega.
          </p>
        </aside>
      </form>
    </div>
  );
}
