<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Yo Emprendedor — marketplace local de Tucumán

Marketplace B2C más dashboard para emprendedores, para **Anita** (pareja de Ale). Local físico en 24 de Septiembre 734, San Miguel de Tucumán. Contacto: yoemprendedortucuman@gmail.com, +54 381 214-6172.

## Estado real (26-ago-2026)

Deployado en **https://yoemprendedortienda.com**. Repo: `Gawebs/yo-emprendedor`.

El sitio tiene **dos secciones**, y esa división es la clave para entenderlo:

1. **La tienda**, en la raíz (`/`). Es el canal de ventas y la puerta de entrada.
2. **La sección de emprendedoras**, en `/quiero-vender`. Vende los planes.

**Supabase ya esta conectado** (ver mas abajo) y las fotos se sirven desde su Storage, pero **el catalogo sigue leyendose de `data.ts`**: los productos, los pedidos y las cuentas todavia viven en el codigo y en `localStorage`. Cablear las paginas a la base es el trabajo que sigue.

Lo que falta para produccion: reescribir el panel, reemplazar `CuentaContext` por Supabase Auth, leer el catalogo de la base, e integrar Mercado Pago al final.

## Fuente de verdad del contenido

Los textos, políticas y decisiones de negocio salen de los documentos que redactó **Anita**, en `Downloads/YO EMPRENDEDOR/Políticas y protocolos/`. **Mandan los documentos**, no lo que se haya decidido sobre la marcha para avanzar: ya pasó dos veces que el checkout hacía lo contrario de lo que decían sus propios términos.

De ahí salieron dos correcciones que conviene no revertir sin leerlos:

- **La tienda online no acepta efectivo** (Términos, sección 14). El efectivo es solo para compras presenciales en el local. Por eso el 10% de descuento quedó atado a la transferencia.
- **Hay que registrarse para comprar** (Términos, sección 5). El checkout redirige a `/auth/login?volver=/checkout` y al volver prellena los datos de la cuenta.

## Medidas de las imágenes

Lo que hay que pedirle a las marcas, ya al doble para pantallas de alta densidad:

| Pieza | Medida | Formato |
|---|---|---|
| Producto | 1200 × 1200 | JPG, o PNG si va con fondo transparente |
| Logo de marca | 300 × 300 | PNG transparente, centrado y con aire — se recorta en círculo |
| Fachada del local (hero de `/quiero-vender`) | 2400 × 1350 | JPG, con el lado izquierdo despejado |
| Interior del local | 1200 × 900 | JPG |

**Las fotos van con `<img>` plano, no con `next/image`** (26-ago-2026). Llegan ya optimizadas desde Anita —webp de 11 a 15 KB— y el bucket de Supabase las sirve por CDN: optimizarlas de nuevo no gana nada y en el plan Hobby de Vercel la optimizacion de imagenes tiene cupo mensual. Van con `width`/`height` explicitos para que la pagina no salte mientras cargan, y `loading="lazy"` salvo la primera.

**Si el original mide menos de 1200, se deja como esta.** Las primeras fotos reales vinieron en 640 x 640 y no hay originales mas grandes. Alcanza: en la grilla se ven a 198 px y en la ficha a 552 px, asi que en pantalla comun sobra resolucion. Solo en pantallas de alta densidad la foto grande queda algo menos nitida. **Agrandarlas a 1200 se veria peor** — nunca hacer upscale.

**Tampoco convertir de webp a jpg.** Webp pesa entre 25% y 35% menos con la misma calidad, el bucket lo acepta, y convertir es recomprimir con perdida.

**Una sola foto cuadrada por producto** alcanza para la grilla, el carrusel, la ficha y la miniatura: todas son 1:1 desde el 19-ago-2026, justamente para no pedir dos recortes de lo mismo.

**El banner de la home lleva foto de fondo desde el 27-ago-2026**, con la fachada del local de noche. Tres decisiones, todas de Gabriel y todas con su motivo:

