'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Clock, Plus } from 'lucide-react';

export default function TurnosPage() {
  const [turnos, setTurnos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fecha_turno: '',
    hora_inicio: '',
    hora_fin: '',
    descripcion: '',
  });
  const supabase = createClient();

  useEffect(() => {
    loadTurnos();
  }, []);

  const loadTurnos = async () => {
    try {
      const { data } = await supabase
        .from('turnos')
        .select('*')
        .order('fecha_turno', { ascending: false });
      setTurnos(data || []);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('turnos').insert({
      fecha_turno: formData.fecha_turno,
      hora_inicio: formData.hora_inicio,
      hora_fin: formData.hora_fin,
      descripcion: formData.descripcion,
    });

    if (!error) {
      setFormData({ fecha_turno: '', hora_inicio: '', hora_fin: '', descripcion: '' });
      setShowForm(false);
      loadTurnos();
    }
  };

  if (loading) return <div>Cargando...</div>;

  const estadoColor = {
    pendiente: 'bg-yellow-100 text-yellow-800',
    completado: 'bg-green-100 text-green-800',
    cancelado: 'bg-red-100 text-red-800',
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Clock />
            Turnos
          </h1>
          <p className="text-gray-600">Sistema para dejar mercadería</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-accent flex items-center gap-2 px-4 py-2"
        >
          <Plus size={20} />
          Crear Turno
        </button>
      </div>

      {/* Formulario */}
      {showForm && (
        <div className="card p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Fecha *</label>
                <input
                  type="date"
                  required
                  value={formData.fecha_turno}
                  onChange={(e) =>
                    setFormData({ ...formData, fecha_turno: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Hora Inicio</label>
                <input
                  type="time"
                  value={formData.hora_inicio}
                  onChange={(e) =>
                    setFormData({ ...formData, hora_inicio: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Descripción</label>
              <textarea
                value={formData.descripcion}
                onChange={(e) =>
                  setFormData({ ...formData, descripcion: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg"
                rows={3}
              />
            </div>
            <div className="flex gap-3">
              <button type="submit" className="btn-accent px-4 py-2">
                Guardar
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tabla */}
      <div className="card overflow-hidden">
        {turnos.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Fecha</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Hora</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Descripción</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {turnos.map((turno) => (
                  <tr key={turno.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">
                      {new Date(turno.fecha_turno).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {turno.hora_inicio || 'Sin especificar'}
                    </td>
                    <td className="px-6 py-4 text-sm">{turno.descripcion}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          estadoColor[turno.estado as keyof typeof estadoColor]
                        }`}
                      >
                        {turno.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-gray-500">Sin turnos programados</div>
        )}
      </div>
    </div>
  );
}
