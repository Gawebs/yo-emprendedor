import type { Metadata } from 'next';
import { TenantProvider } from '@/contexts/TenantContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingCTA } from '@/components/layout/FloatingCTA';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Yo Emprendedor | Marketplace Local Tucumán',
  description: 'Plataforma de marketplace local para emprendedores de San Miguel de Tucumán.',
  openGraph: {
    title: 'Yo Emprendedor',
    description: 'Vende tus productos en un solo lugar',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <TenantProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <FloatingCTA />
        </TenantProvider>
      </body>
    </html>
  );
}
