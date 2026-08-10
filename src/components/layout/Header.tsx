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
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAYAAADL1t+KAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAEq2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSfvu78nIGlkPSdXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQnPz4KPHg6eG1wbWV0YSB4bWxuczp4PSdhZG9iZTpuczptZXRhLyc+CjxyZGY6UkRGIHhtbG5zOnJkZj0naHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyc+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczpBdHRyaWI9J2h0dHA6Ly9ucy5hdHRyaWJ1dGlvbi5jb20vYWRzLzEuMC8nPgogIDxBdHRyaWI6QWRzPgogICA8cmRmOlNlcT4KICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0nUmVzb3VyY2UnPgogICAgIDxBdHRyaWI6Q3JlYXRlZD4yMDI1LTAzLTA2PC9BdHRyaWI6Q3JlYXRlZD4KICAgICA8QXR0cmliOkV4dElkPjVhZDMxMDk3LTZjNDItNDViYy1hMDZhLWM5ODE5ODVlMWJjZTwvQXR0cmliOkV4dElkPgogICAgIDxBdHRyaWI6RmJJZD41MjUyNjU5MTQxNzk1ODA8L0F0dHJpYjpGYklkPgogICAgIDxBdHRyaWI6VG91Y2hUeXBlPjI8L0F0dHJpYjpUb3VjaFR5cGU+CiAgICA8L3JkZjpsaT4KICAgPC9yZGY6U2VxPgogIDwvQXR0cmliOkFkcz4KICAKICAKICAKICAKICAGPC9yZGY6RGVzY3JpcHRpb24+CjwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD9YcGFja2V0IGVuZD0ncic/PkS+LWQAAAIASURBVHic7dEhDQABDAAwQn+D1jiwEVkSyJKAJIEkCUgSSBJIEkiSQJJAkgSSBJIEkiSQJIEkASQJJAkkCSRJIEkCSQJJAkkCSRJIEkiSQJJAkgSSBJIEkiSQJIEkASQJJAkkSSBJAkkCSRJIEkiSQJIEkiSQJIEkASQJJAkkSSBJAkkCSRJIEkiSQJIEkiSQJIEkASQJJAkkSSBJAkkCSRJIEkiSQJIEkiSQJIEkASQJJAkkSSBJAkkCSRJIEkiSQJIEkiSQJIEkASQJJAkkSSBJAkkCSRJIEkiSQJIEkiSQJIEkASQJJAkkSSBJAkkCSRJIEkiSQJIEkiSQJIEkASQJJAkkSSBJAkkCSRJIEkiSQJIEkiSQJIEkASQJJAkkSSBJAkkCSRJIEkiSQJIEkiSQJIEkASQJJAkkSSBJAkkCSRJIEkiSQJIEkiSQJIEkASQJJAkkSSBJAkkCSRJIEkiSQJIEkiSQJIEkASQJJAkkSSBJAkkCSRJIEkiSQJIEkiSQJIEkASQJJAkkSSBJAkkCSRJIEkiSQJIEkiSQJIEkASQJJAkkSSBJAkkCSRJIEkiSQJIEkiSQJIEkASQJJAkkSSBJAkkCSRJIEkiSQJIEkiSQJIEkASQJJAkkSSBJAkkCSRJIEkiSQJIEkiSQJIEkASQJJAkkSSBJAkkCSRJIEkiSQJIEkiSQJIEkASQJJAkkSSBJAkkCSRJIEkiSQJIEkiSQJIEkCSAJIEkgSQJJAkkCSBJIEkiSQJIEkiSQJIEkiSQJIEkiSQJIEkiSQJIEkiSQJIEkiSQJIEkiSQJIEkiSQJIEkiSQpAEkCSBJIEkCSRJIEkiSQJIEkiSQJIEkiSQJIEkCSBJAkkCSBJIEkCSBJIEkCSBJAkkCSBJAkkCSBJAkkCSBJAkgSQBJAkkCSBJAkkCSBJAkkCSBJAkkSSALAIEVzx9WV4DhAAAAAElFTkSuQmCC"
            alt="Yo Emprendedor"
            className="h-8"
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
