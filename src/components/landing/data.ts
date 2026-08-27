import {
  Home,
  ShoppingCart,
  BarChart3,
  Truck,
  BarChart,
  Users,
  type LucideIcon,
} from 'lucide-react';

/** Local, telefono y redes reales de Yo Emprendedor. */
export const CONTACTO = {
  direccion: '24 de Septiembre 734, San Miguel de Tucumán',
  telefono: '381 214-6172',
  telefonoLink: 'tel:3812146172',
  /** Formato internacional para wa.me: 54 (AR) + 9 (movil) + 381 (Tucuman). */
  whatsappNumero: '5493812146172',
  email: 'info@yoemprendedortienda.com',
  instagram: 'https://instagram.com/yoemprendedor.tuc',
  instagramUser: '@yoemprendedor.tuc',
  whatsappLink: 'https://wa.link/ehrynl',
};

export const RECONOCIMIENTO: { icono: LucideIcon; texto: string }[] = [
  { icono: Home, texto: 'Tienda física en capital' },
  { icono: ShoppingCart, texto: 'Canal digital de ventas' },
  { icono: BarChart3, texto: 'Difusión en redes' },
  { icono: Truck, texto: 'Logística y punto de retiro' },
  { icono: BarChart, texto: 'Reportes y asesoría' },
  { icono: Users, texto: 'Comunidad emprendedora' },
];

export const PILARES: { icono: LucideIcon; titulo: string; texto: string }[] = [
  {
    icono: Home,
    titulo: 'Ubicación privilegiada en el corazón de Tucumán',
    texto:
      'Presencia comercial en una de las zonas más transitadas de San Miguel. Sin alquileres, servicios, personal ni equipamiento. Tus productos donde están los clientes, descubiertos por nuevas personas cada día.',
  },
  {
    icono: ShoppingCart,
    titulo: 'Ventas presenciales y digitales',
    texto:
      'Combinamos la fuerza de una tienda física con canales digitales que amplían tu alcance y generan más oportunidades de venta en simultáneo.',
  },
  {
    icono: BarChart3,
    titulo: 'Más visibilidad para tu marca',
    texto:
      'No alcanza con un gran producto si nadie lo conoce. Le damos visibilidad a tu marca en redes y te conectamos con nuevos clientes.',
  },
  {
    icono: Truck,
    titulo: 'Gestión de entrega que simplifica tu operación',
    texto:
      'Gestionamos la entrega de tus pedidos en un punto físico cómodo y seguro. Menos logística para vos, mejor experiencia para tus clientes.',
  },
  {
    icono: BarChart,
    titulo: 'Herramientas para crecer con estrategia',
    texto:
      'Accedés a información, seguimiento y acompañamiento para tomar mejores decisiones. Sabés qué funciona, qué ajustar y hacia dónde ir.',
  },
  {
    icono: Users,
    titulo: 'Una comunidad que te acompaña',
    texto:
      'Crecer es más fácil cuando no estás sola. Formás parte de una comunidad de emprendedores que comparte experiencias, conocimientos y oportunidades.',
  },
];

export const BENEFICIOS = [
  'Más presencia. Más visibilidad. Más oportunidades.',
  'Sin empleados que gestionar ni alquileres que sostener.',
  'Sin los riesgos de abrir un local propio.',
  'Crecer no significa trabajar más horas, significa un negocio más inteligente.',
];

export const BENEFICIO_STATS = [
  { num: '24/7', label: 'Tu marca disponible todos los días' },
  { num: '$0', label: 'En personal, alquiler o equipamiento' },
  { num: '-95%', label: 'Más tiempo para vos' },
  { num: '100%', label: 'Enfocada en crear y producir' },
];

export const HERO_STATS = [
  { num: '$20M+', label: 'Vendido por emprendedoras en los últimos meses' },
  { num: '-95%', label: 'Menos tiempo dedicado a gestión vs. tener local propio' },
  { num: '$0', label: 'En alquiler, empleados o equipamiento' },
  { num: '3 planes', label: 'Diseñados para cada etapa de tu marca' },
];

export const DOLORES = [
  { cita: 'Vendo, pero todo depende de mí. Si no estoy, no pasa nada.', quien: 'La emprendedora desbordada que hace todo sola' },
  { cita: 'Mi mercado ya me conoce. Necesito llegar a nuevas personas, pero no puedo abrir otro local.', quien: 'La que quiere vender en otra ciudad' },
  { cita: 'Tengo mi local, pero quiero otro punto de venta sin los costos de la primera vez.', quien: 'El negocio con local propio que busca expansión' },
  { cita: 'Vendo por redes, pero pierdo clientes que quieren ver el producto antes de comprar.', quien: 'La que vende solo por redes' },
  { cita: 'Tengo mi trabajo, mi profesión me consume, y mi negocio no tiene la atención que merece.', quien: 'El/la profesional con negocio paralelo' },
];

