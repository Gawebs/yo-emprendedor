import type { Metadata } from 'next';
import { PaginaPolitica } from '@/components/tienda/PaginaPolitica';
import { TERMINOS } from '@/components/tienda/legales';

export const metadata: Metadata = {
  title: 'Términos y condiciones · Yo Emprendedor',
  description: TERMINOS.bajada,
};

export default function TerminosPage() {
  return <PaginaPolitica politica={TERMINOS} />;
}
