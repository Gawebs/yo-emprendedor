'use client';

import { useState } from 'react';
import { Star, Truck, ShieldCheck } from 'lucide-react';
import { ProductoCard } from '@/components/productos/ProductoCard';

// MOCK DATA — Reemplazar con Supabase query
const PRODUCTOS_MOCK: Record<string, any> = {
  '1': {
    id: '1',
    nombre: 'Laptop Gaming 16GB RAM',
    categoria: 'Tecnología',
    precio_original: 89999,
    precio_oferta: 69999,
    stock: 5,
    descripcion:
      'Laptop gaming potente con procesador de última generación, 16GB de RAM DDR5 y GPU RTX. Ideal para gaming, edición de video y desarrollo.',
    fotos: [
      'https://via.placeholder.com/600x400?text=Laptop+1',
      'https://via.placeholder.com/600x400?text=Laptop+2',
      'https://via.placeholder.com/600x400?text=Laptop+3',
    ],
    especificaciones: {
      'Procesador': 'Intel i7 13va Gen',
      'RAM': '16GB DDR5',
      'Almacenamiento': '512GB SSD',
      'GPU': 'RTX 4060',
      'Pantalla': '15.6" 144Hz',
      'Peso': '2.2kg',
    },
    medios_pago: ['Efectivo', 'Transferencia', 'Tarjeta 3 cuotas'],
    costo_envio: 500,
    productos_relacionados: ['2', '3'],
  },
  '2': {
    id: '2',
    nombre: 'Silla Ergonómica',
    categoria: 'Casa',
    precio_original: 25000,
    precio_oferta: 19999,
    stock: 12,
    descripcion: 'Silla ergonómica de oficina con soporte lumbar ajustable.',
    fotos: ['https://via.placeholder.com/600x400?text=Silla+1'],
    especificaciones: { 'Material': 'Malla + Espuma', 'Altura': 'Ajustable' },
    medios_pago: ['Efectivo', 'Transferencia'],
    costo_envio: 1000,
    productos_relacionados: ['1'],
  },
};

const PRODUCTOS_RELACIONADOS = ['1', '2', '3'];

export default function ProductoDetallePage({ params }: { params: { id: string } }) {
  const producto = PRODUCTOS_MOCK[params.id];
  const [fotoSeleccionada, setFotoSeleccionada] = useState(0);
  const [cantidad, setCantidad] = useState(1);

  if (!producto) {
    return (
      <section className="py-12">
        <div className="container-tight text-center">
          <p className="text-lg text-gray-500">Producto no encontrado</p>
        </div>
      </section>
    );
  }

  const descuentoPorcentaje = producto.precio_oferta
    ? Math.round(((producto.precio_original - producto.precio_oferta) / producto.precio_original) * 100)
    : 0;

  return (
    <section className="py-12 md:py-20">
      <div className="container-tight">
        {/* Producto */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          {/* Fotos */}
          <div>
            <div className="bg-gray-100 rounded-lg overflow-hidden mb-4 aspect-square flex items-center justify-center">
              <img
                src={producto.fotos[fotoSeleccionada]}
                alt={producto.nombre}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-3">
              {producto.fotos.map((foto: string, i: number) => (
                <button
                  key={i}
                  onClick={() => setFotoSeleccionada(i)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                    i === fotoSeleccionada ? 'border-blue-500' : 'border-gray-300'
                  }`}
                >
                  <img src={foto} alt={`Foto ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Detalles */}
          <div>
            <div className="mb-4">
              <span className="text-sm text-gray-500">{producto.categoria}</span>
              <h1 className="text-3xl font-bold mt-2">{producto.nombre}</h1>
            </div>

            {/* Precios */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-3xl font-bold" style={{ color: 'var(--brand-accent)' }}>
                  ${producto.precio_oferta?.toFixed(0) || producto.precio_original.toFixed(0)}
                </span>
                {producto.precio_oferta && (
                  <span className="text-lg line-through text-gray-500">
                    ${producto.precio_original.toFixed(0)}
                  </span>
                )}
              </div>
              {descuentoPorcentaje > 0 && (
                <span className="text-sm font-semibold" style={{ color: 'var(--brand-accent)' }}>
                  Ahorras ${(producto.precio_original - producto.precio_oferta).toFixed(0)} ({descuentoPorcentaje}%)
                </span>
              )}
            </div>

            {/* Stock */}
            <div className="mb-6">
              {producto.stock > 0 ? (
                <p className="text-green-600 font-semibold">✓ {producto.stock} disponibles</p>
              ) : (
                <p className="text-red-600 font-semibold">✗ Sin stock</p>
              )}
            </div>

            {/* Cantidad */}
            <div className="mb-6 flex items-center gap-4">
              <label className="font-medium">Cantidad:</label>
              <div className="flex items-center border rounded-lg">
                <button className="px-3 py-2" onClick={() => setCantidad(Math.max(1, cantidad - 1))}>
                  −
                </button>
                <span className="px-4 py-2 border-l border-r">{cantidad}</span>
                <button
                  className="px-3 py-2"
                  onClick={() => setCantidad(Math.min(producto.stock, cantidad + 1))}
                  disabled={cantidad >= producto.stock}
                >
                  +
                </button>
              </div>
            </div>

            {/* CTA */}
            <div className="mb-8">
              <button className="btn-accent w-full py-3 font-bold text-lg mb-3" disabled={producto.stock === 0}>
                {producto.stock > 0 ? 'Agregar al Carrito' : 'Agotado'}
              </button>
              <button className="btn-outline w-full py-3 font-bold text-lg">
                Consultar Cantidad
              </button>
            </div>

            {/* Info */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3">
                <Truck size={20} />
                <span className="text-sm">Envío: ${producto.costo_envio}</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck size={20} />
                <span className="text-sm">Pago seguro</span>
              </div>
            </div>

            {/* Medios Pago */}
            <div className="border-t pt-6">
              <h3 className="font-bold mb-3">Medios de Pago</h3>
              <ul className="text-sm space-y-2">
                {producto.medios_pago.map((metodo: string) => (
                  <li key={metodo} className="text-gray-600">
                    • {metodo}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Descripción */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold mb-6">Descripción</h2>
          <p className="text-gray-700 leading-relaxed">{producto.descripcion}</p>

          {/* Especificaciones */}
          <h3 className="text-xl font-bold mt-8 mb-4">Especificaciones</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(producto.especificaciones).map(([key, value]) => (
              <div key={key} className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">{key}</p>
                <p className="font-semibold">{value as string}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Productos Relacionados */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold mb-6">Productos Relacionados</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PRODUCTOS_RELACIONADOS.map((id) => {
              const prod = PRODUCTOS_MOCK[id];
              return prod ? (
                <ProductoCard
                  key={id}
                  id={id}
                  nombre={prod.nombre}
                  imagen={prod.fotos[0]}
                  precioOriginal={prod.precio_original}
                  precioOferta={prod.precio_oferta}
                  stock={prod.stock}
                />
              ) : null;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
