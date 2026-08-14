'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Search, ShoppingBag, Menu } from 'lucide-react';
import { PROMOS } from './data';

const LINKS = [
  { href: '/tienda/categorias', label: 'Categorías' },
  { href: '/tienda/ofertas', label: 'Ofertas' },
  { href: '/tienda/mas-vendidos', label: 'Más vendidos' },
  { href: '/tienda/gift-card', label: 'Gift card' },
  { href: '/tienda/marcas', label: 'Marcas', destacado: true },
];

export function TiendaNav({ itemsCarrito = 0 }: { itemsCarrito?: number }) {
  return (
    <>
      <div className="promos">
        <div className="promos-inner">
          {PROMOS.map((p) => (
            <span key={p}>{p}</span>
          ))}
        </div>
      </div>

      <header className="nav">
        <nav className="nav-inner" aria-label="Principal">
          <Link href="/tienda" className="nav-logo" aria-label="Yo Emprendedor, ir a la tienda">
            <Image src="/logo-web.png" alt="Yo Emprendedor" width={1467} height={558} priority />
          </Link>

          <ul className="nav-links">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={`nav-link${l.destacado ? ' destacado' : ''}`}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="nav-acciones">
            <button type="button" className="nav-icono" aria-label="Buscar productos">
              <Search size={19} aria-hidden="true" />
            </button>

            <Link href="/tienda/carrito" className="nav-icono" aria-label={`Carrito, ${itemsCarrito} productos`}>
              <ShoppingBag size={19} aria-hidden="true" />
              {itemsCarrito > 0 && <span className="nav-badge">{itemsCarrito}</span>}
            </Link>

            <button type="button" className="nav-icono nav-hamburguesa" aria-label="Abrir menú">
              <Menu size={20} aria-hidden="true" />
            </button>

            <Link href="/auth/login" className="btn-sesion">Iniciar sesión</Link>
          </div>
        </nav>
      </header>
    </>
  );
}
