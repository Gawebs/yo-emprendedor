import type { Politica } from './politicas';

/**
 * Terminos y Condiciones y Politica de Privacidad, tal como los redacto Anita
 * (documentos del 19-ago-2026). Van completos y con su numeracion original.
 *
 * Viven aparte de politicas.ts por tamaño: entre los dos son ~50 secciones.
 */

export const TERMINOS: Politica = {
  titulo: 'Términos y condiciones',
  bajada: 'Condiciones que regulan el uso del sitio y las compras en la tienda.',
  actualizado: '19 de agosto de 2026',
  bloques: [
    { tipo: 'parrafo', texto: 'Bienvenido/a a Yo Emprendedor. Estos Términos y Condiciones regulan el acceso, navegación y utilización del sitio web y la tienda online, así como las compras realizadas a través de la plataforma.' },
    { tipo: 'parrafo', texto: 'Al registrarse en el sitio, utilizar sus funcionalidades o realizar una compra, el usuario declara haber leído y comprendido estos Términos y Condiciones y acepta quedar sujeto a ellos. Se complementan con las demás políticas y documentos disponibles en el sitio.' },

    { tipo: 'titulo', texto: '1. Identificación de Yo Emprendedor' },
    { tipo: 'parrafo', texto: 'Yo Emprendedor es un espacio comercial físico y digital que reúne diferentes marcas y emprendimientos y ofrece sus productos a través de un mismo canal comercial. La tienda online permite conocer y adquirir productos pertenecientes a diferentes emprendimientos participantes.' },

    { tipo: 'titulo', texto: '2. Objeto y funcionamiento de la plataforma' },
    { tipo: 'parrafo', texto: 'A través de la plataforma podés seleccionar productos de diferentes emprendimientos y adquirirlos dentro de una misma operación. Cuando una compra incluya productos de varios emprendimientos:' },
    { tipo: 'lista', items: [
      'Utilizás un único carrito de compra.',
      'Realizás un único pago.',
      'Contás con un único pedido.',
      'Yo Emprendedor coordina internamente la preparación de la compra.',
      'La atención relacionada con el pedido se centraliza a través de Yo Emprendedor.',
    ] },
    { tipo: 'parrafo', texto: 'No tenés que realizar pagos separados ni coordinar individualmente la compra con cada emprendimiento. La modalidad interna de recepción, preparación y consolidación puede variar según las características de cada operación.' },

    { tipo: 'titulo', texto: '3. Aceptación de los Términos y Condiciones' },
    { tipo: 'parrafo', texto: 'El acceso, registro, navegación y utilización del sitio, así como la realización de compras, implican la aceptación de estos Términos y Condiciones. Si no estás de acuerdo con alguna de sus disposiciones, deberás abstenerte de utilizar la plataforma o realizar compras.' },
    { tipo: 'parrafo', texto: 'Deben interpretarse junto con las políticas específicas del sitio: Preguntas Frecuentes, Política de Privacidad, Política de Envíos, Política de Cambios y Devoluciones, y Política de Uso de Gift Card cuando corresponda.' },

    { tipo: 'titulo', texto: '4. Capacidad para contratar' },
    { tipo: 'parrafo', texto: 'Para registrarse y comprar es necesario contar con capacidad legal para contratar según la legislación argentina. El uso del sitio por parte de menores de edad debe contar con la supervisión y autorización de su padre, madre o representante legal, quien será responsable de las operaciones realizadas.' },

    { tipo: 'titulo', texto: '5. Registro de usuario' },
    { tipo: 'parrafo', texto: 'Para realizar compras a través de la tienda online será necesario registrarse previamente, completando el formulario disponible antes de comenzar el proceso de compra. La información proporcionada deberá ser verdadera, completa y actualizada.' },
    { tipo: 'parrafo', texto: 'Los datos solicitados pueden incluir la información necesaria para identificar al cliente, gestionar sus compras, procesar pedidos, gestionar pagos, coordinar entregas o retiros, emitir comprobantes y enviar comunicaciones relacionadas con sus operaciones.' },
    { tipo: 'parrafo', texto: 'El registro es gratuito y no implica obligación de comprar. El tratamiento de los datos personales se rige por la Política de Privacidad.' },

    { tipo: 'titulo', texto: '6. Responsabilidad del usuario sobre la información proporcionada' },
    { tipo: 'parrafo', texto: 'El usuario es responsable de proporcionar información verdadera, completa y actualizada, que permita la correcta identificación del cliente, gestión del pedido, facturación y entrega. La información incorrecta o incompleta puede afectar la gestión de una operación.' },

    { tipo: 'titulo', texto: '7. Uso del sitio' },
    { tipo: 'parrafo', texto: 'El usuario se compromete a utilizar la plataforma de manera responsable, lícita y conforme a la legislación vigente. No está permitido:' },
    { tipo: 'lista', items: [
      'Realizar actividades ilícitas.',
      'Proporcionar información falsa o engañosa.',
      'Realizar operaciones fraudulentas.',
      'Intentar acceder sin autorización a cuentas, sistemas o información.',
      'Interferir con el funcionamiento de la plataforma.',
      'Introducir elementos que puedan afectar su funcionamiento.',
      'Copiar o utilizar contenidos sin autorización.',
      'Realizar actividades que puedan perjudicar a Yo Emprendedor, a los emprendimientos participantes o a terceros.',
    ] },

    { tipo: 'titulo', texto: '8. Productos' },
    { tipo: 'parrafo', texto: 'Los productos publicados corresponden a las diferentes marcas y emprendimientos participantes. Según corresponda, las publicaciones pueden incluir nombre, descripción, fotografías, medidas, materiales, colores, variantes, características particulares, precio y disponibilidad.' },
    { tipo: 'parrafo', texto: 'Las fotografías buscan representar los productos de la manera más fiel posible. Pueden existir pequeñas diferencias de color, textura, terminación o apariencia por la iluminación, la configuración de la pantalla o las características propias del producto. En productos artesanales pueden existir variaciones propias de su elaboración.' },

    { tipo: 'titulo', texto: '9. Disponibilidad y stock' },
    { tipo: 'parrafo', texto: 'Los productos están sujetos a disponibilidad y el stock puede variar, ya que trabajamos con diferentes marcas. En circunstancias excepcionales, un producto adquirido puede dejar de estar disponible antes de completar la preparación del pedido. Si ocurre, nos comunicamos para informarte y gestionar la alternativa que corresponda: sustitución del producto, cancelación o reintegro del importe, según las condiciones aplicables.' },

    { tipo: 'titulo', texto: '10. Precios' },
    { tipo: 'parrafo', texto: 'Los precios se expresan en pesos argentinos ($), salvo indicación expresa. El precio aplicable es el informado al momento de la compra y antes de su confirmación. Los precios pueden modificarse en cualquier momento, sin afectar las condiciones de una compra correctamente confirmada.' },
    { tipo: 'destacado', texto: 'El precio publicado para cada producto constituye, salvo indicación en contrario, el precio final para pago en un único pago (efectivo, transferencia, débito o crédito en un pago), conforme a la normativa de lealtad comercial vigente.' },

    { tipo: 'titulo', texto: '11. Proceso de compra' },
    { tipo: 'lista', items: [
      'Registrarse en la tienda.',
      'Seleccionar los productos.',
      'Incorporarlos al carrito.',
      'Revisar los productos y cantidades seleccionadas.',
      'Completar o confirmar los datos solicitados.',
      'Seleccionar la modalidad de entrega o retiro disponible.',
      'Seleccionar el medio de pago.',
      'Revisar el resumen de la operación.',
      'Confirmar la compra.',
    ] },
    { tipo: 'parrafo', texto: 'La realización del pedido queda sujeta a la validación del medio de pago, la disponibilidad de los productos y demás condiciones necesarias para procesar la operación.' },

    { tipo: 'titulo', texto: '12. Compras de diferentes emprendimientos' },
    { tipo: 'parrafo', texto: 'Podés agregar productos de distintas marcas a un mismo carrito: un único carrito, un único pago, un único pedido. Yo Emprendedor coordina internamente la gestión de los productos incluidos. No tenés que realizar una compra independiente por cada emprendimiento ni coordinar individualmente cada entrega.' },

    { tipo: 'titulo', texto: '13. Confirmación de la compra' },
    { tipo: 'parrafo', texto: 'Una vez procesada la operación te enviamos una confirmación al medio de contacto proporcionado, que puede incluir el número de pedido, los productos adquiridos, cantidades, importe, medio de pago, modalidad de entrega o retiro e información adicional. Conservá la información correspondiente a tu compra.' },

    { tipo: 'titulo', texto: '14. Medios de pago' },
    { tipo: 'parrafo', texto: 'Ofrecemos diferentes medios de pago, que pueden variar según el canal de compra, las condiciones disponibles y las promociones vigentes. Entre los habilitados se encuentran:' },
    { tipo: 'lista', items: [
      'Mercado Pago: tarjetas de crédito, tarjetas de débito, dinero disponible en cuenta y, cuando esté habilitado, cuotas sin tarjeta.',
      'Transferencia bancaria, para compras online y presenciales.',
      'Efectivo, exclusivamente para compras realizadas presencialmente en el local. La tienda online no contempla actualmente el pago en efectivo.',
    ] },
    { tipo: 'parrafo', texto: 'Cuando el pago se realice por transferencia, la compra queda confirmada una vez que verificamos la acreditación; el envío del comprobante no implica por sí solo la confirmación del pedido. Las condiciones de cuotas, financiación, promociones o intereses dependen del medio de pago y de las condiciones vigentes.' },

    { tipo: 'titulo', texto: '15. Facturación' },
    { tipo: 'parrafo', texto: 'Una misma compra puede incluir productos de diferentes emprendimientos, por lo que la modalidad de facturación puede variar. Cuando corresponda, Yo Emprendedor emite el comprobante por los productos comercializados mediante la plataforma; cuando corresponda, los emprendimientos participantes emiten sus propios comprobantes.' },
    { tipo: 'destacado', texto: 'Un único pago y un único pedido no implican necesariamente la emisión de un único comprobante fiscal. La modalidad aplicable depende de la forma de comercialización de cada operación y de la normativa vigente.' },

    { tipo: 'titulo', texto: '16. Promociones, descuentos y beneficios' },
    { tipo: 'parrafo', texto: 'Las promociones, descuentos, códigos promocionales y demás beneficios están sujetos a las condiciones informadas en cada caso, que pueden establecer fecha de inicio y finalización, productos o categorías alcanzadas, medios de pago habilitados, monto mínimo, límite de unidades, condiciones de acumulación y restricciones particulares. Salvo indicación expresa, no son necesariamente acumulables.' },

    { tipo: 'titulo', texto: '17. Gift Cards' },
    { tipo: 'parrafo', texto: 'Ofrecemos Gift Cards que pueden utilizarse para adquirir productos de cualquiera de las marcas participantes, en el local y en la tienda online. Tienen una vigencia de 30 días hábiles desde la fecha de compra y no pueden utilizarse para abonar costos de envío. Su utilización se rige por la Política de Uso de Gift Card.' },

    { tipo: 'titulo', texto: '18. Envíos y retiro' },
    { tipo: 'parrafo', texto: 'Las modalidades de entrega se informan durante el proceso de compra: retiro gratuito en el local, envíos en San Miguel de Tucumán y localidades cercanas, envíos al interior de Tucumán y envíos a otras provincias. Las compras cuyo subtotal alcance el monto mínimo vigente acceden a envío gratuito dentro de las zonas de cobertura, según la Política de Envíos.' },

    { tipo: 'titulo', texto: '19. Cambios y devoluciones' },
    { tipo: 'parrafo', texto: 'Los cambios y devoluciones se rigen por la Política de Cambios y Devoluciones, que establece las condiciones, requisitos y procedimientos. Respetamos en todos los casos los derechos reconocidos al consumidor por la legislación vigente.' },

    { tipo: 'titulo', texto: '20. Derecho de arrepentimiento' },
    { tipo: 'destacado', texto: 'En las compras a distancia podés ejercer el derecho de arrepentimiento dentro de los 10 días corridos desde la recepción del producto, conforme al artículo 34 de la Ley N.º 24.240 y al artículo 1.110 del Código Civil y Comercial, sin necesidad de indicar el motivo y sin costo alguno.' },
    { tipo: 'parrafo', texto: 'Para facilitar su ejercicio disponemos de un Botón de Arrepentimiento de acceso fácil y directo desde la página de inicio, conforme a la Resolución N.º 424/2020 de la Secretaría de Comercio Interior. Una vez recibida la solicitud, te informamos dentro de las 24 horas y por el mismo medio el número de código de identificación del trámite.' },

    { tipo: 'titulo', texto: '21. Garantía legal' },
    { tipo: 'parrafo', texto: 'Los productos cuentan con la garantía legal del artículo 11 de la Ley N.º 24.240, salvo las excepciones previstas por la normativa. Tiene una vigencia mínima de 6 meses para productos nuevos y 3 meses para usados, contados desde la entrega, sin perjuicio de que la marca ofrezca un plazo mayor.' },
    { tipo: 'parrafo', texto: 'Cubre defectos o vicios de fabricación que afecten el correcto funcionamiento. No cubre el desgaste natural por el uso ni daños por uso indebido. Para hacerla efectiva, conservá el comprobante de compra y comunicate por los canales oficiales. En productos artesanales, las variaciones propias de su elaboración no constituyen un defecto cubierto por esta garantía.' },

    { tipo: 'titulo', texto: '22. Propiedad intelectual' },
    { tipo: 'parrafo', texto: 'Los textos, fotografías, imágenes, diseños, logotipos, gráficos, elementos visuales y estructura desarrollados por Yo Emprendedor están protegidos por la legislación aplicable. Las marcas, nombres comerciales y logotipos de los emprendimientos participantes continúan siendo propiedad de sus respectivos titulares: su participación en Yo Emprendedor no implica que la marca sea propiedad de Yo Emprendedor.' },

    { tipo: 'titulo', texto: '23. Contenidos proporcionados por los emprendimientos' },
    { tipo: 'parrafo', texto: 'Los emprendimientos participantes son responsables de proporcionar información adecuada sobre los productos que comercializan y de contar con las autorizaciones necesarias respecto de los contenidos que entreguen para su publicación.' },

    { tipo: 'titulo', texto: '24. Servicios y plataformas de terceros' },
    { tipo: 'parrafo', texto: 'Para el funcionamiento de la tienda podemos utilizar servicios de terceros: plataformas de pago, servicios de logística, herramientas tecnológicas, servicios de alojamiento, herramientas de comunicación, servicios de análisis y otros proveedores necesarios. Cuando corresponda, están sujetos a sus propios términos y condiciones.' },

    { tipo: 'titulo', texto: '25. Limitación de responsabilidad' },
    { tipo: 'parrafo', texto: 'Yo Emprendedor actúa como plataforma comercial que reúne y facilita la comercialización de productos de diferentes marcas y emprendimientos independientes. No fabrica los productos ofrecidos y no será responsable por vicios, defectos o características intrínsecas exclusivamente atribuibles a su fabricación por parte de la marca correspondiente, sin perjuicio de la responsabilidad solidaria que pudiera corresponder conforme a la Ley N.º 24.240.' },
    { tipo: 'parrafo', texto: 'Nada de lo establecido en esta cláusula limita los derechos irrenunciables reconocidos al consumidor por la legislación aplicable.' },

    { tipo: 'titulo', texto: '26. Funcionamiento y disponibilidad del sitio' },
    { tipo: 'parrafo', texto: 'Procuramos mantener la tienda disponible y funcionando correctamente. Pueden producirse interrupciones temporales por mantenimiento, actualizaciones, problemas técnicos, fallas de conectividad, fallas de proveedores externos, fuerza mayor u otras situaciones ajenas a nuestro control razonable.' },

    { tipo: 'titulo', texto: '27. Errores en la información publicada' },
    { tipo: 'parrafo', texto: 'Procuramos mantener la información actualizada, pero pueden producirse errores involuntarios en precios, descripciones, fotografías, disponibilidad, características o condiciones promocionales. Cuando se detecte un error que pueda afectar una operación, analizamos la situación y comunicamos las alternativas que correspondan conforme a la legislación vigente.' },

    { tipo: 'titulo', texto: '28. Comunicaciones' },
    { tipo: 'parrafo', texto: 'Podemos comunicarnos con el usuario mediante los datos proporcionados durante el registro y/o la compra, por cuestiones relacionadas con registro, compras, pagos, pedidos, entregas, retiros, cambios, devoluciones, consultas y reclamos. Las comunicaciones comerciales se realizan según la normativa aplicable y podés solicitar dejar de recibirlas.' },

    { tipo: 'titulo', texto: '29. Protección de datos personales' },
    { tipo: 'parrafo', texto: 'El tratamiento de los datos personales se rige por la Política de Privacidad, que informa sobre los datos recopilados, las finalidades del tratamiento, los terceros que pueden intervenir, los derechos del titular y las medidas de protección aplicables.' },

    { tipo: 'titulo', texto: '30. Suspensión y baja de cuenta' },
    { tipo: 'parrafo', texto: 'Podés solicitar la baja de tu cuenta en cualquier momento por los canales oficiales. Yo Emprendedor puede suspender o cancelar una cuenta ante un uso indebido de la plataforma según la Sección 7, notificando cuando resulte posible. La baja no afecta las obligaciones ya generadas por compras confirmadas.' },

    { tipo: 'titulo', texto: '31. Modificación de los Términos y Condiciones' },
    { tipo: 'parrafo', texto: 'Podemos actualizarlos cuando resulte necesario por modificaciones en el funcionamiento de la tienda, los servicios, los medios de pago, los procesos comerciales, la normativa o las condiciones operativas. La versión vigente es la publicada en el sitio, y las modificaciones no afectan operaciones anteriores cuando ello implique desconocer derechos adquiridos.' },

    { tipo: 'titulo', texto: '32. Derechos del consumidor' },
    { tipo: 'parrafo', texto: 'Las operaciones están sujetas a la legislación vigente de la República Argentina y a las normas de protección y defensa del consumidor. Ninguna disposición de estos Términos puede interpretarse como renuncia, restricción o limitación de los derechos reconocidos al consumidor.' },

    { tipo: 'titulo', texto: '33. Legislación aplicable' },
    { tipo: 'parrafo', texto: 'Estos Términos y Condiciones se rigen por las leyes de la República Argentina. Las relaciones de consumo se rigen por las normas aplicables en cada caso.' },

    { tipo: 'titulo', texto: '34. Resolución de conflictos' },
    { tipo: 'parrafo', texto: 'Ante cualquier controversia, además de nuestros canales oficiales, el consumidor puede recurrir a:' },
    { tipo: 'lista', items: [
      'La Dirección de Defensa del Consumidor de la Provincia de Tucumán.',
      'El Sistema de Resolución de Conflictos en las Relaciones de Consumo (COPREC), dentro de los montos y condiciones que ese sistema establece.',
      'La Ventanilla Única Federal de Defensa del Consumidor del Gobierno nacional.',
    ] },
    { tipo: 'parrafo', texto: 'Procuramos resolver cualquier reclamo de manera directa y en los plazos que correspondan, antes de que resulte necesario recurrir a estas instancias.' },

    { tipo: 'titulo', texto: '35. Divisibilidad' },
    { tipo: 'parrafo', texto: 'Si alguna disposición fuera declarada inválida, ilegal o inaplicable por autoridad competente, se tendrá por no escrita sin afectar la validez del resto.' },

    { tipo: 'titulo', texto: '36. Contacto' },
    { tipo: 'parrafo', texto: 'Yo Emprendedor — 24 de Septiembre 734, San Miguel de Tucumán, Tucumán, Argentina. info@yoemprendedortienda.com. WhatsApp: 381 214-6172.' },
  ],
};

