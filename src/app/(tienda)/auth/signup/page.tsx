import { Suspense } from 'react';
import type { Metadata } from 'next';
import { FormCuenta } from '@/components/tienda/FormCuenta';

export const metadata: Metadata = {
  title: 'Crear cuenta — Yo Emprendedor',
  robots: { index: false, follow: true },
};

export default function SignupPage() {
  return (
    <div className="contenedor">
      <Suspense fallback={<p className="vacio">Cargando…</p>}>
        <FormCuenta modo="registrar" />
      </Suspense>
    </div>
  );
}
