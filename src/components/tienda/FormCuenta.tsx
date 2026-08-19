'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useCuenta } from '@/contexts/CuentaContext';

const VACIO = { nombre: '', email: '', telefono: '', clave: '' };

/**
 * Registro e ingreso. Los Terminos (seccion 5) exigen estar registrado para
 * comprar, asi que el checkout manda aca con ?volver=/checkout y despues
 * devuelve al usuario donde estaba.
 */
export function FormCuenta({ modo }: { modo: 'ingresar' | 'registrar' }) {
  const router = useRouter();
  const params = useSearchParams();
  const { registrar, ingresar } = useCuenta();

  const [campos, setCampos] = useState(VACIO);
  const [error, setError] = useState('');

  const volver = params.get('volver') ?? '/';
  const esRegistro = modo === 'registrar';

  const actualizar = (campo: keyof typeof VACIO) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setCampos((prev) => ({ ...prev, [campo]: e.target.value }));

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    const resultado = esRegistro
      ? registrar(campos)
      : ingresar(campos.email, campos.clave);

    if (resultado.ok) {
      router.push(volver);
      return;
    }
    setError(resultado.motivo);
  };

  const conVolver = (destino: string) =>
    volver === '/' ? destino : `${destino}?volver=${encodeURIComponent(volver)}`;

  return (
    <div className="cuenta-caja">
      <h1 className="cat-titulo">{esRegistro ? 'Crear cuenta' : 'Iniciar sesión'}</h1>
      <p className="cuenta-bajada">
        {esRegistro
          ? 'El registro es gratuito y no te obliga a comprar.'
          : 'Ingresá con la cuenta que usaste para comprar.'}
      </p>

      {volver.startsWith('/checkout') && (
        <p className="cuenta-aviso">
          Para completar la compra es necesario estar registrado.
        </p>
      )}

      <form className="form-card" onSubmit={enviar}>
        <div className="campos">
          {esRegistro && (
            <>
              <div className="campo">
                <label htmlFor="c-nombre">Nombre y apellido</label>
                <input id="c-nombre" required value={campos.nombre} onChange={actualizar('nombre')}
                       autoComplete="name" />
              </div>
              <div className="campo">
                <label htmlFor="c-tel">Teléfono</label>
                <input id="c-tel" type="tel" required value={campos.telefono}
                       onChange={actualizar('telefono')} placeholder="381 214 6172" autoComplete="tel" />
              </div>
            </>
          )}

          <div className="campo">
            <label htmlFor="c-email">Email</label>
            <input id="c-email" type="email" required value={campos.email}
                   onChange={actualizar('email')} placeholder="nombre@email.com"
                   autoComplete="email" />
          </div>

          <div className="campo">
            <label htmlFor="c-clave">Contraseña</label>
            <input id="c-clave" type="password" required value={campos.clave}
                   onChange={actualizar('clave')}
                   autoComplete={esRegistro ? 'new-password' : 'current-password'}
                   minLength={esRegistro ? 6 : undefined} />
            {esRegistro && <p className="cuenta-nota">Al menos 6 caracteres.</p>}
          </div>

          {error && <p className="gift-error" role="alert">{error}</p>}

          <button type="submit" className="btn-carrito" style={{ marginBottom: 0 }}>
            {esRegistro ? 'Crear cuenta' : 'Ingresar'}
          </button>
        </div>
      </form>

      <p className="cuenta-cambiar">
        {esRegistro ? (
          <>¿Ya tenés cuenta? <Link href={conVolver('/auth/login')} className="legal-link">Ingresá</Link></>
        ) : (
          <>¿Todavía no tenés cuenta? <Link href={conVolver('/auth/signup')} className="legal-link">Creá una</Link></>
        )}
      </p>

      <p className="cuenta-demo">
        Demo: las cuentas se guardan en este navegador. Cuando se conecte la base, el registro
        pasa a ser real y verificado del lado del servidor.
      </p>
    </div>
  );
}
