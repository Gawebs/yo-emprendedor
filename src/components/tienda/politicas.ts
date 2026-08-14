/**
 * Textos institucionales y de politicas, tomados del documento que redacto
 * Anita ("informacion para ecommerce gabriel.docx", 13-ago-2026).
 *
 * No inventar clausulas aca: si falta un texto legal, la pagina lo dice en
 * vez de completarlo por su cuenta.
 */

export const ACTUALIZADO = '13 de agosto de 2026';

export type Bloque =
  | { tipo: 'parrafo'; texto: string }
  | { tipo: 'titulo'; texto: string }
  | { tipo: 'lista'; items: string[] }
  | { tipo: 'destacado'; texto: string };

export type Politica = {
  titulo: string;
  bajada?: string;
  actualizado?: string;
  bloques: Bloque[];
};

export const QUIENES_SOMOS: Politica = {
  titulo: '¿Quiénes somos?',
  bajada: 'Un ecosistema comercial colaborativo en San Miguel de Tucumán.',
  bloques: [
    { tipo: 'parrafo', texto: 'Somos Yo! Emprendedor Hub, una plataforma comercial colaborativa que conecta marcas, productos y personas en un mismo espacio, acercando lo mejor de los emprendimientos locales al público.' },
    { tipo: 'parrafo', texto: 'Creamos un espacio donde las marcas encuentran nuevas oportunidades para comercializar y crecer, y las personas pueden descubrir, conocer y comprar productos de diferentes marcas locales de manera simple, cercana y accesible.' },
    { tipo: 'parrafo', texto: 'Integramos comercio físico y digital, visibilidad, logística, información y comunidad, construyendo una estructura que permite reunir en un mismo lugar una amplia variedad de propuestas y facilitar el encuentro entre quienes producen y quienes buscan productos diferentes, originales y locales.' },
    { tipo: 'destacado', texto: 'Porque creemos que detrás de cada producto hay una historia, una idea y una persona que decidió emprender. Y que esas marcas merecen ser conocidas.' },
    { tipo: 'parrafo', texto: 'Por eso, Yo! Emprendedor Hub no es solamente una tienda ni un espacio donde se exhiben productos. Es un ecosistema comercial colaborativo que conecta a emprendedores con consumidores, reúne diferentes propuestas en un mismo lugar y genera oportunidades para que las marcas crezcan y para que más personas descubran lo que se produce y emprende localmente.' },
  ],
};

export const PILARES = [
  { n: '01', titulo: 'Local comercial', bajada: 'Una ubicación estratégica en el corazón de San Miguel de Tucumán.', texto: 'Un espacio físico donde las personas pueden conocer y comprar productos de diferentes marcas locales en un mismo lugar.' },
  { n: '02', titulo: 'Ventas presenciales y digitales', bajada: 'Dos formas de encontrarse con las marcas.', texto: 'La experiencia de conocer y comprar en el local se complementa con canales digitales que permiten descubrir productos y comprar de manera simple, desde cualquier lugar.' },
  { n: '03', titulo: 'Visibilidad y difusión', bajada: 'Más marcas llegando a más personas.', texto: 'Generamos acciones de comunicación y promoción para dar visibilidad a las marcas y acercar sus productos a nuevos públicos.' },
  { n: '04', titulo: 'Gestión de entregas', bajada: 'La compra continúa después del click.', texto: 'Integramos la gestión de pedidos, retiros y envíos a domicilio para facilitar la experiencia de compra.' },
  { n: '05', titulo: 'Información y acompañamiento', bajada: 'Una estructura que también ayuda a crecer.', texto: 'Brindamos seguimiento, información y herramientas que permiten a las marcas conocer mejor su actividad y tomar decisiones comerciales.' },
  { n: '06', titulo: 'Comunidad', bajada: 'Personas, marcas y oportunidades que se conectan.', texto: 'Construimos una comunidad donde emprendedores comparten experiencias, conocimientos y oportunidades, mientras el público descubre nuevas marcas y propuestas.' },
];

export const COMO_COMPRAR = [
  'Navegá por las categorías y hacé click sobre el producto que te interese.',
  'Seleccioná los detalles según corresponda y pulsá Agregar al carrito.',
  'Si querés sumar más productos, seguí navegando y repetí el proceso.',
  'Cuando termines, entrá al carrito desde el ícono de arriba a la derecha.',
  'Verificá que el pedido sea correcto y hacé click en Completar compra.',
  'Completá tus datos, elegí cómo lo recibís y con qué medio de pago.',
  'Te mantenemos al tanto del estado de tu pedido por email.',
];

