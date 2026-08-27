import { Sparkles, Gem, Baby, Home, Lamp, Leaf, Gift, Shirt, Briefcase, type LucideIcon } from 'lucide-react';

/**
 * Datos de muestra para levantar la tienda antes de que Supabase este
 * conectado. Cuando lo este, esto se reemplaza por las consultas: la forma de
 * los objetos ya coincide con las tablas de 002_ecommerce.sql.
 */

export const PROMOS = [
  '10% off pagando por transferencia',
  '3 cuotas sin interés',
  'Envío gratis primera compra',
];

/**
 * Los 9 rubros con sus subrubros, segun la lista definitiva de Anita
 * (19-ago-2026). Cambios respecto de la version anterior: Blanqueria sale y
 * entra Marroquineria; Belleza pasa a "Belleza y cosmetica", "Te y aromas" a
 * "Aromas y Tes" y Regalos a "Regaleria".
 */
export const CATEGORIAS: {
  slug: string; nombre: string; icono: LucideIcon; sub: string[]; nota?: string;
}[] = [
  { slug: 'hogar', nombre: 'Hogar', icono: Home,
    sub: ['Muebles', 'Dormitorio', 'Living', 'Cocina', 'Baño', 'Bazar'] },
  { slug: 'deco', nombre: 'Deco', icono: Lamp,
    sub: ['Centros de mesa', 'Cerámica', 'Espejos', 'Cuadros', 'Adornos', 'Flores de tela', 'Lámparas', 'Floreros', 'Joyeros', 'Macetas', 'Velas'] },
  { slug: 'belleza', nombre: 'Belleza y cosmética', icono: Sparkles,
    sub: ['Maquillaje', 'Skincare', 'Perfumería', 'Accesorios'] },
  { slug: 'accesorios', nombre: 'Accesorios', icono: Gem,
    sub: ['Aros', 'Collares', 'Pulseras', 'Conjuntos', 'Cintos', 'Relojes'] },
  { slug: 'aromas-y-tes', nombre: 'Aromas y Tés', icono: Leaf,
    sub: ['Tés', 'Difusores', 'Sahumerios', 'Home spray', 'Aceites', 'Accesorios'] },
  { slug: 'indumentaria', nombre: 'Indumentaria', icono: Shirt,
    sub: ['Femenina', 'Masculina', 'Infantil'] },
  { slug: 'infantiles', nombre: 'Infantiles', icono: Baby,
    sub: ['Juguetes', 'Accesorios bebé', 'Mantas y acolchados', 'Higiene y cuidado', 'Muñecos de apego', 'Chupeteros', 'Ajuares'] },
  { slug: 'marroquineria', nombre: 'Marroquinería', icono: Briefcase,
    sub: ['Mochilas', 'Carteras', 'Billeteras', 'Organizadores', 'Neceser'] },
  { slug: 'regaleria', nombre: 'Regalería', icono: Gift, sub: [],
    nota: 'Selección cruzada de productos de otros rubros. Un mismo producto puede estar acá y en su rubro de origen a la vez.' },
];

/**
 * Que atributos muestra cada rubro. Un collar no tiene talle y una vela no
 * tiene talle pero si aroma: la ficha arma los selectores desde aca, no con
 * un formulario fijo igual para todos.
 */
export const ATRIBUTOS_POR_RUBRO: Record<string, (keyof Variantes | 'medidas')[]> = {
  indumentaria:  ['talles', 'colores', 'variantes', 'medidas'],
  infantiles:    ['talles', 'colores', 'variantes'],
  accesorios:    ['colores', 'variantes'],
  deco:          ['colores', 'variantes', 'medidas'],
  hogar:         ['colores', 'variantes', 'medidas'],
  marroquineria: ['colores', 'variantes', 'medidas'],
  belleza:       ['aromas', 'variantes'],
  'aromas-y-tes': ['aromas', 'variantes'],
  regaleria:     ['variantes'],
};

export type Producto = {
  slug: string;
  nombre: string;
  precio: number;
  precioAntes?: number;
  /**
   * Un producto puede vivir en varios rubros a la vez: Anita lo dejo por
   * escrito ("puede que hayan articulos que se repitan en dos o mas rubros"),
   * y Regaleria es directamente una seleccion cruzada de los demas. Por eso
   * es una lista y no un rubro unico. El primero es el de origen: es el que
   * define que atributos muestra la ficha y de donde salen los relacionados.
   */
  categorias: string[];
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
  /**
   * URLs de Supabase Storage. La primera es la que se ve en la grilla y en
   * los carruseles; el resto son las miniaturas de la ficha.
   *
   * Un producto sin fotos no rompe nada: queda el bloque gris, que es lo que
   * hubo hasta que llegaron las primeras imagenes de Anita.
   */
  fotos?: string[];
};

