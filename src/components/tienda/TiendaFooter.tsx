import Link from 'next/link';
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin, RotateCcw } from 'lucide-react';
import { IconoWhatsapp } from '@/components/landing/IconoWhatsapp';
import { CONTACTO } from './data';

/** lucide no trae TikTok, asi que va aparte igual que WhatsApp. */
function IconoTiktok({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 0 1 0-5.18c.27 0 .52.04.77.12v-3.2a5.8 5.8 0 0 0-.77-.05A5.72 5.72 0 0 0 4.15 15.3a5.72 5.72 0 0 0 5.71 5.7 5.72 5.72 0 0 0 5.72-5.7V9.01a7.35 7.35 0 0 0 4.27 1.37V7.3a4.25 4.25 0 0 1-3.25-1.48z" />
    </svg>
  );
}

/** Las cinco que pidio Anita, en ese orden. */
const REDES = [
  { nombre: 'Instagram', href: CONTACTO.instagram, Icono: Instagram },
  { nombre: 'Facebook', href: CONTACTO.facebook, Icono: Facebook },
  { nombre: 'TikTok', href: CONTACTO.tiktok, Icono: IconoTiktok },
  { nombre: 'YouTube', href: CONTACTO.youtube, Icono: Youtube },
  { nombre: 'WhatsApp', href: `https://wa.me/${CONTACTO.whatsappNumero}`, Icono: IconoWhatsapp },
];

/** El ultimo va destacado: la Resolucion 424/2020 pide que el boton de
 *  arrepentimiento se distinga del resto, no que ocupe media pantalla. */
/** La consulta mayorista no tiene pagina propia: arranca por WhatsApp, ya
 *  identificada para que del otro lado sepan de donde viene. */
const MAYORISTA = encodeURIComponent(
  'Hola! Quiero hacer una consulta por venta mayorista.'
);

const INSTITUCIONAL = [
  { href: '/', label: 'Inicio' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/preguntas-frecuentes', label: 'Preguntas frecuentes' },
  { href: '/terminos', label: 'Términos y condiciones' },
  { href: '/privacidad', label: 'Política de privacidad' },
  { href: '/cambios', label: 'Cambios y devoluciones' },
  { href: '/envios', label: 'Envíos y entregas' },
  { href: '/formas-de-pago', label: 'Formas de pago' },
  { href: '/arrepentimiento', label: 'Botón de arrepentimiento', destacado: true },
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
                  <Link href={l.href} className={l.destacado ? 'pie-arrep-link' : undefined}>
                    {l.destacado && <RotateCcw size={14} aria-hidden="true" />}
                    {l.label}
                  </Link>
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
            <h2 className="pie-titulo">Consultas</h2>
            <ul className="pie-lista">
              <li>
                <a href={`https://wa.me/${CONTACTO.whatsappNumero}?text=${MAYORISTA}`}
                   target="_blank" rel="noopener noreferrer">
                  Venta por mayor
                </a>
              </li>
              <li><Link href="/trabajos-a-medida">Trabajos a medida</Link></li>
              <li style={{ display: 'flex', gap: '.45rem', alignItems: 'center' }}>
                <Phone size={15} style={{ flexShrink: 0 }} aria-hidden="true" />
                <a href={CONTACTO.telefonoLink}>{CONTACTO.telefono}</a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="pie-titulo">Conocenos</h2>
            <div className="pie-redes">
              {REDES.map(({ nombre, href, Icono }) => (
                <a key={nombre} href={href} className="pie-red" target="_blank"
                   rel="noopener noreferrer" aria-label={nombre}>
                  <Icono size={17} />
                </a>
              ))}
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
