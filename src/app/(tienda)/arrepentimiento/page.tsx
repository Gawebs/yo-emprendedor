import Link from 'next/link';
import type { Metadata } from 'next';
import { FormArrepentimiento } from '@/components/tienda/FormArrepentimiento';
import { CONTACTO } from '@/components/tienda/data';

export const metadata: Metadata = {
  title: 'Botón de arrepentimiento — Yo Emprendedor',
  description:
    'Cancelá tu compra dentro de los 10 días corridos desde que la recibiste, sin costo y sin explicar el motivo.',
};

export default function ArrepentimientoPage() {
  return (
    <div className="contenedor">
      <nav className="miga" aria-label="Miga de pan">
        <Link href="/">Home</Link>
        <span className="miga-sep">/</span>
        <span>Botón de arrepentimiento</span>
      </nav>

      <article className="legal">
        <header className="legal-head">
          <h1 className="legal-titulo">Botón de arrepentimiento</h1>
          <p className="legal-bajada">
            Cancelá tu compra sin costo y sin tener que explicar por qué.
          </p>
        </header>

        <p className="legal-destacado">
          Si comprás a distancia, tenés 10 días corridos desde que recibís el producto para
          arrepentirte, sin necesidad de indicar el motivo y sin costo alguno. Es un derecho que te
          da el artículo 34 de la Ley N.º 24.240 de Defensa del Consumidor y el artículo 1.110 del
          Código Civil y Comercial.
        </p>

        <p className="legal-p">
          Completá el formulario y te respondemos <strong>dentro de las 24 horas</strong> con el
          número de código de identificación del trámite, como corresponde según la Resolución
          N.º 424/2020 de la Secretaría de Comercio Interior.
        </p>
      </article>

      <FormArrepentimiento />

      <article className="legal">
        <h2 className="legal-h2">Qué pasa después</h2>
        <p className="legal-p">
          Te contactamos para coordinar la devolución del producto y el reintegro del importe. El
          producto debe estar sin uso y en las mismas condiciones en que lo recibiste. El
          procedimiento completo está en{' '}
          <Link href="/cambios" className="legal-link">cambios y devoluciones</Link>.
        </p>

        <h2 className="legal-h2">¿No es lo que buscabas?</h2>
        <p className="legal-p">
          El arrepentimiento es distinto de un cambio por color, talle o modelo. Si lo que querés es
          cambiar el producto por otro, mirá{' '}
          <Link href="/cambios" className="legal-link">cambios y devoluciones</Link>. Si tenés
          cualquier duda, escribinos por WhatsApp al {CONTACTO.telefono} o a{' '}
          <a href={`mailto:${CONTACTO.email}`} className="legal-link">{CONTACTO.email}</a>.
        </p>
      </article>
    </div>
  );
}
