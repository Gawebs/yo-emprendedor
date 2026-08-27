-- ============================================================================
-- 006 — CADA VARIANTE CON SU FOTO
--
-- Las primeras fotos reales que mando Anita son un set de bano en cuatro
-- colores. Se estaban usando como galeria —cuatro miniaturas al costado— y
-- eso funciona a medias: el selector de color de la ficha no cambiaba la
-- imagen, asi que el cliente tenia que adivinar que las miniaturas eran los
-- colores.
--
-- Peor: sin foto atada a la variante no hay forma de decir "queda blanco
-- pero se agoto el negro", que es justo lo que hace falta para no vender
-- algo que no hay.
-- ============================================================================

alter table producto_variantes
  add column if not exists foto_url text;

comment on column producto_variantes.foto_url is
  'Foto de ESTA combinacion. Al elegir el color en la ficha, la imagen principal cambia a esta. Si esta vacia se usa la primera de productos.foto_urls.';

-- El stock ya vivia aca, pero nada obligaba a que fuera coherente con el
-- estado: una variante activa con stock cero seguia ofreciendose.
create or replace view variantes_disponibles as
  select v.*,
         (v.activa and v.stock > 0) as se_puede_comprar,
         case
           when not v.activa    then 'no disponible'
           when v.stock = 0     then 'sin stock'
           when v.stock <= 5    then 'ultimas unidades'
           else 'disponible'
         end as situacion
  from producto_variantes v;

comment on view variantes_disponibles is
  'El umbral de "ultimas unidades" vive aca y no en el codigo, para que la tienda y el panel digan lo mismo.';

-- Sin esto, listar las variantes de un producto ordenadas por disponibilidad
-- recorre toda la tabla cuando el catalogo crezca.
create index if not exists idx_variantes_disponibles
  on producto_variantes(producto_id, activa) where stock > 0;
