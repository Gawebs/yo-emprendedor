import Link from 'next/link';
import Image from 'next/image';
import { Check, MapPin, Phone, Mail, Instagram, Store } from 'lucide-react';
import { Reveal } from '@/components/landing/Reveal';
import { Faq } from '@/components/landing/Faq';
import { FormContacto } from '@/components/landing/FormContacto';
import { IconoWhatsapp } from '@/components/landing/IconoWhatsapp';
import {
  VIDEOS_TESTIMONIOS,
  CONTACTO,
  RECONOCIMIENTO,
  PILARES,
  BENEFICIOS,
  BENEFICIO_STATS,
  HERO_STATS,
  DOLORES,
  SHOCK,
  COSTOS,
  PLANES,
  TESTIMONIOS,
  ROI,
  RESUMEN,
} from '@/components/landing/data';
import '@/styles/landing.css';

/**
 * PLACEHOLDER — foto de portada del hero. Va la fachada real del local.
 * Horizontal, idealmente 1600x900 o mas. Le cae encima brightness(.35) y un
 * velo negro, asi que conviene una toma con algo de luz propia (la fachada de
 * noche con el cartel prendido funciona bien); una foto ya oscura se apaga del
 * todo. El texto ocupa la mitad izquierda: dejar ese lado despejado.
 * Al reemplazar, mover el archivo a /public y usar next/image en vez de la URL.
 */
const HERO_FOTO =
  'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1600&q=80';
/**
 * PLACEHOLDER — interior de la tienda, mejor con clientes adentro.
 * Se recorta a 4:3, asi que el motivo tiene que estar centrado. 800x600 alcanza.
 */
const MEDIOS = `${process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''}/storage/v1/object/public/sitio`;
const VIDEO_ANITA = `${MEDIOS}/video/anita.mp4`;
const VIDEO_ANITA_PORTADA = `${MEDIOS}/video/anita-portada.webp`;

