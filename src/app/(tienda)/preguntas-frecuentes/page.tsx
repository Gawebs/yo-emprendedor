import Link from 'next/link';
import type { Metadata } from 'next';
import { COMO_COMPRAR } from '@/components/tienda/politicas';
import { CONTACTO } from '@/components/tienda/data';

export const metadata: Metadata = {
  title: 'Preguntas frecuentes — Yo Emprendedor',
  description: 'Cómo comprar, medios de pago, envíos y cambios en Yo Emprendedor.',
};

const ATAJOS = [
  { href: '/formas-de-pago', titulo: 'Formas de pago', texto: 'Mercado Pago, transferencia y efectivo' },
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

        <h2 className="legal-h2">¿Necesito crear una cuenta?</h2>
        <p className="legal-p">
          No hace falta. Podés comprar dejando tu nombre, email y teléfono. Te avisamos por
          email cómo sigue tu pedido.
        </p>

        <h2 className="legal-h2">¿Los productos son de una sola marca?</h2>
        <p className="legal-p">
          No. Reunimos productos de distintos emprendimientos locales en un mismo catálogo.
          Podés conocerlos en <Link href="/marcas" className="legal-link">Marcas que nos acompañan</Link>.
        </p>

        <h2 className="legal-h2">¿Puedo retirar sin pagar envío?</h2>
        <p className="legal-p">
          Sí. El retiro en nuestro local de {CONTACTO.direccion} es sin costo. Te avisamos
          cuando el pedido esté preparado.
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
