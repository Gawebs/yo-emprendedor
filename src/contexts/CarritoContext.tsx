'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

const CLAVE = 'ye-carrito';

export type ItemCarrito = {
  /** producto + combinacion elegida. Dos talles del mismo producto son dos lineas. */
  id: string;
  slug: string;
  nombre: string;
  precio: number;
  cantidad: number;
  detalle?: string;      // "Talle M · Cítrico"
  categoria: string;
  /** Viaja con el item pero no se muestra hasta la confirmacion del pedido. */
  marca: string;
};

type Ctx = {
  items: ItemCarrito[];
  cantidadTotal: number;
  subtotal: number;
  cargado: boolean;
  agregar: (item: Omit<ItemCarrito, 'id' | 'cantidad'>, cantidad?: number) => void;
  cambiarCantidad: (id: string, cantidad: number) => void;
  quitar: (id: string) => void;
  vaciar: () => void;
};

const CarritoCtx = createContext<Ctx | null>(null);

/** Un producto con distinta combinacion es una linea distinta. */
const armarId = (slug: string, detalle?: string) => `${slug}::${detalle ?? ''}`;

export function CarritoProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ItemCarrito[]>([]);
  const [cargado, setCargado] = useState(false);

  // localStorage no existe en el server: se lee despues de montar, y hasta
  // entonces `cargado` queda en false para no pintar un carrito vacio que
  // despues salta a tener cosas.
  useEffect(() => {
    try {
      const guardado = window.localStorage.getItem(CLAVE);
      if (guardado) setItems(JSON.parse(guardado));
    } catch {
      // Storage lleno o bloqueado: se arranca vacio, no vale romper la tienda.
    }
    setCargado(true);
  }, []);

  useEffect(() => {
    if (!cargado) return;
    try {
      window.localStorage.setItem(CLAVE, JSON.stringify(items));
    } catch {
      // idem
    }
  }, [items, cargado]);

  const valor = useMemo<Ctx>(() => {
    const agregar: Ctx['agregar'] = (item, cantidad = 1) => {
      const id = armarId(item.slug, item.detalle);
      setItems((prev) => {
        const existente = prev.find((i) => i.id === id);
        if (existente) {
          return prev.map((i) => (i.id === id ? { ...i, cantidad: i.cantidad + cantidad } : i));
        }
        return [...prev, { ...item, id, cantidad }];
      });
    };

    const cambiarCantidad: Ctx['cambiarCantidad'] = (id, cantidad) => {
      if (cantidad < 1) return setItems((prev) => prev.filter((i) => i.id !== id));
      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, cantidad } : i)));
    };

    return {
      items,
      cantidadTotal: items.reduce((n, i) => n + i.cantidad, 0),
      subtotal: items.reduce((n, i) => n + i.precio * i.cantidad, 0),
      cargado,
      agregar,
      cambiarCantidad,
      quitar: (id) => setItems((prev) => prev.filter((i) => i.id !== id)),
      vaciar: () => setItems([]),
    };
  }, [items, cargado]);

  return <CarritoCtx.Provider value={valor}>{children}</CarritoCtx.Provider>;
}

export function useCarrito() {
  const ctx = useContext(CarritoCtx);
  if (!ctx) throw new Error('useCarrito debe usarse dentro de <CarritoProvider>');
  return ctx;
}
