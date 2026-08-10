'use client';
// Force rebuild
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { URLS, CONTACTO } from '@/constants/contacto';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="container-tight flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img
            src="https://raw.githubusercontent.com/Gawebs/yo-emprendedor/master/public/logo-favicon.png"
            alt="Yo Emprendedor"
            className="h-10 w-10"
          />
          <img
            src="https://raw.githubusercontent.com/Gawebs/yo-emprendedor/master/public/logo-web.png"
            alt="Yo Emprendedor"
            className="hidden sm:block h-8"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href={URLS.catalogoUrl} className="text-sm font-medium text-gray-700 hover:text-[var(--brand-primary)]">
            Catálogo
          </Link>
          <Link href="#" className="text-sm font-medium text-gray-700 hover:text-[var(--brand-primary)]">
            Sobre Nosotros
          </Link>
          <a href={URLS.whatsappLink} className="text-sm font-medium text-gray-700 hover:text-[var(--brand-primary)]">
            Contacto
          </a>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <Link href={URLS.loginUrl} className="text-sm font-medium px-3 py-2 rounded-lg hover:bg-gray-100">
            Inicia Sesión
          </Link>
          <Link href={URLS.signupUrl} className="btn-accent text-sm">
            Quiero Vender
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <nav className="container-tight py-4 flex flex-col gap-3">
            <Link href={URLS.catalogoUrl} className="text-sm font-medium py-2">
              Catálogo
            </Link>
            <Link href="#" className="text-sm font-medium py-2">
              Sobre Nosotros
            </Link>
            <a href={URLS.whatsappLink} className="text-sm font-medium py-2">
              Contacto
            </a>
            <hr />
            <Link href={URLS.loginUrl} className="text-sm font-medium py-2">
              Inicia Sesión
            </Link>
            <Link href={URLS.signupUrl} className="btn-accent text-sm w-full">
              Quiero Vender
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
