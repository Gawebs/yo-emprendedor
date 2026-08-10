'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { crearProducto, actualizarProducto } from '@/actions/productos';
import { CreateProductoInput } from '@/types/productos';

interface ProductosModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  producto?: any | null;
  categorias: any[];
}

export function ProductosModal({
  isOpen,
  onClose,
  onSuccess,
  producto,
  categorias,
}: ProductosModalProps) {
  const [formData, setFormData] = useState<CreateProductoInput>(
    producto || {
      nombre: '',
      categoria_id: '',
      precio_original: 0,
      precio_oferta: undefined,
      stock: 0,
      descripcion: '',
      foto_urls: [],
    }
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      let result;
      if (producto?.id) {
        result = await actualizarProducto({ ...formData, id: producto.id });
      } else {
        result = await crearProducto(formData);
      }

      if (result.error) {
        setError(result.error);
      } else {
        onSuccess();
        onClose();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold">
            {producto ? 'Editar Producto' : 'Crear Producto'}
          </h2>
          <button onClick={onClose} className="p-1">
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-300 rounded-lg text-red-700">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nombre *</label>
              <input
                type="text"
                required
                value={formData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Categoría *</label>
              <select
                required
                value={formData.categoria_id}
                onChange={(e) =>
                  setFormData({ ...formData, categoria_id: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="">Seleccionar categoría</option>
                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Precio Original *
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.precio_original}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    precio_original: parseFloat(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Precio Oferta
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.precio_oferta || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    precio_oferta: e.target.value
                      ? parseFloat(e.target.value)
                      : undefined,
                  })
                }
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Stock *</label>
              <input
                type="number"
                required
                min="0"
                value={formData.stock}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    stock: parseInt(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Descripción</label>
            <textarea
              value={formData.descripcion || ''}
              onChange={(e) =>
                setFormData({ ...formData, descripcion: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg"
              rows={4}
            />
          </div>
        </form>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg font-medium hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={(e) => handleSubmit(e as any)}
            disabled={loading}
            className="px-4 py-2 btn-accent font-medium disabled:opacity-50"
          >
            {loading ? 'Guardando...' : producto ? 'Actualizar' : 'Crear'}
          </button>
        </div>
      </div>
    </div>
  );
}
