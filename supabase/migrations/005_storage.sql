-- ============================================================================
-- 005 — QUIEN PUEDE SUBIR Y BORRAR FOTOS
--
-- Los buckets `productos` y `marcas` se crearon publicos: el catalogo se
-- navega sin cuenta, asi que las fotos tienen que verse sin login. Publico
-- para LEER no significa publico para ESCRIBIR — sin estas policies,
-- cualquiera con la clave anon (que viaja en el JavaScript de la web) podria
-- subir archivos al bucket, o borrar las fotos de toda la tienda.
--
-- Convencion de rutas: `productos/<producto_id>/<archivo>`. El primer tramo
-- de la ruta es el que decide de quien es la foto.
-- ============================================================================

-- ── LECTURA: cualquiera ─────────────────────────────────────────────────────

drop policy if exists "fotos visibles para todos" on storage.objects;
create policy "fotos visibles para todos" on storage.objects
  for select using (bucket_id in ('productos', 'marcas'));

-- ── ESCRITURA EN productos ──────────────────────────────────────────────────
-- La carpeta se llama como el id del producto, asi que se puede resolver de
-- quien es la foto sin guardar nada extra.

create or replace function puede_tocar_foto(ruta text)
returns boolean
language sql
stable
security definer
set search_path = public, storage
as $funcion$
  select exists (
    select 1 from productos p
    where p.id::text = split_part(ruta, '/', 1)
      and (p.emprendedor_id = mi_emprendedor_id() or es_admin())
  );
$funcion$;

comment on function puede_tocar_foto is
  'La ruta arranca con el id del producto: productos/<id>/<archivo>. Solo la duena del producto o el admin pueden subir o borrar ahi.';

drop policy if exists "subir fotos de productos propios" on storage.objects;
create policy "subir fotos de productos propios" on storage.objects
  for insert with check (bucket_id = 'productos' and puede_tocar_foto(name));

drop policy if exists "reemplazar fotos de productos propios" on storage.objects;
create policy "reemplazar fotos de productos propios" on storage.objects
  for update using (bucket_id = 'productos' and puede_tocar_foto(name));

drop policy if exists "borrar fotos de productos propios" on storage.objects;
create policy "borrar fotos de productos propios" on storage.objects
  for delete using (bucket_id = 'productos' and puede_tocar_foto(name));

-- ── ESCRITURA EN marcas: solo el admin ──────────────────────────────────────
-- Los logos los carga Anita, no cada emprendedora: son identidad de la
-- plataforma y tienen que entrar todos con el mismo criterio.

drop policy if exists "admin gestiona logos de marcas" on storage.objects;
create policy "admin gestiona logos de marcas" on storage.objects
  for all using (bucket_id = 'marcas' and es_admin())
  with check (bucket_id = 'marcas' and es_admin());
