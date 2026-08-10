'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    nombre_tienda: '',
    email: '',
    password: '',
    telefono: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // TODO: Implementar registro real con Supabase
    console.log('Signup:', formData);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Quiero Vender</h1>
          <p className="text-gray-600 mt-2">Crea tu cuenta como emprendedor</p>
        </div>

        <form onSubmit={handleSubmit} className="card p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-300 rounded-lg text-red-700">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Nombre de la Tienda *</label>
            <input
              type="text"
              required
              value={formData.nombre_tienda}
              onChange={(e) =>
                setFormData({ ...formData, nombre_tienda: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Mi Emprendimiento"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Contraseña *</label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Teléfono</label>
            <input
              type="tel"
              value={formData.telefono}
              onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="+54 381 214-6172"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-accent py-2 font-medium disabled:opacity-50"
          >
            {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
          </button>

          <p className="text-xs text-gray-600 text-center">
            Al registrarte, aceptas nuestros términos y condiciones
          </p>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            ¿Ya tienes cuenta?{' '}
            <Link href="/auth/login" className="font-semibold hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
