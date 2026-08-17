'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Search, ShoppingBag, Menu, X, Store } from 'lucide-react';
import { PROMOS } from './data';
import { useCarrito } from '@/contexts/CarritoContext';

const LINKS = [
  { href: '/categorias', label: 'Categorías' },
  { href: '/ofertas', label: 'Ofertas' },
  { href: '/mas-vendidos', label: 'Más vendidos' },
  { href: '/gift-card', label: 'Gift card' },
  { href: '/marcas', label: 'Marcas', destacado: true },
];

export function TiendaNav() {
  const { cantidadTotal, cargado } = useCarrito();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const ruta = usePathname();

  // Hasta leer localStorage el contador se omite, para que el server y el
  // cliente pinten lo mismo y no salte un badge al hidratar.
  const itemsCarrito = cargado ? cantidadTotal : 0;

  // Al cambiar de pagina el menu se cierra solo; si no, queda abierto encima
  // del contenido nuevo.
  useEffect(() => setMenuAbierto(false), [ruta]);

  // Con el menu abierto, el fondo no scrollea.
  useEffect(() => {
    document.body.style.overflow = menuAbierto ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuAbierto]);

  useEffect(() => {
    if (!menuAbierto) return;
    const alEscape = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuAbierto(false); };
    window.addEventListener('keydown', alEscape);
    return () => window.removeEventListener('keydown', alEscape);
  }, [menuAbierto]);

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
          <Link href="/" className="nav-logo" aria-label="Yo Emprendedor, ir a la tienda">
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
            {/* Puerta a la seccion de emprendedores, siempre visible: antes
                estaba solo al pie de la home. */}
            <Link href="/quiero-vender" className="btn-vender">Quiero vender</Link>

            <button type="button" className="nav-icono" aria-label="Buscar productos">
              <Search size={19} aria-hidden="true" />
            </button>

            <Link href="/carrito" className="nav-icono" aria-label={`Carrito, ${itemsCarrito} productos`}>
              <ShoppingBag size={19} aria-hidden="true" />
              {itemsCarrito > 0 && <span className="nav-badge">{itemsCarrito}</span>}
            </Link>

            <button
              type="button"
              className="nav-icono nav-hamburguesa"
              onClick={() => setMenuAbierto((v) => !v)}
              aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuAbierto}
              aria-controls="menu-movil"
            >
              {menuAbierto ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>

            <Link href="/auth/login" className="btn-sesion">Iniciar sesión</Link>
          </div>
        </nav>
      </header>

      {menuAbierto && (
        <>
          <button
            type="button"
            className="menu-fondo"
            aria-label="Cerrar menú"
            onClick={() => setMenuAbierto(false)}
          />
          <div className="menu-movil" id="menu-movil">
            <ul>
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
            <Link href="/quiero-vender" className="menu-vender">
              <Store size={18} aria-hidden="true" />
              Quiero vender
            </Link>
          </div>
        </>
      )}
    </>
  );
}
