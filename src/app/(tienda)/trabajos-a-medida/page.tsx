import type { Metadata } from 'next';
import { EnPreparacion } from '@/components/tienda/EnPreparacion';

export const metadata: Metadata = {
  title: 'Trabajos a medida — Yo Emprendedor',
  description: 'Pedidos personalizados y consultas por mayor.',
};

export default function TrabajosPage() {
  return (
    <EnPreparacion
      titulo="Trabajos a medida"
      queEs="Varias de nuestras marcas hacen pedidos personalizados y venta por mayor."
    />
  );
}