- **La foto es del banner, no de cada pieza.** Rota el texto y la imagen se queda quieta. Cuando cambiaba junto con el texto, el banner parpadeaba.
- **El banner toma la proporcion de la foto** (`aspect-ratio: 1536 / 920`) en vez de recortarla a una franja. Se eligio sabiendo el costo: en una pantalla de 1900 px son ~1138 px de alto, asi que al entrar hay que scrollear para ver el primer producto. Imagen sobre conversion, a proposito.
- **Un 10% recortado de arriba**, anclando con `object-position: center bottom`: sobre el cartel habia una franja de pared vacia que solo sumaba altura.

Encima va una **cortina del amarillo de marca al 78%**: tine la foto en vez de apagarla, asi el banner sigue leyendose como identidad. Y el titulo pasa a `--negro-fuerte` cuando hay foto, porque el tono normal sobre el amarillo da 3.2:1 —el minimo justo para texto grande— y una foto detras se come ese margen.

**Las imagenes del sitio van al bucket `sitio`**, no a `productos`: la fachada y los banners no son productos ni logos, y meterlos ahi romperia la convencion de rutas de `puede_tocar_foto()`.

**Antes de subir, optimizar.** La fachada venia en PNG de 2,3 MB y quedo en 166 KB en webp sin perder un pixel de tamano. Un banner de 2 MB hace que la home tarde en cualquier celular con datos.

## Verificaciones

```bash
npm run prueba:precios   # 15 casos sobre las reglas de precio
npx tsc --noEmit         # strict: true desde el 19-ago-2026
```

Las reglas de precio viven en `src/lib/tienda/precios.ts`, separadas de la UI, y son lo más fácil de romper sin darse cuenta: el umbral de envío gratis, el 10%, y el cruce con la gift card (que no se combina con promociones ni paga envío).

## Stack y patrones

Next.js 16 + React 19 + Tailwind v4 + Supabase. Sigue el patrón Nexaia:

- **Server Actions** para mutaciones, **Server Components async** para lecturas
- **Tres clientes de Supabase separados**: `src/lib/supabase/{client,server,admin}.ts`
- **RLS activo desde el día uno**, no como parche
- `src/contexts/TenantContext.tsx` resuelve `emprendedor_id` dinámicamente
- Nomenclatura **español para el negocio, inglés para infraestructura**
- Validación manual, sin zod

Documentos del proyecto: `PRODUCT.md` (brief), `ARCHITECTURE.md` (decisiones), `ESTRUCTURA.md` (árbol y workflow).

## Base de datos

Multi-tenant: cada **emprendedor** es un tenant y ve solo sus datos. Categorías y ofertas son públicas.

Tablas: `profiles`, `emprendedores`, `categorias` (9 fijas), `ofertas_dia`, `productos`, `ventas`, `liquidaciones`, `notificaciones`, `turnos`. Schema en `supabase/migrations/001_init_schema.sql`.

Enums: `producto_estado` (activo/inactivo/descontinuado), `venta_estado` (pendiente/confirmada/entregada/cancelada), `notificacion_tipo` (stock_bajo/cambio_precio/reposicion/venta/liquidacion), `turno_estado` (pendiente/completado/cancelado).

## Decisiones de diseño ya tomadas

**La home (`/`) es la landing de venta de planes**, no el hero del marketplace. Reemplazada el 14-ago-2026 por el diseño que trajo Gabriel: vende Impulso ($250K), Crecimiento ($550K) y Expansión ($950K) mensuales. Vive en `src/app/page.tsx`; los textos, precios y testimonios están en `src/components/landing/data.ts`, no inline.

**El CSS de la landing está scopeado bajo `.ye-landing`** (`src/styles/landing.css`) a propósito: trae su propia paleta y estilos de elemento (`section`, `nav`, `footer`) que pisarían el catálogo y el dashboard si vivieran en `:root`.

