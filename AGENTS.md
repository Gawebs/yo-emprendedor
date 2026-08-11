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

**Las tres promos del hero van sin emojis**, en bloques separados, no como columnas dentro de un banner. Gabriel las pidió así el 10-ago-2026.

**El texto de esas promos va a 16px y es deliberado:** a 18px, en columnas de 216px, la frase más larga se parte en tres renglones y las cajas quedan desparejas. Si se sube el tamaño hay que acortar el texto.

Los textos viven en una constante arriba de `src/components/sections/Hero.tsx`, no inline.

**Branding:** amarillo mostaza (~#DAA520) y rojo/naranja (~#FF6B35), tokens OKLCH en CSS variables. Logo con tipografía script, cuerpo sans-serif. Tono emprendedor, local, accesible. CTAs: "Quiero vender!" y "Explorar ahora".
