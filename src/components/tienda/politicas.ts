/**
 * Textos institucionales y de politicas, tomados del documento que redacto
 * Anita ("informacion para ecommerce gabriel.docx", 13-ago-2026).
 *
 * Van completos, con todas las secciones del original: en un sitio que cobra,
 * lo que dice la pagina es lo que obliga si alguien reclama, y resumir puede
 * dejar afuera justo la clausula que protege al negocio.
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

/** Las preguntas tal como las escribio Anita en su documento de FAQ. */
export const PREGUNTAS: { q: string; a: string }[] = [
  {
    q: '¿Necesito crear una cuenta para comprar?',
    a: 'Sí. Para completar una compra es necesario estar registrado, con tu nombre, email y teléfono. El registro es gratuito y no te obliga a comprar; podés crear tu cuenta en el mismo momento de finalizar el pedido.',
  },
  {
    q: '¿Es seguro comprar en Yo Emprendedor?',
    a: 'Sí. Tus pagos se procesan a través de plataformas seguras como Mercado Pago, y no almacenamos los datos completos de tu tarjeta.',
  },
  {
    q: '¿Los productos son de una sola marca?',
    a: 'No. Reunimos productos de distintos emprendimientos locales en un mismo catálogo.',
  },
  {
    q: '¿Puedo comprar productos de varias marcas en un mismo pedido?',
    a: 'Sí. Podés agregar productos de diferentes marcas a un mismo carrito. Hacés un único pago y recibís un único pedido — nosotros coordinamos internamente con cada emprendimiento.',
  },
  {
    q: '¿Voy a recibir una sola factura o varias?',
    a: 'Depende de cómo facture cada marca sus productos. Un pago único no siempre significa un único comprobante: a veces vas a recibir más de una factura para la misma compra.',
  },
  {
    q: '¿Puedo hacer seguimiento de mi pedido?',
    a: 'Sí. Te mantenemos al tanto del estado de tu pedido por email, y cuando el envío cuente con seguimiento del operador logístico, te compartimos esa información también.',
  },
  {
    q: '¿Puedo cancelar un pedido después de confirmarlo?',
    a: 'Sí. Tenés 10 días corridos desde que recibís tu compra para ejercer el derecho de arrepentimiento, sin necesidad de justificar el motivo, a través del Botón de arrepentimiento visible en el sitio.',
  },
  {
    q: '¿Puedo retirar sin pagar envío?',
    a: 'Sí. El retiro en nuestro local de 24 de Septiembre 734, San Miguel de Tucumán, es sin costo. Te avisamos cuando el pedido esté preparado.',
  },
  {
    q: '¿Qué pasa si un producto que compré ya no tiene stock?',
    a: 'Te contactamos para contarte la situación y ver la alternativa: sustitución, cancelación o reintegro del importe.',
  },
  {
    q: '¿Las fotos son exactamente iguales al producto que voy a recibir?',
    a: 'Procuramos que sí, aunque pueden existir pequeñas diferencias de color o terminación por la iluminación, la pantalla, o por tratarse de productos artesanales con variaciones propias de su elaboración.',
  },
];

