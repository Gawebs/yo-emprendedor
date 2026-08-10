'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Package, TrendingUp, DollarSign, Bell, Clock, Sparkles, LogOut } from 'lucide-react';
import { URLS } from '@/constants/contacto';

const MENU_ITEMS = [
  { href: '/dashboard', label: 'Inicio', icon: Sparkles },
  { href: '/dashboard/productos', label: 'Productos', icon: Package },
  { href: '/dashboard/ventas', label: 'Ventas', icon: TrendingUp },
  { href: '/dashboard/liquidaciones', label: 'Liquidaciones', icon: DollarSign },
  { href: '/dashboard/notificaciones', label: 'Notificaciones', icon: Bell },
  { href: '/dashboard/turnos', label: 'Turnos', icon: Clock },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen flex flex-col fixed left-0 top-0 border-r border-gray-800">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <Link href="/dashboard" className="flex items-center">
          <Image
            src="/logo-web.png"
            alt="Yo Emprendedor"
            width={1467}
            height={558}
            priority
            className="h-10 w-auto invert"
          />
        </Link>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${
                isActive
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-800">
        <Link
          href={URLS.loginUrl}
          className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-gray-400 hover:text-white hover:bg-gray-800 transition"
        >
          <LogOut size={20} />
          <span>Salir</span>
        </Link>
      </div>
    </aside>
  );
}