export const PRIVACIDAD: Politica = {
  titulo: 'Política de privacidad',
  bajada: 'Qué datos recopilamos, para qué los usamos y cómo los protegemos.',
  actualizado: '13 de agosto de 2026',
  bloques: [
    { tipo: 'parrafo', texto: 'En Yo Emprendedor respetamos la privacidad de las personas que visitan nuestro sitio, realizan compras, consultan productos, se comunican con nosotros o interactúan con nuestras marcas y servicios.' },
    { tipo: 'parrafo', texto: 'Esta política explica qué datos personales podemos recopilar, para qué los utilizamos, con quién podemos compartirlos, cómo los protegemos y qué derechos pueden ejercer las personas titulares. El tratamiento se realiza de acuerdo con la Ley N.º 25.326 de Protección de Datos Personales y su normativa complementaria.' },

    { tipo: 'titulo', texto: '1. Responsable del tratamiento' },
    { tipo: 'parrafo', texto: 'Yo Emprendedor — info@yoemprendedortienda.com — 24 de Septiembre 734, San Miguel de Tucumán, Tucumán, Argentina. Para consultas sobre privacidad y protección de datos, escribinos a ese correo.' },

    { tipo: 'titulo', texto: '2. ¿Qué datos personales recopilamos?' },
    { tipo: 'parrafo', texto: 'Datos de contacto y perfil: nombre y apellido, teléfono, correo electrónico, datos necesarios para identificar una cuenta o usuario, y el nombre de usuario o información pública del perfil desde el cual nos contactás.' },
    { tipo: 'parrafo', texto: 'Información de las comunicaciones: podemos conservar los mensajes, consultas, solicitudes y archivos que nos envíes por WhatsApp, Instagram, Facebook Messenger, correo electrónico, chat de la tienda u otros canales oficiales.' },
    { tipo: 'parrafo', texto: 'Datos relacionados con compras: productos adquiridos o consultados, datos de contacto, información de facturación, información necesaria para la entrega, estado del pedido e información relacionada con cambios, reclamos o solicitudes de posventa.' },
    { tipo: 'parrafo', texto: 'Datos técnicos y de navegación: información sobre navegación, dispositivo, navegador, dirección IP, cookies y uso del sitio, que puede utilizarse para garantizar su funcionamiento, mejorar la experiencia, realizar análisis estadísticos y desarrollar acciones de publicidad y comunicación.' },

    { tipo: 'titulo', texto: '3. ¿Para qué utilizamos tus datos?' },
    { tipo: 'lista', items: [
      'Responder consultas y brindar atención al cliente.',
      'Gestionar pedidos y compras.',
      'Coordinar pagos, entregas, retiros y envíos.',
      'Informar sobre el estado de una compra o consulta.',
      'Gestionar cambios, reclamos y solicitudes de posventa.',
      'Mejorar nuestros productos, servicios y atención.',
      'Analizar el funcionamiento y uso del sitio.',
      'Desarrollar acciones de comunicación, promoción y publicidad.',
      'Prevenir usos indebidos, errores o actividades fraudulentas.',
      'Cumplir obligaciones legales, fiscales, contables y comerciales.',
      'Enviarte novedades o comunicaciones comerciales cuando hayas prestado el consentimiento requerido.',
    ] },
    { tipo: 'parrafo', texto: 'Cuando recibas comunicaciones comerciales, podés solicitar dejar de recibirlas en cualquier momento.' },

    { tipo: 'titulo', texto: '4. ¿Con quién compartimos tus datos?' },
    { tipo: 'destacado', texto: 'Yo Emprendedor no vende ni alquila datos personales.' },
    { tipo: 'parrafo', texto: 'Podemos compartir determinados datos cuando resulte necesario para prestar nuestros servicios, gestionar una compra, realizar acciones de comunicación o cumplir una obligación legal:' },
    { tipo: 'lista', items: [
      'Plataformas de comunicación: WhatsApp, Instagram o Facebook Messenger, sujetas también a sus propias políticas.',
      'Plataforma de comercio electrónico: proveedores tecnológicos para operar la tienda y gestionar productos, pedidos y compras.',
      'Medios de pago: Mercado Pago, transferencia bancaria y otros habilitados. No almacenamos datos completos de tarjetas cuando son procesados directamente por el proveedor de pagos.',
      'Empresas de logística: los datos estrictamente necesarios para realizar la entrega.',
      'Herramientas de análisis y publicidad: Google Analytics, Google Ads y Meta Ads, sujetas a sus propias políticas.',
      'Autoridades públicas: cuando exista obligación legal o requerimiento judicial o administrativo válido.',
    ] },

    { tipo: 'titulo', texto: '5. Conservación de los datos' },
    { tipo: 'parrafo', texto: 'Conservamos los datos durante el tiempo necesario para cumplir las finalidades para las que fueron recopilados y para atender las obligaciones legales, fiscales, contables o comerciales que correspondan. Cuando ya no resulten necesarios y no exista obligación de conservarlos, son eliminados, destruidos o anonimizados.' },

    { tipo: 'titulo', texto: '6. Cookies y tecnologías similares' },
    { tipo: 'parrafo', texto: 'Nuestro sitio puede utilizar cookies, píxeles, etiquetas y tecnologías similares para permitir el funcionamiento de determinadas funcionalidades, recordar preferencias, analizar el uso del sitio, medir campañas y mejorar la navegación. Entre las herramientas que podemos utilizar están Google Analytics, Google Ads y Meta Ads.' },
    { tipo: 'parrafo', texto: 'Podés configurar las opciones de cookies desde tu navegador. La desactivación de determinadas cookies podría afectar algunas funcionalidades del sitio.' },

    { tipo: 'titulo', texto: '7. ¿Cómo podés solicitar la eliminación de tus datos?' },
    { tipo: 'parrafo', texto: 'Escribinos a info@yoemprendedortienda.com con el asunto "Solicitud de eliminación de datos personales". Para poder identificar correctamente la información, indicá tu nombre y apellido, correo electrónico, teléfono o usuario asociado, el canal por el que te contactaste y la información que permita identificar la cuenta, consulta o compra.' },
    { tipo: 'parrafo', texto: 'La solicitud será evaluada y procesada dentro de los plazos establecidos por la normativa. La eliminación puede estar limitada cuando exista una obligación legal, fiscal, contable, contractual o judicial de conservar determinada información.' },

    { tipo: 'titulo', texto: '8. Tus derechos' },
    { tipo: 'parrafo', texto: 'De acuerdo con la normativa argentina de protección de datos personales, podés ejercer tus derechos de información, acceso, rectificación, actualización y supresión escribiendo a info@yoemprendedortienda.com. La Agencia de Acceso a la Información Pública (AAIP) es el organismo de control y dispone de mecanismos para realizar reclamos.' },

    { tipo: 'titulo', texto: '9. Seguridad de la información' },
    { tipo: 'parrafo', texto: 'Adoptamos medidas técnicas y organizativas razonables para proteger los datos contra pérdida, acceso, modificación, divulgación o tratamiento no autorizado. El acceso se limita a las personas y proveedores que necesitan utilizarlos. Ningún sistema de almacenamiento o transmisión por Internet puede garantizar una seguridad absoluta.' },

    { tipo: 'titulo', texto: '10. Menores de edad' },
    { tipo: 'parrafo', texto: 'Nuestros servicios están dirigidos al público general y no tienen como finalidad recopilar deliberadamente datos de menores de edad. Si un padre, madre o representante legal considera que un menor proporcionó datos sin autorización, puede comunicarse para solicitar su revisión y eliminación.' },

    { tipo: 'titulo', texto: '11. Transferencia de datos a terceros' },
    { tipo: 'parrafo', texto: 'Cuando resulte necesario utilizar proveedores ubicados fuera de la Argentina, determinados datos podrían procesarse fuera del país. En esos casos procuramos que el tratamiento se realice conforme a las condiciones y garantías exigidas por la normativa aplicable.' },

    { tipo: 'titulo', texto: '12. Cambios en esta Política de Privacidad' },
    { tipo: 'parrafo', texto: 'Podemos actualizarla cuando resulte necesario para reflejar cambios en nuestros servicios, tecnologías, proveedores o normativa. La versión vigente estará disponible en el sitio e indicará la fecha de su última actualización.' },

    { tipo: 'titulo', texto: '13. Contacto' },
    { tipo: 'parrafo', texto: 'Yo Emprendedor — info@yoemprendedortienda.com — 24 de Septiembre 734, San Miguel de Tucumán, Tucumán, Argentina. Asunto sugerido: "Protección de datos personales".' },
  ],
};
