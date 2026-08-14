/**
 * Reglas de precio de la tienda, sacadas del documento de politicas.
 * Viven aparte de la UI para poder razonarlas y probarlas de a una.
 */

export const ENVIO_GRATIS_DESDE = 200000;

/** 10% off pagando por transferencia o efectivo (barra de promos y ficha). */
export const DESCUENTO_EFECTIVO = 0.10;

export const CUOTAS_SIN_INTERES = 3;

export type Modalidad = 'retiro_local' | 'envio_local' | 'envio_interior' | 'envio_nacional';
export type MetodoPago = 'mercadopago' | 'transferencia' | 'efectivo_local' | 'efectivo_contra_entrega';

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
  { id: 'mercadopago',            nombre: 'Mercado Pago',        detalle: `Tarjeta de crédito, débito o dinero en cuenta. Hasta ${CUOTAS_SIN_INTERES} cuotas sin interés`, conDescuento: false },
  { id: 'transferencia',          nombre: 'Transferencia',       detalle: 'Te pasamos los datos para transferir',        conDescuento: true },
  { id: 'efectivo_local',         nombre: 'Efectivo en el local', detalle: 'Pagás cuando retirás por la tienda',         conDescuento: true },
  { id: 'efectivo_contra_entrega', nombre: 'Efectivo contra entrega', detalle: 'Le pagás al repartidor al recibirlo',    conDescuento: true },
];

/**
 * El efectivo en el local solo tiene sentido si el cliente retira, y el
 * contra entrega solo si hay envio. Misma regla que el constraint
 * `efectivo_coherente` de la tabla pedidos.
 */
export function metodosPara(modalidad: Modalidad) {
  return METODOS_PAGO.filter((m) => {
    if (m.id === 'efectivo_local') return modalidad === 'retiro_local';
    if (m.id === 'efectivo_contra_entrega') return modalidad !== 'retiro_local';
    return true;
  });
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
 * La gift card no paga envio (politica de gift card, punto 5): se descuenta
 * solo contra los productos, nunca contra el flete.
 */
export function calcularResumen(
  subtotal: number,
  modalidad: Modalidad,
  metodo: MetodoPago,
  saldoGiftCard = 0
): Resumen {
  const descuentoPago = descuentoPorPago(metodo, subtotal);
  const envio = costoEnvio(modalidad, subtotal);
  const zona = MODALIDADES.find((m) => m.id === modalidad);

  const restanteProductos = Math.max(0, subtotal - descuentoPago);
  const descuentoGiftCard = Math.min(saldoGiftCard, restanteProductos);

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
