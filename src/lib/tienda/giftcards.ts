/**
 * Gift cards de prueba para la demo. Cuando entre Supabase esto se reemplaza
 * por una consulta a `gift_cards`, que ya tiene codigo, saldo, estado y
 * vencimiento; la forma de la respuesta no cambia.
 *
 * La validacion tiene que quedar del lado del servidor: si vive solo en el
 * navegador, cualquiera se regala saldo editando el codigo de la pagina.
 */

export type GiftCard = {
  codigo: string;
  saldo: number;
  vence: string;
};

const DE_PRUEBA: GiftCard[] = [
  { codigo: 'YE-REGALO-10', saldo: 10000, vence: '2026-12-31' },
  { codigo: 'YE-REGALO-50', saldo: 50000, vence: '2026-12-31' },
  { codigo: 'YE-VENCIDA', saldo: 20000, vence: '2026-01-31' },
  { codigo: 'YE-SIN-SALDO', saldo: 0, vence: '2026-12-31' },
];

export type Validacion =
  | { ok: true; giftCard: GiftCard }
  | { ok: false; motivo: string };

export function validarGiftCard(codigoIngresado: string): Validacion {
  const codigo = codigoIngresado.trim().toUpperCase();
  if (!codigo) return { ok: false, motivo: 'Escribí el código de tu Gift Card.' };

  const encontrada = DE_PRUEBA.find((g) => g.codigo === codigo);
  if (!encontrada) return { ok: false, motivo: 'No encontramos esa Gift Card. Revisá el código.' };

  // Vigencia de 30 dias habiles desde la compra (politica, punto 2).
  if (new Date(encontrada.vence) < new Date()) {
    return { ok: false, motivo: 'Esta Gift Card está vencida.' };
  }

  if (encontrada.saldo <= 0) {
    return { ok: false, motivo: 'Esta Gift Card ya no tiene saldo disponible.' };
  }

  return { ok: true, giftCard: encontrada };
}

/** Solo para la demo: se muestran en pantalla para poder probar el flujo. */
export const CODIGOS_DEMO = DE_PRUEBA.filter((g) => g.saldo > 0 && new Date(g.vence) > new Date());
