import type { Metadata } from 'next';
import { League_Spartan, Open_Sans } from 'next/font/google';
import { TenantProvider } from '@/contexts/TenantContext';
import '@/styles/globals.css';

const leagueSpartan = League_Spartan({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  variable: '--font-spartan',
  display: 'swap',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-open-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Yo Emprendedor — Tu marca creciendo y vendiendo, aunque no estés presente',
  description:
    'Visibilidad, presencia física y gestión de ventas en San Miguel de Tucumán. Sin abrir un local, sin invertir tu tiempo y sin riesgos innecesarios.',
  openGraph: {
    title: 'Yo Emprendedor',
    description: 'Tu marca creciendo y vendiendo, aunque no estés presente.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${leagueSpartan.variable} ${openSans.variable}`}>
      <body>
        <TenantProvider>{children}</TenantProvider>
      </body>
    </html>
  );
}
