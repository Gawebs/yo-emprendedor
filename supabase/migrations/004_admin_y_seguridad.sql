-- ============================================================================
-- 004 — QUE ANITA PUEDA ADMINISTRAR, Y QUE NADIE INVENTE PEDIDOS
--
-- Las policies de la 001 y la 002 estaban escritas para una sola figura: la
-- emprendedora que ve lo suyo. Faltaba la duena de la plataforma, que tiene
-- que ver TODO. Sin esto el panel de administracion no puede leer un solo
-- pedido, y la salida facil seria usar la service_role en cada pagina — que
-- es como se termina desactivando RLS sin darse cuenta.
--
-- Y `pedidos` aceptaba inserts de cualquiera con la clave publica, que viaja
-- en el JavaScript de la web. Cualquiera podia crear pedidos con total cero.
-- ============================================================================

-- ── QUIEN SOY: se resuelve en la base, no en el cliente ─────────────────────
-- security definer para que no dispare RLS al consultar profiles: si la
-- policy de profiles llamara a una funcion que lee profiles, seria recursion
-- infinita. Y `stable` para que Postgres la evalue una vez por query y no una
-- vez por fila.

create or replace function es_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $funcion$
  select coalesce((select rol = 'admin' from profiles where id = auth.uid()), false);
$funcion$;

comment on function es_admin is
  'True si el usuario logueado es Anita o alguien del equipo de la plataforma.';

-- Antes convivian dos formas de resolver el tenant: unas policies preguntaban
-- emprendedores.propietario_id y otras profiles.emprendedor_id. Si las dos no
-- coincidian, unas dejaban pasar y otras no. Ahora hay una sola.
create or replace function mi_emprendedor_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $funcion$
  select id from emprendedores where propietario_id = auth.uid() limit 1;
$funcion$;

comment on function mi_emprendedor_id is
  'El emprendimiento del usuario logueado. Fuente unica: emprendedores.propietario_id.';

-- La columna existia sin FK, asi que podia apuntar a un emprendedor borrado.
update profiles set emprendedor_id = null
  where emprendedor_id is not null
    and emprendedor_id not in (select id from emprendedores);

alter table profiles drop constraint if exists profiles_emprendedor_id_fkey;
alter table profiles add constraint profiles_emprendedor_id_fkey
  foreign key (emprendedor_id) references emprendedores(id) on delete set null;

-- ── PROFILES ────────────────────────────────────────────────────────────────

drop policy if exists "users can read own profile" on profiles;
drop policy if exists "users can update own profile" on profiles;

create policy "leer perfil propio" on profiles
  for select using (auth.uid() = id or es_admin());

create policy "actualizar perfil propio" on profiles
  for update using (auth.uid() = id or es_admin());

-- Al registrarse hay que poder crear el propio perfil.
create policy "crear perfil propio" on profiles
  for insert with check (auth.uid() = id);

-- ── EMPRENDEDORES ───────────────────────────────────────────────────────────

drop policy if exists "admin can read all emprendedores" on emprendedores;
drop policy if exists "emprendedor can read own" on emprendedores;

create policy "leer emprendedores" on emprendedores
  for select using (propietario_id = auth.uid() or es_admin());

create policy "admin gestiona emprendedores" on emprendedores
  for all using (es_admin()) with check (es_admin());

create policy "emprendedor edita su ficha" on emprendedores
  for update using (propietario_id = auth.uid());

-- ── CATALOGO: el admin lo edita, todos lo leen ──────────────────────────────

create policy "admin gestiona categorias" on categorias
  for all using (es_admin()) with check (es_admin());

create policy "admin gestiona subrubros" on subrubros
  for all using (es_admin()) with check (es_admin());

create policy "admin gestiona ofertas" on ofertas_dia
  for all using (es_admin()) with check (es_admin());

create policy "admin gestiona zonas" on zonas_envio
  for all using (es_admin()) with check (es_admin());

-- ── PRODUCTOS ───────────────────────────────────────────────────────────────

drop policy if exists "emprendedor create update delete productos" on productos;

create policy "emprendedor gestiona sus productos" on productos
  for all using (emprendedor_id = mi_emprendedor_id())
  with check (emprendedor_id = mi_emprendedor_id());

