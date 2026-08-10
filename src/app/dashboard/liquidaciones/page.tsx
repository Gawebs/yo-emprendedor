'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { DollarSign } from 'lucide-react';

export default function LiquidacionesPage() {
  const [liquidaciones, setLiquidaciones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    loadLiquidaciones();
  }, []);

  const loadLiquidaciones = async () => {
    try {
      const { data } = await supabase
        .from('liquidaciones')
        .select('*')
        .order('anio', { ascending: false })
        .order('mes', { ascending: false });
      setLiquidaciones(data || []);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Cargando...</div>;

  const meses = ['', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <DollarSign />
          Liquidaciones
        </h1>
        <p className="text-gray-600">Historial de últimos 12 meses</p>
      </div>

      {/* KPI */}
      <div className="card p-6 mb-8">
        <p className="text-sm text-gray-600 mb-2">Total Neto (últimos 12 meses)</p>
        <p className="text-3xl font-bold">
          ${liquidaciones.reduce((sum, l) => sum + l.monto_neto, 0).toFixed(0)}
        </p>
      </div>

      {/* Tabla */}
      <div className="card overflow-hidden">
        {liquidaciones.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Período</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Monto Bruto</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Comisión</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Neto</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {liquidaciones.map((liq) => (
                  <tr key={liq.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">
                      {meses[liq.mes]} {liq.anio}
                    </td>
                    <td className="px-6 py-4">${liq.monto_bruto.toFixed(0)}</td>
                    <td className="px-6 py-4">
                      -${liq.comision_monto.toFixed(0)} ({liq.comision_porcentaje}%)
                    </td>
                    <td className="px-6 py-4 font-bold text-green-600">
                      ${liq.monto_neto.toFixed(0)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          liq.estado === 'pagada'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {liq.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-gray-500">Sin liquidaciones</div>
        )}
      </div>
    </div>
  );
}
