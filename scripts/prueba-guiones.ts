/**
 * Los guiones largos delatan que el texto lo escribio una IA, y Gabriel los
 * marco dos veces. La primera limpieza busco solo dentro de comillas y dejo
 * afuera doce, porque en JSX el texto va suelto entre etiquetas.
 *
 * Esta prueba recorre todo y falla si aparece alguno en algo que se vea. Los
 * comentarios no cuentan: no los lee nadie mas que nosotros.
 *
 *   npx tsx scripts/prueba-guiones.ts
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const GUIONES = /[—–]/;
const EXTENSIONES = ['.ts', '.tsx'];

function archivos(dir: string): string[] {
  return readdirSync(dir).flatMap((nombre) => {
    const ruta = join(dir, nombre);
    if (statSync(ruta).isDirectory()) return archivos(ruta);
    return EXTENSIONES.some((e) => nombre.endsWith(e)) ? [ruta] : [];
  });
}

/** Una linea de comentario no llega al navegador. */
const esComentario = (linea: string) => /^\s*(\/\/|\*|\/\*)/.test(linea);

const hallazgos: string[] = [];

for (const ruta of archivos('src')) {
  readFileSync(ruta, 'utf8').split('\n').forEach((linea, i) => {
    if (GUIONES.test(linea) && !esComentario(linea)) {
      hallazgos.push(`${ruta}:${i + 1}\n    ${linea.trim().slice(0, 110)}`);
    }
  });
}

if (hallazgos.length) {
  console.error(`\n${hallazgos.length} guion(es) largo(s) en texto visible:\n`);
  hallazgos.forEach((h) => console.error('  ' + h));
  console.error('\nUsar coma, dos puntos, parentesis, o "a" en los rangos ("24 a 48 h").\n');
  process.exit(1);
}

console.log('OK   sin guiones largos en textos visibles');
