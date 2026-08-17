'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import { buscarProductos, buscarRubros } from '@/lib/tienda/buscar';
import { formatearPrecio } from './data';

const MAX_SUGERENCIAS = 6;

export function Buscador() {
  const router = useRouter();
  const [abierto, setAbierto] = useState(false);
  const [consulta, setConsulta] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const productos = useMemo(() => buscarProductos(consulta, MAX_SUGERENCIAS), [consulta]);
  const rubros = useMemo(() => buscarRubros(consulta).slice(0, 3), [consulta]);
  const hayAlgo = productos.length > 0 || rubros.length > 0;

  useEffect(() => {
    if (abierto) inputRef.current?.focus();
    else setConsulta('');
  }, [abierto]);

  useEffect(() => {
    if (!abierto) return;
    const alEscape = (e: KeyboardEvent) => { if (e.key === 'Escape') setAbierto(false); };
    window.addEventListener('keydown', alEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', alEscape);
      document.body.style.overflow = '';
    };
  }, [abierto]);

  const irAResultados = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consulta.trim()) return;
    setAbierto(false);
    router.push(`/buscar?q=${encodeURIComponent(consulta.trim())}`);
  };

  return (
    <>
      <button
        type="button"
        className="nav-icono"
        onClick={() => setAbierto(true)}
        aria-label="Buscar productos"
      >
        <Search size={19} aria-hidden="true" />
      </button>

      {abierto && (
        <div className="buscador-capa" role="dialog" aria-modal="true" aria-label="Buscar productos">
          <button type="button" className="buscador-fondo" aria-label="Cerrar búsqueda"
                  onClick={() => setAbierto(false)} />

          <div className="buscador-panel">
            <form className="buscador-barra" onSubmit={irAResultados} role="search">
              <Search size={20} aria-hidden="true" />
              <input
                ref={inputRef}
                type="search"
                value={consulta}
                onChange={(e) => setConsulta(e.target.value)}
                placeholder="Buscar productos, rubros…"
                aria-label="Qué estás buscando"
                autoComplete="off"
              />
              <button type="button" onClick={() => setAbierto(false)} aria-label="Cerrar búsqueda">
                <X size={20} aria-hidden="true" />
              </button>
            </form>

            {consulta.trim() && (
              <div className="buscador-resultados" aria-live="polite">
                {!hayAlgo ? (
                  <p className="buscador-vacio">
                    No encontramos nada para <strong>{consulta}</strong>. Probá con otra palabra.
                  </p>
                ) : (
                  <>
                    {rubros.length > 0 && (
                      <>
                        <p className="buscador-titulo">Rubros</p>
                        {rubros.map((r) => (
                          <Link key={r.slug} href={`/categoria/${r.slug}`} className="buscador-item"
                                onClick={() => setAbierto(false)}>
                            <span className="buscador-item-nombre">{r.nombre}</span>
                            <span className="buscador-item-extra">Ver rubro</span>
                          </Link>
                        ))}
                      </>
                    )}

                    {productos.length > 0 && (
                      <>
                        <p className="buscador-titulo">Productos</p>
                        {productos.map((p) => (
                          <Link key={p.slug} href={`/producto/${p.slug}`} className="buscador-item"
                                onClick={() => setAbierto(false)}>
                            <span className="buscador-item-foto" aria-hidden="true" />
                            <span className="buscador-item-cuerpo">
                              <span className="buscador-item-nombre">{p.nombre}</span>
                              <span className="buscador-item-extra">{p.rubro}</span>
                            </span>
                            <span className="buscador-item-precio">{formatearPrecio(p.precio)}</span>
                          </Link>
                        ))}
                        <button type="button" className="buscador-todos" onClick={irAResultados}>
                          Ver todos los resultados
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
