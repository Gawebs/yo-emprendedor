import { Sparkles, Gem, Baby, Home, Lamp, Bed, Leaf, Gift, Shirt, type LucideIcon } from 'lucide-react';

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

/** Los 9 rubros que fijo Anita. Indumentaria entro en la ultima correccion. */
export const CATEGORIAS: { slug: string; nombre: string; icono: LucideIcon }[] = [
  { slug: 'belleza', nombre: 'Belleza', icono: Sparkles },
  { slug: 'accesorios', nombre: 'Accesorios', icono: Gem },
  { slug: 'infantiles', nombre: 'Infantiles', icono: Baby },
  { slug: 'hogar', nombre: 'Hogar', icono: Home },
  { slug: 'deco', nombre: 'Deco', icono: Lamp },
  { slug: 'blanqueria', nombre: 'Blanquería', icono: Bed },
  { slug: 'te-y-aromas', nombre: 'Té y aromas', icono: Leaf },
  { slug: 'regalos', nombre: 'Regalos', icono: Gift },
  { slug: 'indumentaria', nombre: 'Indumentaria', icono: Shirt },
];

/**
 * Que atributos muestra cada rubro. Un collar no tiene talle y una vela no
 * tiene talle pero si aroma: la ficha arma los selectores desde aca, no con
 * un formulario fijo igual para todos.
 */
export const ATRIBUTOS_POR_RUBRO: Record<string, (keyof Variantes | 'medidas')[]> = {
  indumentaria: ['talles', 'colores', 'variantes', 'medidas'],
  infantiles:   ['talles', 'colores', 'variantes'],
  accesorios:   ['colores', 'variantes'],
  deco:         ['colores', 'variantes', 'medidas'],
  hogar:        ['colores', 'aromas', 'variantes', 'medidas'],
  blanqueria:   ['colores', 'medidas'],
  belleza:      ['aromas', 'variantes'],
  'te-y-aromas': ['aromas', 'variantes'],
  regalos:      ['variantes'],
};

export type Producto = {
  slug: string;
  nombre: string;
  precio: number;
  precioAntes?: number;
  categoria: string;
  /** Un producto puede tener las dos, una o ninguna: se apilan sobre la foto. */
  oferta?: boolean;
  masVendido?: boolean;
  /**
   * Que emprendedora lo hace. NO se muestra en ningun punto del recorrido de
   * compra —home, rubro, ficha, carrito— porque si el cliente identifica la
   * marca puede buscarla y comprarle directo, salteandose la plataforma.
   * Aparece recien en la confirmacion del pedido, donde la venta ya se cerro,
   * y sirve para saber quien prepara cada cosa y a quien liquidarle.
   */
  marca: string;
};