**Header, Footer y FloatingCTA no están en el layout raíz.** La landing trae los suyos; el resto los recibe vía `src/app/productos/layout.tsx` y `src/app/auth/layout.tsx`.

**El contenido no depende de JS para verse.** El ocultamiento de las animaciones cuelga de `.reveal-activo`, clase que agrega `Reveal.tsx` al montar, más un rescate a los 2.5s si el observer nunca reporta. Sin eso, 72 elementos en `opacity:0` dejan la landing en blanco.

**Paleta oficial de marca** (brand kit de Canva, la dio Anita el 14-ago-2026): amarillo `#e2c76a`, verde `#7f8f6a`, blanco, y `#6f6a63` como oscuro. Son los que usa la tienda.

El verde de marca da 3.5:1 con texto blanco encima, así que no sirve para botones con texto: para eso está `--verde-oscuro` (`#5d6b4c`), del mismo tono pero legible. El color que se ve sigue siendo el de Anita; el oscuro aparece solo donde hay palabras.

## Supabase, conectado el 26-ago-2026

Proyecto `qtjfpjyyagfvwxlttxlf` en `sa-east-1`, plan Free, bajo una cuenta propia del proyecto — no la de Gabriel. Credenciales en `.env.local` (gitignoreado).

**Cuatro migraciones, y las dos ultimas nacieron de auditar las dos primeras:**

- `001` panel del emprendedor · `002` canal de ventas
- `003` los 9 rubros de Anita con subrubros, y `producto_categorias` para que un producto viva en varios rubros
- `004` policies de admin, y cerrar el insert publico de pedidos

**Dos funciones resuelven quien sos, y se usan en todas las policies:** `es_admin()` y `mi_emprendedor_id()`. Las dos son `security definer` + `stable`: definer para que consultar `profiles` desde una policy de `profiles` no entre en recursion, stable para que se evalue una vez por query y no una por fila. **No volver a escribir subqueries de tenant a mano en una policy** — antes convivian dos formas (`emprendedores.propietario_id` y `profiles.emprendedor_id`) y no siempre coincidian.

**`pedidos` se escribe solo desde el servidor.** Tenia `for insert with check (true)`, y la clave publica viaja en el JavaScript de la web: cualquiera podia insertar pedidos con total cero. El checkout tiene que recalcular el total contra los precios reales del lado del server.

**Deuda marcada en la base, con `comment on`:** `ventas` (modelo viejo, una fila = un producto) y `productos.stock` (el real esta en `producto_variantes`, que se agota por combinacion). Las dos siguen vivas porque hoy las usa el panel — `dashboard/ventas/page.tsx` y `actions/productos.ts`. **Se borran al reescribir el panel, no antes.**

**`solicitudes_arrepentimiento`** cubre la Resolucion 424/2020: cada solicitud se numera `ARR-N` y hay 24 horas para responder. La vista `arrepentimientos_vencidos` calcula cuales pasaron el plazo — la regla vive ahi, no en el codigo.

**`pedidos.reservado_hasta`** existe pero **falta que Anita defina el plazo**: cuanto tiempo se le guarda el stock a un pedido por transferencia antes de liberarlo.

**Los 9 rubros definitivos** (19-ago-2026), con subrubros en `CATEGORIAS`: Hogar, Deco, Belleza y cosmética, Accesorios, Aromas y Tés, Indumentaria, Infantiles, Marroquinería y Regalería. Antes circularon otras listas — la de 11 rubros y una con Blanquería — que quedaron descartadas.

**Un producto puede vivir en varios rubros.** Anita lo dejó por escrito, y Regalería es directamente una selección cruzada de los demás. Por eso `Producto.categorias` es una lista; el primer elemento es el rubro de origen y define los selectores de la ficha y los relacionados.