export default function Home() {
  return (
    <div className="ye-landing">
      <Reveal />

      {/* El logo vuelve a la tienda, que es la home real del sitio, y el link
          a la tienda vive en la barra fija: antes la unica salida estaba en el
          CTA del final y habia que scrollear toda la pagina para encontrarla. */}
      <nav>
        <div className="nav-inner">
          <Link className="nav-logo" href="/" aria-label="Yo Emprendedor, ir a la tienda">
            <Image src="/logo-web.png" alt="Yo Emprendedor" width={1467} height={558} priority />
          </Link>
          <div className="nav-acciones">
            <Link href="/" className="nav-tienda">
              <Store size={16} aria-hidden="true" />
              Ver tienda
            </Link>
            <a href="#plans" className="nav-cta">Ver planes</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero">
        <div className="hero-img" style={{ backgroundImage: `url('${HERO_FOTO}')` }} />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div>
            <div className="hero-eyebrow">Plataforma de crecimiento para emprendedores</div>
            <h1 className="hero-title">
              Tu marca creciendo y vendiendo,<br />
              <em>sin que vos estés presente</em>
            </h1>
            <p className="hero-sub">
              Visibilidad, presencia física y gestión de ventas en San Miguel de Tucumán.<br />
              Sin abrir un local, sin invertir tu tiempo y sin riesgos innecesarios.
            </p>
            <div className="hero-address">
              <MapPin size={14} aria-hidden="true" />
              {CONTACTO.direccion}
            </div>
            <div className="hero-buttons">
              <a href="#que-es" className="btn-primary">Conocé cómo funciona</a>
              <a href="#plans" className="btn-ghost">Ver planes</a>
            </div>
          </div>
          <div>
            <div className="hero-stats">
              {HERO_STATS.map((stat) => (
                <div className="hero-stat" key={stat.label}>
                  <div className="hero-stat-num">{stat.num}</div>
                  <div className="hero-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="hero-scroll">
          <span>Seguir leyendo</span>
          <div className="hero-scroll-line" />
        </div>
      </section>

      {/* RECONOCIMIENTO */}
      <section id="recognition">
        <div className="recognition-inner">
          {RECONOCIMIENTO.map(({ icono: Icono, texto }, i) => (
            <div key={texto} style={{ display: 'contents' }}>
              {i > 0 && <div className="recog-divider" />}
              <div className="recog-item">
                <Icono size={18} strokeWidth={1.75} color="var(--amarillo)" aria-hidden="true" />
                {texto}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* QUE ES */}
      <section id="que-es">
        <div className="container">
          <div className="que-es-grid">
            {/* Video de Anita contando de que se trata. Reemplaza a una foto de
                banco de imagenes: que lo cuente ella, con el local atras,
                convence mucho mas que dos parrafos al lado de una foto de
                stock.

                `preload="metadata"` descarga unos kilobytes, no los 8 MB: el
                video empieza a bajar recien cuando alguien le da play. Y sin
                arranque automatico ni sonido, que espanta mas de lo que suma. */}
            <div className="que-es-video reveal">
              <video
                src={VIDEO_ANITA}
                poster={VIDEO_ANITA_PORTADA}
                controls
                preload="metadata"
                playsInline
                aria-label="Anita cuenta qué es Yo Emprendedor"
              />
            </div>
            <div className="que-es-text">
              <span className="eyebrow reveal">¿Qué es Yo Emprendedor?</span>
              <h2 className="section-title reveal">
                Plataforma creada para vender más, ganar visibilidad y crecer
              </h2>
              <p className="reveal">
                Yo Emprendedor es una plataforma creada para ayudar a negocios y marcas a vender más,
                ganar visibilidad y crecer de forma profesional, sin asumir los costos, el riesgo y la
                carga operativa de tener un local propio.
              </p>
              <p className="reveal">
                Mientras vos te enfocás en producir y desarrollar tu negocio, nosotros ayudamos a que
                más personas descubran tu marca y se conviertan en clientes.
              </p>
              <div className="que-es-quote reveal">
                <p>
                  &ldquo;Vos te enfocás en hacer crecer tu producto.{' '}
                  <em>Nosotros te ayudamos a hacer crecer tu negocio.</em>&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS EN VIDEO */}
      {VIDEOS_TESTIMONIOS.length > 0 && (
        <section id="video-testimonios">
          <div className="container">
            <span className="eyebrow reveal">Lo dicen ellas</span>
            <h2 className="section-title reveal">
              Emprendedoras que ya venden con nosotros
            </h2>
            <p className="section-sub reveal">
              Marcas que empezaron igual que vos y hoy tienen su espacio en el local.
            </p>

            <div className="videos-grid">
              {VIDEOS_TESTIMONIOS.map((t) => (
                <figure className="video-testi reveal" key={t.video}>
                  {/* `preload="none"`: son varios videos en la misma pagina y
                      con metadata cada uno abriria su propia descarga apenas
                      carga la seccion. La portada alcanza para que se vea algo. */}
                  <video
                    src={t.video}
                    poster={t.portada}
                    controls
                    preload="none"
                    playsInline
                    aria-label={
                      t.nombre
                        ? `${t.nombre}, de ${t.marca}, cuenta su experiencia`
                        : 'Una emprendedora cuenta su experiencia en Yo Emprendedor'
                    }
                  />
                  {/* Sin nombre no va epigrafe: un generico repetido debajo de
                      cada video se lee como relleno. */}
                  {(t.frase || t.nombre) && (
                    <figcaption>
                      {t.frase && <p className="video-testi-frase">&ldquo;{t.frase}&rdquo;</p>}
                      {t.nombre && <p className="video-testi-nombre">{t.nombre}</p>}
                      {t.marca && <p className="video-testi-marca">{t.marca}</p>}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* COMO LO HACEMOS */}
      <section id="como">
        <div className="container">
          <span className="eyebrow reveal">¿Cómo lo hacemos?</span>
          <h2 className="section-title reveal">Seis pilares que hacen funcionar tu presencia</h2>
          <p className="section-sub reveal">
            Un sistema completo para que tu marca venda, crezca y se vea profesional, sin que tengas
            que estar en todos lados.
          </p>
          <div className="como-grid">
            {PILARES.map(({ icono: Icono, titulo, texto }) => (
              <div className="como-card reveal" key={titulo}>
                <div className="como-icon">
                  <Icono size={20} strokeWidth={1.75} color="var(--amarillo)" aria-hidden="true" />
                </div>
                <h3>{titulo}</h3>
                <p>{texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFICIO */}
      <section id="beneficio">
        <div className="container">
          <div className="beneficio-grid">
            <div className="beneficio-text">
              <span className="eyebrow reveal">El beneficio más importante</span>
              <h2 className="beneficio-title reveal">
                Tu negocio vende aunque vos <em>no estés</em>
              </h2>
              <p className="reveal">
                Mientras trabajás, producís, estudiás o compartís tiempo con tu familia, tus productos
                siguen exhibidos, visibles y disponibles para la venta.
              </p>
              <div className="beneficio-checks reveal">
                {BENEFICIOS.map((texto) => (
                  <div className="beneficio-check" key={texto}>
                    <div className="check-icon">
                      <Check size={12} strokeWidth={3} color="var(--negro)" aria-hidden="true" />
                    </div>
                    {texto}
                  </div>
                ))}
              </div>
            </div>
            <div className="beneficio-stats reveal">
              {BENEFICIO_STATS.map((stat) => (
                <div className="bstat" key={stat.label}>
                  <div className="bstat-num">{stat.num}</div>
                  <div className="bstat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DOLOR */}
      <section id="pain">
        <div className="container">
          <span className="eyebrow reveal">¿Te identificás con esto?</span>
          <h2 className="section-title reveal">Estas son las historias que escuchamos todos los días</h2>
          <p className="section-sub reveal">
            Cinco perfiles distintos. Un dolor en común: querés crecer sin perder el control de tu vida.
          </p>
          <div className="pain-grid">
            {DOLORES.map(({ cita, quien }) => (
              <div className="pain-card reveal" key={quien}>
                <p className="pain-quote">&ldquo;{cita}&rdquo;</p>
                <div className="pain-who">{quien}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COSTO */}
      <section id="cost">
        <div className="container">
          <span className="eyebrow reveal">El costo real de hacerlo solo</span>
          <h2 className="section-title reveal">
            Abrir un local no cuesta $800.000.<br />
            <span className="amarillo">Cuesta $5.000.000 y 195 horas de tu vida.</span>
          </h2>
          <p className="section-sub reveal">
            Cuando sumás dinero y tiempo, el número real es mucho más alto de lo que imaginabas, y eso
            antes de vender la primera unidad.
          </p>

          <div className="shock-numbers reveal">
            {SHOCK.map((s) => (
              <div className="shock-card" key={s.label}>
                <div className="shock-num">{s.num}</div>
                <div className="shock-label">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="cost-table-wrap reveal">
            <table className="cost-table">
              <caption className="sr-only">
                Comparación de costo mensual en dinero y horas entre tener local propio y estar en Yo
                Emprendedor.
              </caption>
              <thead>
                <tr>
                  <th className="th-item" scope="col">Concepto</th>
                  <th className="th-bad" scope="col">Dinero (local propio) / mes</th>
                  <th className="th-bad" scope="col">Tiempo (horas) / mes</th>
                  <th className="th-good" scope="col">Yo Emprendedor</th>
                </tr>
              </thead>
              <tbody>
                {COSTOS.map((fila) => (
                  <tr key={fila.item}>
                    <td className="td-item">{fila.item}</td>
                    <td className="td-bad">{fila.dinero}</td>
                    <td className="td-bad">{fila.tiempo}</td>
                    <td className="td-good">{fila.ye}</td>
                  </tr>
                ))}
                <tr className="row-total">
                  <td className="td-item">TOTAL MENSUAL</td>
                  <td className="td-bad">~$5.000.000</td>
                  <td className="td-bad">~195 hs</td>
                  <td className="td-good">$250K a $950K · 7 a 11 hs</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* PLANES */}
      <section id="plans">
        <div className="container">
          <span className="eyebrow reveal">Nuestros planes</span>
          <h2 className="section-title reveal">Elegí el plan que más se adapta a tu momento</h2>
          <p className="section-sub reveal">
            Cada plan está diseñado para una etapa específica. Si no sabés cuál te corresponde, te
            ayudamos a encontrarlo.
          </p>
          <div className="plans-grid">
            {PLANES.map((plan) => (
              <div className={`plan-card reveal${plan.destacado ? ' featured' : ''}`} key={plan.nombre}>
                {plan.destacado && <div className="featured-badge">El más elegido</div>}
                <span className={`plan-tag ${plan.destacado ? 'tag-negro' : 'tag-verde'}`}>{plan.tag}</span>
                <div className="plan-name">{plan.nombre}</div>
                <div className="plan-price">{plan.precio}</div>
                <div className="plan-price-sub">por mes</div>
                <p className="plan-hook">{plan.hook}</p>
                <ul className="plan-benefits">
                  {plan.beneficios.map((b) => (
                    <li key={b}>
                      <span className="chk" aria-hidden="true">✓</span>
                      {b}
                    </li>
                  ))}
                </ul>
                <p className="plan-cupo">{plan.cupo}</p>
                <a href={CONTACTO.whatsappLink} className="plan-btn" target="_blank" rel="noopener noreferrer">
                  {plan.cta} →
                </a>
                <div className="value-banner">
                  <div>
                    <div className="value-banner-label">
                      Valor real <span className="value-banner-tachado">{plan.valorReal}</span>
                    </div>
                    <div className="value-banner-inversion">Tu inversión: {plan.precio}/mes</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="value-banner-label">Ahorrás</div>
                    <div className="value-banner-num">{plan.ahorro}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section id="testimonials">
        <div className="container">
          <span className="eyebrow reveal">Emprendedoras que ya lo decidieron</span>
          <h2 className="section-title reveal">Resultados reales, con nombres y apellidos</h2>
          <p className="section-sub reveal">
            No son promesas. Son marcas que ya están creciendo dentro de Yo Emprendedor.
          </p>
          <div className="testi-wrap">
            {TESTIMONIOS.map((t) => (
              <div className="testi-card reveal" key={t.nombre}>
                <div className="testi-avatar" aria-hidden="true">{t.iniciales}</div>
                <p className="testi-quote">{t.cita}</p>
                <div className="testi-name">{t.nombre}</div>
                <div className="testi-brand">{t.marca}</div>
                <div className="testi-role">{t.rol}</div>
                <div className="testi-stats">
                  <div className="testi-stat">
                    <span className="testi-stat-num">{t.vendido}</span>
                    <span className="testi-stat-label">Vendido en 3 meses</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI */}
      <section id="roi">
        <div className="container">
          <span className="eyebrow reveal">Tu recupero de inversión</span>
          <h2 className="section-title reveal">¿Cuánto necesitás vender para que el plan se pague solo?</h2>
          <p className="section-sub reveal">Menos de lo que imaginás. Y el resto es ganancia pura.</p>
          <div className="roi-grid">
            {ROI.map((r) => (
              <div
                className={`roi-card reveal ${r.destacado ? 'roi-card-featured' : 'roi-card-plain'}`}
                key={r.plan}
              >
                <div className={`roi-head ${r.destacado ? 'roi-head-featured' : 'roi-head-plain'}`}>
                  <div className="roi-plan">{r.plan}</div>
                  {r.destacado && <div className="roi-badge">El más elegido</div>}
                </div>
                <div className="roi-body">
                  <div style={{ textAlign: 'center' }}>
                    <div className="roi-label">Ticket mínimo</div>
                    <div className="roi-ticket">{r.ticket}</div>
                  </div>
                  <div className="roi-box">
                    <div className="roi-label">Ventas para cubrir el plan</div>
                    <div className="roi-ventas">{r.ventas}</div>
                    <div className="roi-ventas-sub">ventas por mes</div>
                  </div>
                </div>
                <div className="roi-foot">
                  <div className="roi-foot-cadencia">{r.cadencia}</div>
                  <div className="roi-foot-precio">{r.precio}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq">
        <div className="container">
          <span className="eyebrow reveal">Dudas frecuentes</span>
          <h2 className="section-title reveal">Preguntas que te estás haciendo ahora mismo</h2>
          <Faq />
        </div>
      </section>

      {/* CONCLUSION */}
      <section id="conclusion">
        <div className="container">
          <span className="eyebrow reveal">En resumen</span>
          <h2 className="section-title reveal">Todo lo que necesitás para crecer, en un solo lugar</h2>
          <p className="section-sub reveal">
            Es la estructura que le faltaba a tu negocio para pasar al siguiente nivel, sin los
            riesgos, los costos ni la carga operativa de hacerlo solo.
          </p>
          <div className="conclusion-grid">
            <div className="conclusion-checks reveal">
              {RESUMEN.map((r) => (
                <div className="c-check" key={r.titulo}>
                  <div className="c-check-icon">
                    <Check size={14} strokeWidth={3} color="var(--negro)" aria-hidden="true" />
                  </div>
                  <div>
                    <strong>{r.titulo}</strong>
                    <span>{r.texto}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="conclusion-banner reveal">
              <p>Porque crecer no debería significar trabajar más horas.</p>
              <p><em>Debería significar construir un negocio más inteligente.</em></p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto">
        <div className="container">
          <div className="contacto-grid">
            <div>
              <span className="eyebrow reveal">Hablemos</span>
              <h2 className="section-title reveal">Contanos sobre tu marca</h2>
              <p className="contacto-intro reveal">
                Completá el formulario y te respondemos por WhatsApp en minutos. También podés
                escribirnos directo o pasar por la tienda.
              </p>

              <div className="contacto-canales">
                <a href={CONTACTO.whatsappLink} target="_blank" rel="noopener noreferrer" className="canal reveal">
                  <div className="canal-icono canal-icono-wsp">
                    <IconoWhatsapp size={22} color="white" />
                  </div>
                  <div>
                    <div className="canal-titulo">WhatsApp</div>
                    <div className="canal-dato">Respuesta rápida</div>
                  </div>
                </a>

                <a href={CONTACTO.telefonoLink} className="canal reveal">
                  <div className="canal-icono">
                    <Phone size={20} color="var(--negro)" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="canal-titulo">Teléfono</div>
                    <div className="canal-dato">{CONTACTO.telefono}</div>
                  </div>
                </a>

                <a href={`mailto:${CONTACTO.email}`} className="canal reveal">
                  <div className="canal-icono">
                    <Mail size={20} color="var(--negro)" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="canal-titulo">Email</div>
                    <div className="canal-dato">{CONTACTO.email}</div>
                  </div>
                </a>

                <div className="canal reveal">
                  <div className="canal-icono">
                    <MapPin size={20} color="var(--negro)" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="canal-titulo">Tienda</div>
                    <div className="canal-dato">{CONTACTO.direccion}</div>
                  </div>
                </div>
              </div>
            </div>

            <FormContacto />
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="cta-final">
        <div className="container cta-content">
          <span className="eyebrow cta-eyebrow">Más que una tienda, una comunidad para crecer</span>
          <h2 className="cta-title">
            La pregunta no es si podés<br />
            permitirte estar en <em>Yo Emprendedor.</em>
          </h2>
          <p className="cta-sub">
            La pregunta es cuánto te está costando cada mes que no estás. Hablá con nosotros y en 15
            minutos sabés qué plan se adapta mejor a tu momento.
          </p>
          <div className="cta-buttons">
            <a href={CONTACTO.whatsappLink} className="btn-primary" target="_blank" rel="noopener noreferrer">
              <IconoWhatsapp size={16} />
              WhatsApp
            </a>
            <Link href="/" className="btn-ghost">Ver tienda online</Link>
            <a href="#plans" className="btn-ghost">Ver planes</a>
          </div>
          <div className="cta-contact">
            <div className="cta-contact-item">
              <MapPin size={14} aria-hidden="true" />
              {CONTACTO.direccion}
            </div>
            <div className="cta-contact-item">
              <Phone size={14} aria-hidden="true" />
              <a href={CONTACTO.telefonoLink}>{CONTACTO.telefono}</a>
            </div>
            <div className="cta-contact-item">
              <Mail size={14} aria-hidden="true" />
              <a href={`mailto:${CONTACTO.email}`}>{CONTACTO.email}</a>
            </div>
            <div className="cta-contact-item">
              <Instagram size={14} aria-hidden="true" />
              <a href={CONTACTO.instagram} target="_blank" rel="noopener noreferrer">
                {CONTACTO.instagramUser}
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <p>
            © {new Date().getFullYear()} Yo Emprendedor · Más que una tienda, una comunidad para
            crecer · San Miguel de Tucumán, Argentina
          </p>
        </div>
      </footer>
    </div>
  );
}
