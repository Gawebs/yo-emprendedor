-- Yo Emprendedor — Schema inicial con RLS
-- Multi-tenant: emprendedores = tenants
-- RLS: cada emprendedor ve solo sus datos
-- Públicos: categorías, ofertas, productos (lectura pública)

-- ============================================================================
-- 1. EXTENSIONES
-- ============================================================================
create extension if not exists "uuid-ossp";
create extension if not exists "http";

-- ============================================================================
-- 2. ENUMS
-- ============================================================================
create type producto_estado as enum ('activo', 'inactivo', 'descontinuado');
create type venta_estado as enum ('pendiente', 'confirmada', 'entregada', 'cancelada');
create type notificacion_tipo as enum ('stock_bajo', 'cambio_precio', 'reposicion', 'venta', 'liquidacion');
create type turno_estado as enum ('pendiente', 'completado', 'cancelado');

-- ============================================================================
-- 3. TABLAS CORE (TENANTS Y AUTH)
-- ============================================================================

-- Perfiles de usuario (vinculado a auth.users)
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  emprendedor_id uuid,
  nombre text not null,
  email text unique,
  rol text not null default 'cliente', -- 'admin', 'emprendedor', 'cliente'
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Emprendedores (tenants)
create table emprendedores (
  id uuid primary key default uuid_generate_v4(),
  nombre_tienda text not null,
  propietario_id uuid not null references auth.users(id) on delete cascade,
  ubicacion text not null, -- "San Miguel de Tucumán" por defecto, pero flexible
  telefono text,
  email text,
  comision_porcentaje numeric default 15, -- % que se queda Yo Emprendedor
  estado text default 'activo', -- 'activo', 'pausado', 'inactivo'
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- ============================================================================
-- 4. CATÁLOGO (PÚBLICO — sin auth requerido)
-- ============================================================================

-- Categorías (fija, admin-only edit)
create table categorias (
  id uuid primary key default uuid_generate_v4(),
  nombre text not null unique,
  icono_nombre text, -- 'home', 'monitor', 'coffee', 'gift', 'shirt', 'backpack', 'kids', 'sparkles', 'ring'
  orden int default 0,
  created_at timestamp with time zone default now()
);

-- Ofertas del día (admin-only, pero visible a todos)
create table ofertas_dia (
  id uuid primary key default uuid_generate_v4(),
  titulo text not null,
  descripcion text,
  imagen_url text,
  vigente_hasta timestamp with time zone,
  orden int default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- ============================================================================
-- 5. PRODUCTOS (PRIVATE — RLS por emprendedor)
-- ============================================================================

create table productos (
  id uuid primary key default uuid_generate_v4(),
  emprendedor_id uuid not null references emprendedores(id) on delete cascade,
  categoria_id uuid not null references categorias(id),
  nombre text not null,
  descripcion text,
  precio_original numeric not null,
  precio_oferta numeric,
  stock int default 0,
  estado producto_estado default 'activo',
  foto_urls text[] default array[]::text[], -- URLs en Supabase Storage
  productos_relacionados uuid[] default array[]::uuid[], -- IDs de productos relacionados
  costo_envio numeric default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  constraint precio_oferta_menor check (precio_oferta is null or precio_oferta <= precio_original)
);

-- ============================================================================
-- 6. VENTAS Y LIQUIDACIONES (PRIVATE — RLS por emprendedor)
-- ============================================================================

create table ventas (
  id uuid primary key default uuid_generate_v4(),
  emprendedor_id uuid not null references emprendedores(id) on delete cascade,
  producto_id uuid not null references productos(id),
  cantidad int not null default 1,
  precio_unitario numeric not null,
  estado venta_estado default 'pendiente',
  cliente_nombre text,
  cliente_email text,
  cliente_telefono text,
  metodo_pago text, -- 'efectivo', 'transferencia', 'tarjeta', 'cuotas'
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table liquidaciones (
  id uuid primary key default uuid_generate_v4(),
  emprendedor_id uuid not null references emprendedores(id) on delete cascade,
  mes int not null,
  anio int not null,
  monto_bruto numeric not null,
  comision_porcentaje numeric not null,
  comision_monto numeric not null,
  monto_neto numeric generated always as (monto_bruto - comision_monto) stored,
  estado text default 'pendiente', -- 'pendiente', 'pagada', 'disputa'
  notas text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique (emprendedor_id, mes, anio)
);

-- ============================================================================
-- 7. NOTIFICACIONES Y TURNOS (PRIVATE — RLS por emprendedor)
-- ============================================================================

create table notificaciones (
  id uuid primary key default uuid_generate_v4(),
  emprendedor_id uuid not null references emprendedores(id) on delete cascade,
  tipo notificacion_tipo not null,
  titulo text not null,
  mensaje text,
  leida boolean default false,
  producto_id uuid references productos(id),
  created_at timestamp with time zone default now()
);

create table turnos (
  id uuid primary key default uuid_generate_v4(),
  emprendedor_id uuid not null references emprendedores(id) on delete cascade,
  fecha_turno date not null,
  hora_inicio time,
  hora_fin time,
  descripcion text, -- "dejar mercadería", etc
  estado turno_estado default 'pendiente',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- ============================================================================
-- 8. ÍNDICES (performance en RLS)
-- ============================================================================

create index idx_products_emprendedor_id on productos(emprendedor_id);
create index idx_products_categoria_id on productos(categoria_id);
create index idx_ventas_emprendedor_id on ventas(emprendedor_id);
create index idx_ventas_producto_id on ventas(producto_id);
create index idx_liquidaciones_emprendedor_id on liquidaciones(emprendedor_id);
create index idx_notificaciones_emprendedor_id on notificaciones(emprendedor_id);
create index idx_turnos_emprendedor_id on turnos(emprendedor_id);
create index idx_profiles_emprendedor_id on profiles(emprendedor_id);
create index idx_emprendedores_propietario_id on emprendedores(propietario_id);

-- ============================================================================
-- 9. ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Habilitar RLS en todas las tablas
alter table profiles enable row level security;
alter table emprendedores enable row level security;
alter table categorias enable row level security;
alter table ofertas_dia enable row level security;
alter table productos enable row level security;
alter table ventas enable row level security;
alter table liquidaciones enable row level security;
alter table notificaciones enable row level security;
alter table turnos enable row level security;

-- PROFILES: ver el propio perfil
create policy "users can read own profile" on profiles
  for select using (auth.uid() = id);

create policy "users can update own profile" on profiles
  for update using (auth.uid() = id);

-- EMPRENDEDORES: admin ve todos, emprendedor ve solo el suyo
create policy "admin can read all emprendedores" on emprendedores
  for select using (
    (select rol from profiles where id = auth.uid()) = 'admin'
  );

create policy "emprendedor can read own" on emprendedores
  for select using (propietario_id = auth.uid());

-- CATEGORÍAS: todos pueden leer (es pública)
create policy "public read categorias" on categorias
  for select using (true);

-- OFERTAS: todos pueden leer (es pública)
create policy "public read ofertas_dia" on ofertas_dia
  for select using (true);

-- PRODUCTOS: públicos para lectura (todos ven), privados para escritura (solo emprendedor dueño)
create policy "public read productos" on productos
  for select using (true);

create policy "emprendedor create update delete productos" on productos
  for all using (
    emprendedor_id = (
      select emprendedores.id from emprendedores
      where emprendedores.propietario_id = auth.uid()
      limit 1
    )
  );

-- VENTAS: solo el emprendedor dueño puede ver/editar sus ventas
create policy "emprendedor read own ventas" on ventas
  for select using (
    emprendedor_id = (
      select emprendedores.id from emprendedores
      where emprendedores.propietario_id = auth.uid()
      limit 1
    )
  );

create policy "emprendedor create update delete ventas" on ventas
  for all using (
    emprendedor_id = (
      select emprendedores.id from emprendedores
      where emprendedores.propietario_id = auth.uid()
      limit 1
    )
  );

-- LIQUIDACIONES: solo el emprendedor dueño puede ver sus liquidaciones
create policy "emprendedor read own liquidaciones" on liquidaciones
  for select using (
    emprendedor_id = (
      select emprendedores.id from emprendedores
      where emprendedores.propietario_id = auth.uid()
      limit 1
    )
  );

-- NOTIFICACIONES: solo el emprendedor dueño puede ver/actualizar
create policy "emprendedor read own notificaciones" on notificaciones
  for select using (
    emprendedor_id = (
      select emprendedores.id from emprendedores
      where emprendedores.propietario_id = auth.uid()
      limit 1
    )
  );

create policy "emprendedor update notificaciones" on notificaciones
  for update using (
    emprendedor_id = (
      select emprendedores.id from emprendedores
      where emprendedores.propietario_id = auth.uid()
      limit 1
    )
  );

-- TURNOS: solo el emprendedor dueño puede ver/gestionar
create policy "emprendedor read own turnos" on turnos
  for select using (
    emprendedor_id = (
      select emprendedores.id from emprendedores
      where emprendedores.propietario_id = auth.uid()
      limit 1
    )
  );

create policy "emprendedor create update delete turnos" on turnos
  for all using (
    emprendedor_id = (
      select emprendedores.id from emprendedores
      where emprendedores.propietario_id = auth.uid()
      limit 1
    )
  );

-- ============================================================================
-- 10. TRIGGERS PARA UPDATED_AT
-- ============================================================================

create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_profiles_updated_at before update on profiles
  for each row execute function update_updated_at();

create trigger update_emprendedores_updated_at before update on emprendedores
  for each row execute function update_updated_at();

create trigger update_productos_updated_at before update on productos
  for each row execute function update_updated_at();

create trigger update_ventas_updated_at before update on ventas
  for each row execute function update_updated_at();

create trigger update_liquidaciones_updated_at before update on liquidaciones
  for each row execute function update_updated_at();

create trigger update_ofertas_updated_at before update on ofertas_dia
  for each row execute function update_updated_at();

-- ============================================================================
-- 11. CATÁLOGOS INICIALES
-- ============================================================================

insert into categorias (nombre, icono_nombre, orden) values
  ('Casa', 'home', 0),
  ('Tecnología', 'monitor', 1),
  ('Hogar', 'coffee', 2),
  ('Bebidas', 'wine', 3),
  ('Regalos', 'gift', 4),
  ('Moda', 'shirt', 5),
  ('Accesorios', 'backpack', 6),
  ('Niños', 'kids', 7),
  ('Belleza', 'sparkles', 8),
  ('Joyería', 'ring', 9);

-- ============================================================================
-- END OF MIGRATION
-- ============================================================================
