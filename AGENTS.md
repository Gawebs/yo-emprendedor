<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Yo Emprendedor — marketplace local de Tucumán

Marketplace B2C más dashboard para emprendedores, para **Anita** (pareja de Ale). Local físico en 24 de Septiembre 734, San Miguel de Tucumán. Contacto: yoemprendedortucuman@gmail.com, +54 381 214-6172.

## Estado real (19-ago-2026)

Deployado en **yo-emprendedor.vercel.app**. Repo: `Gawebs/yo-emprendedor`.

El sitio tiene **dos secciones**, y esa división es la clave para entenderlo:

1. **La tienda**, en la raíz (`/`). Es el canal de ventas y la puerta de entrada.
2. **La sección de emprendedoras**, en `/quiero-vender`. Vende los planes.

Está **todo con datos mock**: no hay `.env.local`, Supabase no está conectado y no cobra. Los pedidos y las cuentas se guardan en `localStorage`, así que solo existen en el navegador de quien los creó — decisión consciente mientras sea demo.

Lo que falta para producción: crear el proyecto de Supabase, correr las migraciones, reemplazar `CuentaContext` por Supabase Auth, cablear las páginas a datos reales e integrar Mercado Pago.

## Fuente de verdad del contenido

Los textos, políticas y decisiones de negocio salen de los documentos que redactó **Anita**, en `Downloads/YO EMPRENDEDOR/Políticas y protocolos/`. **Mandan los documentos**, no lo que se haya decidido sobre la marcha para avanzar: ya pasó dos veces que el checkout hacía lo contrario de lo que decían sus propios términos.

De ahí salieron dos correcciones que conviene no revertir sin leerlos:

- **La tienda online no acepta efectivo** (Términos, sección 14). El efectivo es solo para compras presenciales en el local. Por eso el 10% de descuento quedó atado a la transferencia.
- **Hay que registrarse para comprar** (Términos, sección 5). El checkout redirige a `/auth/login?volver=/checkout` y al volver prellena los datos de la cuenta.

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

**Los 9 rubros definitivos** (19-ago-2026), con subrubros en `CATEGORIAS`: Hogar, Deco, Belleza y cosmética, Accesorios, Aromas y Tés, Indumentaria, Infantiles, Marroquinería y Regalería. Antes circularon otras listas — la de 11 rubros y una con Blanquería — que quedaron descartadas.

**Un producto puede vivir en varios rubros.** Anita lo dejó por escrito, y Regalería es directamente una selección cruzada de los demás. Por eso `Producto.categorias` es una lista; el primer elemento es el rubro de origen y define los selectores de la ficha y los relacionados.

**El Botón de Arrepentimiento es obligatorio por ley** (Resolución 424/2020): tiene que estar accesible desde la home, destacado en visibilidad y tamaño. Vive en `/arrepentimiento` y se enlaza desde el footer, que aparece en todas las páginas. Al recibir una solicitud hay que responder **dentro de las 24 horas** con un código de identificación del trámite — hoy la demo solo abre WhatsApp; cuando haya backend eso debe registrarse y dispararse solo.

**Qué atributos muestra cada rubro** está en `ATRIBUTOS_POR_RUBRO` (`src/components/tienda/data.ts`). Un collar no tiene talle y una vela no tiene talle pero sí aroma: la ficha arma los selectores desde ahí, no con un formulario fijo.

**El comprador nunca ve de qué marca es un producto** — ni en la home, ni en la categoría, ni en la ficha, ni en el carrito. Anita lo decidió porque si el cliente identifica la marca, la busca en Instagram y la próxima vez le compra directo, salteándose la plataforma. La marca sí puede aparecer en la confirmación del pedido ("Preparado por…"), donde la venta ya está cerrada. `pedido_items.emprendedor_id` se guarda igual, para liquidar.

**Branding de la landing de planes** (`/quiero-vender`): amarillo `#e4c763` sobre beige `#fff7dc`, negro `#313131`, verde `#55643f`, dorado `#7d6210`. League Spartan para títulos y Open Sans para cuerpo, vía `next/font`.

El amarillo de marca es solo para fondos y para texto sobre negro: sobre blanco da 1.7:1. Para texto sobre superficies claras va `--dorado`. El verde original del diseño (`#7f8f6a`) daba 3.2:1 y se oscureció a `#55643f`.

**El catálogo (`/productos`) usa otra paleta:** terracota `#C1502E` sobre crema `#FBF6F0`, elegida el 14-ago-2026 tras auditar los referentes del rubro (Etsy, Shopify, Mercado Libre). El criterio que salió de esa auditoría: el color de marca va en botones y badges, nunca como fondo de una sección entera.

**Las fotos del hero y de la sección "qué es" son placeholders de Unsplash**, marcados con constantes en `src/app/page.tsx`. Faltan las fotos reales del local.
