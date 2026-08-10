'use client';

import { useState, useEffect } from 'react';
import { Trash2, Edit, Plus } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { ProductosModal } from '@/components/dashboard/ProductosModal';
import { eliminarProducto } from '@/actions/productos';
import { useTenant } from '@/contexts/TenantContext';

export default function ProductosPage() {
  const { emprendedorId } = useTenant();
  const [productos, setProductos] = useState<any[]>([]);
  const [categorias, setCategorias] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState<any | null>(null);
  const supabase = createClient();

  useEffect(() => {
    loadData();
  }, [emprendedorId]);

  const loadData = async () => {
    try {
      // Cargar categorías
      const { data: cats } = await supabase
        .from('categorias')
        .select('*')
        .order('orden');
      setCategorias(cats || []);

      // Cargar productos (RLS filtra por emprendedor_id)
      const { data: prods } = await supabase
        .from('productos')
        .select('*')
        .order('created_at', { ascending: false });
      setProductos(prods || []);
    } catch (err) {
      console.error('Error cargando datos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar producto?')) return;
    const result = await eliminarProducto(id);
    if (!result.error) {
      setProductos(productos.filter((p) => p.id !== id));
    }
  };

  const handleModalSuccess = () => {
    loadData();
    setSelectedProducto(null);
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  const categoriasMap = Object.fromEntries(
    categorias.map((c) => [c.id, c.nombre])
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Productos</h1>
          <p className="text-gray-600">Gestiona tu inventario</p>
        </div>
        <button
          onClick={() => {
            setSelectedProducto(null);
            setModalOpen(true);
          }}
          className="btn-accent flex items-center gap-2 px-4 py-2"
        >
          <Plus size={20} />
          Nuevo Producto
        </button>
      </div>

      {/* Tabla */}
      <div className="card overflow-hidden">
        {productos.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Nombre</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Categoría</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Precio</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Stock</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {productos.map((producto) => (
                  <tr key={producto.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{producto.nombre}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {categoriasMap[producto.categoria_id]}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <span className="font-semibold">
                          ${producto.precio_oferta || producto.precio_original}
                        </span>
                        {producto.precio_oferta && (
                          <span className="text-gray-500 line-through ml-2">
                            ${producto.precio_original}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                          producto.stock > 0
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {producto.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedProducto(producto);
                          setModalOpen(true);
                        }}
                        className="p-2 hover:bg-blue-50 rounded-lg text-blue-600"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(producto.id)}
                        className="p-2 hover:bg-red-50 rounded-lg text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <p className="text-gray-500 mb-4">Sin productos todavía</p>
            <button
              onClick={() => {
                setSelectedProducto(null);
                setModalOpen(true);
              }}
              className="btn-accent px-4 py-2"
            >
              Crear el primero
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      <ProductosModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleModalSuccess}
        producto={selectedProducto}
        categorias={categorias}
      />
    </div>
  );
}
