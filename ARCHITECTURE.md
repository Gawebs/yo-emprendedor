# Yo Emprendedor — Arquitectura

## Stack

- **Frontend:** Next.js 16 (canary) + React 19 + Tailwind v4
- **Backend:** Supabase (PostgreSQL + PostgREST + Auth + Storage)
- **Hosting:** Vercel (org Gawebs)
- **Auth:** Supabase Auth (magic link + password)
- **Storage:** Supabase Storage (fotos de productos)

## Estructura de Datos

Ver `supabase/migrations/001_init_schema.sql`.

**Patrón multi-tenant:**
- `emprendedores` = tabla de tenants
- Cada tabla de negocio (`productos`, `ventas`, etc) tiene `emprendedor_id`
- RLS activo en todas las tablas: cada emprendedor ve solo sus datos
- Tablas públicas (`categorias`, `ofertas_dia`): visible a todos sin auth
- `productos`: lectura pública, escritura privada (solo emprendedor dueño)

## Clientes Supabase

Patrón de Cifra-app (3 clientes separados):

- `src/lib/supabase/client.ts` — Browser, anon key, para componentes 'use client'
- `src/lib/supabase/server.ts` — SSR, cookies vía @supabase/ssr, RLS real con sesión del usuario
- `src/lib/supabase/admin.ts` — Service role, SOLO cron/webhooks/tareas de sistema

⚠️ **Nunca usar admin.ts en componentes cliente o rutas de negocio sin gate de auth previo.**

## Autenticación y Contexto

- `src/contexts/TenantContext.tsx` — Resuelve `emprendedor_id` una sola vez al login
- Todos los componentes que escriban en `productos`, `ventas`, etc deben usar `useTenant()` para obtener el tenant dinámicamente, **nunca hardcodear un ID**

## Server Actions vs API Routes

**Server Actions** (`src/actions/*.ts`, `'use server'`):
- Para toda mutación: `createProducto()`, `updateProducto()`, `deleteVenta()`
- Forma uniforme: `createClient()` → `auth.getUser()` → validación → `revalidatePath()` → `redirect()` si aplica

**API Routes** (`src/app/api/*`):
- Solo para: webhooks (pagos), cron (liquidaciones), export (PDF/CSV), callbacks OAuth
- Nunca para CRUD normal que podría ser Server Action

## Nomenclatura

- **UI, rutas, funciones, nombres de negocio:** español (`crearProducto`, `actualizarStock`, `lista_de_precios`)
- **Infraestructura, tablas, columnas técnicas:** inglés (`productos`, `emprendedor_id`, `price_original`)
- Excepción: conceptos legales argentinos mantienen término original (`cuit`, `razon_social`, `legajo_numero`)

## Branding

Ver `PRODUCT.md` y delegado a `nexaia-brand-designer`:

- **Colores:** Amarillo mostaza (optimismo) + Rojo/Naranja (urgencia, CTAs)
- **Tipografía:** Script para logo; sans-serif limpio para cuerpo (Tailwind default)
- **Tonalidad:** Emprendedora, local, accesible

## Validación

- **Patrón uniforme:** `if (condition) return { error: string }`
- No usar excepciones sin capturar
- Mensajes de error legibles para usuario final
- Sin librerías de validación (zod) — manual si es simple, considerar si es complejo

## Performance

- Server Components async leyendo Supabase directo en `page.tsx`
- Sin SWR/React Query salvo necesidad real de revalidación cliente
- Índices sobre `tenant_id`, `emprendedor_id`, y FKs en policies RLS

## Security Checklist

- [ ] RLS activo en toda tabla nueva
- [ ] Ningún `emprendedor_id` hardcodeado — siempre desde `useTenant()` o `auth.getUser()`
- [ ] `admin.ts` no importado en `src/app/*` sino solo en `src/app/api/cron/*`
- [ ] Cron routes gateadas con `CRON_SECRET`
- [ ] Acciones destructivas requieren confirmación (`confirm()` nativo)

## Roadmap

### MVP (actual)
- Landing page
- Catálogo de productos (grid, filtro, detalle)
- Auth básico (emprendedor login/registro)
- Dashboard emprendedor (6 módulos CRUD)

### MVP+1
- Carrito y checkout
- Admin dashboard interno (moderación, reportes)
- Email notificaciones transaccionales

### MVP+2
- Mobile app (React Native)
- Gift Cards
- Analytics avanzado

## Delegaciones a Skills

- `nexaia-brand-designer` — Landing + catálogo visual
- `crud-module-builder` — Dashboard emprendedor (módulos)
- `automation-guardrail-engineer` — Liquidaciones automáticas, notificaciones
- `security-reviewer` — Auth, roles, RLS

---

**Última actualización:** 2026-08-10 por Gabriel (Gawebs)
