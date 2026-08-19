import { PRODUCTOS, CATEGORIAS, nombreCategoria, type Producto } from '@/components/tienda/data';

/**
 * Normaliza para comparar: sin acentos, sin mayusculas. Asi "cafe" encuentra
 * "café" y "te" encuentra "Té", que es como la gente escribe en un buscador.
 */
const normalizar = (texto: string) =>
  texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim();

export type Resultado = Producto & { rubro: string };

/**
 * Busca por nombre de producto y tambien por rubro, para que "belleza"
 * devuelva la categoria entera y no lista vacia.
 *
 * Cada palabra tiene que aparecer en algun lado: "vela soja" encuentra
 * "Vela aromática de soja" aunque las palabras no esten pegadas.
 */
export function buscarProductos(consulta: string, limite?: number): Resultado[] {
  const palabras = normalizar(consulta).split(/\s+/).filter(Boolean);
  if (!palabras.length) return [];

  const encontrados = PRODUCTOS.filter((p) => {
    const heno = normalizar(`${p.nombre} ${p.categorias.map(nombreCategoria).join(' ')}`);
    return palabras.every((palabra) => heno.includes(palabra));
  });

  // Primero los que arrancan con lo buscado: si escribis "vela", la vela va
  // antes que un producto que la menciona al pasar.
  const ordenados = encontrados.sort((a, b) => {
    const arrancaA = normalizar(a.nombre).startsWith(palabras[0]) ? 0 : 1;
    const arrancaB = normalizar(b.nombre).startsWith(palabras[0]) ? 0 : 1;
    if (arrancaA !== arrancaB) return arrancaA - arrancaB;
    return a.nombre.localeCompare(b.nombre, 'es');
  });

  const conRubro = ordenados.map((p) => ({ ...p, rubro: nombreCategoria(p.categorias[0]) }));
  return limite ? conRubro.slice(0, limite) : conRubro;
}

/** Rubros cuyo nombre coincide, para ofrecerlos como atajo. */
export function buscarRubros(consulta: string) {
  const q = normalizar(consulta);
  if (!q) return [];
  return CATEGORIAS.filter((c) => normalizar(c.nombre).includes(q));
}