/** Prefijo del bucket publico de fotos, para no repetirlo producto por producto. */
export const FOTOS =
  `${process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''}/storage/v1/object/public/productos`;

/**
 * Los cuatro colores del set de bano, con la foto de cada uno. Es el primer
 * producto con fotos reales y sirve de molde para los que vengan.
 *
 * El stock es de prueba hasta que Anita cargue el real. El negro esta en 0 a
 * proposito, para ver como se comporta un color agotado.
 */
export const SET_BANO_MOON: Color[] = [
  { nombre: 'Gris',   hex: '#9a9a9a', stock: 12,
    foto: `${FOTOS}/muestras/set-bano-moon-jean-cartier/set-bano-moon-jean-cartier-gris-1.webp` },
  { nombre: 'Visón',  hex: '#c9b4a0', stock: 3,
    foto: `${FOTOS}/muestras/set-bano-moon-jean-cartier/set-bano-moon-jean-cartier-vison-2.webp` },
  { nombre: 'Blanco', hex: '#f2f2f0', stock: 54,
    foto: `${FOTOS}/muestras/set-bano-moon-jean-cartier/set-bano-moon-jean-cartier-blanco-3.webp` },
  { nombre: 'Negro',  hex: '#2f2f2f', stock: 0,
    foto: `${FOTOS}/muestras/set-bano-moon-jean-cartier/set-bano-moon-jean-cartier-negro-4.webp` },
];

/**
 * Colores propios de un producto. Lo que no figura aca usa la paleta generica
 * de muestra, que no tiene ni foto ni stock: son los 55 productos inventados
 * que quedan del demo.
 */
export const COLORES_POR_PRODUCTO: Record<string, Color[]> = {
  'set-bano-moon': SET_BANO_MOON,
};

