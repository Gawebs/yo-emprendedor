'use client';

import { useEffect } from 'react';

/** Si el observer no reporto nada en este plazo, se muestra todo igual. */
const PLAZO_DE_RESCATE = 2500;

/**
 * Revela los elementos .reveal al entrar en viewport.
 *
 * El ocultamiento lo activa este componente agregando .reveal-activo al
 * contenedor: sin JS, o si este efecto no llega a correr, el contenido queda
 * visible en vez de desaparecer. Es una landing de ventas — que no se vea es
 * peor que que no se anime.
 */
export function Reveal() {
  useEffect(() => {
    const contenedor = document.querySelector('.ye-landing');
    if (!contenedor) return;

    const elementos = contenedor.querySelectorAll('.reveal');
    if (!elementos.length) return;

    const mostrarTodo = () => elementos.forEach((el) => el.classList.add('visible'));

    // Sin soporte de observer, ni ocultamos: se muestra todo de una.
    if (typeof IntersectionObserver === 'undefined') {
      mostrarTodo();
      return;
    }

    contenedor.classList.add('reveal-activo');

    const temporizadores: ReturnType<typeof setTimeout>[] = [];
    let huboIntersecciones = false;

    const observer = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada, i) => {
          if (!entrada.isIntersecting) return;
          huboIntersecciones = true;
          temporizadores.push(setTimeout(() => entrada.target.classList.add('visible'), i * 55));
          observer.unobserve(entrada.target);
        });
      },
      { threshold: 0.1 }
    );

    elementos.forEach((el) => observer.observe(el));

    // Red de seguridad: si el observer nunca reporto (entorno sin compositing,
    // pagina restaurada desde bfcache, etc.), mostrar todo antes que dejarlo en blanco.
    const rescate = setTimeout(() => {
      if (!huboIntersecciones) mostrarTodo();
    }, PLAZO_DE_RESCATE);

    return () => {
      observer.disconnect();
      temporizadores.forEach(clearTimeout);
      clearTimeout(rescate);
    };
  }, []);

  return null;
}
