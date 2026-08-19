import Link from 'next/link';
import type { Metadata } from 'next';
import { COMO_COMPRAR, PREGUNTAS } from '@/components/tienda/politicas';
import { CONTACTO } from '@/components/tienda/data';

export const metadata: Metadata = {
  title: 'Preguntas frecuentes — Yo Emprendedor',
  description: 'Cómo comprar, medios de pago, envíos y cambios en Yo Emprendedor.',
};

const ATAJOS = [
  { href: '/formas-de-pago', titulo: 'Formas de pago', texto: 'Mercado Pago, transferencia y efectivo en el local' },
  { href: '/envios', titulo: 'Envíos y entregas', texto: 'Modalidades, costos y plazos' },
  { href: '/cambios', titulo: 'Cambios y devoluciones', texto: 'Plazos y condiciones' },
  { href: '/gift-card', titulo: 'Gift Card', texto: 'Vigencia y cómo usarla' },
];

export default function PreguntasPage() {
  return (
    <div className="contenedor">
      <nav className="miga" aria-label="Miga de pan">
        <Link href="/">Home</Link>
        <span className="miga-sep">/</span>
        <span>Preguntas frecuentes</span>
      </nav>

      <article className="legal">
        <header className="legal-head">
          <h1 className="legal-titulo">Preguntas frecuentes</h1>
          <p className="legal-bajada">Cómo comprar en Yo Emprendedor, paso a paso.</p>
        </header>

        <h2 className="legal-h2">¿Cómo realizar una compra?</h2>
        <ol className="pasos-lista">
          {COMO_COMPRAR.map((paso, i) => (
            <li key={paso}>
              <span className="pasos-num">{i + 1}</span>
              <span>{paso}</span>
            </li>
          ))}
        </ol>

        {PREGUNTAS.map(({ q, a }) => (
          <div key={q}>
            <h2 className="legal-h2">{q}</h2>
            <p className="legal-p">{a}</p>
          </div>
        ))}

        <p className="legal-p">
          Podés conocer las marcas en{' '}
          <Link href="/marcas" className="legal-link">Marcas que nos acompañan</Link>, y ejercer el
          derecho de arrepentimiento desde el{' '}
          <Link href="/arrepentimiento" className="legal-link">Botón de arrepentimiento</Link>.
        </p>
      </article>

      <section className="atajos">
        {ATAJOS.map((a) => (
          <Link href={a.href} className="atajo" key={a.href}>
            <span className="atajo-titulo">{a.titulo}</span>
            <span className="atajo-texto">{a.texto}</span>
          </Link>
        ))}
      </section>

      <section className="legal-cierre">
        <p>¿No encontrás lo que buscabas?</p>
        <div className="legal-cierre-acciones">
          <a href={`https://wa.me/${CONTACTO.whatsappNumero}`} className="btn-carrito"
             style={{ textAlign: 'center' }} target="_blank" rel="noopener noreferrer">
            Escribinos por WhatsApp
          </a>
          <a href={`mailto:${CONTACTO.email}`} className="confirmacion-wsp">{CONTACTO.email}</a>
        </div>
      </section>
    </div>
  );
}