**El Botón de Arrepentimiento es obligatorio por ley** (Resolución 424/2020): tiene que estar accesible desde la home y distinguirse del resto. Vive en `/arrepentimiento` y se enlaza desde el footer, que aparece en todas las páginas.

Desde el 20-ago-2026 es **un enlace más de la lista del pie**, no el recuadro centrado que era antes: Anita pidió bajarle el protagonismo. Se distingue por peso (700), color fuerte e ícono, que es lo que pide la norma — no exige tamaño desmedido, y las tiendas grandes del país lo resuelven igual. La bajada de los 10 días se sacó del pie porque el plazo ya está en Preguntas frecuentes y el derecho en Cambios y devoluciones, sección 12. **No volver a agrandarlo sin hablarlo.**

Al recibir una solicitud hay que responder **dentro de las 24 horas** con un código de identificación del trámite — hoy la demo solo abre WhatsApp. Eso necesita base de datos (para registrar el trámite y numerarlo) y correo institucional (para notificar), así que queda para cuando el proyecto salga del demo.

**La franja de servicios de la home son dos tarjetas, no tres iconos** (20-ago-2026). Antes eran Envios / Medios de pago / Pickup, con una linea cada uno; el tercero repetia el retiro en el local que ya anuncia el banner de arriba. Ahora son dos tarjetas con cuatro datos concretos cada una — monto de envio gratis, plazo, descuento por transferencia, cuotas — porque son los datos con los que el comprador decide y no deberia tener que entrar a la politica para verlos. El enlace "Ver todos los detalles" queda para el detalle completo.

Los puntos salen de `politicas.ts`: **no agregar ninguno que no este escrito ahi**. Los montos y la direccion se leen de `ENVIO_GRATIS_DESDE` y `CONTACTO`, no van quemados.

**Storage: dos buckets publicos, `productos` y `marcas`** (26-ago-2026). Publicos para LEER, porque el catalogo se navega sin cuenta; la escritura la controla la `005`. La convencion de rutas es **`productos/<producto_id>/<archivo>`**: el primer tramo de la ruta es lo que decide de quien es la foto, via `puede_tocar_foto()`. **Si se cambia esa convencion hay que cambiar la funcion**, o cualquiera puede borrar fotos ajenas. Los logos de `marcas` los sube solo el admin: son identidad de la plataforma.

Topes: 5 MB por foto de producto, 2 MB por logo. Cortan a proposito las subidas sin optimizar, que son las que despues hacen lenta la tienda.

**Auth apunta a `https://yoemprendedortienda.com`.** Estaba en `localhost:3000`, con lo cual los links de confirmar cuenta y recuperar contrasena hubieran llegado rotos. **Falta SMTP propio**: el plan gratuito de Supabase manda unos pocos mails por hora, que no alcanza para una tienda. Se resuelve enchufando Zoho con una contrasena de aplicacion, y de paso los mails salen desde `info@yoemprendedortienda.com`.

**Qué atributos muestra cada rubro** está en `ATRIBUTOS_POR_RUBRO` (`src/components/tienda/data.ts`). Un collar no tiene talle y una vela no tiene talle pero sí aroma: la ficha arma los selectores desde ahí, no con un formulario fijo.

**Cada color tiene su foto y su stock** (26-ago-2026). Las primeras fotos reales fueron un set de bano en cuatro colores, y se estaban usando como galeria: el selector de color no cambiaba la imagen, asi que el cliente elegia "negro" y seguia viendo el gris.

Ahora `Color` lleva `foto` y `stock` (`producto_variantes.foto_url` en la base, migracion `006`). Al elegir un color cambia la foto principal, se avisa cuanto queda, y si esta agotado el boton de comprar se apaga.

**Los circulos de color no se muestran si cada color tiene su foto** (26-ago-2026, pedido de Gabriel): las miniaturas de la galeria ya son el selector y muestran el color de verdad, no un punto aproximado. Tocar una miniatura elige ese color. Los circulos siguen existiendo para productos con colores pero sin una foto por color.