export const SHOCK = [
  { num: '$5.000.000', label: 'Costo mensual estimado de tener local propio' },
  { num: '195 hs', label: 'Horas de tu vida que consume un local por mes' },
  { num: '$60M', label: 'Lo que invertirías en 12 meses de local propio' },
  { num: '6+ meses', label: 'Para ver los primeros resultados de un local propio' },
];

export const COSTOS = [
  { item: 'Alquiler del local', dinero: '$1.500.000', tiempo: '0 hs', ye: '$0, incluido' },
  { item: 'Obra y mobiliario', dinero: '$4M a $8M (único)', tiempo: '0 hs', ye: '$0, incluido' },
  { item: 'Empleados / atención al cliente', dinero: '$1.200.000', tiempo: '80 hs', ye: '$0 · 0 hs · incluido' },
  { item: 'Impuestos y servicios', dinero: '$800.000', tiempo: '0 hs', ye: '$0, incluido' },
  { item: 'Redes y contenido', dinero: '$700.000', tiempo: '20 hs', ye: 'Incluido · 1 a 2 hs tuyas' },
  { item: 'Tienda online y pedidos', dinero: '$300.000', tiempo: '25 hs', ye: 'Incluido · 0 hs' },
  { item: 'Administración e informes', dinero: '$400.000', tiempo: '15 hs', ye: 'Incluido · 1 hs' },
  { item: 'Logística y entregas', dinero: '$300.000', tiempo: '20 hs', ye: 'Incluido · 0 hs' },
  { item: 'Diseño y capacitaciones', dinero: '$400.000', tiempo: '35 hs', ye: 'Incluido · 1 a 2 hs' },
];

export type Plan = {
  tag: string;
  nombre: string;
  precio: string;
  hook: string;
  beneficios: string[];
  cupo: string;
  cta: string;
  valorReal: string;
  ahorro: string;
  destacado?: boolean;
};

export const PLANES: Plan[] = [
  {
    tag: 'Primera Vidriera',
    nombre: 'Plan Impulso',
    precio: '$250.000',
    hook: '"Quiero que mi marca esté presente aunque yo no pueda estar."',
    beneficios: [
      'Tu marca exhibida en tienda física todos los días',
      '15 productos en tienda online, siempre disponibles',
      'Gestión de cobros y ventas: vos solo recibís el dinero',
      'Difusión en redes sociales de Yo Emprendedor',
      'Reporte mensual de ventas y rendimiento',
      'Calculadora de precios y rentabilidad',
      'Comunidad emprendedora y laboratorio de contenidos',
      'Punto de retiro para tus clientes',
    ],
    cupo: 'Cupos limitados por rubro',
    cta: 'Quiero empezar',
    valorReal: '$2.100.000',
    ahorro: '$1.850.000',
  },
  {
    tag: 'Tu Marca en Movimiento',
    nombre: 'Plan Crecimiento',
    precio: '$550.000',
    hook: '"Quiero que mi marca se vea profesional y llegue a más gente."',
    beneficios: [
      'Espacio preferencial de exhibición: mejor ubicación',
      '50 productos en tienda online: más catálogo, más ventas',
      'Gestión integral de ventas y cobranzas',
      '1 video exclusivo por mes en Instagram de Yo Emprendedor',
      '10 historias mensuales exclusivas de tu marca',
      'Guía estratégica de contenidos mensual',
      'Punto de retiro gratuito hasta 30 unidades/mes',
      'Reporte ampliado con análisis y mejoras concretas',
      'Herramientas de precios y rentabilidad',
    ],
    cupo: 'Solo 4 cupos disponibles por rubro este mes',
    cta: 'Quiero mi lugar',
    valorReal: '$3.750.000',
    ahorro: '$3.200.000',
    destacado: true,
  },
  {
    tag: 'Marca de Capital',
    nombre: 'Plan Expansión',
    precio: '$950.000',
    hook: '"Quiero posicionarme en capital y que me vean como una marca seria."',
    beneficios: [
      'Ubicación exclusiva al frente: máxima visibilidad',
      'Vidriera digital: tu marca en la TV de entrada',
      'Catálogo online ilimitado + banner principal',
      'Publicación en múltiples rubros',
      '1 video mensual + historias semanales destacadas',
      'Punto de retiro premium hasta 50 unidades/mes',
      '1 entrevista en podcast cada 3 meses',
      'Sesión de Expansión Comercial mensual (1 hora)',
      'Reporte estratégico + networking exclusivo',
      'Sello "Marca Destacada Yo Emprendedor"',
    ],
    cupo: 'Solo 2 espacios estratégicos disponibles',
    cta: 'Quiero posicionarme',
    valorReal: '$5.200.000',
    ahorro: '$4.250.000',
  },
];

