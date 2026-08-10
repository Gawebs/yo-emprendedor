import Link from 'next/link';
import Image from 'next/image';

interface ProductoCardProps {
  id: string;
  nombre: string;
  imagen: string;
  precioOriginal: number;
  precioOferta?: number;
  stock: number;
}

export function ProductoCard({
  id,
  nombre,
  imagen,
  precioOriginal,
  precioOferta,
  stock,
}: ProductoCardProps) {
  const descuentoPorcentaje = precioOferta
    ? Math.round(((precioOriginal - precioOferta) / precioOriginal) * 100)
    : 0;

  return (
    <Link href={`/productos/${id}`}>
      <div className="card overflow-hidden hover:shadow-xl transition-all cursor-pointer h-full flex flex-col">
        {/* Imagen */}
        <div className="relative w-full h-48 bg-gray-200 overflow-hidden group">
          <Image
            src={imagen || '/placeholder-producto.png'}
            alt={nombre}
            fill
            className="object-cover group-hover:scale-105 transition-transform"
          />
          {precioOferta && (
            <div
              className="absolute top-2 right-2 px-3 py-1 rounded-full text-white font-bold text-sm"
              style={{ backgroundColor: 'var(--brand-accent)' }}
            >
              -{descuentoPorcentaje}%
            </div>
          )}
          {stock === 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-bold">Agotado</span>
            </div>
          )}
        </div>

        {/* Contenido */}
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-semibold text-sm mb-2 line-clamp-2">{nombre}</h3>

          {/* Precios */}
          <div className="mt-auto">
            <div className="flex items-baseline gap-2">
              {precioOferta ? (
                <>
                  <span className="text-lg font-bold" style={{ color: 'var(--brand-accent)' }}>
                    ${precioOferta.toFixed(0)}
                  </span>
                  <span className="text-sm line-through text-gray-500">
                    ${precioOriginal.toFixed(0)}
                  </span>
                </>
              ) : (
                <span className="text-lg font-bold">${precioOriginal.toFixed(0)}</span>
              )}
            </div>

            {/* Stock */}
            <div className="text-xs text-gray-500 mt-2">
              {stock > 0 ? `${stock} disponibles` : 'Sin stock'}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