**El stock frena la compra en tres puntos**, no en uno: el boton de la ficha se apaga, `agregar()` ignora un item con stock cero, y en el carrito el boton de sumar se bloquea al llegar al tope con el aviso "Es todo lo que hay disponible". El item lleva su `stock` para eso. **Igual eso no alcanza**: el stock puede cambiar mientras el carrito espera, asi que al confirmar el pedido manda `descontar_stock()`, que revisa con la fila bloqueada.

Tres decisiones sobre como se muestra:

- **El color agotado se sigue viendo**, atenuado y con una barra cruzada. Ocultarlo haria que el cliente ni se entere de que ese color existe.
- **`stock: undefined` no muestra cartel**, `stock: 0` sí. Undefined significa "todavia no lo cargamos" — es el caso de los 55 productos de muestra. Cero es informacion real.
- **La cantidad exacta no se publica** (decision de Gabriel, 26-ago-2026). Con stock holgado no se muestra ningun cartel: decirle al cliente que hay 54 no lo ayuda a decidir y le muestra a la competencia cuanto stock maneja el negocio. **Solo se avisa debajo de `POCAS_UNIDADES` (5)** — "Ultimas 3 unidades", "Ultima unidad" — que es cuando el dato mueve la decision. El mismo umbral vive en la vista `variantes_disponibles`, para que la tienda y el panel digan lo mismo.

**En la grilla, el producto agotado se marca y se manda al final** — no se oculta. `estaAgotado()` en `data.ts` lo resuelve, y solo da true cuando **ninguna** combinacion tiene stock: con un color agotado y tres disponibles el producto sigue normal.

El criterio detras: ocultarlo haria que el cliente que lo busca crea que no se vende mas, y el buscador perderia una pagina que ya tiene posicionada — pero un agotado tampoco puede quedarse con el primer lugar de la fila, que es el mas valioso. La tarjeta sigue siendo un enlace: desde la ficha se ve el producto y a que color volver.

**`stock: undefined` no es agotado.** "No hay" y "no sabemos" son cosas distintas, y los 55 productos de muestra estan en el segundo caso.

La ficha **abre en el primer color disponible**, no en el primero de la lista: entrar y encontrar el boton deshabilitado sin entender por que es la peor primera impresion.

**El comprador nunca ve de qué marca es un producto** — ni en la home, ni en la categoría, ni en la ficha, ni en el carrito. Anita lo decidió porque si el cliente identifica la marca, la busca en Instagram y la próxima vez le compra directo, salteándose la plataforma. La marca sí puede aparecer en la confirmación del pedido ("Preparado por…"), donde la venta ya está cerrada. `pedido_items.emprendedor_id` se guarda igual, para liquidar.

## Cargar un producto real (28-ago-2026)

Se cargaron los nueve productos que faltaban de la tanda de Anita: los ocho de Jean Cartier y el juego de cortinas blackout. Con el set Moon son diez productos reales sobre 52.

**Los diez docs ya entraron** (28-ago-2026). Nueve de los trece productos reales tienen su descripción, sus medidas, su composición y sus beneficios copiados del documento de Anita. Traen datos que la foto no decía y varios que la contradecían:

- La bata se fabrica también en talle **S**, que la ficha del mayorista no listaba, y el color que en la foto parece morado se llama **Malbec**.
- El mantel mide **130 x 200 cm**, no dos metros de lado.
- La toalla del estuche es de **30 x 30 cm y 100% poliéster**, no de microfibra.
- Las estampas del acolchado se llaman Rosa corazón, Rosa animado, Rosa print y Azul universo.
- Las cortinas son **Arena, Gris claro y Gris oscuro**, y el doc confirma que la marca es Nathan Home.

