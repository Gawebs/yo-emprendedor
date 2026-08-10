'use client';

import { useSearchParams } from 'next/navigation';
import { ProductoCard } from '@/components/productos/ProductoCard';
import { CategoriaFilter } from '@/components/productos/CategoriaFilter';
import { Suspense } from 'react';

// MOCK DATA — Reemplazar con Supabase query
const PRODUCTOS_MOCK = [
  {
    id: '1',
    nombre: 'Laptop Gaming 16GB',
    categoria_id: '2',
    precio_original: 89999,
    precio_oferta: 69999,
    stock: 5,
    imagen: 'https://via.placeholder.com/300x200?text=Laptop',
  },
  {
    id: '2',
    nombre: 'Silla Ergonómica',
    categoria_id: '1',
    precio_original: 25000,
    precio_oferta: 19999,
    stock: 12,
    imagen: 'https://via.placeholder.com/300x200?text=Silla',
  },
  {
    id: '3',
    nombre: 'Monitor 27" 144Hz',
    categoria_id: '2',
    precio_original: 45000,
    precio_oferta: null,
    stock: 8,
    imagen: 'https://via.placeholder.com/300x200?text=Monitor',
  },
  {
    id: '4',
    nombre: 'Set de Copas de Vino',
    categoria_id: '4',
    precio_original: 12000,
    precio_oferta: 9999,
    stock: 20,
    imagen: 'https://via.placeholder.com/300x200?text=Copas',
  },
  {
    id: '5',
    nombre: 'Camiseta Premium',
    categoria_id: '6',
    precio_original: 4500,
    precio_oferta: 3500,
    stock: 0,
    imagen: 'https://via.placeholder.com/300x200?text=Camiseta',
  },
  {
    id: '6',
    nombre: 'Bolsa de Cuero',
    categoria_id: '7',
    precio_original: 18000,
    precio_oferta: 14999,
    stock: 6,
    imagen: 'https://via.placeholder.com/300x200?text=Bolsa',
  },
  {
    id: '7',
    nombre: 'Juguete Educativo',
    categoria_id: '8',
    precio_original: 8999,
    precio_oferta: null,
    stock: 15,
    imagen: 'https://via.placeholder.com/300x200?text=Juguete',
  },
  {
    id: '8',
    nombre: 'Serum Facial Premium',
    categoria_id: '9',
    precio_original: 6500,
    precio_oferta: 5499,
    stock: 30,
    imagen: 'https://via.placeholder.com/300x200?text=Serum',
  },
];

function ProductosGrid() {
  const searchParams = useSearchParams();
  const categoriaFiltro = searchParams.get('categoria');

  const productosFiltrados = categoriaFiltro
    ? PRODUCTOS_MOCK.filter((p) => p.categoria_id === categoriaFiltro)
    : PRODUCTOS_MOCK;

  return (
    <>
      <CategoriaFilter />

      {productosFiltrados.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {productosFiltrados.map((producto) => (
            <ProductoCard
              key={producto.id}
              id={producto.id}
              nombre={producto.nombre}
              imagen={producto.imagen}
              precioOriginal={producto.precio_original}
              precioOferta={producto.precio_oferta || undefined}
              stock={producto.stock}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No hay productos en esta categoría</p>
        </div>
      )}
    </>
  );
}

export default function ProductosPage() {
  return (
    <section className="py-12 md:py-20">
      <div className="container-tight">
        <h1 className="text-4xl font-bold mb-12">Catálogo de Productos</h1>

        <Suspense fallback={<div>Cargando...</div>}>
          <ProductosGrid />
        </Suspense>
      </div>
    </section>
  );
}
