-- ============================================================================
-- 003 — LOS RUBROS DEFINITIVOS DE ANITA
--
-- Arrastrabamos dos listas viejas: la 001 sembro 10 rubros (Casa, Tecnologia,
-- Bebidas, Moda, Joyeria...) y la 002 agrego 8 mas con `on conflict do
-- nothing`, asi que en la base convivian 14. Ninguna de las dos es la lista
-- que Anita cerro el 19-ago-2026, que es la que muestra la web.
--
-- Ademas la base no soportaba dos decisiones que ella dejo por escrito:
--   1. Un producto puede vivir en VARIOS rubros a la vez. Regaleria es
--      directamente una seleccion cruzada de los demas.
--   2. Cada rubro tiene subrubros, que son los que arman los filtros.
--
-- Por eso `productos.categoria_id` (un solo uuid) se va y entra la tabla
-- `producto_categorias`. Se puede hacer sin dolor porque todavia no hay
-- ningun producto cargado.
-- ============================================================================

-- ── CATEGORIAS: slug, y solo los 9 de Anita ─────────────────────────────────

alter table categorias add column if not exists slug text;

-- Nadie apunta todavia a las viejas: productos esta en cero.
delete from categorias;

insert into categorias (slug, nombre, icono_nombre, orden) values
  ('hogar',         'Hogar',                'home',      0),
  ('deco',          'Deco',                 'lamp',      1),
  ('belleza',       'Belleza y cosmética',  'sparkles',  2),
  ('accesorios',    'Accesorios',           'gem',       3),
  ('aromas-y-tes',  'Aromas y Tés',         'leaf',      4),
  ('indumentaria',  'Indumentaria',         'shirt',     5),
  ('infantiles',    'Infantiles',           'baby',      6),
  ('marroquineria', 'Marroquinería',        'briefcase', 7),
  ('regaleria',     'Regalería',            'gift',      8);

alter table categorias alter column slug set not null;
create unique index if not exists idx_categorias_slug on categorias(slug);

comment on table categorias is
  'Los 9 rubros que definio Anita el 19-ago-2026. Espejo de CATEGORIAS en src/components/tienda/data.ts: si cambia uno tiene que cambiar el otro.';

-- ── SUBRUBROS: los filtros dentro de cada rubro ─────────────────────────────

create table if not exists subrubros (
  id uuid primary key default uuid_generate_v4(),
  categoria_id uuid not null references categorias(id) on delete cascade,
  nombre text not null,
  slug text not null,
  orden int default 0,
  created_at timestamptz default now(),
  unique (categoria_id, slug)
);

create index if not exists idx_subrubros_categoria on subrubros(categoria_id);

