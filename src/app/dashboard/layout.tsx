import { redirect } from 'next/navigation';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { createClient } from '@/lib/supabase/server';

/**
 * El panel estaba abierto: `/dashboard` respondia 200 a cualquiera que
 * escribiera la direccion. Mientras eran datos de muestra no exponia nada,
 * pero es la puerta por la que se editan precios y stock, asi que se cierra
 * antes de conectarle la base.
 *
 * Se verifica del lado del servidor y no en el navegador: un chequeo en el
 * cliente se saltea desactivando JavaScript. Y no alcanza con estar logueado
 * —cualquier comprador tiene cuenta— hace falta ser admin.
 *
 * Igual esto es la primera puerta, no la ultima: quien mande una consulta a
 * mano sigue chocando con las policies de la base, que son las que de verdad
 * protegen los datos.
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/auth/login?volver=/dashboard');

  const { data: perfil } = await supabase
    .from('profiles')
    .select('rol')
    .eq('id', user.id)
    .single();

  if (perfil?.rol !== 'admin') redirect('/');

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-64 bg-gray-50 min-h-screen">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
