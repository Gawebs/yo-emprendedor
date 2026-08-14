-- ============================================================================
-- 002 — CANAL DE VENTAS (ecommerce)
--
-- La 001 modelaba el panel del emprendedor: `ventas` guarda UN producto por
-- fila, que alcanza para liquidar pero no para un carrito. Esta migracion
-- agrega el lado comprador: variantes, pedidos con varios items, gift cards
-- y envios.
--
-- El comprador NO ve de que marca es cada producto (catalogo unificado), pero
-- `pedido_items.emprendedor_id` se guarda igual: sin eso no se puede liquidar
-- ni mostrarle a cada emprendedora sus ventas.
-- ============================================================================

-- ── CATEGORIAS ──────────────────────────────────────────────────────────────
-- Las 9 de la 001 (Casa, Tecnologia, Bebidas, Moda, Joyeria...) no son las que
-- Anita definio para la tienda. Se reemplazan por las 8 del wireframe.

insert into categorias (nombre, icono_nombre, orden) values
  ('Belleza',      'sparkles',   0),
  ('Accesorios',   'gem',        1),
  ('Infantiles',   'baby',       2),
  ('Hogar',        'home',       3),
  ('Deco',         'lamp',       4),
  ('Blanquería',   'bed',        5),
  ('Té y aromas',  'leaf',       6),
  ('Regalos',      'gift',       7)
on conflict do nothing;

-- ── PRODUCTOS: campos que pide la ficha ─────────────────────────────────────

alter table productos
  add column if not exists codigo text unique,          -- YE-00123
  add column if not exists medidas text,                -- "Largo 65cm — Ancho 50cm"
  add column if not exists destacado boolean default false,
  add column if not exists mas_vendido boolean default false;

comment on column productos.codigo is 'Codigo visible en la ficha. Formato YE-00000.';

-- ── VARIANTES ───────────────────────────────────────────────────────────────
-- La ficha ofrece talle, color, aroma o sabor y variante, y los dos ultimos
-- dicen "si aplica al producto": todos opcionales. El stock vive aca, no en
-- `productos`, porque se agota por combinacion (queda M pero no L).

create table if not exists producto_variantes (
  id uuid primary key default uuid_generate_v4(),
  producto_id uuid not null references productos(id) on delete cascade,
  talle text,
  color_nombre text,
  color_hex text,                 -- para el circulito de la ficha
  aroma text,
  variante text,                  -- "Clasico" / "Premium"
  precio_extra numeric not null default 0,
  stock int not null default 0,
  activa boolean not null default true,
  created_at timestamptz default now(),
  constraint stock_no_negativo check (stock >= 0)
);

create index if not exists idx_variantes_producto on producto_variantes(producto_id);
create unique index if not exists idx_variantes_combinacion
  on producto_variantes(producto_id, coalesce(talle,''), coalesce(color_nombre,''),
                        coalesce(aroma,''), coalesce(variante,''));

-- ── ENVIOS ──────────────────────────────────────────────────────────────────

do $$ begin
  create type modalidad_entrega as enum
    ('retiro_local', 'envio_local', 'envio_interior', 'envio_nacional');
exception when duplicate_object then null; end $$;

create table if not exists zonas_envio (
  id uuid primary key default uuid_generate_v4(),
  modalidad modalidad_entrega not null,
  nombre text not null,
  costo numeric not null default 0,
  demora text,                    -- "24-48 h habiles"
  activa boolean not null default true,
  orden int default 0
);

insert into zonas_envio (modalidad, nombre, costo, demora, orden) values
  ('retiro_local',   'Retiro en el local — 24 de Septiembre 734', 0,     'Cuando el pedido esté preparado', 0),
  ('envio_local',    'San Miguel de Tucumán y alrededores',       2500,  '24 a 48 h hábiles',               1),
  ('envio_interior', 'Interior de Tucumán',                       4000,  'Según operador',                  2),
  ('envio_nacional', 'Otras provincias',                          7000,  'Según operador',                  3)
on conflict do nothing;

-- ── GIFT CARDS ──────────────────────────────────────────────────────────────
-- Admite uso parcial: el saldo baja compra a compra. No paga envio (politica).

do $$ begin
  create type gift_card_estado as enum ('activa', 'agotada', 'vencida', 'anulada');
exception when duplicate_object then null; end $$;

create table if not exists gift_cards (
  id uuid primary key default uuid_generate_v4(),
  codigo text not null unique,
  monto_inicial numeric not null,
  saldo numeric not null,
  estado gift_card_estado not null default 'activa',
  vence_el date,
  comprada_por_email text,
  created_at timestamptz default now(),
  constraint saldo_valido check (saldo >= 0 and saldo <= monto_inicial)
);

-- ── PEDIDOS ─────────────────────────────────────────────────────────────────
-- Compra como invitado: sin cuenta. El acceso al pedido despues es por
-- numero + email, no por sesion.

do $$ begin
  create type pedido_estado as enum
    ('nuevo', 'preparando', 'listo', 'despachado', 'entregado', 'cancelado');
exception when duplicate_object then null; end $$;

do $$ begin
  create type pago_metodo as enum
    ('mercadopago', 'transferencia', 'efectivo_local', 'efectivo_contra_entrega');
exception when duplicate_object then null; end $$;

do $$ begin
  create type pago_estado as enum ('pendiente', 'pagado', 'rechazado', 'reembolsado');
exception when duplicate_object then null; end $$;

create sequence if not exists pedido_numero_seq start 1000;

