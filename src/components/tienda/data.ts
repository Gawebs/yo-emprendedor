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

/** Arma la ruta de una foto sin repetir el prefijo en cada linea. */
const foto = (slug: string, archivo: string) => `${FOTOS}/muestras/${slug}/${archivo}`;

/**
 * Los cuatro colores del set de bano Moon. Fue el primer producto con fotos
 * reales y sirve de molde para los que vinieron despues.
 *
 * El stock es de prueba hasta que Anita cargue el real. El negro esta en 0 a
 * proposito, para ver como se comporta un color agotado.
 */
export const SET_BANO_MOON: Color[] = [
  { nombre: 'Gris',   hex: '#9a9a9a', stock: 12,
    foto: foto('set-bano-moon-jean-cartier', 'set-bano-moon-jean-cartier-gris-1.webp') },
  { nombre: 'Visón',  hex: '#c9b4a0', stock: 3,
    foto: foto('set-bano-moon-jean-cartier', 'set-bano-moon-jean-cartier-vison-2.webp') },
  { nombre: 'Blanco', hex: '#f2f2f0', stock: 54,
    foto: foto('set-bano-moon-jean-cartier', 'set-bano-moon-jean-cartier-blanco-3.webp') },
  { nombre: 'Negro',  hex: '#2f2f2f', stock: 0,
    foto: foto('set-bano-moon-jean-cartier', 'set-bano-moon-jean-cartier-negro-4.webp') },
];

/**
 * Las opciones de los productos reales: los colores que existen de verdad y
 * los talles que se fabrican.
 *
 * Un producto que figura aca **no** recibe las opciones de muestra de
 * `CATALOGO_OPCIONES`. Antes las recibia cualquiera segun su rubro, asi que
 * el set de bano ofrecia elegir entre "Clasico" y "Premium", que no existen.
 * Ofrecerle al cliente una variante inventada es peor que no ofrecer ninguna:
 * la elige, la paga, y despues hay que explicarle. Los 55 productos del demo
 * siguen con las genericas, que es lo unico que tienen.
 *
 * **El stock va sin cargar** hasta que Anita pase el real. `undefined` no
 * muestra cartel, que es distinto de un 0 —eso dice "sin stock" y bloquea la
 * compra—. La unica excepcion es el set Moon, que arrastra stock de prueba
 * de cuando se armo el molde.
 *
 * Un color con `foto` hace que la miniatura sea el selector; uno sin foto cae
 * en los circulos de color. Los productos donde el proveedor mando una sola
 * foto por mas que existan cuatro colores usan lo segundo.
 */