export const PRODUCTOS: Producto[] = [
  // Primer producto con fotos reales (26-ago-2026). Las cuatro son del mismo
  // set en distintos colores; ver la nota sobre variantes en AGENTS.md.
  { slug: 'set-bano-moon', nombre: 'Set de baño Moon', precio: 18900,
    categorias: ['hogar'], marca: 'Jean Cartier',
    fotos: SET_BANO_MOON.map((c) => c.foto!) },
  { slug: 'aros-dorados', nombre: 'Aros dorados', precio: 8500, categorias: ['accesorios'], masVendido: true, marca: 'Luna Bijou' },
  { slug: 'collar-plateado', nombre: 'Collar plateado', precio: 6200, categorias: ['accesorios'], marca: 'Nara' },
  { slug: 'pulsera-trenzada', nombre: 'Pulsera trenzada', precio: 4900, precioAntes: 6500, categorias: ['accesorios'], oferta: true, masVendido: true, marca: 'Kai' },
  { slug: 'cinturon-cuero', nombre: 'Cinturón cuero', precio: 11300, categorias: ['accesorios', 'marroquineria'], marca: 'Sur' },
  { slug: 'anillo-ajustable', nombre: 'Anillo ajustable', precio: 3800, categorias: ['accesorios'], marca: 'Piel Natural' },

  { slug: 'serum-facial', nombre: 'Serum facial', precio: 9900, categorias: ['belleza'], masVendido: true, marca: 'Bloom' },
  { slug: 'labial-mate', nombre: 'Labial mate', precio: 5400, categorias: ['belleza'], marca: 'Aroma' },
  { slug: 'crema-corporal', nombre: 'Crema corporal', precio: 7800, precioAntes: 9750, categorias: ['belleza'], oferta: true, marca: 'Tierra' },
  { slug: 'perfume-floral', nombre: 'Perfume floral', precio: 14500, categorias: ['belleza'], marca: 'Hilo' },
  { slug: 'set-de-brochas', nombre: 'Set de brochas', precio: 12100, categorias: ['belleza', 'regaleria'], marca: 'Luna Bijou' },

  { slug: 'portavelas-ceramica', nombre: 'Portavelas cerámica', precio: 6900, categorias: ['deco', 'regaleria'], marca: 'Nara' },
  { slug: 'cuadro-tejido', nombre: 'Cuadro tejido', precio: 15200, categorias: ['deco'], masVendido: true, marca: 'Kai' },
  { slug: 'macetero-pintado', nombre: 'Macetero pintado', precio: 8300, categorias: ['deco'], marca: 'Sur' },
  { slug: 'espejo-redondo', nombre: 'Espejo redondo', precio: 18600, categorias: ['deco'], marca: 'Piel Natural' },
  { slug: 'set-posavasos', nombre: 'Set posavasos', precio: 4700, categorias: ['deco'], marca: 'Bloom' },

  // Indumentaria: es el rubro que lleva talle, no "hogar" como estaba antes.
  { slug: 'remera-oversize-tejida', nombre: 'Remera oversize tejida', precio: 14500, precioAntes: 18000, categorias: ['indumentaria'], oferta: true, masVendido: true, marca: 'Aroma' },
  { slug: 'buzo-oversize', nombre: 'Buzo oversize', precio: 16200, categorias: ['indumentaria'], marca: 'Tierra' },
  { slug: 'pantalon-wide-leg', nombre: 'Pantalón wide leg', precio: 13800, categorias: ['indumentaria'], marca: 'Hilo' },
  { slug: 'top-canesu', nombre: 'Top canesú', precio: 8900, categorias: ['indumentaria'], marca: 'Luna Bijou' },
  { slug: 'vestido-lino', nombre: 'Vestido lino', precio: 19500, categorias: ['indumentaria'], marca: 'Nara' },

  { slug: 'vela-aromatica', nombre: 'Vela aromática de soja', precio: 7200, categorias: ['hogar', 'aromas-y-tes', 'regaleria'], masVendido: true, marca: 'Kai' },
  { slug: 'difusor-varillas', nombre: 'Difusor con varillas', precio: 9800, categorias: ['hogar', 'aromas-y-tes'], marca: 'Sur' },
  { slug: 'te-hebras', nombre: 'Té en hebras', precio: 5600, categorias: ['aromas-y-tes'], marca: 'Piel Natural' },
  { slug: 'set-mate', nombre: 'Set matero', precio: 21000, precioAntes: 25000, categorias: ['hogar', 'regaleria'], oferta: true, marca: 'Bloom' },
  { slug: 'body-bebe', nombre: 'Body de algodón', precio: 6800, categorias: ['infantiles', 'indumentaria'], marca: 'Aroma' },
  { slug: 'toalla-bordada', nombre: 'Toalla bordada', precio: 11500, categorias: ['hogar', 'infantiles'], marca: 'Tierra' },

  // Las filas de la home son carruseles: con pocos productos no habria nada
  // que deslizar y las flechas no tendrian sentido.
  { slug: 'aros-piedra', nombre: 'Aros con piedra natural', precio: 9700, categorias: ['accesorios'], marca: 'Hilo' },
  { slug: 'choker-cuero', nombre: 'Choker de cuero', precio: 5300, categorias: ['accesorios'], marca: 'Luna Bijou' },
  { slug: 'llavero-tejido', nombre: 'Llavero tejido', precio: 2900, categorias: ['accesorios'], marca: 'Nara' },
  { slug: 'agenda-artesanal', nombre: 'Agenda artesanal', precio: 13400, categorias: ['accesorios', 'regaleria'], masVendido: true, marca: 'Kai' },

  { slug: 'jabon-artesanal', nombre: 'Jabón artesanal', precio: 3600, categorias: ['belleza', 'regaleria'], marca: 'Sur' },
  { slug: 'aceite-capilar', nombre: 'Aceite capilar', precio: 8400, categorias: ['belleza'], marca: 'Piel Natural' },
  { slug: 'mascara-pestanas', nombre: 'Máscara de pestañas', precio: 6900, precioAntes: 8600, categorias: ['belleza'], oferta: true, marca: 'Bloom' },
  { slug: 'exfoliante-cafe', nombre: 'Exfoliante de café', precio: 5900, categorias: ['belleza'], marca: 'Aroma' },

  { slug: 'lampara-mesa', nombre: 'Lámpara de mesa', precio: 24500, categorias: ['deco'], marca: 'Tierra' },
  { slug: 'almohadon-lino', nombre: 'Almohadón de lino', precio: 12800, categorias: ['deco'], marca: 'Hilo' },
  { slug: 'bandeja-madera', nombre: 'Bandeja de madera', precio: 9600, precioAntes: 12000, categorias: ['deco'], oferta: true, marca: 'Luna Bijou' },
  { slug: 'movil-colgante', nombre: 'Móvil colgante', precio: 7400, categorias: ['deco'], marca: 'Nara' },

  { slug: 'mochila-lona', nombre: 'Mochila de lona', precio: 22400, categorias: ['marroquineria'], masVendido: true, marca: 'Sur' },
  { slug: 'cartera-cuero', nombre: 'Cartera de cuero', precio: 31500, precioAntes: 38000, categorias: ['marroquineria', 'regaleria'], oferta: true, marca: 'Piel Natural' },
  { slug: 'billetera-tejida', nombre: 'Billetera tejida', precio: 9300, categorias: ['marroquineria'], marca: 'Hilo' },
  { slug: 'neceser-estampado', nombre: 'Neceser estampado', precio: 7900, categorias: ['marroquineria', 'belleza'], marca: 'Bloom' },
];

