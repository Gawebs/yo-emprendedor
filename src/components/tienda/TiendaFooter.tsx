import Link from 'next/link';
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import { CONTACTO } from './data';

const INSTITUCIONAL = [
  { href: '/tienda', label: 'Inicio' },
  { href: '/tienda/nosotros', label: 'Nosotros' },
  { href: '/tienda/preguntas-frecuentes', label: 'Preguntas frecuentes' },
  { href: '/tienda/terminos', label: 'Términos y condiciones' },
  { href: '/tienda/privacidad', label: 'Política de privacidad' },
  { href: '/tienda/cambios', label: 'Cambios y devoluciones' },
];

export function TiendaFooter() {
  return (
    <footer className="pie">
      <div className="contenedor">
        <div className="pie-grid">
          <div>
            <h2 className="pie-titulo">Yo Emprendedor</h2>
            <ul className="pie-lista">
              {INSTITUCIONAL.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="pie-titulo">Contactanos</h2>
            <ul className="pie-lista">
              <li className="pie-dato" style={{ display: 'flex', gap: '.45rem' }}>
                <MapPin size={15} style={{ flexShrink: 0, marginTop: 2 }} aria-hidden="true" />
                {CONTACTO.direccion}
              </li>
              <li style={{ display: 'flex', gap: '.45rem', alignItems: 'center' }}>
                <Mail size={15} style={{ flexShrink: 0 }} aria-hidden="true" />
                <a href={`mailto:${CONTACTO.email}`}>{CONTACTO.email}</a>
              </li>
              <li style={{ display: 'flex', gap: '.45rem', alignItems: 'center' }}>
                <Phone size={15} style={{ flexShrink: 0 }} aria-hidden="true" />
                <a href={CONTACTO.telefonoLink}>{CONTACTO.telefono}</a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="pie-titulo">Consultas por mayor</h2>
            <ul className="pie-lista">
              <li><a href={CONTACTO.telefonoLink}>{CONTACTO.telefono}</a></li>
              <li><Link href="/tienda/trabajos-a-medida">Trabajos a medida</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="pie-titulo">Conocenos</h2>
            <div className="pie-redes">
              <a href={CONTACTO.instagram} className="pie-red" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram size={17} aria-hidden="true" />
              </a>
              <a href={CONTACTO.instagram} className="pie-red" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook size={17} aria-hidden="true" />
              </a>
            </div>
            <p className="pie-news">Enterate antes que nadie</p>
            <form className="pie-form">
              <label htmlFor="pie-email" className="sr-only">Tu email</label>
              <input id="pie-email" className="pie-input" type="email" placeholder="tu@email.com" />
              <button type="submit" className="pie-btn">Sumarme</button>
            </form>
          </div>
        </div>

        <p className="pie-legal">
          © {new Date().getFullYear()} Yo Emprendedor · San Miguel de Tucumán, Argentina
        </p>
      </div>
    </footer>
  );
}