export const OPCIONES_REALES: Record<string, Variantes> = {
  'set-bano-moon': { colores: SET_BANO_MOON },

  'set-bano-mist': {
    colores: [
      { nombre: 'Verde', hex: '#8ba088', foto: foto('set-bano-mist', 'set-bano-mist-verde-1.webp') },
      { nombre: 'Gris',  hex: '#b3b6b8', foto: foto('set-bano-mist', 'set-bano-mist-gris-2.webp') },
      { nombre: 'Negro', hex: '#1c1c1c', foto: foto('set-bano-mist', 'set-bano-mist-negro-3.webp') },
    ],
  },

  // Los nombres son los del doc, que no son los que se deducian de la foto:
  // el de unicornios es "Rosa animado" y el de estrellas, "Azul universo".
  'acolchado-infantil-sabana': {
    colores: [
      { nombre: 'Rosa corazón', hex: '#f3a7c0',
        foto: foto('acolchado-infantil-sabana', 'acolchado-infantil-sabana-rosa-corazon-1.webp') },
      { nombre: 'Rosa animado', hex: '#f6c3d2',
        foto: foto('acolchado-infantil-sabana', 'acolchado-infantil-sabana-rosa-animado-2.webp') },
      { nombre: 'Rosa print',   hex: '#e6c3bd',
        foto: foto('acolchado-infantil-sabana', 'acolchado-infantil-sabana-rosa-print-3.webp') },
      { nombre: 'Azul universo', hex: '#46597a',
        foto: foto('acolchado-infantil-sabana', 'acolchado-infantil-sabana-azul-universo-4.webp') },
    ],
  },

  // El doc agrega el talle S, que la ficha del mayorista no traia, y llama
  // "Malbec" al que en la foto parece morado.
  'bata-microflanel-trento': {
    talles: ['S', 'M', 'L', 'XL'],
    colores: [
      { nombre: 'Negro',   hex: '#1b1b1b' },
      { nombre: 'Cemento', hex: '#4d4d4d' },
      { nombre: 'Malbec',  hex: '#a98a99' },
      { nombre: 'Visón',   hex: '#cdbcae' },
    ],
  },

  'cortinas-blackout': {
    colores: [
      { nombre: 'Arena',       hex: '#d9cdb6',
        foto: foto('cortinas-blackout', 'cortinas-blackout-arena-1.webp') },
      { nombre: 'Gris claro',  hex: '#9b9b9b',
        foto: foto('cortinas-blackout', 'cortinas-blackout-gris-claro-2.webp') },
      { nombre: 'Gris oscuro', hex: '#2b2b2b',
        foto: foto('cortinas-blackout', 'cortinas-blackout-gris-oscuro-3.webp') },
    ],
  },

  // Vienen en un solo color o acabado: sin selector, no con uno de una sola
  // opcion, que obliga a elegir algo que no se puede no elegir.
  'kit-alaska-king': {},
  'cama-madera-listones': {},
  'mesa-de-luz-nordica': {},
  'comoda-6-cajones': {},

  // El doc lista tres colores y llegaron cuatro fotos: las dos grises son el
  // mismo gris con distinta luz. La cuarta quedo como foto de ambiente.
  'mantel-ambiente-tusor': {
    colores: [
      { nombre: 'Arena', hex: '#d9cfc0',
        foto: foto('mantel-ambiente-tusor', 'mantel-ambiente-tusor-arena-1.webp') },
      { nombre: 'Gris',  hex: '#a1a5a6',
        foto: foto('mantel-ambiente-tusor', 'mantel-ambiente-tusor-gris-2.webp') },
      { nombre: 'Verde', hex: '#97a68f',
        foto: foto('mantel-ambiente-tusor', 'mantel-ambiente-tusor-verde-3.webp') },
    ],
  },

  // El doc no dice colores. Estos dos salen de las fotos.
  'set-cortina-bano': {
    colores: [
      { nombre: 'Blanco', hex: '#f4f4f2',
        foto: foto('set-cortina-bano', 'set-cortina-bano-blanco-1.webp') },
      { nombre: 'Perla',  hex: '#d3d2cd',
        foto: foto('set-cortina-bano', 'set-cortina-bano-perla-2.webp') },
    ],
  },

  // Los cuatro colores existen, pero el proveedor mando una sola foto de cada
  // estuche: sin foto por color, el selector vuelve a ser el circulito.
  'toalla-deportiva-estuche': {
    colores: [
      { nombre: 'Azul',  hex: '#2b3f7a' },
      { nombre: 'Lila',  hex: '#8e5bb5' },
      { nombre: 'Gris',  hex: '#b9bcc0' },
      { nombre: 'Rosa',  hex: '#d6246e' },
    ],
  },

  'toalla-refrescante': {
    colores: [
      { nombre: 'Rosa',  hex: '#e8556d' },
      { nombre: 'Azul',  hex: '#3fb6dd' },
      { nombre: 'Gris',  hex: '#b0b3b5' },
      { nombre: 'Negra', hex: '#1c1c1c' },
    ],
  },
};

/**
 * Los colores de cada producto, derivados de `OPCIONES_REALES` para que no
 * haya dos listas que mantener. Lo que no figura aca usa la paleta generica
 * de muestra, que no tiene ni foto ni stock.
 */