export const OFERTAS_DIA = [
  { titulo: 'Envío gratis en accesorios', href: '/categoria/accesorios' },
  { titulo: '20% off en belleza', href: '/categoria/belleza' },
];

/** Las filas que se muestran en la home, en orden. */
/**
 * Anita pidio que en la home aparezcan las tiras de los 9 rubros, no tres.
 * Se derivan de CATEGORIAS para que agregar o sacar un rubro no obligue a
 * tocar dos listas.
 */
export const FILAS_HOME = CATEGORIAS.map((c) => c.slug);

export const MARCAS = [
  'Luna Bijou', 'Nara', 'Kai', 'Sur', 'Piel Natural',
  'Bloom', 'Aroma', 'Tierra', 'Hilo',
];

export const CONTACTO = {
  direccion: '24 de Septiembre 734, San Miguel de Tucumán',
  telefono: '381 214-6172',
  telefonoLink: 'tel:3812146172',
  whatsappNumero: '5493812146172',
  email: 'info@yoemprendedortienda.com',

  /**
   * Yo Emprendedor maneja DOS Instagram: uno de la tienda, para compradores, y
   * otro para emprendedoras. En la tienda va el primero; el de emprendedoras
   * queda para la landing de planes.
   */
  instagram: 'https://www.instagram.com/yoemprendedor.tienda',
  instagramUsuario: '@yoemprendedor.tienda',
  instagramEmprendedores: 'https://www.instagram.com/yoemprendedor.tuc',

  facebook: 'https://www.facebook.com/yoemprendedortuc/',
  tiktok: 'https://www.tiktok.com/@yo.emprendedortuc',
  youtube: 'https://www.youtube.com/@YOEMPRENDEDOR-c9h',
};

/** Monto desde el cual el envio es gratis (politica de envios, punto 15). */
export const ENVIO_GRATIS_DESDE = 200000;

export const formatearPrecio = (n: number) =>
  '$' + n.toLocaleString('es-AR', { maximumFractionDigits: 0 });

/** Un producto entra si el rubro figura en su lista, no solo si es el primero. */
export const productosDe = (categoria: string) =>
  PRODUCTOS.filter((p) => p.categorias.includes(categoria));

export const nombreCategoria = (slug: string) =>
  CATEGORIAS.find((c) => c.slug === slug)?.nombre ?? slug;

export const categoria = (slug: string) => CATEGORIAS.find((c) => c.slug === slug);

/** El rubro de origen: define los selectores de la ficha y los relacionados. */
export const rubroPrincipal = (p: Producto) => p.categorias[0];

/** Atributos de la ficha. Todos opcionales: el wireframe marca aroma y
 *  variante como "si aplica al producto". */
export type Variantes = {
  talles?: string[];
  colores?: Color[];
  aromas?: string[];
  variantes?: string[];
};

/**
 * Un color no es solo un circulito: tiene su propia foto y su propio stock.
 * Espejo de `producto_variantes` en la base.
 *
 * `foto` — al elegir el color, la imagen principal cambia a esta. Sin eso el
 * cliente tiene que adivinar cual de las miniaturas es el color que eligio.
 *
 * `stock` — undefined significa "no lo sabemos todavia" y no muestra cartel;
 * es el caso de los productos de muestra. Un 0 sí muestra "Sin stock" y
 * bloquea la compra: vender algo que no hay es peor que no mostrarlo.
 */
export type Color = {
  nombre: string;
  hex: string;
  foto?: string;
  stock?: number;
};

/** Debajo de esto se avisa que quedan pocas. Igual que la vista
 *  `variantes_disponibles` en la base: si cambia uno, cambia el otro. */
export const POCAS_UNIDADES = 5;

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
  const atributos = ATRIBUTOS_POR_RUBRO[rubroPrincipal(base)] ?? ['variantes'];

  const opciones: Variantes = {};
  if (atributos.includes('talles')) opciones.talles = CATALOGO_OPCIONES.talles;
  if (atributos.includes('colores'))
    opciones.colores = COLORES_POR_PRODUCTO[slug] ?? CATALOGO_OPCIONES.colores;
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
  PRODUCTOS.filter((p) => p.categorias.includes(categoria) && p.slug !== slug).slice(0, limite);