export const ENVIOS: Politica = {
  titulo: 'Envíos y entregas',
  bajada: 'Modalidades, costos, plazos y qué pasa en cada caso.',
  actualizado: ACTUALIZADO,
  bloques: [
    { tipo: 'titulo', texto: '1. Retiro gratuito en el local' },
    { tipo: 'parrafo', texto: 'Podés retirar tu pedido sin costo en nuestro local de 24 de Septiembre 734, San Miguel de Tucumán, una vez que esté preparado. Te avisamos cuando puedas pasar a buscarlo.' },

    { tipo: 'titulo', texto: '2. Envíos en San Miguel de Tucumán y alrededores' },
    { tipo: 'parrafo', texto: 'Realizamos entregas a domicilio en San Miguel de Tucumán y localidades cercanas, incluyendo:' },
    { tipo: 'lista', items: ['San Miguel de Tucumán', 'Las Talitas', 'Tafí Viejo', 'Yerba Buena', 'El Manantial', 'La Banda del Río Salí'] },
    { tipo: 'parrafo', texto: 'Los envíos se realizan mediante una empresa de logística seleccionada por Yo Emprendedor. El costo depende de la zona de destino y de las tarifas vigentes del operador, y se informa al momento de la compra, antes de finalizar el pedido.' },
    { tipo: 'parrafo', texto: 'El tiempo estimado para los envíos locales es de 24 a 48 horas hábiles, una vez confirmado el pago y preparado el pedido. Este plazo puede estar sujeto a las condiciones y cobertura del operador logístico.' },

    { tipo: 'titulo', texto: '3. Envíos al interior de Tucumán' },
    { tipo: 'parrafo', texto: 'Realizamos envíos a diferentes localidades del interior de la provincia. La disponibilidad depende de la cobertura de la empresa de logística seleccionada, y el costo se determina según sus tarifas vigentes considerando:' },
    { tipo: 'lista', items: ['Localidad de destino.', 'Peso del pedido.', 'Dimensiones del paquete.', 'Modalidad de entrega.', 'Condiciones del servicio contratado.'] },
    { tipo: 'parrafo', texto: 'El costo se informa antes de finalizar la compra. Cuando el servicio lo permita, vas a recibir información de seguimiento para consultar el estado del pedido.' },

    { tipo: 'titulo', texto: '4. Envíos a otras provincias' },
    { tipo: 'parrafo', texto: 'También enviamos a diferentes localidades del país. Los pedidos se preparan y despachan desde San Miguel de Tucumán mediante el operador logístico disponible para cada destino. El costo depende de la provincia y localidad, el peso, las dimensiones, la modalidad de entrega y las tarifas vigentes, y se informa antes de confirmar la compra.' },

    { tipo: 'titulo', texto: '5. Envío gratis' },
    { tipo: 'destacado', texto: 'Las compras que superan los $200.000 en productos tienen envío gratis, según la zona de cobertura.' },

    { tipo: 'titulo', texto: '6. ¿Cómo se calcula el costo del envío?' },
    { tipo: 'parrafo', texto: 'El costo puede variar según:' },
    { tipo: 'lista', items: ['Lugar de destino.', 'Distancia.', 'Peso del pedido.', 'Tamaño o volumen del paquete.', 'Tipo de servicio seleccionado.', 'Tarifas vigentes de la empresa de logística.'] },
    { tipo: 'parrafo', texto: 'Por eso no contamos con una tarifa única para todos los destinos. El costo correspondiente se informa durante el proceso de compra, antes de confirmar el pedido.' },

    { tipo: 'titulo', texto: '7. Preparación del pedido' },
    { tipo: 'parrafo', texto: 'Los pedidos comienzan a prepararse una vez confirmado el pago. El tiempo de preparación puede variar según la disponibilidad de los productos, la cantidad de artículos, sus características, la cantidad de marcas involucradas y la modalidad de entrega elegida.' },
    { tipo: 'parrafo', texto: 'Una vez preparado: si elegiste retiro en el local, te avisamos cuando esté disponible; si elegiste envío, se entrega al operador logístico correspondiente.' },

    { tipo: 'titulo', texto: '8. Seguimiento del envío' },
    { tipo: 'parrafo', texto: 'Cuando la empresa de logística cuente con servicio de seguimiento, vas a recibir la información para consultar el estado de tu pedido. El sistema puede variar según el operador. Yo Emprendedor procura brindarte la información disponible sobre el estado de tu pedido.' },

    { tipo: 'titulo', texto: '9. Compras con productos de diferentes marcas' },
    { tipo: 'parrafo', texto: 'Como reunimos productos de distintas marcas y emprendimientos, una misma compra puede incluir productos de varias de ellas, y prepararse en tiempos diferentes. Te informamos cómo se coordina la entrega en cada caso.' },

    { tipo: 'titulo', texto: '10. Datos necesarios para realizar el envío' },
    { tipo: 'parrafo', texto: 'Para poder despachar tu pedido necesitamos dirección completa, localidad, provincia, código postal y un teléfono de contacto. Es importante que los datos sean correctos: si el pedido no puede entregarse por información incorrecta o incompleta, un nuevo envío puede generar costos adicionales.' },

    { tipo: 'titulo', texto: '11. ¿Qué sucede si no hay nadie en el domicilio?' },
    { tipo: 'parrafo', texto: 'Si al momento de la entrega no hay nadie para recibir el pedido, se aplican las condiciones de la empresa de logística responsable. Según el operador y el servicio contratado, pueden existir alternativas como:' },
    { tipo: 'lista', items: ['Un nuevo intento de entrega.', 'Retiro del pedido en una sucursal o punto de entrega.', 'Contacto con el destinatario.', 'Devolución del pedido al remitente.'] },

    { tipo: 'titulo', texto: '12. Demoras en la entrega' },
    { tipo: 'parrafo', texto: 'Los tiempos informados son estimativos y pueden verse afectados por circunstancias ajenas a Yo Emprendedor, entre ellas:' },
    { tipo: 'lista', items: ['Demoras del operador logístico.', 'Alta demanda.', 'Feriados y días no laborables.', 'Condiciones climáticas.', 'Problemas de acceso a determinadas localidades.', 'Datos incorrectos o incompletos del destinatario.', 'Situaciones excepcionales o de fuerza mayor.'] },
    { tipo: 'parrafo', texto: 'Si se produce una demora, procuramos brindarte asistencia y hacer el seguimiento con el operador logístico.' },

    { tipo: 'titulo', texto: '13. Entregas en zonas de difícil acceso' },
    { tipo: 'parrafo', texto: 'La disponibilidad de entrega puede variar según la localidad, el domicilio y la cobertura del operador. En determinadas zonas puede establecer condiciones especiales o entregar en una sucursal o punto de retiro. Cuando corresponda, te lo comunicamos.' },

    { tipo: 'titulo', texto: '14. Pedidos con diferentes modalidades de entrega' },
    { tipo: 'parrafo', texto: 'Cada pedido debe contar con una modalidad de entrega seleccionada, entre las que figuren en la tienda al momento de comprar: retiro en el local sin costo, o envío a domicilio con costo según destino y características del pedido. Cuando una modalidad no esté disponible para una localidad, te informamos las alternativas.' },

    { tipo: 'titulo', texto: '15. Pedidos con envío gratis' },
    { tipo: 'parrafo', texto: 'Cuando la compra alcanza el mínimo de $200.000 en productos, el beneficio se aplica automáticamente según la zona de cobertura. No puede utilizarse para destinos o modalidades fuera de la cobertura establecida.' },

    { tipo: 'titulo', texto: '16. Modificación de los datos de envío' },
    { tipo: 'parrafo', texto: 'Si necesitás cambiar los datos de entrega, comunicate con nosotros antes de que el pedido sea despachado. Una vez entregado al operador logístico, cualquier modificación queda sujeta a sus posibilidades y condiciones.' },

    { tipo: 'titulo', texto: '17. Dirección incorrecta' },
    { tipo: 'parrafo', texto: 'Si el pedido no puede entregarse por información incorrecta o incompleta, las condiciones para un nuevo envío dependen del operador logístico. Si hace falta generar uno nuevo, pueden surgir costos adicionales, que te informamos antes de realizarlo.' },

    { tipo: 'titulo', texto: '18. Productos faltantes o inconvenientes con el pedido' },
    { tipo: 'parrafo', texto: 'Si al recibir el pedido detectás que falta un producto o hay algún inconveniente, comunicate lo antes posible. Vamos a necesitar:' },
    { tipo: 'lista', items: ['Número de pedido.', 'Datos del comprador.', 'Descripción del inconveniente.', 'Fotografías o información adicional cuando sea necesario.'] },

    { tipo: 'titulo', texto: '19. Daños durante el transporte' },
    { tipo: 'parrafo', texto: 'Si recibís un paquete con daños visibles, escribinos lo antes posible y conservá el packaging y los productos hasta que podamos evaluar la situación. Podemos pedirte fotografías del paquete, el embalaje y los productos para hacer el reclamo ante el operador logístico.' },

    { tipo: 'titulo', texto: '20. Contacto' },
    { tipo: 'parrafo', texto: 'Si tenés dudas sobre tu envío, escribinos a info@yoemprendedortienda.com o pasá por 24 de Septiembre 734, San Miguel de Tucumán.' },
  ],
};

