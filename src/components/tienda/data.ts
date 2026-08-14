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
  { titulo: 'Envío gratis en accesorios', href: '/categoria/accesorios' },
  { titulo: '20% off en belleza', href: '/categoria/belleza' },
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

/** Atributos de la ficha. Todos opcionales: el wireframe marca aroma y
 *  variante como "si aplica al producto". */
export type Variantes = {
  talles?: string[];
  colores?: { nombre: string; hex: string }[];
  aromas?: string[];
  variantes?: string[];
};

export type ProductoDetalle = Producto & {
  codigo: string;
  medidas?: string;
  descripcion: string;
  opciones: Variantes;
};

const OPCIONES_POR_DEFECTO: Variantes = {
  colores: [
    { nombre: 'Arena', hex: '#e0cfa0' },
    { nombre: 'Piedra', hex: '#8a8578' },
    { nombre: 'Carbón', hex: '#5c574f' },
  ],
};

const DETALLES: Record<string, Partial<ProductoDetalle>> = {
  'remera-oversize-tejida': {
    medidas: 'Largo 65cm — Ancho 50cm',
    descripcion: 'Remera de algodón tejido a mano, corte oversize. Ideal para uso diario.',
    opciones: {
      talles: ['S', 'M', 'L', 'XL'],
      colores: OPCIONES_POR_DEFECTO.colores,
      aromas: ['Lavanda', 'Vainilla', 'Cítrico'],
      variantes: ['Clásico', 'Premium'],
    },
  },
  'perfume-floral': {
    descripcion: 'Perfume de autor con notas florales, elaborado en pequeños lotes.',
    opciones: { aromas: ['Lavanda', 'Vainilla', 'Cítrico'], variantes: ['Clásico', 'Premium'] },
  },
  'aros-dorados': {
    medidas: 'Alto 3cm',
    descripcion: 'Aros artesanales con baño de oro, livianos y para uso diario.',
    opciones: { colores: OPCIONES_POR_DEFECTO.colores },
  },
};

/** Arma la ficha completa a partir del listado, con lo puesto en DETALLES. */
export function productoDetalle(slug: string): ProductoDetalle | null {
  const base = PRODUCTOS.find((p) => p.slug === slug);
  if (!base) return null;

  const extra = DETALLES[slug] ?? {};
  const indice = PRODUCTOS.findIndex((p) => p.slug === slug);

  return {
    ...base,
    codigo: extra.codigo ?? `YE-${String(indice + 1).padStart(5, '0')}`,
    medidas: extra.medidas,
    descripcion: extra.descripcion ?? `${base.nombre}, elaborado por una marca local de Tucumán.`,
    opciones: extra.opciones ?? OPCIONES_POR_DEFECTO,
  };
}

/** Otros productos de la misma categoria, para la fila de relacionados. */
export const relacionadosDe = (slug: string, categoria: string, limite = 5) =>
  PRODUCTOS.filter((p) => p.categoria === categoria && p.slug !== slug).slice(0, limite);
