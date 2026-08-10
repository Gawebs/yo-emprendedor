# Yo Emprendedor — Marketplace Local Tucumán

**Plataforma de marketplace para emprendedores de San Miguel de Tucumán.**

Conecta emprendedores locales con clientes finales sin necesidad de crear su propia tienda online.

## 🎯 Propósito

- **Para clientes:** Comprar productos de múltiples emprendedores en un solo lugar
- **Para emprendedores:** Vender sin complicaciones de trámites, con panel de control completo
- **Para Yo Emprendedor (Anita):** Gestionar el marketplace y quedarse con comisión

## 🏗️ Stack

- **Frontend:** Next.js 16 (canary) + React 19 + Tailwind v4
- **Backend:** Supabase (PostgreSQL + Auth + Storage)
- **Hosting:** Vercel (org Gawebs)
- **Auth:** Supabase Auth (magic link + password)

## 🚀 Inicio Rápido

### 1. Instalar Dependencias

```bash
npm install
```

### 2. Configurar Variables de Entorno

Copiar `.env.local.example` a `.env.local` y rellenar con las credenciales de Supabase:

```bash
cp .env.local.example .env.local
```

Luego editar `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
CRON_SECRET=your-secret
```

### 3. Hacer Push del Schema a Supabase

```bash
npm run db:push
```

### 4. Ejecutar Dev Server

```bash
npm run dev
```

La app estará disponible en **http://localhost:3000**

## 📁 Estructura

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page
│   ├── productos/         # Catálogo
│   ├── dashboard/         # Panel emprendedor (futuro)
│   └── api/cron/          # Automaciones
├── components/
│   ├── layout/            # Header, Footer, FloatingCTA
│   ├── sections/          # Hero, Categorias, etc
│   └── productos/         # ProductoCard, CategoriaFilter
├── contexts/              # TenantContext
├── lib/supabase/          # Clientes Supabase (client/server/admin)
├── constants/             # Contacto, URLs, etc
└── styles/globals.css     # Tokens OKLCH + CSS variables
```

## 🎨 Branding

### Colores

- **Primario:** Amarillo Mostaza (OKLCH 70% 0.2 50)
- **Acento:** Rojo/Naranja (OKLCH 60% 0.22 15)
- **Neutros:** Escala de grises OKLCH

Los colores están definidos como CSS variables en `src/styles/globals.css` para fácil mantenimiento.

### Tipografía

- **Logo:** Script elegante
- **Cuerpo:** Sans-serif limpio (sistema fonts)

## 🔐 Seguridad

- RLS (Row Level Security) activo en todas las tablas
- Multi-tenant: cada emprendedor ve solo sus datos
- Server Actions para todas las mutaciones
- Service role key solo en cron/webhooks

Ver `ARCHITECTURE.md` para detalles.

## 📚 Documentación

- **`PRODUCT.md`** — Product brief (usuarios, funcionalidades, personalidad)
- **`ARCHITECTURE.md`** — Decisiones técnicas (patrones, DB, auth)
- **`ESTRUCTURA.md`** — Árbol de directorios detallado
- **`supabase/migrations/001_init_schema.sql`** — Schema de la DB con RLS

## 🚢 Deployment

### Vercel

```bash
git push origin main
```

Auto-deploya en Vercel (org Gawebs).

### Supabase

El schema se sincroniza automáticamente con:

```bash
npm run db:push
```

## 🔮 Roadmap

### MVP (actual)
- ✅ Landing page
- ✅ Catálogo de productos
- ✅ Auth básico
- ⏳ Dashboard emprendedor (en progreso)

### MVP+1
- Carrito y checkout
- Email notificaciones
- Admin dashboard

### MVP+2
- Mobile app
- Gift Cards
- Analytics avanzado

## 👥 Contacto

- **Email:** yoemprendedortucuman@gmail.com
- **Teléfono:** +54 381 214-6172
- **Dirección:** 24 de Septiembre 734, San Miguel de Tucumán

## 📄 Licencia

Privado — Propiedad de Anita y Yo Emprendedor.

---

**Creado por:** Gabriel (Gawebs)  
**Fecha:** Agosto 2026  
**Patrón:** Nexaia (Next.js + Supabase + RLS)
