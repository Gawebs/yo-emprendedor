'use client';

import Link from 'next/link';
import { Home, Monitor, Coffee, Gift, Shirt, Backpack, Baby, Sparkles, Gem, Droplet } from 'lucide-react';

const CATEGORIAS = [
  { id: 1, nombre: 'Casa', icon: Home },
  { id: 2, nombre: 'Tecnología', icon: Monitor },
  { id: 3, nombre: 'Hogar', icon: Coffee },
  { id: 4, nombre: 'Bebidas', icon: Droplet },
  { id: 5, nombre: 'Regalos', icon: Gift },
  { id: 6, nombre: 'Moda', icon: Shirt },
  { id: 7, nombre: 'Accesorios', icon: Backpack },
  { id: 8, nombre: 'Niños', icon: Baby },
  { id: 9, nombre: 'Belleza', icon: Sparkles },
  { id: 10, nombre: 'Joyería', icon: Gem },
];

export function Categorias() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container-tight">
        <h2 className="text-3xl font-bold mb-12">Explora por Categoría</h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {CATEGORIAS.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                href={`/productos?categoria=${cat.id}`}
                className="card p-6 flex flex-col items-center justify-center gap-3 hover:shadow-lg transition-all"
              >
                <Icon
                  size={32}
                  style={{ color: 'var(--brand-primary)' }}
                  strokeWidth={1.5}
                />
                <span className="text-sm font-medium text-center">{cat.nombre}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
