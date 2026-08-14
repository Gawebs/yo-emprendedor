import type { Metadata } from 'next';
import { PaginaPolitica } from '@/components/tienda/PaginaPolitica';
import { ENVIOS } from '@/components/tienda/politicas';

export const metadata: Metadata = {
  title: 'Envíos y entregas — Yo Emprendedor',
  description: ENVIOS.bajada,
};

export default function Pagina() {
  return <PaginaPolitica politica={ENVIOS} />;
}
