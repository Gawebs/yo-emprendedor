import type { Metadata } from 'next';
import { PaginaPolitica } from '@/components/tienda/PaginaPolitica';
import { GIFT_CARD } from '@/components/tienda/politicas';

export const metadata: Metadata = {
  title: 'Gift Card — Yo Emprendedor',
  description: GIFT_CARD.bajada,
};

export default function Pagina() {
  return <PaginaPolitica politica={GIFT_CARD} />;
}