create policy "admin gestiona todos los productos" on productos
  for all using (es_admin()) with check (es_admin());

-- Quien puede tocar el producto puede tocar sus rubros y sus variantes.
create policy "gestionar rubros del producto" on producto_categorias
  for all using (
    exists (select 1 from productos p where p.id = producto_id
            and (p.emprendedor_id = mi_emprendedor_id() or es_admin()))
  ) with check (
    exists (select 1 from productos p where p.id = producto_id
            and (p.emprendedor_id = mi_emprendedor_id() or es_admin()))
  );

create policy "gestionar variantes del producto" on producto_variantes
  for all using (
    exists (select 1 from productos p where p.id = producto_id
            and (p.emprendedor_id = mi_emprendedor_id() or es_admin()))
  ) with check (
    exists (select 1 from productos p where p.id = producto_id
            and (p.emprendedor_id = mi_emprendedor_id() or es_admin()))
  );

-- ── PEDIDOS: se crean desde el servidor, no desde el navegador ──────────────
-- `with check (true)` mas la clave publica, que viaja en el JavaScript de la
-- web, significaba que cualquiera podia insertar pedidos con el total que
-- quisiera. El checkout tiene que pasar por el servidor, que recalcula el
-- total contra los precios reales antes de guardar.

drop policy if exists "crear pedido como invitado" on pedidos;
drop policy if exists "items del pedido propio" on pedido_items;

create policy "admin gestiona pedidos" on pedidos
  for all using (es_admin()) with check (es_admin());

create policy "admin gestiona items" on pedido_items
  for all using (es_admin()) with check (es_admin());

-- La emprendedora ve solo los renglones que le tocan, nunca el pedido entero:
-- ahi viven los datos personales del comprador.
drop policy if exists "emprendedor ve sus items" on pedido_items;
create policy "emprendedor ve sus items" on pedido_items
  for select using (emprendedor_id = mi_emprendedor_id());

comment on table pedidos is
  'Se escribe SOLO desde el servidor (service role). El comprador no tiene sesion: la confirmacion se sirve resolviendo numero + email del lado del server.';

-- Un pedido por transferencia reserva stock esperando que se acredite. Sin
-- fecha de corte no hay forma de liberarlo, y el stock queda trabado para
-- siempre por gente que nunca pago.
alter table pedidos add column if not exists reservado_hasta timestamptz;

comment on column pedidos.reservado_hasta is
  'Hasta cuando se le guarda el stock a un pedido por transferencia. Vencido, se libera. El plazo lo tiene que definir Anita.';

create index if not exists idx_pedidos_reserva
  on pedidos(reservado_hasta) where estado_pago = 'pendiente';

-- Tenia la columna updated_at pero nada la actualizaba.
drop trigger if exists update_pedidos_updated_at on pedidos;
create trigger update_pedidos_updated_at before update on pedidos
  for each row execute function update_updated_at();

create index if not exists idx_items_producto on pedido_items(producto_id);

-- ── GIFT CARDS ──────────────────────────────────────────────────────────────

create policy "admin gestiona gift cards" on gift_cards
  for all using (es_admin()) with check (es_admin());

-- Quedaba con RLS activo y cero policies: invisible para todos menos para el
-- servidor. Era a proposito, pero sin escribirlo en ningun lado.
create policy "admin lee movimientos" on gift_card_movimientos
  for select using (es_admin());

comment on table gift_card_movimientos is
  'Registro contable del saldo. Solo escribe el servidor; el admin puede leer.';

-- ── LIQUIDACIONES Y NOTIFICACIONES ──────────────────────────────────────────

drop policy if exists "emprendedor read own liquidaciones" on liquidaciones;
create policy "leer liquidaciones" on liquidaciones
  for select using (emprendedor_id = mi_emprendedor_id() or es_admin());

create policy "admin gestiona liquidaciones" on liquidaciones
  for all using (es_admin()) with check (es_admin());

drop policy if exists "emprendedor read own notificaciones" on notificaciones;
drop policy if exists "emprendedor update notificaciones" on notificaciones;

create policy "leer notificaciones" on notificaciones
  for select using (emprendedor_id = mi_emprendedor_id() or es_admin());

