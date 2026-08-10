'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Bell, CheckCircle } from 'lucide-react';

export default function NotificacionesPage() {
  const [notificaciones, setNotificaciones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    loadNotificaciones();
  }, []);

  const loadNotificaciones = async () => {
    try {
      const { data } = await supabase
        .from('notificaciones')
        .select('*')
        .order('created_at', { ascending: false });
      setNotificaciones(data || []);
    } finally {
      setLoading(false);
    }
  };

  const handleMarcarLeido = async (id: string) => {
    await supabase
      .from('notificaciones')
      .update({ leida: true })
      .eq('id', id);
    loadNotificaciones();
  };

  if (loading) return <div>Cargando...</div>;

  const tipoIcon = {
    stock_bajo: '📦',
    cambio_precio: '💰',
    reposicion: '🔄',
    venta: '✅',
    liquidacion: '📊',
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Bell />
          Notificaciones
        </h1>
        <p className="text-gray-600">Alertas e información importante</p>
      </div>

      <div className="space-y-3">
        {notificaciones.length > 0 ? (
          notificaciones.map((notif) => (
            <div
              key={notif.id}
              className={`card p-4 flex items-start justify-between ${
                notif.leida ? 'opacity-60' : ''
              }`}
            >
              <div className="flex gap-4">
                <span className="text-2xl">
                  {tipoIcon[notif.tipo as keyof typeof tipoIcon] || '📢'}
                </span>
                <div>
                  <h3 className="font-semibold">{notif.titulo}</h3>
                  <p className="text-sm text-gray-600">{notif.mensaje}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(notif.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              {!notif.leida && (
                <button
                  onClick={() => handleMarcarLeido(notif.id)}
                  className="p-2 hover:bg-blue-50 rounded-lg"
                  title="Marcar como leído"
                >
                  <CheckCircle size={20} className="text-blue-600" />
                </button>
              )}
            </div>
          ))
        ) : (
          <div className="card p-12 text-center text-gray-500">
            Sin notificaciones
          </div>
        )}
      </div>
    </div>
  );
}
