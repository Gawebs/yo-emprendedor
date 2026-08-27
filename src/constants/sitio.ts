/**
 * Identidad publica del sitio. Un solo lugar para el interruptor que decide
 * si los buscadores pueden ver la tienda.
 */

/** El dominio propio, comprado el 26-ago-2026. */
export const SITIO_URL = 'https://yoemprendedortienda.com';

/**
 * EL DIA DEL LANZAMIENTO: poner en `true`.
 *
 * Con esto en `false`, `robots.ts` le pide a los buscadores que no entren y
 * cada pagina se sirve con `noindex`. Es a proposito: hoy la tienda es una
 * maqueta con productos inventados, fotos que son rectangulos grises y un
 * checkout que no cobra. Si Google la indexa asi, eso es lo que va a mostrar
 * cuando alguien busque el negocio, y limpiarlo despues lleva semanas.
 *
 * Ponerlo en `true` cuando esten cargados los productos reales con sus fotos
 * y Mercado Pago este conectado. Ni antes.
 */
export const SITIO_INDEXABLE = false;
