import type { Metadata } from 'next';
import { EnPreparacion } from '@/components/tienda/EnPreparacion';

export const metadata: Metadata = {
  title: 'Política de privacidad — Yo Emprendedor',
  description: 'Cómo tratamos los datos personales de quienes compran en Yo Emprendedor.',
};

export default function PrivacidadPage() {
  return (
    <EnPreparacion
      titulo="Política de privacidad"
      queEs="Explica qué datos pedimos al comprar, para qué los usamos y cómo los guardamos."
    />
  );
}