create table if not exists pedidos (
  id uuid primary key default uuid_generate_v4(),
  numero text not null unique default 'YE-' || nextval('pedido_numero_seq'),

  cliente_nombre text not null,
  cliente_email text not null,
  cliente_telefono text not null,

  modalidad modalidad_entrega not null,
  zona_envio_id uuid references zonas_envio(id),
  direccion text,
  ciudad text,
  provincia text,
  codigo_postal text,
  notas text,

  metodo_pago pago_metodo not null,
  estado_pago pago_estado not null default 'pendiente',
  estado pedido_estado not null default 'nuevo',

  subtotal numeric not null default 0,
  costo_envio numeric not null default 0,
  descuento_gift_card numeric not null default 0,
  gift_card_id uuid references gift_cards(id),
  total numeric not null default 0,

  mercadopago_preference_id text,
  mercadopago_payment_id text,

  created_at timestamptz default now(),
  updated_at timestamptz default now(),

  -- Un envio a domicilio sin direccion no se puede despachar.
  constraint direccion_si_hay_envio check (
    modalidad = 'retiro_local' or (direccion is not null and ciudad is not null)
  ),
  -- El efectivo contra entrega no tiene sentido si el cliente retira por el local.
  constraint efectivo_coherente check (
    metodo_pago <> 'efectivo_contra_entrega' or modalidad <> 'retiro_local'
  )
);

create index if not exists idx_pedidos_email on pedidos(cliente_email);
create index if not exists idx_pedidos_estado on pedidos(estado);
create index if not exists idx_pedidos_creado on pedidos(created_at desc);

-- ── ITEMS DEL PEDIDO ────────────────────────────────────────────────────────
-- nombre_producto y precio_unitario son fotos del momento de la compra: si
-- despues cambia el precio o se borra el producto, el pedido sigue diciendo
-- que se compro y a cuanto.

create table if not exists pedido_items (
  id uuid primary key default uuid_generate_v4(),
  pedido_id uuid not null references pedidos(id) on delete cascade,
  producto_id uuid references productos(id) on delete set null,
  variante_id uuid references producto_variantes(id) on delete set null,

  -- Para liquidar. El comprador no lo ve, pero cada item sabe de quien es.
  emprendedor_id uuid not null references emprendedores(id),

  nombre_producto text not null,
  detalle_variante text,          -- "Talle M · Citrico"
  cantidad int not null default 1,
  precio_unitario numeric not null,
  subtotal numeric not null,

  constraint cantidad_positiva check (cantidad > 0)
);

create index if not exists idx_items_pedido on pedido_items(pedido_id);
create index if not exists idx_items_emprendedor on pedido_items(emprendedor_id);

-- ── MOVIMIENTOS DE GIFT CARD ────────────────────────────────────────────────

create table if not exists gift_card_movimientos (
  id uuid primary key default uuid_generate_v4(),
  gift_card_id uuid not null references gift_cards(id) on delete cascade,
  pedido_id uuid references pedidos(id) on delete set null,
  monto numeric not null,         -- negativo consume, positivo repone
  saldo_resultante numeric not null,
  created_at timestamptz default now()
);

create index if not exists idx_gc_mov on gift_card_movimientos(gift_card_id, created_at desc);

-- ============================================================================
-- RLS
-- ============================================================================

alter table producto_variantes    enable row level security;
alter table zonas_envio           enable row level security;
alter table pedidos               enable row level security;
alter table pedido_items          enable row level security;
alter table gift_cards            enable row level security;
alter table gift_card_movimientos enable row level security;

-- Publico: la tienda se navega sin cuenta.
create policy "variantes visibles" on producto_variantes
  for select using (activa = true);

create policy "zonas visibles" on zonas_envio
  for select using (activa = true);

-- Pedidos: cualquiera puede crear (compra como invitado), nadie puede listar.
-- La confirmacion se sirve desde el server, que resuelve el pedido por
-- numero + email; sin eso, un anonimo con la anon key podria leer los datos
-- personales de todos los compradores.
create policy "crear pedido como invitado" on pedidos
  for insert with check (true);

create policy "items del pedido propio" on pedido_items
  for insert with check (true);

-- El emprendedor ve los items que le corresponden, y nada mas.
create policy "emprendedor ve sus items" on pedido_items
  for select using (
    emprendedor_id in (
      select emprendedor_id from profiles where id = auth.uid()
    )
  );

-- Gift cards: el saldo se consulta por el server con el codigo. Sin policy de
-- select publica, para que no se pueda barrer la tabla probando codigos.
create policy "emprendedor no toca gift cards" on gift_cards
  for select using (false);

-- ── stock ───────────────────────────────────────────────────────────────────
-- Descontar en varios pasos desde el cliente deja estado parcial si algo falla
-- a mitad. Va como funcion, en una sola transaccion.

create or replace function descontar_stock(p_variante_id uuid, p_cantidad int)
returns void
language plpgsql
security definer
as $$
declare
  v_stock int;
begin
  select stock into v_stock
    from producto_variantes
    where id = p_variante_id
    for update;

  if v_stock is null then
    raise exception 'La variante % no existe', p_variante_id;
  end if;

  if v_stock < p_cantidad then
    raise exception 'Stock insuficiente: quedan % y se pidieron %', v_stock, p_cantidad;
  end if;

  update producto_variantes
    set stock = stock - p_cantidad
    where id = p_variante_id;
end;
$$;

comment on function descontar_stock is
  'Descuenta con bloqueo de fila para que dos compras simultaneas no vendan el mismo ultimo producto.';
