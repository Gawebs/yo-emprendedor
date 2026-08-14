import { calcularResumen, metodosPara } from '../src/lib/tienda/precios';

const casos: { nombre: string; ok: boolean; detalle: string }[] = [];
const chequear = (nombre: string, real: unknown, esperado: unknown) => {
  const ok = JSON.stringify(real) === JSON.stringify(esperado);
  casos.push({ nombre, ok, detalle: ok ? '' : `esperado ${JSON.stringify(esperado)}, dio ${JSON.stringify(real)}` });
};

// 1. Gift card no se combina con el 10% (politica punto 6): gana la mayor.
const gcChica = calcularResumen(100000, 'retiro_local', 'transferencia', 5000);
chequear('gift card chica: gana el 10% (10.000 > 5.000)',
  [gcChica.descuentoPago, gcChica.descuentoGiftCard], [10000, 0]);

const gcGrande = calcularResumen(100000, 'retiro_local', 'transferencia', 40000);
chequear('gift card grande: gana la gift card, el 10% queda en 0',
  [gcGrande.descuentoPago, gcGrande.descuentoGiftCard], [0, 40000]);

// 2. La gift card nunca paga el envio (punto 5).
const gcEnvio = calcularResumen(50000, 'envio_nacional', 'mercadopago', 999999);
chequear('gift card enorme: el envio se sigue cobrando', gcEnvio.envio, 7000);
chequear('gift card enorme: el total es solo el envio', gcEnvio.total, 7000);
chequear('gift card no descuenta mas que el subtotal', gcEnvio.descuentoGiftCard, 50000);

// 3. Envio gratis desde $200.000.
chequear('199.999 paga envio', calcularResumen(199999, 'envio_local', 'mercadopago').envio, 2500);
chequear('200.000 no paga envio', calcularResumen(200000, 'envio_local', 'mercadopago').envio, 0);
chequear('200.000 marca el envio como bonificado', calcularResumen(200000, 'envio_local', 'mercadopago').envioBonificado, true);
chequear('retiro local no cuenta como bonificado', calcularResumen(200000, 'retiro_local', 'mercadopago').envioBonificado, false);

// 4. Coherencia entre entrega y pago.
chequear('con retiro no se ofrece contra entrega',
  metodosPara('retiro_local').map(m => m.id),
  ['mercadopago', 'transferencia', 'efectivo_local']);
chequear('con envio no se ofrece efectivo en el local',
  metodosPara('envio_local').map(m => m.id),
  ['mercadopago', 'transferencia', 'efectivo_contra_entrega']);

// 5. El total nunca queda negativo.
chequear('gift card mayor al total no da negativo',
  calcularResumen(10000, 'retiro_local', 'mercadopago', 999999).total, 0);

const fallaron = casos.filter(c => !c.ok);
console.log(`\n${casos.length - fallaron.length}/${casos.length} pasaron\n`);
casos.forEach(c => console.log(`${c.ok ? 'OK  ' : 'FALLA'} ${c.nombre}${c.detalle ? ' — ' + c.detalle : ''}`));
process.exit(fallaron.length ? 1 : 0);
