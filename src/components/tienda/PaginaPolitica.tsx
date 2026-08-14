import Link from 'next/link';
import type { Politica } from './politicas';

/** Render comun de las paginas institucionales y de politicas. */
export function PaginaPolitica({ politica }: { politica: Politica }) {
  return (
    <div className="contenedor">
      <nav className="miga" aria-label="Miga de pan">
        <Link href="/">Home</Link>
        <span className="miga-sep">/</span>
        <span>{politica.titulo}</span>
      </nav>

      <article className="legal">
        <header className="legal-head">
          <h1 className="legal-titulo">{politica.titulo}</h1>
          {politica.bajada && <p className="legal-bajada">{politica.bajada}</p>}
          {politica.actualizado && (
            <p className="legal-fecha">Última actualización: {politica.actualizado}</p>
          )}
        </header>

        {politica.bloques.map((bloque, i) => {
          if (bloque.tipo === 'titulo') return <h2 className="legal-h2" key={i}>{bloque.texto}</h2>;
          if (bloque.tipo === 'destacado') return <p className="legal-destacado" key={i}>{bloque.texto}</p>;
          if (bloque.tipo === 'lista') {
            return (
              <ul className="legal-lista" key={i}>
                {bloque.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            );
          }
          return <p className="legal-p" key={i}>{bloque.texto}</p>;
        })}
      </article>
    </div>
  );
}
