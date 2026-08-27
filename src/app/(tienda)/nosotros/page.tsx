import Link from 'next/link';
import type { Metadata } from 'next';
import { QUIENES_SOMOS, PILARES } from '@/components/tienda/politicas';

export const metadata: Metadata = {
  title: 'Nosotros · Yo Emprendedor',
  description: QUIENES_SOMOS.bajada,
};

export default function NosotrosPage() {
  return (
    <div className="contenedor">
      <nav className="miga" aria-label="Miga de pan">
        <Link href="/">Home</Link>
        <span className="miga-sep">/</span>
        <span>Nosotros</span>
      </nav>

      <article className="legal">
        <header className="legal-head">
          <h1 className="legal-titulo">{QUIENES_SOMOS.titulo}</h1>
          <p className="legal-bajada">{QUIENES_SOMOS.bajada}</p>
        </header>

        {QUIENES_SOMOS.bloques.map((b, i) =>
          b.tipo === 'destacado'
            ? <p className="legal-destacado" key={i}>{b.texto}</p>
            : <p className="legal-p" key={i}>{'texto' in b ? b.texto : ''}</p>
        )}
      </article>

      <section className="pilares" aria-labelledby="pilares-t">
        <h2 className="legal-h2" id="pilares-t">Nuestra propuesta se sostiene sobre 6 pilares</h2>
        <div className="pilares-grid">
          {PILARES.map((p) => (
            <article className="pilar" key={p.n}>
              <span className="pilar-num">{p.n}</span>
              <h3 className="pilar-titulo">{p.titulo}</h3>
              <p className="pilar-bajada">{p.bajada}</p>
              <p className="pilar-texto">{p.texto}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="legal-cierre">
        <p>
          Yo Emprendedor es el punto de encuentro entre quienes emprenden y quienes quieren
          descubrir algo diferente.
        </p>
        <div className="legal-cierre-acciones">
          <Link href="/" className="btn-carrito" style={{ textAlign: 'center' }}>Ver productos</Link>
          <Link href="/quiero-vender" className="confirmacion-wsp">Quiero vender con ustedes</Link>
        </div>
      </section>
    </div>
  );
}