**El set de cinco piezas es la línea Mist, no "acanalado".** Su doc estaba dentro de la carpeta del set Moon, que tenía dos: uno de tres piezas (Moon) y otro de cinco (Mist). Al slug `set-bano-acanalado`, que era una descripción inventada, lo reemplazó `set-bano-mist`, y las fotos se remontaron con ese nombre. Se pudo renombrar sin costo porque la tienda todavía no está indexada; **una vez publicada, cambiar un slug rompe el enlace y hay que redirigir**.

**Las descripciones nombran la marca y la tienda no la muestra.** Todos los docs de Anita dicen "de Jean Cartier" o "de Nathan Home" dentro del texto de venta, y eso choca con su propia regla de que el comprador no ve la marca en ningún punto de la compra. Se publicó **sin el nombre de la marca**, que es el único cambio que se les hizo: el resto es su texto tal cual. **Es una decisión que tiene que confirmar ella**, y si dice que la marca va, es cambiar una línea por producto.

**El kit dice Alaska en la carpeta y Marsella en el doc.** Las dos fuentes son de Anita, así que la regla de que el doc manda no lo resuelve. Quedó como "Kit Alaska King" hasta que ella diga cuál es.

**`composicion` y `beneficios` son campos nuevos de `ProductoDetalle`**, porque los docs vienen todos con esa forma: un párrafo de venta, una lista de características y una de beneficios. Los beneficios se muestran como lista y no dentro del párrafo: son cuatro o cinco frases sueltas que apretadas en un bloque no las lee nadie.

**Cada carpeta de producto trae su descripción** (acordado el 28-ago-2026). De ahora en adelante, adentro de la carpeta de fotos de cada producto viene un documento con el texto de la descripción. **Ese documento manda**: la descripción se copia de ahí, no se escribe mirando la foto. Los nueve que se cargaron el 28-ago son la excepción, porque todavía no existía esa convención y sus textos salieron de lo que se ve en la imagen y de las fichas del mayorista. Cuando lleguen los docs de esos nueve, hay que reemplazarlos.

Es la misma regla que ya vale para todo lo demás: lo que escribe Anita gana sobre lo que se decidió sobre la marcha para avanzar.

**Las opciones de un producto real viven en `OPCIONES_REALES`**, en `data.ts`. Un producto que figura ahí recibe **solo** lo que ahí dice: no se le agregan los talles S/M/L/XL ni el "Clásico / Premium" de `CATALOGO_OPCIONES`. Antes se los agregaba a cualquiera según su rubro, así que el set de baño ofrecía elegir entre dos variantes que no existen. Ofrecerle al cliente una opción inventada es peor que no ofrecerle ninguna: la elige, la paga, y después hay que explicarle. Los 42 productos del demo siguen con las genéricas porque no tienen otra cosa.

`COLORES_POR_PRODUCTO` ahora se deriva de `OPCIONES_REALES`, así que **hay una sola lista que mantener**. La bata es el caso que obligó a esto: sus talles son M, L y XL, no los cuatro de muestra.

**La foto principal ya no queda atada al color.** Antes, si el color elegido tenía foto, la imagen se calculaba a partir del color y las miniaturas que no eran de ningún color no hacían nada al tocarlas. Eso alcanzaba mientras el único producto real tenía una foto por color y nada más, pero el set Mist y el set de cortina traen además una foto de ambiente. Ahora la foto es estado propio: elegir un color la mueve, y tocar cualquier miniatura también. La ficha además **abre en la foto del color con el que abre**, que no siempre es la primera.

**Qué fotos del proveedor no se publican.** De las 34 fotos nuevas se subieron 28. Las seis que quedaron afuera, por tres motivos:

- **Las que llevan el logo de Jean Cartier sobreimpreso** (dos del kit Alaska, una del set de cortina). Chocan de frente con la regla de que el comprador no ve la marca. El logo estampado en el envase del producto sí queda, porque es el producto.
- **Las fichas del mayorista**, con textos como "Consultá disponibilidad de talle y/o color". Es lenguaje de venta a comercios, no a la clienta final. De la de la bata salieron las medidas por talle, que sí sirven.
- **Una con marca de agua de otra empresa**, "Nathan Home", en las cortinas blackout.