export const ENVIOS: Politica = {
  titulo: 'Envíos y entregas',
  bajada: 'Modalidades, costos y plazos.',
  actualizado: ACTUALIZADO,
  bloques: [
    { tipo: 'titulo', texto: 'Retiro gratuito en el local' },
    { tipo: 'parrafo', texto: 'Podés retirar tu pedido sin costo en nuestro local de 24 de Septiembre 734, San Miguel de Tucumán, una vez que esté preparado. Te avisamos cuando puedas pasar a buscarlo.' },

    { tipo: 'titulo', texto: 'Envíos en San Miguel de Tucumán y alrededores' },
    { tipo: 'parrafo', texto: 'Realizamos envíos a domicilio en San Miguel de Tucumán y localidades cercanas. El plazo estimado es de 24 a 48 horas hábiles una vez preparado el pedido, y el costo depende del destino.' },

    { tipo: 'titulo', texto: 'Interior de Tucumán y otras provincias' },
    { tipo: 'parrafo', texto: 'Enviamos al interior de la provincia y al resto del país a través de operadores logísticos. Los plazos y costos dependen del operador y de la zona de cobertura.' },

    { tipo: 'titulo', texto: 'Envío gratis' },
    { tipo: 'destacado', texto: 'Las compras que superan los $200.000 en productos tienen envío gratis, según la zona de cobertura.' },

    { tipo: 'titulo', texto: 'Datos necesarios para el envío' },
    { tipo: 'parrafo', texto: 'Para poder despachar tu pedido necesitamos dirección completa, localidad, provincia, código postal y un teléfono de contacto. Si la información es incorrecta o incompleta y el pedido no puede entregarse, un nuevo envío puede generar costos adicionales, que te informamos antes de realizarlo.' },

    { tipo: 'titulo', texto: 'Modificar los datos de envío' },
    { tipo: 'parrafo', texto: 'Si necesitás cambiar los datos de entrega, comunicate con nosotros antes de que el pedido sea despachado. Una vez entregado al operador logístico, cualquier modificación queda sujeta a sus condiciones.' },

    { tipo: 'titulo', texto: 'Compras con productos de diferentes marcas' },
    { tipo: 'parrafo', texto: 'Como reunimos productos de distintos emprendimientos, un mismo pedido puede prepararse en tiempos diferentes. Te informamos cómo se coordina la entrega en cada caso.' },

    { tipo: 'titulo', texto: 'Daños durante el transporte' },
    { tipo: 'parrafo', texto: 'Si recibís un paquete con daños visibles, escribinos lo antes posible y conservá el packaging y los productos hasta que podamos evaluar la situación. Podemos pedirte fotografías para hacer el reclamo ante el operador logístico.' },
  ],
};

export const CAMBIOS: Politica = {
  titulo: 'Cambios y devoluciones',
  bajada: 'En qué casos podés cambiar un producto y cómo hacerlo.',
  actualizado: ACTUALIZADO,
  bloques: [
    { tipo: 'parrafo', texto: 'En Yo Emprendedor queremos que tu experiencia de compra sea simple, clara y segura. Esta política explica en qué situaciones podés solicitar un cambio, cuáles son las condiciones y qué sucede con los costos de envío.' },

    { tipo: 'titulo', texto: 'Plazo para solicitar un cambio' },
    { tipo: 'parrafo', texto: 'Tenés quince días corridos desde que recibís el producto para solicitar un cambio por decisión propia. Para iniciarlo, escribinos dentro de ese plazo por WhatsApp o por email indicando nombre y apellido, número de pedido, producto a cambiar, motivo y fotografías cuando sean necesarias.' },

    { tipo: 'titulo', texto: 'Condiciones' },
    { tipo: 'parrafo', texto: 'Para que un producto pueda cambiarse debe:' },
    { tipo: 'lista', items: [
      'Encontrarse sin uso.',
      'Mantenerse en las mismas condiciones en que fue recibido.',
      'Conservar etiquetas, packaging y accesorios, cuando corresponda.',
      'No presentar manchas, daños, modificaciones, olores ni señales de uso.',
      'Contar con el comprobante de compra o información suficiente para identificar la operación.',
    ] },

    { tipo: 'titulo', texto: 'Productos con condiciones especiales' },
    { tipo: 'parrafo', texto: 'Por la diversidad de productos que reunimos, algunos artículos pueden no admitir cambios por razones de higiene, seguridad, personalización o fabricación a pedido, salvo que presenten una falla o no correspondan con lo comprado. Estas condiciones se informan en la descripción del producto o antes de finalizar la compra.' },

    { tipo: 'titulo', texto: 'Cambio por otro producto' },
    { tipo: 'parrafo', texto: 'Si querés otro producto, modelo, color o talle, el cambio está sujeto a disponibilidad de stock. Si el nuevo producto vale más, se abona la diferencia; si vale menos, se genera un saldo a favor o se realiza la devolución que corresponda.' },

    { tipo: 'titulo', texto: 'Costos de envío en los cambios' },
    { tipo: 'parrafo', texto: 'Cuando el cambio es por decisión del cliente, los costos de traslado pueden quedar a su cargo, y te los informamos antes. Cuando se debe a un error nuestro, a un producto defectuoso o distinto del comprado, los asumimos nosotros.' },

    { tipo: 'titulo', texto: 'Productos artesanales' },
    { tipo: 'parrafo', texto: 'Muchos de nuestros productos son artesanales. Pequeñas diferencias de color, textura, terminación o medidas pueden ser propias del producto y no constituyen un defecto. Cuando una característica es propia, procuramos informarla en la descripción.' },

    { tipo: 'titulo', texto: 'Derecho de arrepentimiento' },
    { tipo: 'parrafo', texto: 'En las compras a distancia podés contar con el derecho de arrepentimiento previsto por la normativa argentina de defensa del consumidor, cuando resulte aplicable. Es distinto de un cambio voluntario por color, talle o modelo, y podés ejercerlo a través de nuestros canales oficiales.' },
  ],
};

