'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { TrendingUp } from 'lucide-react';

export default function VentasPage() {
  const [ventas, setVentas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    loadVentas();
  }, []);

  const loadVentas = async () => {
    try {
      const { data } = await supabase
        .from('ventas')
        .select('*, productos(nombre)')
        .order('created_at', { ascending: false });
      setVentas(data || []);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Cargando...</div>;

  const estadoColor = {
    pendiente: 'bg-yellow-100 text-yellow-800',
    confirmada: 'bg-blue-100 text-blue-800',
    entregada: 'bg-green-100 text-green-800',
    cancelada: 'bg-red-100 text-red-800',
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <TrendingUp />
          Ventas
        </h1>
        <p className="text-gray-600">Seguimiento de transacciones</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="card p-6">
          <p className="text-sm text-gray-600">Total Ventas</p>
          <p className="text-2xl font-bold">{ventas.length}</p>
        </div>
        <div className="card p-6">
          <p className="text-sm text-gray-600">Total Ingresos</p>
          <p className="text-2xl font-bold">
            ${ventas.reduce((sum, v) => sum + v.precio_unitario * v.cantidad, 0).toFixed(0)}
          </p>
        </div>
        <div className="card p-6">
          <p className="text-sm text-gray-600">Entregadas</p>
          <p className="text-2xl font-bold">
            {ventas.filter((v) => v.estado === 'entregada').length}
          </p>
        </div>
      </div>

      {/* Tabla */}
      <div className="card overflow-hidden">
        {ventas.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Producto</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Cliente</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Cantidad</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Total</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Estado</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Fecha</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {ventas.map((venta) => (
                  <tr key={venta.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">
                      {venta.productos?.nombre || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-sm">{venta.cliente_nombre || 'Anónimo'}</td>
                    <td className="px-6 py-4 text-sm">{venta.cantidad}</td>
                    <td className="px-6 py-4 font-semibold">
                      ${(venta.precio_unitario * venta.cantidad).toFixed(0)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          estadoColor[venta.estado as keyof typeof estadoColor]
                        }`}
                      >
                        {venta.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(venta.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-gray-500">Sin ventas todavía</div>
        )}
      </div>
    </div>
  );
}