-- Regaleria no lleva: es una seleccion cruzada, no tiene subrubros propios.
insert into subrubros (categoria_id, nombre, slug, orden)
select c.id, s.nombre, s.slug, s.orden
from categorias c
join (values
  ('hogar','Muebles','muebles',0),('hogar','Dormitorio','dormitorio',1),
  ('hogar','Living','living',2),('hogar','Cocina','cocina',3),
  ('hogar','Baño','bano',4),('hogar','Bazar','bazar',5),

  ('deco','Centros de mesa','centros-de-mesa',0),('deco','Cerámica','ceramica',1),
  ('deco','Espejos','espejos',2),('deco','Cuadros','cuadros',3),
  ('deco','Adornos','adornos',4),('deco','Flores de tela','flores-de-tela',5),
  ('deco','Lámparas','lamparas',6),('deco','Floreros','floreros',7),
  ('deco','Joyeros','joyeros',8),('deco','Macetas','macetas',9),
  ('deco','Velas','velas',10),

  ('belleza','Maquillaje','maquillaje',0),('belleza','Skincare','skincare',1),
  ('belleza','Perfumería','perfumeria',2),('belleza','Accesorios','accesorios',3),

  ('accesorios','Aros','aros',0),('accesorios','Collares','collares',1),
  ('accesorios','Pulseras','pulseras',2),('accesorios','Conjuntos','conjuntos',3),
  ('accesorios','Cintos','cintos',4),('accesorios','Relojes','relojes',5),

  ('aromas-y-tes','Tés','tes',0),('aromas-y-tes','Difusores','difusores',1),
  ('aromas-y-tes','Sahumerios','sahumerios',2),('aromas-y-tes','Home spray','home-spray',3),
  ('aromas-y-tes','Aceites','aceites',4),('aromas-y-tes','Accesorios','accesorios',5),

  ('indumentaria','Femenina','femenina',0),('indumentaria','Masculina','masculina',1),
  ('indumentaria','Infantil','infantil',2),

  ('infantiles','Juguetes','juguetes',0),('infantiles','Accesorios bebé','accesorios-bebe',1),
  ('infantiles','Mantas y acolchados','mantas-y-acolchados',2),
  ('infantiles','Higiene y cuidado','higiene-y-cuidado',3),
  ('infantiles','Muñecos de apego','munecos-de-apego',4),
  ('infantiles','Chupeteros','chupeteros',5),('infantiles','Ajuares','ajuares',6),

  ('marroquineria','Mochilas','mochilas',0),('marroquineria','Carteras','carteras',1),
  ('marroquineria','Billeteras','billeteras',2),
  ('marroquineria','Organizadores','organizadores',3),
  ('marroquineria','Neceser','neceser',4)
) as s(cat_slug, nombre, slug, orden) on s.cat_slug = c.slug
on conflict do nothing;

-- ── UN PRODUCTO, VARIOS RUBROS ──────────────────────────────────────────────
-- Reemplaza a productos.categoria_id. `es_origen` marca el rubro principal:
-- el que define que atributos muestra la ficha y de donde salen los
-- relacionados. Exactamente el primero de `Producto.categorias` en el codigo.

create table if not exists producto_categorias (
  producto_id  uuid not null references productos(id) on delete cascade,
  categoria_id uuid not null references categorias(id) on delete cascade,
  subrubro_id  uuid references subrubros(id) on delete set null,
  es_origen    boolean not null default false,
  primary key (producto_id, categoria_id)
);

create index if not exists idx_prodcat_categoria on producto_categorias(categoria_id);
create index if not exists idx_prodcat_subrubro  on producto_categorias(subrubro_id);

-- Un solo rubro de origen por producto.
create unique index if not exists idx_prodcat_un_origen
  on producto_categorias(producto_id) where es_origen;

-- El subrubro tiene que pertenecer al rubro de esa misma fila: sin esto se
-- puede guardar "Accesorios / Cocina" y nadie se entera.
create or replace function subrubro_coincide_con_rubro()
returns trigger
language plpgsql
set search_path = public
as $funcion$
begin
  if new.subrubro_id is not null
     and not exists (select 1 from subrubros s
                     where s.id = new.subrubro_id
                       and s.categoria_id = new.categoria_id) then
    raise exception 'El subrubro % no pertenece al rubro %', new.subrubro_id, new.categoria_id;
  end if;
  return new;
end;
$funcion$;

drop trigger if exists trg_subrubro_coincide on producto_categorias;
create trigger trg_subrubro_coincide
  before insert or update on producto_categorias
  for each row execute function subrubro_coincide_con_rubro();

-- Fuera la columna vieja: dejarla seria tener dos verdades sobre lo mismo.
alter table productos drop column if exists categoria_id;

-- ── RLS ─────────────────────────────────────────────────────────────────────
-- El catalogo se navega sin cuenta, igual que categorias y productos.

alter table subrubros           enable row level security;
alter table producto_categorias enable row level security;

drop policy if exists "public read subrubros" on subrubros;
create policy "public read subrubros" on subrubros for select using (true);

drop policy if exists "public read producto_categorias" on producto_categorias;
create policy "public read producto_categorias" on producto_categorias for select using (true);
