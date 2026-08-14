import type { Metadata } from 'next';
import { EnPreparacion } from '@/components/tienda/EnPreparacion';

export const metadata: Metadata = {
  title: 'Términos y condiciones — Yo Emprendedor',
  description: 'Términos y condiciones de uso de la tienda de Yo Emprendedor.',
};

export default function TerminosPage() {
  return (
    <EnPreparacion
      titulo="Términos y condiciones"
      queEs="Son las condiciones generales que rigen las compras en la tienda."
    />
  );
}