/** Tabla resumen del documento, para la pagina de envios. */
export const RESUMEN_ENVIOS = [
  { modalidad: 'Retiro en el local', cobertura: 'San Miguel de Tucumán', costo: 'Gratis', tiempo: 'Una vez preparado el pedido' },
  { modalidad: 'Envío local', cobertura: 'San Miguel y alrededores', costo: 'Según operador', tiempo: '24–48 h hábiles' },
  { modalidad: 'Interior de Tucumán', cobertura: 'Localidades con cobertura', costo: 'Según operador', tiempo: 'Según operador' },
  { modalidad: 'Otras provincias', cobertura: 'Según cobertura nacional', costo: 'Según operador', tiempo: 'Según operador' },
  { modalidad: 'Envío gratis', cobertura: 'Compras ≥ $200.000', costo: 'Gratis', tiempo: 'Según zona' },
];

export const CAMBIOS: Politica = {
  titulo: 'Cambios y devoluciones',
  bajada: 'En qué casos podés cambiar un producto, con qué condiciones y cómo hacerlo.',
  actualizado: ACTUALIZADO,
  bloques: [
    { tipo: 'parrafo', texto: 'En Yo Emprendedor queremos que tu experiencia de compra sea simple, clara y segura. Por eso establecemos esta Política de Cambios, que explica en qué situaciones podés solicitar un cambio, cuáles son las condiciones, cómo realizar la solicitud y qué sucede con los costos de envío. Se aplica a las compras realizadas a través de los canales oficiales de Yo Emprendedor, incluyendo nuestra tienda online.' },

    { tipo: 'titulo', texto: '1. ¿Puedo cambiar un producto?' },
    { tipo: 'parrafo', texto: 'Sí. Si realizaste una compra y necesitás cambiar el producto, podés solicitar un cambio siempre que se cumplan las condiciones establecidas en esta política. Los productos deben encontrarse en las condiciones requeridas para poder ser aceptados.' },

    { tipo: 'titulo', texto: '2. Plazo para solicitar un cambio' },
    { tipo: 'parrafo', texto: 'Disponés de quince días corridos desde la recepción del producto para solicitar un cambio por decisión propia. Para iniciarlo, comunicate dentro de ese plazo por WhatsApp al 3812146172 o por correo a info@yoemprendedortienda.com, indicando:' },
    { tipo: 'lista', items: ['Nombre y apellido.', 'Número de pedido.', 'Producto que querés cambiar.', 'Motivo del cambio.', 'Fotografías del producto, cuando sean necesarias.'] },

    { tipo: 'titulo', texto: '3. Condiciones para realizar un cambio' },
    { tipo: 'parrafo', texto: 'Para que un producto pueda ser cambiado deberá:' },
    { tipo: 'lista', items: [
      'Encontrarse sin uso.',
      'Mantenerse en las mismas condiciones en las que fue recibido.',
      'Conservar etiquetas, packaging, accesorios y elementos que lo acompañen, cuando corresponda.',
      'No presentar manchas, daños, modificaciones, olores, deterioro o señales de uso.',
      'Contar con el comprobante de compra o información suficiente para identificar la operación.',
    ] },

    { tipo: 'titulo', texto: '4. Productos que pueden tener condiciones especiales' },
    { tipo: 'parrafo', texto: 'Por la diversidad de productos que comercializamos, determinados artículos pueden contar con condiciones particulares. Por ejemplo, productos que por razones de higiene, seguridad, personalización, fabricación a pedido o características propias no admitan cambios una vez entregados, salvo que presenten una falla, defecto o no correspondan con lo comprado. Estas condiciones se informan en la descripción del producto o antes de finalizar la compra.' },

    { tipo: 'titulo', texto: '5. Cambio por otro producto' },
    { tipo: 'parrafo', texto: 'Cuando el cambio se solicite porque querés otro producto, modelo, color, tamaño o variante, estará sujeto a la disponibilidad de stock. Si el nuevo producto tiene un valor superior, deberá abonarse la diferencia. Si tiene un valor inferior, se podrá generar un saldo a favor o realizar la devolución correspondiente.' },

    { tipo: 'titulo', texto: '6. Costos de envío en los cambios' },
    { tipo: 'parrafo', texto: 'Cuando el cambio se solicite por decisión del cliente —cambio de color, modelo, tamaño o elección de otro producto—, los costos de traslado podrán quedar a su cargo, y te los informamos antes de realizarlo. Cuando el cambio se deba a un error de Yo Emprendedor, a un producto defectuoso, dañado o diferente del comprado, los costos los asumimos nosotros, de acuerdo con la normativa aplicable.' },

    { tipo: 'titulo', texto: '7. Producto recibido incorrectamente' },
    { tipo: 'parrafo', texto: 'Si recibiste un producto diferente al que compraste, comunicate dentro del plazo establecido e indicá el número de pedido, el producto recibido, el producto que figuraba en la compra y fotografías del producto y su packaging. Verificamos la situación y te indicamos cómo proceder; si se comprueba un error en la preparación, coordinamos la solución correspondiente.' },

    { tipo: 'titulo', texto: '8. Producto dañado o con una falla' },
    { tipo: 'parrafo', texto: 'Si el producto llega dañado, presenta una falla o un defecto que no fue informado previamente, comunicate lo antes posible. Te recomendamos conservar el packaging y el producto tal como fue recibido hasta que podamos evaluar el caso. Podemos solicitar fotografías, videos u otra información para analizar la situación, y una vez evaluado se determina la solución según la naturaleza del inconveniente y la normativa vigente.' },

    { tipo: 'titulo', texto: '9. Productos artesanales o con características particulares' },
    { tipo: 'parrafo', texto: 'Comercializamos productos de diferentes marcas y emprendimientos, algunos artesanales o elaborados de manera particular. Pequeñas diferencias de color, textura, terminación, medidas o apariencia pueden formar parte de sus características propias y no necesariamente constituyen un defecto. Cuando una característica sea propia del producto, procuramos informarla en su descripción.' },

    { tipo: 'titulo', texto: '10. Compras realizadas en el local físico' },
    { tipo: 'parrafo', texto: 'Los cambios de compras realizadas presencialmente se rigen por las condiciones informadas al momento de la compra y por la normativa aplicable. Para solicitarlos será necesario presentar el comprobante o la información que permita identificar la operación.' },

    { tipo: 'titulo', texto: '11. Compras realizadas a través de la tienda online' },
    { tipo: 'parrafo', texto: 'Para las compras online, el cliente recibe la información necesaria para identificar la operación y puede comunicarse con nosotros para iniciar una solicitud de cambio. El proceso puede variar según el producto, la marca, el tipo de cambio solicitado y la forma de entrega.' },

    { tipo: 'titulo', texto: '12. Derecho de arrepentimiento' },
    { tipo: 'parrafo', texto: 'En las compras a distancia, el consumidor puede contar con el derecho de arrepentimiento previsto por la normativa argentina de defensa del consumidor, cuando resulte aplicable. Es diferente de un cambio voluntario por color, talle, modelo u otro producto, y puede solicitarse a través de nuestros canales oficiales de contacto.' },

    { tipo: 'titulo', texto: '13. Productos personalizados o realizados a pedido' },
    { tipo: 'parrafo', texto: 'Los productos personalizados, confeccionados especialmente o realizados a pedido pueden tener condiciones particulares respecto de cambios y devoluciones, que se informan antes de finalizar la compra cuando corresponda. Esto no afecta los derechos que correspondan al consumidor cuando el producto presente defectos, no sea el solicitado o exista un incumplimiento atribuible al vendedor.' },

    { tipo: 'titulo', texto: '14. Stock y disponibilidad' },
    { tipo: 'parrafo', texto: 'Todo cambio está sujeto a la disponibilidad del producto solicitado. Si el producto elegido no se encuentra disponible, podemos ofrecer alternativas, generar un crédito o saldo a favor, o gestionar la solución que corresponda según el caso y la normativa aplicable.' },

    { tipo: 'titulo', texto: '15. ¿Cómo iniciar un cambio?' },
    { tipo: 'lista', items: [
      'Comunicate con Yo Emprendedor dentro del plazo correspondiente.',
      'Indicá tu nombre, número de pedido y producto que querés cambiar.',
      'Explicá brevemente el motivo del cambio.',
      'Enviá fotografías cuando sean solicitadas.',
      'Esperá nuestra confirmación antes de enviar o entregar el producto.',
      'Una vez aprobado, te informamos el procedimiento, punto de entrega o modalidad de envío.',
    ] },
    { tipo: 'parrafo', texto: 'No recomendamos enviar productos por cuenta propia sin haber recibido previamente las instrucciones de Yo Emprendedor.' },

    { tipo: 'titulo', texto: '16. Evaluación del producto' },
    { tipo: 'parrafo', texto: 'Una vez recibido el producto podemos verificar que cumpla con las condiciones establecidas en esta política. Si no las cumple, podemos rechazar el cambio y devolver el artículo al cliente, informando previamente la situación.' },

    { tipo: 'titulo', texto: '17. Responsabilidad de las marcas' },
    { tipo: 'parrafo', texto: 'Yo Emprendedor trabaja con diferentes marcas y emprendimientos que comercializan sus productos a través de nuestra plataforma. La gestión de cambios se canaliza inicialmente a través de nosotros, procurando brindar una experiencia simple al cliente. Cuando resulte necesario, coordinamos la solución con la marca responsable del producto.' },

    { tipo: 'titulo', texto: '18. Contacto' },
    { tipo: 'parrafo', texto: 'Para consultas o para iniciar una solicitud de cambio: info@yoemprendedortienda.com, o 24 de Septiembre 734, San Miguel de Tucumán, Tucumán, Argentina. Asunto sugerido: "Solicitud de cambio – Pedido N.º [número]".' },

    { tipo: 'destacado', texto: 'Esta Política de Cambios forma parte de las condiciones de compra de Yo Emprendedor y podrá actualizarse cuando resulte necesario para reflejar cambios en nuestros servicios, productos o normativa aplicable. La versión vigente estará publicada en nuestro sitio web.' },
  ],
};

