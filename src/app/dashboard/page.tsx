'use client';

import { useTenant } from '@/contexts/TenantContext';
import { Package, TrendingUp, DollarSign, AlertCircle } from 'lucide-react';

export default function DashboardPage() {
  const { emprendedor, loading } = useTenant();

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">
          Bienvenido, {emprendedor?.nombre_tienda}
        </h1>
        <p className="text-gray-600">Panel ejecutivo con control operativo</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Productos</p>
              <p className="text-3xl font-bold">24</p>
            </div>
            <Package size={32} className="text-blue-500" />
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Ventas Este Mes</p>
              <p className="text-3xl font-bold">12</p>
            </div>
            <TrendingUp size={32} className="text-green-500" />
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Ingresos Netos</p>
              <p className="text-3xl font-bold">$45,999</p>
            </div>
            <DollarSign size={32} className="text-yellow-500" />
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Alertas</p>
              <p className="text-3xl font-bold">3</p>
            </div>
            <AlertCircle size={32} className="text-red-500" />
          </div>
        </div>
      </div>

      {/* Info Important */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Novedades e Info Importante</h2>
          <div className="card p-6 space-y-4">
            <div className="pb-4 border-b">
              <h3 className="font-semibold mb-1">Stock bajo en 3 productos</h3>
              <p className="text-sm text-gray-600">Revisa tus productos con bajo stock</p>
            </div>
            <div className="pb-4 border-b">
              <h3 className="font-semibold mb-1">Liquidación disponible</h3>
              <p className="text-sm text-gray-600">Tu liquidación de julio está lista para consultar</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Nuevo: Oportunidades de venta</h3>
              <p className="text-sm text-gray-600">Ve las categorías más buscadas esta semana</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Accesos Rápidos</h2>
          <div className="space-y-3">
            <a
              href="/dashboard/productos"
              className="block p-4 rounded-lg border border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition"
            >
              <h3 className="font-semibold">Gestionar Productos</h3>
              <p className="text-sm text-gray-600">Agregar, editar o eliminar productos</p>
            </a>
            <a
              href="/dashboard/ventas"
              className="block p-4 rounded-lg border border-gray-300 hover:border-green-500 hover:bg-green-50 transition"
            >
              <h3 className="font-semibold">Ver Ventas</h3>
              <p className="text-sm text-gray-600">Seguimiento de transacciones</p>
            </a>
            <a
              href="/dashboard/liquidaciones"
              className="block p-4 rounded-lg border border-gray-300 hover:border-yellow-500 hover:bg-yellow-50 transition"
            >
              <h3 className="font-semibold">Liquidaciones</h3>
              <p className="text-sm text-gray-600">Historial y detalles</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
