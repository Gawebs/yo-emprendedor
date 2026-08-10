import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';
import { CONTACTO, URLS } from '@/constants/contacto';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="container-tight py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <Image
              src="/logo-web.png"
              alt="Yo Emprendedor"
              width={1467}
              height={558}
              className="h-14 w-auto invert mb-4"
            />
            <p className="text-sm text-gray-300">
              Plataforma de marketplace local para emprendedores de San Miguel de Tucumán.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Inicio</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href={URLS.catalogoUrl} className="hover:text-white transition">
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Política de Privacidad
                </Link>
              </li>
            </ul>
          </div>

          {/* Vender */}
          <div>
            <h4 className="font-semibold mb-4">Vender</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>
                <Link href={URLS.signupUrl} className="hover:text-white transition">
                  Registrarme como Vendedor
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Cambios y Devoluciones
                </Link>
              </li>
              <li>
                <a href={URLS.whatsappLink} className="hover:text-white transition">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <ul className="text-sm text-gray-300 space-y-3">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                <span>{CONTACTO.direccion}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <a href={URLS.emailLink} className="hover:text-white transition">
                  {CONTACTO.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <a href={URLS.telefonoLink} className="hover:text-white transition">
                  {CONTACTO.telefono}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-700 my-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; {currentYear} Yo Emprendedor. Todos los derechos reservados.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href={CONTACTO.instagram} className="hover:text-white transition">
              Instagram
            </a>
            <a href={URLS.whatsappLink} className="hover:text-white transition">
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