export const GIFT_CARD: Politica = {
  titulo: 'Gift Card',
  bajada: 'Regalá una experiencia de compra entre todas nuestras marcas.',
  actualizado: ACTUALIZADO,
  bloques: [
    { tipo: 'parrafo', texto: 'La Gift Card de Yo Emprendedor permite regalar una experiencia de compra y elegir entre productos de las diferentes marcas que forman parte de la plataforma. Puede utilizarse tanto en nuestra tienda física como en la tienda online, de acuerdo con las condiciones que siguen.' },

    { tipo: 'titulo', texto: '1. ¿Dónde puedo utilizar mi Gift Card?' },
    { tipo: 'lista', items: [
      'En el local físico de Yo Emprendedor.',
      'En la tienda online.',
      'Para adquirir productos de cualquiera de las marcas participantes.',
    ] },
    { tipo: 'parrafo', texto: 'No está asociada a una marca determinada: podés elegir entre las diferentes propuestas disponibles.' },

    { tipo: 'titulo', texto: '2. Vigencia' },
    { tipo: 'destacado', texto: 'La Gift Card tiene una vigencia de 30 días hábiles desde la fecha de compra. Pasado ese plazo, el saldo disponible queda vencido. La fecha de compra y la fecha límite son las que figuran en el comprobante correspondiente.' },

    { tipo: 'titulo', texto: '3. Uso parcial de la Gift Card' },
    { tipo: 'parrafo', texto: 'Puede utilizarse en una o varias compras, siempre dentro de su período de vigencia. Si el importe de una compra es inferior al valor disponible, queda un saldo a favor para una próxima compra. Por ejemplo: con una Gift Card de $50.000 y una primera compra de $32.000, quedan $18.000 para usar antes del vencimiento.' },

    { tipo: 'titulo', texto: '4. Compras superiores al saldo disponible' },
    { tipo: 'parrafo', texto: 'Si el valor de la compra supera el saldo, podés utilizar la totalidad disponible y abonar la diferencia con otro medio de pago habilitado. Por ejemplo: con $30.000 de saldo y una compra de $42.000, abonás $12.000.' },

    { tipo: 'titulo', texto: '5. La Gift Card no puede utilizarse para pagar envíos' },
    { tipo: 'parrafo', texto: 'Sirve exclusivamente para la compra de productos. No puede utilizarse para abonar envíos a domicilio, costos de logística ni otros cargos asociados a la entrega, que deberán abonarse mediante alguno de los medios de pago habilitados.' },

    { tipo: 'titulo', texto: '6. Gift Card y promociones' },
    { tipo: 'parrafo', texto: 'No puede combinarse con promociones, descuentos u otros beneficios promocionales, salvo que Yo Emprendedor indique expresamente lo contrario. Si un producto está alcanzado por una promoción vigente, se aplica la condición comercial correspondiente según las reglas de esa promoción.' },

    { tipo: 'titulo', texto: '7. Pérdida o extravío del código' },
    { tipo: 'parrafo', texto: 'La Gift Card posee un código único que permite identificarla y utilizar su saldo. En caso de pérdida o extravío, el titular deberá comunicarse con nosotros. Para solicitar la recuperación podemos requerir:' },
    { tipo: 'lista', items: [
      'Factura o comprobante de compra.',
      'Nombre de la persona que realizó la compra.',
      'Fecha aproximada de compra.',
      'Medio de pago utilizado.',
      'Otros datos que permitan verificar la operación.',
    ] },
    { tipo: 'parrafo', texto: 'La recuperación del código queda sujeta a la posibilidad de identificar y verificar correctamente la compra.' },

    { tipo: 'titulo', texto: '8. Cambios y devoluciones de productos adquiridos con Gift Card' },
    { tipo: 'parrafo', texto: 'Las compras realizadas con Gift Card están sujetas a la misma Política de Cambios y condiciones aplicables al resto de las compras.' },

    { tipo: 'titulo', texto: '9. Consulta de saldo' },
    { tipo: 'parrafo', texto: 'El saldo disponible puede consultarse a través de nuestros canales de atención. Para hacerlo será necesario proporcionar el código o los datos que permitan identificar la Gift Card.' },

    { tipo: 'titulo', texto: '10. Transferencia de la Gift Card' },
    { tipo: 'parrafo', texto: 'Puede ser entregada a otra persona para su utilización. Una vez emitida, no puede modificarse su valor original, salvo que corresponda a una operación autorizada por Yo Emprendedor.' },

    { tipo: 'titulo', texto: '11. Uso en diferentes marcas' },
    { tipo: 'parrafo', texto: 'Uno de los principales beneficios es que permite elegir entre productos de las diferentes marcas de la plataforma. El beneficiario no necesita seleccionar previamente una marca: puede usar el saldo para comprar lo que prefiera dentro de la oferta vigente.' },

    { tipo: 'titulo', texto: '12. Condiciones de uso' },
    { tipo: 'parrafo', texto: 'La utilización de la Gift Card implica la aceptación de estas condiciones. La Gift Card:' },
    { tipo: 'lista', items: [
      'Tiene una vigencia de 30 días hábiles.',
      'Puede utilizarse en el local físico y en la tienda online.',
      'Puede utilizarse en una o varias compras.',
      'Permite comprar productos de las diferentes marcas participantes.',
      'No puede utilizarse para pagar envíos.',
      'No puede combinarse con promociones o descuentos.',
      'Si la compra supera el saldo disponible, la diferencia se abona por otro medio de pago.',
      'El saldo restante debe utilizarse antes de la fecha de vencimiento.',
      'En caso de pérdida del código, puede solicitarse su identificación presentando información que permita verificar la compra.',
    ] },

    { tipo: 'titulo', texto: '13. Contacto' },
    { tipo: 'parrafo', texto: 'Para consultas relacionadas con una Gift Card: info@yoemprendedortienda.com, o 24 de Septiembre 734, San Miguel de Tucumán, Tucumán, Argentina. Asunto sugerido: "Consulta Gift Card".' },
  ],
};

