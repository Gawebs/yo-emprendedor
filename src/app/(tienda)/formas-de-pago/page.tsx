import type { Metadata } from 'next';
import { PaginaPolitica } from '@/components/tienda/PaginaPolitica';
import { FORMAS_DE_PAGO } from '@/components/tienda/politicas';

export const metadata: Metadata = {
  title: 'Formas de pago — Yo Emprendedor',
  description: FORMAS_DE_PAGO.bajada,
};

export default function Pagina() {
  return <PaginaPolitica politica={FORMAS_DE_PAGO} />;
}
