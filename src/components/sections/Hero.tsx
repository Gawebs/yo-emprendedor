import Link from 'next/link';
import { URLS } from '@/constants/contacto';

export function Hero() {
  return (
    <section className="py-20 md:py-32" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container-tight flex justify-center">
        <div className="max-w-2xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Vende tus productos en un solo lugar
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Yo Emprendedor es la plataforma de marketplace local de San Miguel de Tucumán.
            Conecta con clientes sin tener que crear tu propia tienda.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={URLS.catalogoUrl} className="btn-primary text-base px-6 py-3">
              Explorar Catálogo
            </Link>
            <Link href={URLS.signupUrl} className="btn-outline text-base px-6 py-3">
              Quiero Vender
            </Link>
          </div>

          {/* Promotions Banner */}
          <div className="mt-12 p-4 rounded-lg" style={{ backgroundColor: 'var(--brand-accent)', color: 'white' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm font-medium">
              <div>💳 10% off transferencia/efectivo</div>
              <div>📅 3 cuotas sin interés</div>
              <div>🚚 Envío gratis tu primera compra</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