**La foto de la ficha abre un visor** (`VisorFotos.tsx`, 28-ago-2026). En la ficha la imagen entra a 552 px y hay terminaciones que a ese tamaño no se ven. El visor la lleva hasta el 92% de la pantalla. Cierra con Escape, con el fondo o con la X, y las flechas del teclado pasan de foto.

**El zoom tiene dos niveles, 2x y 3,5x**, en `NIVELES`. Dos y no uno porque no es lo mismo mirar una costura que leer una etiqueta, y no tres porque a partir de ahí las fotos que tenemos no dan más detalle, solo más píxel. Se sube y se baja con los botones, que se apagan en cada tope, y tocar la foto va pasando de nivel y vuelve al principio. **El nivel se muestra escrito**: si no, ampliar dos veces y que la segunda no haga nada se lee como que el visor se colgó.

**Con el zoom puesto la foto se arrastra**, con la manito. Va por eventos de puntero, no por eventos de mouse y de touch por separado: el mismo código sirve para el dedo y para el mouse, y dos caminos distintos es como se terminan desincronizando. `touch-action: none` en `.visor-foto-zoom` es lo que evita que en el celular el gesto se lo lleve el navegador para scrollear.

Cuatro decisiones más adentro:

- **La foto no se puede arrastrar más allá de su borde.** Pasado eso el cliente queda mirando el fondo negro sin entender qué pasó. El tope es `ancho * (escala - 1) / 2` para cada lado.
- **Arrastrar no cambia el zoom.** Soltar después de mover más de tres píxeles no cuenta como toque, o mover la foto la ampliaría sola cada vez.
- **Pasar de foto en el visor también mueve el color elegido**, igual que tocar una miniatura. Si no, se salía del visor con la foto del gris y el selector diciendo "Verde".
- **La página de atrás se traba mientras el visor está abierto**, con el mismo patrón que ya usaba el buscador.

**Ojo al verificar el visor desde el navegador integrado:** con el panel oculto la página no compone cuadros, la transición del `transform` no avanza nunca y `getComputedStyle` devuelve la identidad aunque el estilo en línea diga `scale(2)`. Parece que el zoom no anda y anda perfecto. Para medirlo hay que forzar un viewport con `resize_window` y leerlo durante el arrastre, que corre sin transición.

**El zoom deja a la vista qué fotos son chicas.** Las de blanquería vinieron en 640 px y ampliadas se ven blandas; las de muebles son de 1200 y aguantan. El visor no inventa detalle que la foto no tiene, y que se note es útil: marca cuáles conviene volver a pedirle a Anita. **No se arregla con un upscale.**

**Los dos juegos de comedor van como artículos separados, no como dos colores de uno** (28-ago-2026). Son el mismo mueble en caoba y en negro, y modelarlo como un producto con dos colores era lo natural, pero **el precio real puede no ser el mismo** y la ficha tiene un precio solo: un selector de color le mostraría al cliente un precio que para la otra terminación no vale. Esa es la línea para decidirlo más adelante: mismo precio, un producto con dos colores; precios distintos, dos productos.

**Las fotos no coinciden en cuántas sillas trae el juego.** En unas se cuentan seis y en otras ocho. Por eso ni el nombre ni la descripción dicen un número: poner "6 sillas" y que después sean otras es un reclamo asegurado. Falta que Anita lo confirme.

**Estas fotos sí hubo que optimizarlas.** Vinieron en PNG de 1 a 2,3 MB y en cuatro proporciones distintas, aunque la carpeta dijera "optimizadas". Quedaron en webp de 1200 x 1200, entre 17 y 153 KB. **Se rellenaron con blanco hasta el cuadrado en vez de recortarlas**: el fondo ya era blanco, así que el relleno no se ve, y recortar una de 1672 x 941 a cuadrada se comía media mesa. El color del relleno se toma de la esquina de cada imagen, no se asume blanco puro.