create policy "marcar notificacion leida" on notificaciones
  for update using (emprendedor_id = mi_emprendedor_id() or es_admin());

create policy "admin crea notificaciones" on notificaciones
  for insert with check (es_admin());

drop policy if exists "emprendedor read own turnos" on turnos;
drop policy if exists "emprendedor create update delete turnos" on turnos;

create policy "gestionar turnos" on turnos
  for all using (emprendedor_id = mi_emprendedor_id() or es_admin())
  with check (emprendedor_id = mi_emprendedor_id() or es_admin());

-- ── BOTON DE ARREPENTIMIENTO ────────────────────────────────────────────────
-- Resolucion 424/2020: hay que responder dentro de las 24 horas con un codigo
-- de identificacion del tramite. Hoy el boton solo abre WhatsApp, donde no
-- queda constancia de nada. Esta tabla es la constancia.

do $bloque$ begin
  create type arrepentimiento_estado as enum
    ('recibida', 'respondida', 'aceptada', 'rechazada');
exception when duplicate_object then null; end $bloque$;

create sequence if not exists arrepentimiento_seq start 1;

create table if not exists solicitudes_arrepentimiento (
  id uuid primary key default uuid_generate_v4(),
  codigo text not null unique default 'ARR-' || nextval('arrepentimiento_seq'),

  pedido_id uuid references pedidos(id) on delete set null,
  pedido_numero text,

  nombre text not null,
  email text not null,
  telefono text,
  motivo text,

  estado arrepentimiento_estado not null default 'recibida',
  respondida_el timestamptz,
  notas_internas text,

  created_at timestamptz default now()
);

create index if not exists idx_arrep_estado on solicitudes_arrepentimiento(estado);
create index if not exists idx_arrep_creada on solicitudes_arrepentimiento(created_at desc);

-- Sin respuesta pasadas 24 horas: es la consulta que va a alimentar el aviso
-- en el panel. Se calcula en la vista y no en el codigo para que la regla
-- viva en un solo lugar.
create or replace view arrepentimientos_vencidos as
  select *, now() - created_at as demora
  from solicitudes_arrepentimiento
  where estado = 'recibida'
    and respondida_el is null
    and now() - created_at > interval '24 hours';

alter table solicitudes_arrepentimiento enable row level security;

create policy "admin gestiona arrepentimientos" on solicitudes_arrepentimiento
  for all using (es_admin()) with check (es_admin());

comment on table solicitudes_arrepentimiento is
  'Resolucion 424/2020. Cada solicitud se numera ARR-N y hay 24 horas para responder. Se escribe desde el servidor: el formulario es publico y sin sesion.';

-- ── ARREGLOS MENORES ────────────────────────────────────────────────────────

-- Era security definer sin search_path fijo: alguien que pudiera crear un
-- schema propio podia hacerle ejecutar otra tabla con el mismo nombre.
create or replace function descontar_stock(p_variante_id uuid, p_cantidad int)
returns void
language plpgsql
security definer
set search_path = public
as $funcion$
declare
  v_stock int;
begin
  select stock into v_stock from producto_variantes where id = p_variante_id for update;

  if v_stock is null then
    raise exception 'La variante % no existe', p_variante_id;
  end if;

  if v_stock < p_cantidad then
    raise exception 'Stock insuficiente: quedan % y se pidieron %', v_stock, p_cantidad;
  end if;

  update producto_variantes set stock = stock - p_cantidad where id = p_variante_id;
end;
$funcion$;

-- ── DEUDA MARCADA, NO RESUELTA ──────────────────────────────────────────────
-- Las dos se borran cuando se reescriba el panel. Hoy hay codigo vivo que las
-- usa (dashboard/ventas/page.tsx y actions/productos.ts), asi que sacarlas
-- ahora dejaria el panel roto.

comment on table ventas is
  'DEPRECADA. Modelo viejo, una fila = un producto. La venta real vive en pedidos + pedido_items desde la 002. Borrar al reescribir el panel; hoy la usa dashboard/ventas/page.tsx.';

comment on column productos.stock is
  'DEPRECADA. El stock real esta en producto_variantes, que se agota por combinacion. Dos verdades sobre lo mismo: el dia que no coincidan se vende algo que no hay. Borrar al reescribir el panel.';
