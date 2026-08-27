'use client';

import { useState } from 'react';
import { Truck, Store, CreditCard } from 'lucide-react';
import { formatearPrecio, POCAS_UNIDADES, type ProductoDetalle } from './data';
import { useCarrito } from '@/contexts/CarritoContext';


export function FichaProducto({ producto }: { producto: ProductoDetalle }) {
  const { opciones } = producto;
  const { agregar: agregarAlCarrito } = useCarrito();

  const [foto, setFoto] = useState(0);
  const fotos = producto.fotos ?? [];
  const [talle, setTalle] = useState(opciones.talles?.[0]);
  // Arranca en el primer color que se pueda comprar: abrir la ficha en uno
  // agotado deja al cliente mirando un boton deshabilitado sin entender por que.
  const colores = opciones.colores ?? [];
  const [color, setColor] = useState(
    (colores.find((c) => c.stock === undefined || c.stock > 0) ?? colores[0])?.nombre,
  );
  const [aroma, setAroma] = useState(opciones.aromas?.[0]);
  const [variante, setVariante] = useState(opciones.variantes?.[0]);
  const [agregado, setAgregado] = useState(false);

  const colorElegido = colores.find((c) => c.nombre === color);
  /** Si cada color trae su foto, la galeria hace de selector y los circulos sobran. */
  const colorTieneFoto = colores.some((c) => c.foto);

  /**
   * Un color puede tener su propia foto. Al elegirlo, la imagen principal
   * cambia sola: si no, el cliente elige "negro" y sigue viendo el gris.
   */
  const fotoDelColor = colorElegido?.foto ? fotos.indexOf(colorElegido.foto) : -1;
  const fotoVisible = fotoDelColor >= 0 ? fotoDelColor : foto;

  // undefined = todavia no se cargo el stock, y entonces no se muestra cartel.
  // Cero sí se muestra, y bloquea la compra.
  const stock = colorElegido?.stock;
  const hayStock = stock === undefined || stock > 0;

  /** "Talle M · Arena · Cítrico" — solo lo que el producto realmente ofrece. */
  const detalle = [talle && `Talle ${talle}`, color, aroma, variante]
    .filter(Boolean)
    .join(' · ');

  const agregar = () => {
    agregarAlCarrito({
      slug: producto.slug,
      nombre: producto.nombre,
      precio: producto.precio,
      categoria: producto.categorias[0],
      marca: producto.marca,
      detalle: detalle || undefined,
      stock,
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
          {fotos[fotoVisible] && (
            <img src={fotos[fotoVisible]} alt={producto.nombre} width={640} height={640} />
          )}
        </div>
        {/* Tantas miniaturas como fotos haya. Antes eran tres fijas, aunque
            no hubiera ninguna imagen: ahora la fila se arma sola y con dos o
            con cinco fotos queda igual de prolija. */}
        {fotos.length > 1 && (
          <div className="galeria-minis">
            {fotos.map((url, i) => {
              // Cuando la foto pertenece a un color, tocar la miniatura elige
              // ese color: es lo que el cliente cree que esta haciendo.
              const suColor = colores.find((c) => c.foto === url);
              const agotado = suColor?.stock === 0;
              return (
                <button
                  key={url}
                  type="button"
                  className={`galeria-mini${agotado ? ' mini-agotada' : ''}`}
                  aria-current={i === fotoVisible}
                  aria-label={
                    suColor
                      ? `${suColor.nombre}${agotado ? ', sin stock' : ''}`
                      : `Ver foto ${i + 1} de ${producto.nombre}`
                  }
                  title={suColor ? suColor.nombre : undefined}
                  onClick={() => (suColor ? setColor(suColor.nombre) : setFoto(i))}
                >
                  <img src={url} alt="" width={640} height={640} loading="lazy" />
                  {agotado && <span className="mini-agotada-texto">Sin stock</span>}
                </button>
              );
            })}
          </div>
        )}
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
            {/* Sin circulos de color: cuando cada color tiene su foto, las
                miniaturas de la galeria ya son el selector y muestran el
                color de verdad, no un punto aproximado. Los circulos quedan
                solo para productos que no tienen una foto por color. */}
            {!colorTieneFoto && (
              <div className="colores" role="group" aria-labelledby="lbl-color">
                {opciones.colores.map((c) => {
                  const agotado = c.stock === 0;
                  return (
                    <button
                      key={c.nombre}
                      type="button"
                      className={`color-btn${agotado ? ' color-agotado' : ''}`}
                      style={{ background: c.hex }}
                      aria-pressed={color === c.nombre}
                      aria-label={agotado ? `${c.nombre}, sin stock` : c.nombre}
                      title={agotado ? `${c.nombre} — sin stock` : c.nombre}
                      onClick={() => setColor(c.nombre)}
                    />
                  );
                })}
              </div>
            )}
            {/* El cartel aparece solo si el stock se conoce. Se muestra igual
                cuando esta agotado en vez de ocultar el color: si el cliente
                no ve que existe, no vuelve a fijarse mas adelante. */}
            {/* La cantidad exacta no se publica: decirle al cliente que hay 54
                no lo ayuda a decidir, y de paso le muestra a la competencia
                cuanto stock maneja el negocio. Solo se avisa cuando queda
                poco, que ahi si mueve la decision. */}
            {stock !== undefined && stock <= POCAS_UNIDADES && (
              <p className={`stock-aviso ${hayStock ? 'stock-poco' : 'stock-sin'}`}>
                {!hayStock
                  ? 'Sin stock en este color'
                  : stock === 1
                    ? '¡Última unidad!'
                    : `¡Últimas ${stock} unidades!`}
              </p>
            )}
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

        {/* Sin stock el boton se apaga: dejar comprar algo que no hay solo
            traslada el problema al momento de preparar el pedido. */}
        <button type="button" className="btn-carrito" onClick={agregar} disabled={!hayStock}>
          {!hayStock ? 'Sin stock' : agregado ? 'Agregado ✓' : 'Agregar al carrito'}
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
            3 cuotas sin interés · 10% off por transferencia
          </p>
        </div>
      </div>
    </div>
  );
}
