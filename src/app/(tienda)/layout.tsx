import type { Metadata } from 'next';
import { TiendaNav } from '@/components/tienda/TiendaNav';
import { TiendaFooter } from '@/components/tienda/TiendaFooter';
import { CarritoProvider } from '@/contexts/CarritoContext';
import { CuentaProvider } from '@/contexts/CuentaContext';
import '@/styles/tienda.css';

export const metadata: Metadata = {
  title: 'Tienda · Yo Emprendedor',
  description:
    'Productos de marcas locales de San Miguel de Tucumán. Envíos a todo el país, retiro gratis en el local y pago con tarjeta o transferencia.',
};

export default function TiendaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CuentaProvider>
      <CarritoProvider>
        <div className="ye-tienda">
          <TiendaNav />
          <main>{children}</main>
          <TiendaFooter />
        </div>
      </CarritoProvider>
    </CuentaProvider>
  );
}