export const TESTIMONIOS = [
  {
    iniciales: 'ST',
    cita: 'Yo Emprendedor me permitió llegar a nuevos clientes y darle mayor visibilidad a mi marca sin tener que abrir un local propio. Hoy siento que mi negocio tiene más oportunidades de crecer.',
    nombre: 'Silvia T.',
    marca: 'Vistiendo Tu Hogar',
    rol: '48 años · Trabaja en relación de dependencia · Mamá de un adolescente',
    vendido: '$9.573.000',
  },
  {
    iniciales: 'MA',
    cita: 'Para mí, Yo Emprendedor significó la posibilidad de expandir mi negocio sin abrir un local propio. Puedo llegar a más clientes mientras continúo con mi profesión y aprovecho mejor mi tiempo.',
    nombre: 'María Silvia A.',
    marca: 'Deco Sustentable',
    rol: '47 años · Abogada · Vive en Yerba Buena',
    vendido: '$3.396.000',
  },
  {
    iniciales: 'PD',
    cita: 'Yo Emprendedor me permitió mostrar mis productos de una manera diferente. Hoy mis clientas pueden ver, tocar y probarse las prendas antes de comprar, lo que genera más confianza y mejores resultados.',
    nombre: 'María Priscila D.',
    marca: 'Urban',
    rol: 'Abogada y emprendedora · Indumentaria para bailarinas urbanas',
    vendido: '$7.352.000',
  },
];

export const ROI = [
  { plan: 'Plan Impulso', ticket: '$15.000', ventas: '17', cadencia: '= 1 venta cada 2 días', precio: '$250.000/mes' },
  { plan: 'Plan Crecimiento', ticket: '$25.000', ventas: '22', cadencia: '= 5 a 6 ventas por semana', precio: '$550.000/mes', destacado: true },
  { plan: 'Plan Expansión', ticket: '$40.000', ventas: '24', cadencia: '= 6 ventas por semana', precio: '$950.000/mes' },
];

export const FAQS = [
  {
    q: '¿Voy a recuperar la inversión?',
    a: 'El plan Impulso se cubre con menos de una venta diaria dependiendo de tu ticket. Antes de entrar te mostramos el reporte histórico de rotación de tu rubro para que tomes la decisión con datos reales.',
  },
  {
    q: '¿Tengo que estar presente en la tienda?',
    a: 'No. Nos encargamos de atender, vender y cobrar. Vos solo reponés el producto cuando hace falta y revisás el reporte mensual.',
  },
  {
    q: '¿Qué pasa si no vendo lo suficiente el primer mes?',
    a: 'El primer mes es de aprendizaje conjunto. Analizamos qué funcionó, qué ajustar y te damos una devolución concreta con pasos específicos.',
  },
  {
    q: '¿Puedo cambiar de plan después?',
    a: 'Sí. Muchas marcas empiezan en Impulso y suben a Crecimiento cuando ven los primeros resultados. El cambio es simple y lo coordinamos juntos.',
  },
  {
    q: '¿Tengo que vivir en Tucumán capital?',
    a: 'No. Varias de nuestras emprendedoras viven en el interior de la provincia o en otras ciudades. Vos enviás el producto, nosotros gestionamos todo lo demás.',
  },
  {
    q: '¿Es mejor invertir ese dinero en publicidad?',
    a: 'La publicidad genera visitas. Yo Emprendedor genera ventas + presencia física + sistema + comunidad + contenido. No son excluyentes, pero la estructura que da un plan es algo que la publicidad sola no puede reemplazar.',
  },
];

export const RESUMEN = [
  {
    titulo: 'Presencia física en el corazón de San Miguel de Tucumán',
    texto: 'Ubicación privilegiada en una de las zonas más transitadas de la ciudad.',
  },
  {
    titulo: 'Canal digital de ventas',
    texto: 'Tienda online, gestión de cobros y logística incluidos en cada plan.',
  },
  {
    titulo: 'Visibilidad y contenido',
    texto: 'Difusión en redes, videos y estrategia de contenidos para que te conozcan.',
  },
  {
    titulo: 'Herramientas y comunidad',
    texto: 'Informes, asesoría comercial y una red de emprendedores para crecer juntos.',
  },
];
