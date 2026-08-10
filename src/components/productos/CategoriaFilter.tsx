'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Home, Monitor, Wine, Gift, Shirt, Backpack, Kids, Sparkles, Ring, Coffee } from 'lucide-react';

const CATEGORIAS = [
  { id: '1', nombre: 'Casa', icon: Home },
  { id: '2', nombre: 'Tecnología', icon: Monitor },
  { id: '3', nombre: 'Hogar', icon: Coffee },
  { id: '4', nombre: 'Bebidas', icon: Wine },
  { id: '5', nombre: 'Regalos', icon: Gift },
  { id: '6', nombre: 'Moda', icon: Shirt },
  { id: '7', nombre: 'Accesorios', icon: Backpack },
  { id: '8', nombre: 'Niños', icon: Kids },
  { id: '9', nombre: 'Belleza', icon: Sparkles },
  { id: '10', nombre: 'Joyería', icon: Ring },
];

export function CategoriaFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoriaSeleccionada = searchParams.get('categoria');

  const handleFilter = (categoriaId: string | null) => {
    if (categoriaId) {
      router.push(`/productos?categoria=${categoriaId}`);
    } else {
      router.push('/productos');
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-8">
      <h3 className="font-semibold mb-4">Filtrar por Categoría</h3>
      <div className="flex flex-wrap gap-2">
        {/* Todas */}
        <button
          onClick={() => handleFilter(null)}
          className={`px-4 py-2 rounded-full font-medium transition ${
            !categoriaSeleccionada
              ? 'text-white'
              : 'bg-white text-gray-700 border border-gray-300'
          }`}
          style={{
            backgroundColor: !categoriaSeleccionada ? 'var(--brand-primary)' : 'white',
          }}
        >
          Todas
        </button>

        {/* Categorías */}
        {CATEGORIAS.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleFilter(cat.id)}
            className={`px-4 py-2 rounded-full font-medium transition flex items-center gap-1 ${
              categoriaSeleccionada === cat.id
                ? 'text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
            style={{
              backgroundColor: categoriaSeleccionada === cat.id ? 'var(--brand-primary)' : 'white',
            }}
          >
            {cat.nombre}
          </button>
        ))}
      </div>
    </div>
  );
}
