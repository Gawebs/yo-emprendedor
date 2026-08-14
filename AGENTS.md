<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Yo Emprendedor — marketplace local de Tucumán

Marketplace B2C más dashboard para emprendedores, para **Anita** (pareja de Ale). Local físico en 24 de Septiembre 734, San Miguel de Tucumán. Contacto: yoemprendedortucuman@gmail.com, +54 381 214-6172.

## Estado real (11-ago-2026)

Deployado en **yo-emprendedor.vercel.app** y funcionando, pero **con datos mock**: no hay `.env.local`, solo `.env.local.example`, así que Supabase todavía no está conectado. Las páginas de productos usan datos falsos.

Repo: `Gawebs/yo-emprendedor`.

Lo que falta para producción real: crear el proyecto de Supabase, correr el schema (`npm run db:push`), completar la integración de auth en las Server Actions y cablear las páginas a datos reales.

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

**Branding de la landing:** amarillo `#e4c763` sobre beige `#fff7dc`, negro `#313131`, verde `#55643f`, dorado `#7d6210`. League Spartan para títulos y Open Sans para cuerpo, vía `next/font`.

El amarillo de marca es solo para fondos y para texto sobre negro: sobre blanco da 1.7:1. Para texto sobre superficies claras va `--dorado`. El verde original del diseño (`#7f8f6a`) daba 3.2:1 y se oscureció a `#55643f`.

**El catálogo (`/productos`) usa otra paleta:** terracota `#C1502E` sobre crema `#FBF6F0`, elegida el 14-ago-2026 tras auditar los referentes del rubro (Etsy, Shopify, Mercado Libre). El criterio que salió de esa auditoría: el color de marca va en botones y badges, nunca como fondo de una sección entera.

**Las fotos del hero y de la sección "qué es" son placeholders de Unsplash**, marcados con constantes en `src/app/page.tsx`. Faltan las fotos reales del local.