export const COLORES_POR_PRODUCTO: Record<string, Color[]> = Object.fromEntries(
  Object.entries(OPCIONES_REALES)
    .filter(([, o]) => o.colores?.length)
    .map(([slug, o]) => [slug, o.colores!]),
);

/** Las fotos de un producto salen de sus colores, en orden. */
const fotosDeColores = (slug: string) =>
  OPCIONES_REALES[slug].colores!.map((c) => c.foto!);

/**
 * Fotos numeradas de un producto sin variantes: `<slug>-1.jpg`, `-2`, y asi.
 * Los muebles vienen en un solo acabado y con muchas tomas del mismo mueble,
 * que es justo el caso contrario al de la blanqueria.
 */
const fotosNumeradas = (slug: string, cantidad: number, ext = 'jpg') =>
  Array.from({ length: cantidad }, (_, i) => foto(slug, `${slug}-${i + 1}.${ext}`));

export const PRODUCTOS: Producto[] = [
  // --- Productos reales -----------------------------------------------
  //
  // Los diez primeros son de verdad: existen, tienen fotos propias y sus
  // colores son los que se fabrican. Lo unico inventado es el PRECIO, que es
  // una estimacion puesta para que la ficha no quede vacia: **hay que
  // reemplazarlo por el de Anita antes de vender**. Lo mismo el stock, que
  // todavia no se cargo.
  //
  // El set Moon fue el primero (26-ago-2026) y quedo de molde; los nueve que
  // siguen entraron el 28-ago-2026 con las fotos que mando Anita.

  { slug: 'set-bano-moon', nombre: 'Set de baño Moon 3 piezas', precio: 18900,
    categorias: ['hogar'], marca: 'Jean Cartier',
    fotos: fotosDeColores('set-bano-moon') },

  { slug: 'set-bano-mist', nombre: 'Set de baño Mist 5 piezas', precio: 34900,
    categorias: ['hogar'], marca: 'Jean Cartier',
    fotos: [
      ...fotosDeColores('set-bano-mist'),
      foto('set-bano-mist', 'set-bano-mist-4.webp'),
    ] },

  { slug: 'set-cortina-bano', nombre: 'Set de cortina de baño 180 x 180', precio: 24900,
    categorias: ['hogar'], marca: 'Jean Cartier',
    fotos: [
      ...fotosDeColores('set-cortina-bano'),
      foto('set-cortina-bano', 'set-cortina-bano-3.webp'),
    ] },

  { slug: 'kit-alaska-king', nombre: 'Kit Alaska King', precio: 129900,
    categorias: ['hogar'], marca: 'Jean Cartier',
    fotos: [
      foto('kit-alaska-king', 'kit-alaska-king-1.webp'),
      foto('kit-alaska-king', 'kit-alaska-king-2.webp'),
    ] },

  // Va en Hogar y no en Infantiles porque el rubro de origen define los
  // selectores, y en Infantiles la ficha pediria talle: un acolchado no tiene.
  // Igual aparece en la fila de Infantiles, que es donde lo busca la clienta.
  { slug: 'acolchado-infantil-sabana', nombre: 'Acolchado infantil con sábana 1½ plaza',
    precio: 54900, categorias: ['hogar', 'infantiles'], marca: 'Jean Cartier',
    fotos: fotosDeColores('acolchado-infantil-sabana') },

  { slug: 'mantel-ambiente-tusor', nombre: 'Mantel de ambiente tusor 2 m', precio: 38900,
    categorias: ['hogar', 'deco'], marca: 'Jean Cartier',
    fotos: [
      ...fotosDeColores('mantel-ambiente-tusor'),
      foto('mantel-ambiente-tusor', 'mantel-ambiente-tusor-4.webp'),
    ] },

  { slug: 'bata-microflanel-trento', nombre: 'Bata de microflanel Trento', precio: 46900,
    categorias: ['indumentaria'], marca: 'Jean Cartier',
    fotos: [
      foto('bata-microflanel-trento', 'bata-microflanel-trento-1.webp'),
      foto('bata-microflanel-trento', 'bata-microflanel-trento-2.webp'),
    ] },

  { slug: 'toalla-refrescante', nombre: 'Toalla deportiva efecto frío 30 x 80', precio: 9900,
    categorias: ['hogar'], marca: 'Jean Cartier',
    fotos: [
      foto('toalla-refrescante', 'toalla-refrescante-1.webp'),
      foto('toalla-refrescante', 'toalla-refrescante-2.webp'),
    ] },

  { slug: 'toalla-deportiva-estuche', nombre: 'Toalla deportiva con estuche portable',
    precio: 12900, categorias: ['hogar', 'regaleria'], marca: 'Jean Cartier',
    fotos: [
      foto('toalla-deportiva-estuche', 'toalla-deportiva-estuche-1.webp'),
      foto('toalla-deportiva-estuche', 'toalla-deportiva-estuche-2.webp'),
      foto('toalla-deportiva-estuche', 'toalla-deportiva-estuche-3.webp'),
      foto('toalla-deportiva-estuche', 'toalla-deportiva-estuche-4.webp'),
    ] },

  // Muebles (28-ago-2026). Otro proveedor, no Jean Cartier: llegaron sin
  // marca y quedan con "A confirmar" hasta que Anita diga de quien son. El
  // comprador no ve ese campo, pero se usa para liquidar, asi que no puede
  // quedar con una marca inventada.
  { slug: 'cama-madera-listones', nombre: 'Cama de madera con respaldo de listones',
    precio: 349900, categorias: ['hogar'], marca: 'A confirmar',
    fotos: fotosNumeradas('cama-madera-listones', 8) },

  { slug: 'comoda-6-cajones', nombre: 'Cómoda nórdica de 6 cajones', precio: 259900,
    categorias: ['hogar'], marca: 'A confirmar',
    fotos: fotosNumeradas('comoda-6-cajones', 4) },

  { slug: 'mesa-de-luz-nordica', nombre: 'Mesa de luz nórdica con cajón', precio: 89900,
    categorias: ['hogar'], marca: 'A confirmar',
    fotos: fotosNumeradas('mesa-de-luz-nordica', 4) },

  // Ojo: este NO es Jean Cartier. La carpeta no lo dice y la foto que se
  // descarto traia la marca de agua de Nathan Home. Queda con esa marca hasta
  // que Anita confirme de quien es; no se sumo a MARCAS, que es la lista de
  // las emprendedoras.
  { slug: 'cortinas-blackout', nombre: 'Juego de cortinas blackout', precio: 79900,
    categorias: ['hogar', 'deco'], marca: 'Nathan Home',
    fotos: fotosDeColores('cortinas-blackout') },

  // --- Muestra del demo -------------------------------------------------
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

/** Prefijo del bucket de logos. */
export const LOGOS =
  `${process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''}/storage/v1/object/public/marcas`;

/**
 * Las marcas reales que vende Anita, con sus logos (27-ago-2026). Reemplazan
 * a las inventadas del demo (Luna Bijou, Nara, Kai...).
 *
 * Sin `logo` se muestran las iniciales en el circulo, que es lo que habia
 * antes: una marca nueva no rompe la grilla mientras no llegue su logo.
 *
 * Ojo: esta pagina es institucional. El comprador **no** ve la marca de cada
 * producto mientras compra —decision de Anita, para que no le compren directo
 * por Instagram— asi que estos nombres no se cruzan con el catalogo.
 */
export const MARCAS: { nombre: string; logo?: string }[] = [
  { nombre: 'Arenna',                  logo: `${LOGOS}/logo-arenna.png` },
  { nombre: 'Essential Soul Lingerie', logo: `${LOGOS}/logo-essential-soul-lingerie.png` },
  { nombre: 'Flora Moda',              logo: `${LOGOS}/logo-flora-moda.png` },
  { nombre: 'Meraki',                  logo: `${LOGOS}/logo-meraki.png` },
  { nombre: 'Mitoba',                  logo: `${LOGOS}/logo-mitoba.png` },
  { nombre: 'Tau Pet à Porter',        logo: `${LOGOS}/logo-tau-pet-a-porter.png` },
  { nombre: 'The Archer',              logo: `${LOGOS}/logo-the-archer.png` },
  { nombre: 'Jean Cartier' },
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
/**
 * Un producto esta agotado cuando NINGUNA de sus combinaciones tiene stock.
 * Con un solo color agotado sigue disponible: se compra en los otros.
 *
 * Si el stock todavia no se cargo (los 55 productos de muestra), no esta
 * agotado — es distinto "no hay" que "no sabemos".
 */
export const estaAgotado = (slug: string): boolean => {
  const colores = COLORES_POR_PRODUCTO[slug];
  if (!colores?.length) return false;
  const conocidos = colores.filter((c) => c.stock !== undefined);
  return conocidos.length > 0 && conocidos.every((c) => c.stock === 0);
};

/**
 * Los agotados van al final. No se ocultan: el cliente que lo busca creeria
 * que no se vende mas, y el buscador perderia la pagina que ya tiene
 * posicionada. Pero tampoco pueden ocupar el primer lugar de la fila, que es
 * el mas valioso de la tienda.
 */
export const productosDe = (categoria: string) =>
  PRODUCTOS.filter((p) => p.categorias.includes(categoria)).sort(
    (a, b) => Number(estaAgotado(a.slug)) - Number(estaAgotado(b.slug)),
  );

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
 * `stock` · undefined significa "no lo sabemos todavia" y no muestra cartel;
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
  /** De que esta hecho. Sale de "Composicion" en el doc de cada producto. */
  composicion?: string;
  descripcion: string;
  /**
   * Los "Beneficios del producto" del doc. Van como lista y no metidos en el
   * parrafo: son cuatro o cinco frases sueltas, y en un solo bloque de texto
   * no las lee nadie.
   */
  beneficios?: string[];
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
  // --- Los reales ------------------------------------------------------
  //
  // El texto sale del documento que viene en la carpeta de fotos de cada
  // producto. Se copia, no se escribe: es la regla acordada con Gabriel el
  // 28-ago-2026, y por algo existe. De los diez docs salieron datos que la
  // foto no decia y otros que la contradecian, como el talle S de la bata o
  // que el mantel mide 130 x 200 y no dos metros de lado.
  //
  // Lo unico que se les saca es **el nombre de la marca**, que las
  // descripciones de Anita nombran y la tienda no muestra en ningun punto de
  // la compra. Ver la nota en AGENTS.md: es una decision que ella tiene que
  // confirmar.

  'set-bano-moon': {
    medidas: 'Dispenser 7,3 x 7,3 x 16,5 cm · Vaso 7,3 x 7,3 x 11 cm · Bandeja 14,8 x 7,2 x 1,5 cm',
    composicion: '100% polipropileno',
    descripcion:
      'Mantené tu baño organizado y con estilo con el set de baño Moon. Con tres piezas esenciales, combina diseño moderno, practicidad y materiales duraderos, ideal para darle un toque elegante y funcional a tu espacio.',
    beneficios: [
      'Set compacto y funcional, ideal para organizar tu baño.',
      'Diseño moderno y elegante, combina con cualquier estilo de decoración.',
      'Práctico y duradero, perfecto para uso diario.',
    ],
  },

  'set-bano-mist': {
    medidas:
      'Cesto 18,3 x 24,1 cm · Dispenser 8,5 x 14,5 cm · Vaso 7,5 x 10,4 cm · Bandeja 16,6 x 8,7 x 2,5 cm · Portaescobilla 10 x 13,5 cm',
    composicion: 'Polipropileno',
    descripcion:
      'Organizá tu baño con estilo y practicidad gracias al set de baño Mist. Compuesto por cinco piezas esenciales, combina diseño moderno, materiales duraderos y funcionalidad, para mantener tu baño ordenado y con un toque elegante.',
    beneficios: [
      'Material resistente, fabricado en polipropileno duradero y fácil de limpiar.',
      'Diseño moderno y elegante, combina con cualquier estilo de baño.',
      'Compacto y práctico, optimiza el espacio sin perder funcionalidad.',
      'Ideal para uso diario, mantiene todo ordenado y a mano.',
    ],
  },

  'set-cortina-bano': {
    medidas: 'Cortina 180 x 180 cm',
    composicion: '100% microfibra premium',
    descripcion:
      'Dale un toque de frescura y sofisticación a tu baño con el set de la línea Linen. Con una cortina de baño símil lino que emula la textura y apariencia del lino, este set es perfecto para quienes buscan calidad y estilo en cada detalle.',
    beneficios: [
      'Fácil instalación: los ganchos roller metálicos permiten colgar la cortina de forma sencilla y rápida.',
      'Alta durabilidad: fabricado en material premium, el set es resistente y fácil de cuidar.',
    ],
  },

  'kit-alaska-king': {
    medidas: 'Edredón 280 x 250 cm · 2 fundas de almohadón 90 x 50 + 5 cm',
    composicion: 'Microfibra premium',
    descripcion:
      'Renová tu cama con este kit edredón de coral fleece combinado con corderito, pensado para brindar máximo confort y una sensación cálida en cada descanso. Su combinación de texturas suaves y abrigadas lo convierte en la opción ideal para disfrutar noches mucho más acogedoras.',
    beneficios: [
      'Coral fleece suave que brinda gran confort térmico.',
      'Corderito cálido, ideal para noches muy frías.',
      'Texturas ultrasuaves con sensación envolvente y acogedora.',
      'Set práctico, perfecto para renovar tu cama fácilmente.',
    ],
  },

  'acolchado-infantil-sabana': {
    medidas:
      'Acolchado 160 x 240 cm · Sábana superior 150 x 235 cm · Sábana ajustable 140 x 85 cm, para colchón de 90 x 190 x 18 cm · Funda de almohada 74 x 48 cm',
    composicion: 'Microfibra premium',
    descripcion:
      'Dale a tu hijo el descanso que merece con el acolchado y sábana infantil 1½ plaza Soft. Su diseño adorable y la microfibra premium garantizan suavidad y calidez, creando un ambiente perfecto para sus noches de descanso.',
    beneficios: [
      'Ideal para el descanso de los niños, con una textura suave y agradable al tacto.',
      'Material durable y fácil de lavar, pensado para resistir el uso diario.',
      'Diseño encantador que se adapta a la decoración infantil, creando un ambiente cálido y acogedor.',
    ],
  },

  'mantel-ambiente-tusor': {
    medidas: '130 x 200 cm',
    composicion: '100% microfibra premium',
    descripcion:
      'El mantel de ambiente símil tusor es la opción ideal para quienes buscan estilo y durabilidad. Su acabado símil tusor aporta una textura única y sofisticada que transformará tu espacio, mientras que su microfibra premium asegura fácil mantenimiento y resistencia para el uso diario.',
    beneficios: [
      'Resistente y fácil de cuidar, ideal para el uso diario.',
      'Textura sofisticada que agrega un toque de lujo a tu hogar.',
      'Estilo versátil que se adapta a diversas decoraciones y ocasiones.',
    ],
  },

  'bata-microflanel-trento': {
    medidas: 'Largo total: M 94 cm · L 98 cm · XL 110 cm',
    composicion: 'Microfibra premium, superficie aterciopelada soft touch',
    descripcion:
      'Disfrutá del lujo y la suavidad con esta bata de microflannel. Diseñada para envolver tu piel en una textura aterciopelada, es perfecta para relajarte en casa, disfrutar de tus mañanas o abrigarte después de un baño cálido.',
    beneficios: [
      'Resistente al uso diario: su confección premium asegura durabilidad y resistencia al lavado.',
      'Elegancia en cada detalle: diseñada para brindar un look sofisticado, incluso en tus momentos más relajados.',
    ],
  },

  'toalla-refrescante': {
    medidas: '30 x 80 cm',
    composicion: 'Microfibra premium',
    descripcion:
      'Mantenete fresco y cómodo durante tus entrenamientos con la toalla deportiva efecto frío, ideal para acompañarte en cualquier actividad física.',
    beneficios: [
      'Ligera y fácil de transportar, perfecta para llevar a cualquier lugar.',
      'Proporciona comodidad y frescura al instante.',
    ],
  },

  'toalla-deportiva-estuche': {
    medidas: '30 x 30 cm',
    composicion: '100% poliéster',
    descripcion:
      'Elegí practicidad y estilo con esta toalla deportiva de 100% poliéster, diseñada para acompañarte en todas tus actividades físicas. Su tamaño compacto y el estuche de goma con gancho la hacen ideal para llevarla a cualquier lugar, manteniéndola siempre ordenada y lista para usar.',
  },

  'cortinas-blackout': {
    medidas: '140 x 210 cm cada paño',
    composicion: 'Microfibra premium',
    descripcion:
      'Creá espacios de descanso y privacidad total con este juego de cortinas black out, que garantiza 100% opacidad y textura premium, combinando funcionalidad, estilo y confort para cualquier ambiente de tu hogar.',
    beneficios: [
      '100% bloqueo de luz, ideal para dormitorios, living o cualquier espacio de tu hogar.',
      'Calidad premium, suave y resistente al uso diario.',
      'Diseño elegante, combina con cualquier estilo de decoración.',
      'Aporta confort y privacidad, creando ambientes acogedores y relajantes.',
    ],
  },

  // Los tres muebles son los unicos reales que siguen sin doc. Estas
  // descripciones son provisorias, escritas de lo que se ve en la foto, y
  // **faltan las medidas**, que en un mueble es el dato que decide la compra.
  'cama-madera-listones': {
    descripcion: 'Cama de madera con respaldo de listones y patas cónicas.',
  },
  'comoda-6-cajones': {
    descripcion: 'Cómoda de seis cajones con frentes blancos, tiradores calados y patas de madera.',
  },
  'mesa-de-luz-nordica': {
    descripcion: 'Mesa de luz con un cajón y estante abierto, con patas de madera.',
  },

  // Las de muestra.
  'remera-oversize-tejida': {
    medidas: 'Largo 65cm · Ancho 50cm',
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
    medidas: 'Alto 9cm · Diámetro 7cm',
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

  // Un producto real ofrece exactamente lo que tiene: si no figura el talle,
  // no se muestra el selector de talle. El relleno de muestra es solo para
  // los inventados del demo, que no tienen nada mas que mostrar.
  const esReal = Boolean(OPCIONES_REALES[slug]);
  const opciones: Variantes = { ...OPCIONES_REALES[slug] };
  if (!esReal) {
    if (atributos.includes('talles')) opciones.talles = CATALOGO_OPCIONES.talles;
    if (atributos.includes('colores')) opciones.colores = CATALOGO_OPCIONES.colores;
    if (atributos.includes('aromas')) opciones.aromas = CATALOGO_OPCIONES.aromas;
    if (atributos.includes('variantes')) opciones.variantes = CATALOGO_OPCIONES.variantes;
  }

  return {
    ...base,
    codigo: extra.codigo ?? `YE-${String(indice + 1).padStart(5, '0')}`,
    // En un producto real las medidas se muestran siempre que el doc las
    // traiga. El filtro por rubro es para los de muestra, que no tienen doc.
    medidas: esReal || atributos.includes('medidas') ? extra.medidas : undefined,
    composicion: extra.composicion,
    descripcion: extra.descripcion ?? `${base.nombre}, elaborado por una marca local de Tucumán.`,
    beneficios: extra.beneficios,
    opciones,
  };
}

/** Otros productos de la misma categoria, para la fila de relacionados. */
export const relacionadosDe = (slug: string, categoria: string, limite = 5) =>
  PRODUCTOS.filter((p) => p.categorias.includes(categoria) && p.slug !== slug).slice(0, limite);
