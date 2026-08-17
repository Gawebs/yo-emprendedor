'use client';

import { useState } from 'react';
import { Truck, Store, CreditCard } from 'lucide-react';
import { formatearPrecio, type ProductoDetalle } from './data';
import { useCarrito } from '@/contexts/CarritoContext';

const FOTOS_MINIATURA = 3;

export function FichaProducto({ producto }: { producto: ProductoDetalle }) {
  const { opciones } = producto;
  const { agregar: agregarAlCarrito } = useCarrito();

  const [foto, setFoto] = useState(0);
  const [talle, setTalle] = useState(opciones.talles?.[0]);
  const [color, setColor] = useState(opciones.colores?.[0]?.nombre);
  const [aroma, setAroma] = useState(opciones.aromas?.[0]);
  const [variante, setVariante] = useState(opciones.variantes?.[0]);
  const [agregado, setAgregado] = useState(false);

  /** "Talle M · Arena · Cítrico" — solo lo que el producto realmente ofrece. */
  const detalle = [talle && `Talle ${talle}`, color, aroma, variante]
    .filter(Boolean)
    .join(' · ');

  const agregar = () => {
    agregarAlCarrito({
      slug: producto.slug,
      nombre: producto.nombre,
      precio: producto.precio,
      categoria: producto.categoria,
      marca: producto.marca,
      detalle: detalle || undefined,
    });
    setAgregado(true);
    setTimeout(() => setAgregado(false), 2200);
  };

  return (
    <div className="ficha">
      <div>
        <div className="galeria-principal">
          {(producto.oferta || producto.masVendido) && (
            <div className="prod-badges">
              {producto.oferta && <span className="prod-badge badge-oferta">Oferta</span>}
              {producto.masVendido && <span className="prod-badge badge-vendido">Más vendido</span>}
            </div>
          )}
        </div>
        <div className="galeria-minis">
          {Array.from({ length: FOTOS_MINIATURA }, (_, i) => (
            <button
              key={i}
              type="button"
              className="galeria-mini"
              aria-current={i === foto}
              aria-label={`Ver foto ${i + 1} de ${producto.nombre}`}
              onClick={() => setFoto(i)}
            />
          ))}
        </div>
      </div>

      <div>
        <h1 className="ficha-titulo">{producto.nombre}</h1>

        <div className="ficha-precios">
          {producto.precioAntes && (
            <span className="ficha-antes">{formatearPrecio(producto.precioAntes)}</span>
          )}
          <span className="ficha-precio">{formatearPrecio(producto.precio)}</span>
        </div>

        {opciones.talles && (
          <div className="opcion">
            <span className="opcion-label" id="lbl-talle">Talle</span>
            <div className="opcion-botones" role="group" aria-labelledby="lbl-talle">
              {opciones.talles.map((t) => (
                <button key={t} type="button" className="opcion-btn"
                        aria-pressed={talle === t} onClick={() => setTalle(t)}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        {opciones.colores && (
          <div className="opcion">
            <span className="opcion-label" id="lbl-color">
              Color {color && <span className="opcion-nota">— {color}</span>}
            </span>
            <div className="colores" role="group" aria-labelledby="lbl-color">
              {opciones.colores.map((c) => (
                <button key={c.nombre} type="button" className="color-btn"
                        style={{ background: c.hex }} aria-pressed={color === c.nombre}
                        aria-label={c.nombre} onClick={() => setColor(c.nombre)} />
              ))}
            </div>
          </div>
        )}

        {opciones.aromas && (
          <div className="opcion">
            <span className="opcion-label" id="lbl-aroma">
              Aroma o sabor <span className="opcion-nota">(si aplica al producto)</span>
            </span>
            <div className="opcion-botones" role="group" aria-labelledby="lbl-aroma">
              {opciones.aromas.map((a) => (
                <button key={a} type="button" className="opcion-btn"
                        aria-pressed={aroma === a} onClick={() => setAroma(a)}>
                  {a}
                </button>
              ))}
            </div>
          </div>
        )}

        {opciones.variantes && (
          <div className="opcion">
            <span className="opcion-label" id="lbl-variante">
              Variante <span className="opcion-nota">(si aplica al producto)</span>
            </span>
            <div className="opcion-botones" role="group" aria-labelledby="lbl-variante">
              {opciones.variantes.map((v) => (
                <button key={v} type="button" className="opcion-btn"
                        aria-pressed={variante === v} onClick={() => setVariante(v)}>
                  {v}
                </button>
              ))}
            </div>
          </div>
        )}

        <button type="button" className="btn-carrito" onClick={agregar}>
          {agregado ? 'Agregado ✓' : 'Agregar al carrito'}
        </button>
        <p aria-live="polite" className="sr-only">
          {agregado ? `${producto.nombre} agregado al carrito` : ''}
        </p>

        <div className="ficha-bullets">
          <p className="ficha-bullet">
            <Truck size={18} aria-hidden="true" />
            Envío desde $2.500 — 3 a 5 días
          </p>
          <p className="ficha-bullet">
            <Store size={18} aria-hidden="true" />
            Retiro gratis en San Miguel de Tucumán
          </p>
          <p className="ficha-bullet">
            <CreditCard size={18} aria-hidden="true" />
            3 cuotas sin interés · 10% off efectivo
          </p>
        </div>
      </div>
    </div>
  );
}
