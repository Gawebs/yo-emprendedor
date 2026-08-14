import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingCTA } from '@/components/layout/FloatingCTA';

/**
 * El catalogo usa el header y footer del marketplace. La landing de planes
 * (la home) trae los suyos propios, por eso no viven en el layout raiz.
 */
export default function ProductosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