export const PRODUCTOS: Producto[] = [
  { slug: 'aros-dorados', nombre: 'Aros dorados', precio: 8500, categoria: 'accesorios', masVendido: true, marca: 'Luna Bijou' },
  { slug: 'collar-plateado', nombre: 'Collar plateado', precio: 6200, categoria: 'accesorios', marca: 'Nara' },
  { slug: 'pulsera-trenzada', nombre: 'Pulsera trenzada', precio: 4900, precioAntes: 6500, categoria: 'accesorios', oferta: true, masVendido: true, marca: 'Kai' },
  { slug: 'cinturon-cuero', nombre: 'Cinturón cuero', precio: 11300, categoria: 'accesorios', marca: 'Sur' },
  { slug: 'anillo-ajustable', nombre: 'Anillo ajustable', precio: 3800, categoria: 'accesorios', marca: 'Piel Natural' },

  { slug: 'serum-facial', nombre: 'Serum facial', precio: 9900, categoria: 'belleza', masVendido: true, marca: 'Bloom' },
  { slug: 'labial-mate', nombre: 'Labial mate', precio: 5400, categoria: 'belleza', marca: 'Aroma' },
  { slug: 'crema-corporal', nombre: 'Crema corporal', precio: 7800, precioAntes: 9750, categoria: 'belleza', oferta: true, marca: 'Tierra' },
  { slug: 'perfume-floral', nombre: 'Perfume floral', precio: 14500, categoria: 'belleza', marca: 'Hilo' },
  { slug: 'set-de-brochas', nombre: 'Set de brochas', precio: 12100, categoria: 'belleza', marca: 'Luna Bijou' },

  { slug: 'portavelas-ceramica', nombre: 'Portavelas cerámica', precio: 6900, categoria: 'deco', marca: 'Nara' },
  { slug: 'cuadro-tejido', nombre: 'Cuadro tejido', precio: 15200, categoria: 'deco', masVendido: true, marca: 'Kai' },
  { slug: 'macetero-pintado', nombre: 'Macetero pintado', precio: 8300, categoria: 'deco', marca: 'Sur' },
  { slug: 'espejo-redondo', nombre: 'Espejo redondo', precio: 18600, categoria: 'deco', marca: 'Piel Natural' },
  { slug: 'set-posavasos', nombre: 'Set posavasos', precio: 4700, categoria: 'deco', marca: 'Bloom' },

  // Indumentaria: es el rubro que lleva talle, no "hogar" como estaba antes.
  { slug: 'remera-oversize-tejida', nombre: 'Remera oversize tejida', precio: 14500, precioAntes: 18000, categoria: 'indumentaria', oferta: true, masVendido: true, marca: 'Aroma' },
  { slug: 'buzo-oversize', nombre: 'Buzo oversize', precio: 16200, categoria: 'indumentaria', marca: 'Tierra' },
  { slug: 'pantalon-wide-leg', nombre: 'Pantalón wide leg', precio: 13800, categoria: 'indumentaria', marca: 'Hilo' },
  { slug: 'top-canesu', nombre: 'Top canesú', precio: 8900, categoria: 'indumentaria', marca: 'Luna Bijou' },
  { slug: 'vestido-lino', nombre: 'Vestido lino', precio: 19500, categoria: 'indumentaria', marca: 'Nara' },

  { slug: 'vela-aromatica', nombre: 'Vela aromática de soja', precio: 7200, categoria: 'hogar', masVendido: true, marca: 'Kai' },
  { slug: 'difusor-varillas', nombre: 'Difusor con varillas', precio: 9800, categoria: 'hogar', marca: 'Sur' },
  { slug: 'te-hebras', nombre: 'Té en hebras', precio: 5600, categoria: 'te-y-aromas', marca: 'Piel Natural' },
  { slug: 'set-mate', nombre: 'Set matero', precio: 21000, precioAntes: 25000, categoria: 'regalos', oferta: true, marca: 'Bloom' },
  { slug: 'body-bebe', nombre: 'Body de algodón', precio: 6800, categoria: 'infantiles', marca: 'Aroma' },
  { slug: 'toalla-bordada', nombre: 'Toalla bordada', precio: 11500, categoria: 'blanqueria', marca: 'Tierra' },

  // Las filas de la home son carruseles: con pocos productos no habria nada
  // que deslizar y las flechas no tendrian sentido.
  { slug: 'aros-piedra', nombre: 'Aros con piedra natural', precio: 9700, categoria: 'accesorios', marca: 'Hilo' },
  { slug: 'choker-cuero', nombre: 'Choker de cuero', precio: 5300, categoria: 'accesorios', marca: 'Luna Bijou' },
  { slug: 'llavero-tejido', nombre: 'Llavero tejido', precio: 2900, categoria: 'accesorios', marca: 'Nara' },
  { slug: 'agenda-artesanal', nombre: 'Agenda artesanal', precio: 13400, categoria: 'accesorios', masVendido: true, marca: 'Kai' },

  { slug: 'jabon-artesanal', nombre: 'Jabón artesanal', precio: 3600, categoria: 'belleza', marca: 'Sur' },
  { slug: 'aceite-capilar', nombre: 'Aceite capilar', precio: 8400, categoria: 'belleza', marca: 'Piel Natural' },
  { slug: 'mascara-pestanas', nombre: 'Máscara de pestañas', precio: 6900, precioAntes: 8600, categoria: 'belleza', oferta: true, marca: 'Bloom' },
  { slug: 'exfoliante-cafe', nombre: 'Exfoliante de café', precio: 5900, categoria: 'belleza', marca: 'Aroma' },

  { slug: 'lampara-mesa', nombre: 'Lámpara de mesa', precio: 24500, categoria: 'deco', marca: 'Tierra' },
  { slug: 'almohadon-lino', nombre: 'Almohadón de lino', precio: 12800, categoria: 'deco', marca: 'Hilo' },
  { slug: 'bandeja-madera', nombre: 'Bandeja de madera', precio: 9600, precioAntes: 12000, categoria: 'deco', oferta: true, marca: 'Luna Bijou' },
  { slug: 'movil-colgante', nombre: 'Móvil colgante', precio: 7400, categoria: 'deco', marca: 'Nara' },
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
  // PENDIENTE: solo esta confirmado el usuario de Instagram. Los otros tres
  // apuntan a la busqueda de la marca hasta que Anita pase los perfiles reales.
  facebook: 'https://www.facebook.com/search/top?q=yo%20emprendedor%20tucuman',
  tiktok: 'https://www.tiktok.com/search?q=yoemprendedor.tuc',
  youtube: 'https://www.youtube.com/results?search_query=yo+emprendedor+tucuman',
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

const CATALOGO_OPCIONES = {
  talles: ['S', 'M', 'L', 'XL'],
  colores: OPCIONES_POR_DEFECTO.colores!,
  aromas: ['Lavanda', 'Vainilla', 'Cítrico'],
  variantes: ['Clásico', 'Premium'],
};

const DETALLES: Record<string, Partial<ProductoDetalle>> = {
  'remera-oversize-tejida': {
    medidas: 'Largo 65cm — Ancho 50cm',
    descripcion: 'Remera de algodón tejido a mano, corte oversize. Ideal para uso diario.',
  },
  'perfume-floral': {
    descripcion: 'Perfume de autor con notas florales, elaborado en pequeños lotes.',
  },
  'aros-dorados': {
    medidas: 'Alto 3cm',
    descripcion: 'Aros artesanales con baño de oro, livianos y para uso diario.',
  },
  'vela-aromatica': {
    medidas: 'Alto 9cm — Diámetro 7cm',
    descripcion: 'Vela de cera de soja con mecha de algodón, de combustión lenta.',
  },
};

/**
 * Arma la ficha desde el rubro: los selectores que aparecen salen de
 * ATRIBUTOS_POR_RUBRO, no de una lista escrita a mano producto por producto.
 * Asi una remera nunca ofrece aroma ni un collar ofrece talle.
 */
export function productoDetalle(slug: string): ProductoDetalle | null {
  const base = PRODUCTOS.find((p) => p.slug === slug);
  if (!base) return null;

  const extra = DETALLES[slug] ?? {};
  const indice = PRODUCTOS.findIndex((p) => p.slug === slug);
  const atributos = ATRIBUTOS_POR_RUBRO[base.categoria] ?? ['variantes'];

  const opciones: Variantes = {};
  if (atributos.includes('talles')) opciones.talles = CATALOGO_OPCIONES.talles;
  if (atributos.includes('colores')) opciones.colores = CATALOGO_OPCIONES.colores;
  if (atributos.includes('aromas')) opciones.aromas = CATALOGO_OPCIONES.aromas;
  if (atributos.includes('variantes')) opciones.variantes = CATALOGO_OPCIONES.variantes;

  return {
    ...base,
    codigo: extra.codigo ?? `YE-${String(indice + 1).padStart(5, '0')}`,
    medidas: atributos.includes('medidas') ? extra.medidas : undefined,
    descripcion: extra.descripcion ?? `${base.nombre}, elaborado por una marca local de Tucumán.`,
    opciones,
  };
}

/** Otros productos de la misma categoria, para la fila de relacionados. */
export const relacionadosDe = (slug: string, categoria: string, limite = 5) =>
  PRODUCTOS.filter((p) => p.categoria === categoria && p.slug !== slug).slice(0, limite);
