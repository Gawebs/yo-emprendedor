import Link from 'next/link';
import { FileText } from 'lucide-react';
import { CONTACTO } from './data';

/**
 * Para las paginas cuyo texto todavia no existe. Mostrar clausulas inventadas
 * en un sitio que cobra seria peor que admitir que faltan: si alguien reclama,
 * lo que dice la pagina es lo que obliga.
 */
export function EnPreparacion({
  titulo,
  queEs,
}: {
  titulo: string;
  queEs: string;
}) {
  return (
    <div className="contenedor">
      <nav className="miga" aria-label="Miga de pan">
        <Link href="/">Home</Link>
        <span className="miga-sep">/</span>
        <span>{titulo}</span>
      </nav>

      <div className="preparacion">
        <FileText size={40} strokeWidth={1.25} aria-hidden="true" />
        <h1 className="cat-titulo">{titulo}</h1>
        <p className="confirmacion-texto">
          Estamos terminando de redactar este texto. {queEs}
        </p>
        <p className="confirmacion-texto">
          Mientras tanto, podés consultarnos cualquier duda y te respondemos directamente.
        </p>

        <div className="legal-cierre-acciones">
          <a href={`https://wa.me/${CONTACTO.whatsappNumero}`} className="btn-carrito"
             style={{ textAlign: 'center' }} target="_blank" rel="noopener noreferrer">
            Escribinos por WhatsApp
          </a>
          <a href={`mailto:${CONTACTO.email}`} className="confirmacion-wsp">{CONTACTO.email}</a>
        </div>

        <p className="preparacion-links">
          Ya podés leer{' '}
          <Link href="/cambios" className="legal-link">cambios y devoluciones</Link>,{' '}
          <Link href="/envios" className="legal-link">envíos</Link> y{' '}
          <Link href="/formas-de-pago" className="legal-link">formas de pago</Link>.
        </p>
      </div>
    </div>
  );
}
