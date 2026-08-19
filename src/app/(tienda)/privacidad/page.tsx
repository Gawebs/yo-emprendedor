import type { Metadata } from 'next';
import { PaginaPolitica } from '@/components/tienda/PaginaPolitica';
import { PRIVACIDAD } from '@/components/tienda/legales';

export const metadata: Metadata = {
  title: 'Política de privacidad — Yo Emprendedor',
  description: PRIVACIDAD.bajada,
};

export default function PrivacidadPage() {
  return <PaginaPolitica politica={PRIVACIDAD} />;
}
