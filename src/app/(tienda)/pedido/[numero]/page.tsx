'use client';

import Link from 'next/link';
import { use, useEffect, useState } from 'react';
import { CheckCircle2, Store, Truck } from 'lucide-react';
import { formatearPrecio, MODALIDADES, METODOS_PAGO } from '@/lib/tienda/precios';
import { CONTACTO } from '@/components/tienda/data';

type Pedido = {
  numero: string;
  items: { id: string; nombre: string; cantidad: number; precio: number; detalle?: string }[];
  nombre: string; email: string; telefono: string;
  direccion?: string; ciudad?: string; provincia?: string;
  modalidad: string; metodo: string;
  resumen: { subtotal: number; descuentoPago: number; envio: number; total: number };
};

export default function PedidoPage({ params }: { params: Promise<{ numero: string }> }) {
  const { numero } = use(params);
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [buscado, setBuscado] = useState(false);

  useEffect(() => {
    try {
      const guardado = window.localStorage.getItem(`ye-pedido-${numero}`);
      if (guardado) setPedido(JSON.parse(guardado));
    } catch {
      // sin storage no hay detalle, pero la confirmacion igual se muestra
    }
    setBuscado(true);
  }, [numero]);

  const modalidad = MODALIDADES.find((m) => m.id === pedido?.modalidad);
  const metodo = METODOS_PAGO.find((m) => m.id === pedido?.metodo);
  const retira = pedido?.modalidad === 'retiro_local';

  return (
    <div className="contenedor">
      <div className="confirmacion">
        <CheckCircle2 size={52} strokeWidth={1.5} aria-hidden="true" />
        <h1 className="cat-titulo">¡Gracias por tu compra!</h1>
        <p className="confirmacion-numero">Tu pedido es el <strong>{numero}</strong></p>

        {!buscado ? (
          <p className="resumen-nota">Buscando tu pedido…</p>
        ) : pedido ? (
          <>
            <p className="confirmacion-texto">
              Te mandamos un mail a <strong>{pedido.email}</strong> con el detalle.
              Nos comunicamos por WhatsApp al {pedido.telefono} para coordinar
              {retira ? ' el retiro' : ' la entrega'}.
            </p>

            <div className="confirmacion-caja">
              <div className="confirmacion-modo">
                {retira ? <Store size={19} aria-hidden="true" /> : <Truck size={19} aria-hidden="true" />}
                <div>
                  <p className="opcion-card-nombre">{modalidad?.nombre}</p>
                  <p className="opcion-card-detalle">
                    {retira ? CONTACTO.direccion : `${pedido.direccion}, ${pedido.ciudad}, ${pedido.provincia}`}
                  </p>
                  <p className="opcion-card-detalle">Pago: {metodo?.nombre}</p>
                </div>
              </div>

              <ul className="resumen-items">
                {pedido.items.map((i) => (
                  <li key={i.id}>
                    <span>{i.cantidad}× {i.nombre}{i.detalle ? ` · ${i.detalle}` : ''}</span>
                    <span>{formatearPrecio(i.precio * i.cantidad)}</span>
                  </li>
                ))}
              </ul>

              <div className="resumen-fila"><span>Subtotal</span><span>{formatearPrecio(pedido.resumen.subtotal)}</span></div>
              {pedido.resumen.descuentoPago > 0 && (
                <div className="resumen-fila resumen-descuento">
                  <span>Descuento 10%</span><span>−{formatearPrecio(pedido.resumen.descuentoPago)}</span>
                </div>
              )}
              <div className="resumen-fila">
                <span>Envío</span>
                <span>{pedido.resumen.envio === 0 ? 'Gratis' : formatearPrecio(pedido.resumen.envio)}</span>
              </div>
              <div className="resumen-total"><span>Total</span><span>{formatearPrecio(pedido.resumen.total)}</span></div>
            </div>
          </>
        ) : (
          <p className="confirmacion-texto">
            No encontramos el detalle de este pedido en este navegador, pero el número{' '}
            <strong>{numero}</strong> es válido. Escribinos y lo buscamos.
          </p>
        )}

        <div className="confirmacion-acciones">
          <Link href="/" className="btn-carrito" style={{ textAlign: 'center' }}>Seguir comprando</Link>
          <a href={`https://wa.me/${CONTACTO.whatsappNumero}?text=${encodeURIComponent(`Hola, consulto por mi pedido ${numero}`)}`}
             className="confirmacion-wsp" target="_blank" rel="noopener noreferrer">
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