**Son renders, no fotografías**, y uno de los archivos originales venía con nombre de ChatGPT. La foto ambientada de la mesa negra quedó afuera: tenía etiquetas de frascos con texto ilegible, que es la clase de detalle que hace que una tienda parezca improvisada. **Vale confirmar con Anita que el mueble real se parece al render** antes de vender contra estas imágenes.

**Los muebles son otro proveedor.** Ese mismo día entraron una cama, una cómoda y una mesa de luz, que no vienen de Jean Cartier ni de ninguna marca identificable. Quedaron con `marca: 'A confirmar'`. El comprador no ve ese campo, pero se usa para liquidarle a quien corresponda, así que no puede llevar una marca inventada.

De la cama llegaron once tomas del mismo mueble y se publicaron ocho. Quedaron afuera una lateral que es la misma que otra espejada, una vista desde arriba que no se entiende, y un montaje con una franja blanca en el medio. **Once miniaturas es una galería que nadie recorre**, y las tres que se sacaron no agregaban nada que no muestre otra.

**Los muebles son los únicos que siguen sin doc**, y además llegaron **sin medidas**, que en un mueble es el dato que decide la compra. Sus descripciones son provisorias, escritas de lo que se ve en la foto.

**El juego de cortinas blackout no es de Jean Cartier.** Ni la carpeta lo dice ni la foto lo muestra, y la marca de agua apunta a Nathan Home. Quedó cargado con esa marca y **no** se sumó a `MARCAS`, que es la lista institucional de las emprendedoras. Falta que Anita confirme de quién es.

**Una foto quedó chica:** la de la estampa Estrellas del acolchado infantil mide 240 px y se muestra a 552 en la ficha, así que se ve blanda. Se publicó igual porque es la única de ese dibujo. Vale pedirle a Anita la original.

**El acolchado infantil va en Hogar, no en Infantiles.** El rubro de origen define los selectores, y en Infantiles la ficha pediría talle, que un acolchado no tiene. Igual aparece en la fila de Infantiles, que es donde lo busca la clienta, porque `categorias` es una lista.

**Los precios de los diez productos reales son estimados.** Están puestos para que la ficha no quede vacía y **hay que reemplazarlos por los de Anita antes de vender**. El stock quedó sin cargar a propósito (`undefined`, que no muestra cartel), salvo el del set Moon, que arrastra stock de prueba de cuando se armó el molde.

**Las estampas se cargan como colores.** El acolchado infantil viene en cuatro dibujos, no en cuatro colores, y se modelaron con el mismo `Color` porque es lo que ya tiene foto y stock propios. La ficha los rotula "Color", que para una estampa no es la palabra. Si aparecen más productos así, conviene que `Color` lleve su propia etiqueta.

**Branding de la landing de planes** (`/quiero-vender`): amarillo `#e4c763` sobre beige `#fff7dc`, negro `#313131`, verde `#55643f`, dorado `#7d6210`. League Spartan para títulos y Open Sans para cuerpo, vía `next/font`.

El amarillo de marca es solo para fondos y para texto sobre negro: sobre blanco da 1.7:1. Para texto sobre superficies claras va `--dorado`. El verde original del diseño (`#7f8f6a`) daba 3.2:1 y se oscureció a `#55643f`.

**El catálogo (`/productos`) usa otra paleta:** terracota `#C1502E` sobre crema `#FBF6F0`, elegida el 14-ago-2026 tras auditar los referentes del rubro (Etsy, Shopify, Mercado Libre). El criterio que salió de esa auditoría: el color de marca va en botones y badges, nunca como fondo de una sección entera.

**Las fotos del hero y de la sección "qué es" son placeholders de Unsplash**, marcados con constantes en `src/app/page.tsx`. Faltan las fotos reales del local.
