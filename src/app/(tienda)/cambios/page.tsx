import type { Metadata } from 'next';
import { PaginaPolitica } from '@/components/tienda/PaginaPolitica';
import { CAMBIOS } from '@/components/tienda/politicas';

export const metadata: Metadata = {
  title: 'Cambios y devoluciones — Yo Emprendedor',
  description: CAMBIOS.bajada,
};

export default function Pagina() {
  return <PaginaPolitica politica={CAMBIOS} />;
}
