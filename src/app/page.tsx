import { Hero } from '@/components/sections/Hero';
import { Categorias } from '@/components/sections/Categorias';

export default function Home() {
  return (
    <>
      <Hero />
      <Categorias />

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container-tight">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">¿Eres Emprendedor?</h2>
              <p className="text-lg text-gray-600 mb-4">
                Vende tus productos sin necesidad de tener tu propia tienda. Conecta con clientes locales
                y crece tu negocio en la plataforma de Yo Emprendedor.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: 'var(--brand-primary)' }}
                  >
                    ✓
                  </span>
                  <span>Sin complicaciones de trámites</span>
                </li>
                <li className="flex items-center gap-3">
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: 'var(--brand-primary)' }}
                  >
                    ✓
                  </span>
                  <span>Panel de control completo</span>
                </li>
                <li className="flex items-center gap-3">
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: 'var(--brand-primary)' }}
                  >
                    ✓
                  </span>
                  <span>Visibilidad en el marketplace</span>
                </li>
              </ul>
              <a href="/auth/signup" className="btn-accent text-base px-6 py-3 inline-block">
                Registrarme Ahora
              </a>
            </div>

            {/* Placeholder para imagen */}
            <div
              className="h-80 rounded-lg flex items-center justify-center text-gray-600"
              style={{ backgroundColor: 'var(--bg-tertiary)' }}
            >
              <span className="text-lg">Imagen / Video Demo</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-tight">
          <h2 className="text-3xl font-bold mb-12 text-center">¿Por qué Yo Emprendedor?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                titulo: 'Marketplace Local',
                descripcion: 'Conecta con clientes de tu zona. Todos buscamos productos locales.',
              },
              {
                titulo: 'Panel Completo',
                descripcion: 'Gestiona inventario, ventas y liquidaciones en un solo lugar.',
              },
              {
                titulo: 'Bajo Costo',
                descripcion: 'Comisión baja comparada con otras plataformas. Más ganancia para ti.',
              },
            ].map((feature, i) => (
              <div key={i} className="card p-8 text-center">
                <div
                  className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: 'var(--brand-accent)' }}
                >
                  {i + 1}
                </div>
                <h3 className="font-bold text-lg mb-2">{feature.titulo}</h3>
                <p className="text-gray-600">{feature.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
