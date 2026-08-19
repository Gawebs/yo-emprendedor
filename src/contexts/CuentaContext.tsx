'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

const CLAVE_SESION = 'ye-sesion';
const CLAVE_CUENTAS = 'ye-cuentas';

export type Cuenta = {
  nombre: string;
  email: string;
  telefono: string;
};

type Registro = Cuenta & { clave: string };

type Resultado = { ok: true } | { ok: false; motivo: string };

type Ctx = {
  cuenta: Cuenta | null;
  cargado: boolean;
  registrar: (datos: Registro) => Resultado;
  ingresar: (email: string, clave: string) => Resultado;
  salir: () => void;
};

const CuentaCtx = createContext<Ctx | null>(null);

/**
 * Cuentas de la demo, guardadas en el navegador.
 *
 * Los Terminos y Condiciones (seccion 5) piden registro previo para comprar,
 * asi que el checkout necesita una sesion. Esto NO es autenticacion real: las
 * claves quedan en localStorage y cualquiera con la consola las ve. Sirve para
 * mostrar el flujo; cuando entre Supabase Auth se reemplaza entero, y ahi la
 * verificacion pasa a hacerse del lado del servidor.
 */
export function CuentaProvider({ children }: { children: ReactNode }) {
  const [cuenta, setCuenta] = useState<Cuenta | null>(null);
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    try {
      const guardada = window.localStorage.getItem(CLAVE_SESION);
      if (guardada) setCuenta(JSON.parse(guardada));
    } catch {
      // sin storage se arranca sin sesion
    }
    setCargado(true);
  }, []);

  const leerCuentas = (): Registro[] => {
    try {
      return JSON.parse(window.localStorage.getItem(CLAVE_CUENTAS) ?? '[]');
    } catch {
      return [];
    }
  };

  const abrirSesion = (c: Cuenta) => {
    setCuenta(c);
    try {
      window.localStorage.setItem(CLAVE_SESION, JSON.stringify(c));
    } catch {
      // la sesion queda solo en memoria
    }
  };

  const registrar: Ctx['registrar'] = (datos) => {
    const email = datos.email.trim().toLowerCase();
    if (!email || !datos.clave) return { ok: false, motivo: 'Completá el email y la contraseña.' };
    if (datos.clave.length < 6) return { ok: false, motivo: 'La contraseña necesita al menos 6 caracteres.' };

    const cuentas = leerCuentas();
    if (cuentas.some((c) => c.email === email)) {
      return { ok: false, motivo: 'Ya existe una cuenta con ese email. Probá ingresando.' };
    }

    const nueva: Registro = { ...datos, email };
    try {
      window.localStorage.setItem(CLAVE_CUENTAS, JSON.stringify([...cuentas, nueva]));
    } catch {
      return { ok: false, motivo: 'No pudimos guardar la cuenta en este navegador.' };
    }

    abrirSesion({ nombre: nueva.nombre, email: nueva.email, telefono: nueva.telefono });
    return { ok: true };
  };

  const ingresar: Ctx['ingresar'] = (email, clave) => {
    const encontrada = leerCuentas().find(
      (c) => c.email === email.trim().toLowerCase() && c.clave === clave
    );
    if (!encontrada) return { ok: false, motivo: 'Email o contraseña incorrectos.' };

    abrirSesion({ nombre: encontrada.nombre, email: encontrada.email, telefono: encontrada.telefono });
    return { ok: true };
  };

  const salir = () => {
    setCuenta(null);
    try {
      window.localStorage.removeItem(CLAVE_SESION);
    } catch {
      // nada que limpiar
    }
  };

  return (
    <CuentaCtx.Provider value={{ cuenta, cargado, registrar, ingresar, salir }}>
      {children}
    </CuentaCtx.Provider>
  );
}

export function useCuenta() {
  const ctx = useContext(CuentaCtx);
  if (!ctx) throw new Error('useCuenta debe usarse dentro de <CuentaProvider>');
  return ctx;
}
