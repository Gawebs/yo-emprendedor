import { Suspense } from 'react';
import type { Metadata } from 'next';
import { FormCuenta } from '@/components/tienda/FormCuenta';

export const metadata: Metadata = {
  title: 'Iniciar sesión — Yo Emprendedor',
  robots: { index: false, follow: true },
};

export default function LoginPage() {
  return (
    <div className="contenedor">
      {/* useSearchParams necesita un limite de Suspense para poder prerenderizar. */}
      <Suspense fallback={<p className="vacio">Cargando…</p>}>
        <FormCuenta modo="ingresar" />
      </Suspense>
    </div>
  );
}
