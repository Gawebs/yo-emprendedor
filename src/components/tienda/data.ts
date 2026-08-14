import { Sparkles, Gem, Baby, Home, Lamp, Bed, Leaf, Gift, type LucideIcon } from 'lucide-react';

/**
 * Datos de muestra para levantar la tienda antes de que Supabase este
 * conectado. Cuando lo este, esto se reemplaza por las consultas: la forma de
 * los objetos ya coincide con las tablas de 002_ecommerce.sql.
 */

export const PROMOS = [
  '10% off transferencia/efectivo',
  '3 cuotas sin interés',
  'Envío gratis primera compra',
];

export const CATEGORIAS: { slug: string; nombre: string; icono: LucideIcon }[] = [
  { slug: 'belleza', nombre: 'Belleza', icono: Sparkles },
  { slug: 'accesorios', nombre: 'Accesorios', icono: Gem },
  { slug: 'infantiles', nombre: 'Infantiles', icono: Baby },
  { slug: 'hogar', nombre: 'Hogar', icono: Home },
  { slug: 'deco', nombre: 'Deco', icono: Lamp },
  { slug: 'blanqueria', nombre: 'Blanquería', icono: Bed },
  { slug: 'te-y-aromas', nombre: 'Té y aromas', icono: Leaf },
  { slug: 'regalos', nombre: 'Regalos', icono: Gift },
];

export type Producto = {
  slug: string;
  nombre: string;
  precio: number;
  precioAntes?: number;
  categoria: string;
  etiqueta?: string;
};

export const PRODUCTOS: Producto[] = [
  { slug: 'aros-dorados', nombre: 'Aros dorados', precio: 8500, categoria: 'accesorios' },
  { slug: 'collar-plateado', nombre: 'Collar plateado', precio: 6200, categoria: 'accesorios' },
  { slug: 'pulsera-trenzada', nombre: 'Pulsera trenzada', precio: 4900, precioAntes: 6500, categoria: 'accesorios', etiqueta: 'Oferta' },
  { slug: 'cinturon-cuero', nombre: 'Cinturón cuero', precio: 11300, categoria: 'accesorios' },
  { slug: 'anillo-ajustable', nombre: 'Anillo ajustable', precio: 3800, categoria: 'accesorios' },

  { slug: 'serum-facial', nombre: 'Serum facial', precio: 9900, categoria: 'belleza' },
  { slug: 'labial-mate', nombre: 'Labial mate', precio: 5400, categoria: 'belleza' },
  { slug: 'crema-corporal', nombre: 'Crema corporal', precio: 7800, precioAntes: 9750, categoria: 'belleza', etiqueta: '20% off' },
  { slug: 'perfume-floral', nombre: 'Perfume floral', precio: 14500, categoria: 'belleza' },
  { slug: 'set-de-brochas', nombre: 'Set de brochas', precio: 12100, categoria: 'belleza' },

  { slug: 'portavelas-ceramica', nombre: 'Portavelas cerámica', precio: 6900, categoria: 'deco' },
  { slug: 'cuadro-tejido', nombre: 'Cuadro tejido', precio: 15200, categoria: 'deco' },
  { slug: 'macetero-pintado', nombre: 'Macetero pintado', precio: 8300, categoria: 'deco' },
  { slug: 'espejo-redondo', nombre: 'Espejo redondo', precio: 18600, categoria: 'deco' },
  { slug: 'set-posavasos', nombre: 'Set posavasos', precio: 4700, categoria: 'deco' },

  { slug: 'remera-oversize-tejida', nombre: 'Remera oversize tejida', precio: 14500, precioAntes: 18000, categoria: 'hogar', etiqueta: 'Oferta' },
  { slug: 'buzo-oversize', nombre: 'Buzo oversize', precio: 16200, categoria: 'hogar' },
  { slug: 'pantalon-wide-leg', nombre: 'Pantalón wide leg', precio: 13800, categoria: 'hogar' },
  { slug: 'top-canesu', nombre: 'Top canesú', precio: 8900, categoria: 'hogar' },
  { slug: 'vestido-lino', nombre: 'Vestido lino', precio: 19500, categoria: 'hogar' },
];

export const OFERTAS_DIA = [
  { titulo: 'Envío gratis en accesorios', href: '/tienda/categoria/accesorios' },
  { titulo: '20% off en belleza', href: '/tienda/categoria/belleza' },
];

/** Las filas que se muestran en la home, en orden. */
export const FILAS_HOME = ['accesorios', 'belleza', 'deco'];

export const MARCAS = [
  'Luna Bijou', 'Nara', 'Kai', 'Sur', 'Piel Natural',
  'Bloom', 'Aroma', 'Tierra', 'Hilo',
];

export const CONTACTO = {
  direccion: '24 de Septiembre 734, San Miguel de Tucumán',
  telefono: '381 214-6172',
  telefonoLink: 'tel:3812146172',
  whatsappNumero: '5493812146172',
  email: 'yoemprendedortucuman@gmail.com',
  instagram: 'https://instagram.com/yoemprendedor.tuc',
};

/** Monto desde el cual el envio es gratis (politica de envios, punto 15). */
export const ENVIO_GRATIS_DESDE = 200000;

export const formatearPrecio = (n: number) =>
  '$' + n.toLocaleString('es-AR', { maximumFractionDigits: 0 });

export const productosDe = (categoria: string) =>
  PRODUCTOS.filter((p) => p.categoria === categoria);

export const nombreCategoria = (slug: string) =>
  CATEGORIAS.find((c) => c.slug === slug)?.nombre ?? slug;
