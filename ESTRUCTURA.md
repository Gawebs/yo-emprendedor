# Yo Emprendedor — Estructura de Directorios

```
yo-emprendedor/
├── .claude/
│   └── launch.json                 # Config para dev server (npm run dev)
├── supabase/
│   └── migrations/
│       └── 001_init_schema.sql     # Schema con RLS (tablas, policies, enums)
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout (TenantProvider, branding)
│   │   ├── page.tsx                # Landing page (home)
│   │   ├── auth/
│   │   │   ├── login/page.tsx
│   │   │   ├── signup/page.tsx
│   │   │   └── logout/route.ts
│   │   ├── productos/
│   │   │   ├── page.tsx            # Catálogo (grid, filtros)
│   │   │   └── [id]/page.tsx       # Detalle de producto
│   │   ├── dashboard/
│   │   │   ├── layout.tsx          # Layout emprendedor (sidebar)
│   │   │   ├── page.tsx            # Overview/bienvenida
│   │   │   ├── productos/page.tsx  # CRUD productos
│   │   │   ├── ventas/page.tsx     # Seguimiento ventas
│   │   │   ├── liquidaciones/page.tsx
│   │   │   ├── notificaciones/page.tsx
│   │   │   └── turnos/page.tsx
│   │   ├── api/
│   │   │   └── cron/
│   │   │       ├── liquidaciones/route.ts  # Genera liquidaciones automáticas
│   │   │       └── notificaciones/route.ts # Envía notificaciones
│   │   └── admin/                  # (Futuro MVP+1)
│   ├── actions/
│   │   ├── auth.ts                 # Server Actions de autenticación
│   │   ├── productos.ts            # Crear, editar, eliminar producto
│   │   ├── ventas.ts               # Crear, editar venta
│   │   └── turnos.ts               # Crear, editar turno
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx         # Para dashboard
│   │   │   └── Footer.tsx
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   └── SignupForm.tsx
│   │   ├── productos/
│   │   │   ├── ProductoGrid.tsx
│   │   │   ├── ProductoCard.tsx
│   │   │   ├── ProductoDetalle.tsx
│   │   │   └── CategoriaFilter.tsx
│   │   ├── dashboard/
│   │   │   ├── ProductosTable.tsx  # Lista + ABM
│   │   │   ├── VentasChart.tsx     # Gráficos/stats
│   │   │   ├── LiquidacionesTable.tsx
│   │   │   ├── NotificacionesList.tsx
│   │   │   └── TurnosForm.tsx
│   │   └── common/
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Modal.tsx
│   │       └── Toaster.tsx
│   ├── contexts/
│   │   └── TenantContext.tsx       # Resuelve emprendedor_id del usuario actual
│   ├── hooks/
│   │   ├── useTenant.ts            # (Re-export de TenantContext)
│   │   └── useProducts.ts          # (Posible helper para queries)
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts           # Browser client (anon key)
│   │   │   ├── server.ts           # SSR client (cookies, RLS real)
│   │   │   └── admin.ts            # Service role (SOLO cron/webhooks)
│   │   ├── database.types.ts       # Types generados (schema de DB)
│   │   └── utils.ts                # Helpers (formatPrice, etc)
│   ├── styles/
│   │   └── globals.css             # Tailwind + CSS variables (colores)
│   └── types/
│       └── index.ts                # Types generales de la app
├── .env.local.example              # Variables de entorno (NEXT_PUBLIC_SUPABASE_URL, etc)
├── PRODUCT.md                       # Product brief de Anita
├── ARCHITECTURE.md                  # Decisiones técnicas
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
└── README.md
```

## Notas

- **`src/app`** — Todas las rutas y layouts (Next.js App Router)
- **`src/actions`** — Server Actions para mutaciones (formas uniforme)
- **`src/components`** — Componentes reutilizables (UI + lógica)
- **`src/contexts`** — React Context (TenantProvider)
- **`src/lib/supabase`** — Clientes Supabase (client, server, admin)
- **`supabase/migrations`** — Schema SQL (versionado, ejecutable)

## Inicio del Proyecto

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar .env.local con credenciales Supabase
# (copiar de .env.local.example y rellenar)

# 3. Hacer push del schema a Supabase
npm run db:push

# 4. Iniciar dev server
npm run dev

# La app estará en http://localhost:3000
```

## Workflow Típico

1. **Nueva página/ruta** → `src/app/nuevaruta/page.tsx`
2. **Nueva mutación (crear/editar/borrar)** → `src/actions/dominio.ts` (Server Action)
3. **Nuevo componente reutilizable** → `src/components/categoria/ComponenteName.tsx`
4. **Nuevo hook/utilidad** → `src/lib/` o `src/hooks/`
5. **Nueva tabla en DB** → `supabase/migrations/NNN_description.sql`

---

**Vigencia:** Agosto 2026 — versión Nexaia pattern (Next.js 16 canary)
