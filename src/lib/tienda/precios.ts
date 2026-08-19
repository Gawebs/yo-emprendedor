/**
 * Reglas de precio de la tienda, sacadas del documento de politicas.
 * Viven aparte de la UI para poder razonarlas y probarlas de a una.
 */

export const ENVIO_GRATIS_DESDE = 200000;

/** 10% off pagando por transferencia o efectivo (barra de promos y ficha). */
export const DESCUENTO_EFECTIVO = 0.10;

export const CUOTAS_SIN_INTERES = 3;

export type Modalidad = 'retiro_local' | 'envio_local' | 'envio_interior' | 'envio_nacional';

/**
 * La tienda online NO acepta efectivo. Los Terminos y Condiciones (seccion 14)
 * y el checklist de Formas de Pago lo dicen expresamente: el efectivo es
 * exclusivamente para compras presenciales en el local. Antes el checkout
 * ofrecia efectivo al retirar y contra entrega, prometiendo algo que los
 * propios terminos niegan.
 */
export type MetodoPago = 'mercadopago' | 'transferencia';

export const MODALIDADES: {
  id: Modalidad; nombre: string; detalle: string; costo: number; demora: string;
}[] = [
  { id: 'retiro_local',   nombre: 'Retiro en el local',      detalle: '24 de Septiembre 734, San Miguel de Tucumán', costo: 0,    demora: 'Cuando el pedido esté preparado' },
  { id: 'envio_local',    nombre: 'San Miguel y alrededores', detalle: 'Envío a domicilio',                           costo: 2500, demora: '24 a 48 h hábiles' },
  { id: 'envio_interior', nombre: 'Interior de Tucumán',      detalle: 'Localidades con cobertura',                   costo: 4000, demora: 'Según operador' },
  { id: 'envio_nacional', nombre: 'Otras provincias',         detalle: 'Cobertura nacional',                          costo: 7000, demora: 'Según operador' },
];

export const METODOS_PAGO: {
  id: MetodoPago; nombre: string; detalle: string; conDescuento: boolean;
}[] = [
  { id: 'mercadopago',   nombre: 'Mercado Pago',  detalle: `Tarjeta de crédito, débito o dinero en cuenta. Hasta ${CUOTAS_SIN_INTERES} cuotas sin interés`, conDescuento: false },
  { id: 'transferencia', nombre: 'Transferencia', detalle: 'Te pasamos los datos para transferir. El pedido se confirma cuando se acredita', conDescuento: true },
];

/**
 * Los dos medios sirven para cualquier modalidad de entrega: al no haber
 * efectivo online, ya no hay combinaciones imposibles que filtrar.
 */
export function metodosPara(_modalidad: Modalidad) {
  return METODOS_PAGO;
}

export function costoEnvio(modalidad: Modalidad, subtotal: number) {
  const zona = MODALIDADES.find((m) => m.id === modalidad);
  if (!zona || zona.costo === 0) return 0;
  return subtotal >= ENVIO_GRATIS_DESDE ? 0 : zona.costo;
}

export function descuentoPorPago(metodo: MetodoPago, subtotal: number) {
  const m = METODOS_PAGO.find((x) => x.id === metodo);
  return m?.conDescuento ? Math.round(subtotal * DESCUENTO_EFECTIVO) : 0;
}

export type Resumen = {
  subtotal: number;
  descuentoPago: number;
  descuentoGiftCard: number;
  envio: number;
  envioBonificado: boolean;
  total: number;
};

/**
 * Dos reglas de la politica de gift card que se cruzan con el resto:
 *
 * - Punto 5: no paga envio. Se descuenta contra los productos, nunca contra
 *   el flete.
 * - Punto 6: no se combina con promociones ni descuentos. Por eso, cuando hay
 *   gift card, el 10% de transferencia/efectivo no se aplica: se toma el
 *   beneficio que le conviene al cliente, no los dos juntos.
 */
export function calcularResumen(
  subtotal: number,
  modalidad: Modalidad,
  metodo: MetodoPago,
  saldoGiftCard = 0
): Resumen {
  const envio = costoEnvio(modalidad, subtotal);
  const zona = MODALIDADES.find((m) => m.id === modalidad);

  const conDescuentoPago = descuentoPorPago(metodo, subtotal);
  const conGiftCard = Math.min(saldoGiftCard, subtotal);

  // Sin gift card, manda el descuento por medio de pago. Con gift card, se
  // usa la que descuenta mas y la otra queda en cero.
  const usaGiftCard = conGiftCard > 0 && conGiftCard >= conDescuentoPago;

  const descuentoPago = usaGiftCard ? 0 : conDescuentoPago;
  const descuentoGiftCard = usaGiftCard ? conGiftCard : 0;

  return {
    subtotal,
    descuentoPago,
    descuentoGiftCard,
    envio,
    envioBonificado: !!zona && zona.costo > 0 && envio === 0,
    total: Math.max(0, subtotal - descuentoPago - descuentoGiftCard + envio),
  };
}

export const formatearPrecio = (n: number) =>
  '$' + Math.round(n).toLocaleString('es-AR');
