# Yo Emprendedor — Plataforma de Marketplace Local

**Cliente:** Anita (pareja de Ale)  
**Ubicación:** San Miguel de Tucumán (local comercial, Calle 24 de Septiembre 734)  
**Tipo:** Marketplace B2C + Admin Panel para emprendedores vendedores  
**Fecha:** Agosto 2026

---

## Usuarios

### Usuario 1: Comprador (B2C — público)
- **Quién:** Clientes finales que buscan productos variados en un marketplace local
- **Necesidades:**
  - Navegar categorías (casa, tech, bebidas, regalos, moda, niños, belleza, joyería)
  - Ver productos con fotos, precio, ofertas
  - Conocer opciones de pago y envío
  - Acceso a "Gift Cards" (posible funcionalidad futura)
  - Contacto directo (WhatsApp, email, teléfono)
- **Patrón de compra:** Browse → Detalle → Carrito (posible, no confirmado aún)

### Usuario 2: Emprendedor Vendedor (B2B — autenticado)
- **Quién:** Pequeños emprendedores/vendedores que usan la plataforma para vender sus productos
- **Necesidades:**
  - **Dashboard personalizado:** bienvenida con marca + sucursal
  - **Gestión de productos:** ABM (crear, editar, eliminar, stock)
  - **Seguimiento de ventas:** últimas transacciones, totales, analytics básicos
  - **Liquidaciones:** historial de liquidaciones (últimos 12 meses)
  - **Notificaciones:** intimaciones (stock bajo), cambios de precio, reposiciones
  - **Turnos:** sistema para dejar mercadería en el local
  - **Novedades:** sección donde ver oportunidades, descargas, info importante
- **Permisos:** RLS por sucursal/tenant (cada emprendedor ve solo sus datos)

### Usuario 3: Admin (Yo Emprendedor — internal)
- **Quién:** Gabriel y/o personal interno que gestiona la plataforma
- **Necesidades:**
  - Gestión de emprendedores (crear, activar, desactivar)
  - Moderar productos (aprobar, rechazar si están fuera de políticas)
  - Gestionar categorías y ofertas del día
  - Reportes de liquidación y ventas globales
  - Configuración de reglas (comisiones, envío, promociones)
- **Nota:** El admin panel interno es **futuro MVP+1**; MVP es solo landing + dashboard emprendedor

---

## Propósito

Crear un **marketplace local de Tucumán** donde:
1. **Clientes finales** compren productos de múltiples emprendedores en un lugar centralizado
2. **Emprendedores** vendan sin necesidad de web/tienda propia, pagando comisión
3. **Yo Emprendedor** (Anita) gestione la plataforma y se quede con margen

---

## Personalidad de Marca

**Tonalidad:** Emprendedora, accesible, moderna, local.  
**Valor prop:** "Vende más, sin complicaciones. Desde tu sucursal de Tucumán al mundo."  
**Promesas en landing:**
- 10% off por transferencia/efectivo
- 3 cuotas sin interés
- Envío gratis en primera compra
- "Quiero vender!" — CTA directo para emprendedores

**Visual:**
- Colores: Amarillo mostaza (optimista, emprendedor) + Rojo/Naranja (urgencia, promociones)
- Tipografía: Script elegante para logo; sans-serif limpio para cuerpo (accesible)
- Iconografía: 9 categorías con íconos claros (casa, tech, hogar, bebidas, regalos, moda, niños, belleza, joyería)

---

## Anti-referencias

- ❌ No copiar diseño de Mercado Libre (demasiado corporativo, no local)
- ❌ No ser genérico — el local físico en Tucumán es parte del valor
- ❌ No usar modal de confirmación innecesarios en flujos comprador
- ❌ No asume que cada emprendedor quiere "admin dashboard corporativo" — simplicidad primero

---

## Principios de Diseño

1. **Simplicidad comprador:** Navegar, ver, comprar. Sin ruido.
2. **Funcionalidad emprendedor:** Todo en un panel compacto. 6 secciones clave, no 20.
3. **Confianza local:** Dirección visible, contacto directo, branding consistente.
4. **Conversión:** CTAs claras ("Quiero vender!", "Explorar ahora").
5. **Reversible:** Acciones CRUD sin modales — `confirm()` nativo es suficiente para alertas bajas.

---

## Datos de Contacto (Footer)

- **Dirección:** 24 de Septiembre 734, San Miguel de Tucumán
- **Email:** yoemprendedortucuman@gmail.com
- **Teléfono:** +54 381 214-6172
- **Redes:** (por confirmar — probable: Instagram, WhatsApp)

---

## MVP Scope

### ✅ Incluido (Fase 1 — este proyecto)
- Landing page (hero + categorías + ofertas del día + CTA)
- Catálogo de productos (grid, filtro por categoría, detalle de producto)
- Sistema de auth básico (emprendedor login/registro)
- Dashboard emprendedor (6 módulos: productos, ventas, liquidaciones, notificaciones, turnos, novedades)
- Server Actions para mutaciones (crear/editar/eliminar producto)
- RLS por tenant (cada emprendedor ve solo sus datos)

### ❌ Futuro (MVP+1/+2)
- Carrito y checkout (posible Stripe)
- Admin dashboard interno (moderación, reportes)
- Email notificaciones (transaccionales)
- Mobile app (posible React Native)
- Gift Cards (como producto virtual)

---

## Estructura de Datos (Summary)

**Tablas principales:**
- `users` (auth + metadata)
- `emprendedores` (tenants, vinculados a users)
- `productos` (SKU, precio, stock, tenant_id)
- `categorias` (dropdown fijo)
- `ofertas_dia` (promociones destacadas)
- `ventas` (transacciones, tenant_id)
- `liquidaciones` (sumarios mensuales, tenant_id)
- `notificaciones` (alertas por tenant)
- `turnos` (sistema de dejar mercadería)

*(Detalle en `ARCHITECTURE.md` cuando se cree)*

---

## Tecnología

- **Frontend:** Next.js 16 (canary) + React 19 + Tailwind v4
- **Backend:** Supabase (PostgreSQL + PostgREST + Auth + Storage)
- **Hosting:** Vercel (org Gawebs)
- **Auth:** Supabase Auth (magic link + password)
- **Storage:** Supabase Storage (fotos de productos)

---

## Autor y Revisiones

- **Creado por:** Gabriel (Gawebs) a partir de brief de Anita
- **Fecha:** 2026-08-10
- **Status:** Listo para delegar a arquitectura de datos + branding

---

**Siguiente:** Leer este documento antes de cualquier código. Revisar con `supabase-tenant-architect`, `nexaia-brand-designer`, y `crud-module-builder`.