export const FORMAS_DE_PAGO: Politica = {
  titulo: 'Formas de pago',
  bajada: 'Con qué podés pagar tu compra.',
  actualizado: ACTUALIZADO,
  bloques: [
    { tipo: 'parrafo', texto: 'Ofrecemos diferentes alternativas de pago para que cada cliente elija la que mejor se adapte a su compra. Los medios disponibles pueden variar según el canal de compra, las condiciones de la operación y las promociones vigentes.' },

    { tipo: 'titulo', texto: '1. Mercado Pago' },
    { tipo: 'parrafo', texto: 'Las compras online pueden abonarse mediante Mercado Pago, utilizando los medios habilitados en nuestra tienda. Según la configuración disponible, permite pagar con:' },
    { tipo: 'lista', items: [
      'Tarjetas de crédito.',
      'Tarjetas de débito.',
      'Dinero disponible en una cuenta de Mercado Pago.',
      'Cuotas sin tarjeta, cuando esta opción esté habilitada.',
      'Otros medios que puedan estar disponibles en el checkout.',
    ] },
    { tipo: 'parrafo', texto: 'Mercado Pago permite configurar qué medios y tipos de pago se ofrecen, por lo que las opciones disponibles se muestran al momento de realizar la compra.' },

    { tipo: 'titulo', texto: '2. Transferencia bancaria' },
    { tipo: 'parrafo', texto: 'También podés pagar mediante transferencia bancaria. Una vez realizada, será necesario enviar o informar el comprobante según el procedimiento indicado. Importante: el pedido no se considera confirmado únicamente por el envío del comprobante — la compra queda confirmada una vez que verificamos la acreditación del pago.' },

    { tipo: 'titulo', texto: '3. Efectivo' },
    { tipo: 'parrafo', texto: 'El efectivo está disponible como medio de pago para las compras realizadas presencialmente en nuestro local. Actualmente no contemplamos el pago en efectivo para las compras realizadas a través de la tienda online.' },

    { tipo: 'titulo', texto: '¿Se puede pagar en cuotas?' },
    { tipo: 'parrafo', texto: 'Las opciones de financiación dependen de las condiciones ofrecidas por Mercado Pago y de las promociones vigentes. Cuando existan cuotas sin interés se comunican junto con sus condiciones, y las opciones disponibles se muestran al momento de realizar la compra.' },

    { tipo: 'titulo', texto: '¿Cuándo se confirma mi compra?' },
    { tipo: 'lista', items: [
      'Con Mercado Pago: la compra se procesa una vez que Mercado Pago confirma y aprueba el pago.',
      'Con transferencia: el pedido se procesa una vez que verificamos la acreditación.',
      'En efectivo: el pago se confirma al momento de comprar presencialmente en el local.',
    ] },

    { tipo: 'titulo', texto: 'Promociones y medios de pago' },
    { tipo: 'parrafo', texto: 'Las promociones, descuentos y planes de financiación pueden estar sujetos a un medio de pago determinado, una tarjeta específica, una cantidad de cuotas, un período de vigencia, un monto mínimo u otras condiciones particulares, que se informan junto con cada promoción.' },

    { tipo: 'destacado', texto: 'Pagando por transferencia tenés 10% de descuento en la tienda online. Con tarjeta, hasta 3 cuotas sin interés.' },
  ],
};

/**
 * Terminos y condiciones y politica de privacidad no estan en el documento.
 * La pagina lo dice abiertamente en vez de mostrar clausulas inventadas, que
 * en un sitio que cobra seria peor que no tener nada.
 */
export const SIN_REDACTAR = ['terminos', 'privacidad'] as const;