export const GIFT_CARD: Politica = {
  titulo: 'Gift Card',
  bajada: 'Regalá una experiencia de compra entre todas nuestras marcas.',
  actualizado: ACTUALIZADO,
  bloques: [
    { tipo: 'parrafo', texto: 'La Gift Card de Yo Emprendedor permite regalar una experiencia de compra y elegir entre productos de las diferentes marcas que forman parte de la plataforma. Se puede usar tanto en el local como en la tienda online.' },

    { tipo: 'titulo', texto: '¿Dónde puedo usarla?' },
    { tipo: 'lista', items: [
      'En el local de 24 de Septiembre 734, San Miguel de Tucumán.',
      'En la tienda online.',
      'Para comprar productos de cualquiera de las marcas participantes.',
    ] },
    { tipo: 'parrafo', texto: 'No está asociada a una marca determinada: podés elegir entre todas las propuestas disponibles.' },

    { tipo: 'titulo', texto: 'Vigencia' },
    { tipo: 'destacado', texto: 'La Gift Card tiene una vigencia de 30 días hábiles desde la fecha de compra. Pasado ese plazo, el saldo queda vencido.' },

    { tipo: 'titulo', texto: 'Uso parcial' },
    { tipo: 'parrafo', texto: 'Podés usarla en una o varias compras mientras esté vigente. Si comprás por menos del saldo disponible, el resto queda a favor para una próxima compra. Por ejemplo: con una Gift Card de $50.000 y una primera compra de $32.000, quedan $18.000 disponibles.' },

    { tipo: 'titulo', texto: 'Compras superiores al saldo' },
    { tipo: 'parrafo', texto: 'Si la compra supera el saldo, usás todo lo disponible y abonás la diferencia con otro medio de pago. Por ejemplo: con $30.000 de saldo y una compra de $42.000, abonás $12.000.' },

    { tipo: 'titulo', texto: 'No cubre envíos' },
    { tipo: 'parrafo', texto: 'La Gift Card sirve exclusivamente para comprar productos. No puede usarse para pagar envíos a domicilio, costos de logística ni otros cargos de entrega, que se abonan con alguno de los medios de pago habilitados.' },

    { tipo: 'titulo', texto: 'No se combina con promociones' },
    { tipo: 'parrafo', texto: 'La Gift Card no puede combinarse con promociones, descuentos u otros beneficios, salvo que se indique expresamente lo contrario. Si un producto está alcanzado por una promoción vigente, se aplica la condición de esa promoción.' },
  ],
};

export const FORMAS_DE_PAGO: Politica = {
  titulo: 'Formas de pago',
  bajada: 'Con qué podés pagar tu compra.',
  actualizado: ACTUALIZADO,
  bloques: [
    { tipo: 'parrafo', texto: 'Ofrecemos distintas alternativas para que elijas la que mejor se adapte a tu compra. Los medios disponibles pueden variar según el canal, las condiciones de la operación y las promociones vigentes.' },

    { tipo: 'titulo', texto: 'Mercado Pago' },
    { tipo: 'parrafo', texto: 'Las compras online se abonan mediante Mercado Pago, que permite pagar con tarjeta de crédito, tarjeta de débito, dinero disponible en cuenta y cuotas sin tarjeta cuando esa opción esté habilitada. Las opciones concretas se muestran al momento de pagar.' },

    { tipo: 'titulo', texto: 'Transferencia bancaria' },
    { tipo: 'parrafo', texto: 'También podés pagar por transferencia. Una vez realizada, hay que informar el comprobante. El pedido queda confirmado cuando verificamos la acreditación del pago, no con el envío del comprobante.' },

    { tipo: 'titulo', texto: 'Efectivo' },
    { tipo: 'parrafo', texto: 'Podés pagar en efectivo al retirar por el local, o contra entrega cuando el pedido va a tu domicilio.' },

    { tipo: 'destacado', texto: 'Pagando por transferencia o en efectivo tenés 10% de descuento. Con tarjeta, hasta 3 cuotas sin interés.' },
  ],
};

/**
 * Terminos y condiciones y politica de privacidad no estan en el documento.
 * La pagina lo dice abiertamente en vez de mostrar clausulas inventadas, que
 * en un sitio que cobra seria peor que no tener nada.
 */
export const SIN_REDACTAR = ['terminos', 'privacidad'] as const;
