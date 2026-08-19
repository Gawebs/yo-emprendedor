'use client';

import { useState } from 'react';
import { CONTACTO } from './data';

const VACIO = { nombre: '', email: '', telefono: '', pedido: '', productos: '', comentario: '' };

/**
 * Formulario del boton de arrepentimiento (Resolucion 424/2020).
 *
 * Demo: arma el mensaje y lo manda por WhatsApp. Cuando entre el backend,
 * esto pasa a registrar la solicitud y disparar el mail con el codigo de
 * identificacion del tramite dentro de las 24 horas, que es lo que exige la
 * norma.
 */
export function FormArrepentimiento() {
  const [campos, setCampos] = useState(VACIO);
  const [enviado, setEnviado] = useState(false);

  const actualizar = (campo: keyof typeof VACIO) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setCampos((prev) => ({ ...prev, [campo]: e.target.value }));

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();

    const lineas = [
      'SOLICITUD DE ARREPENTIMIENTO',
      '',
      `Nombre: ${campos.nombre}`,
      `Email: ${campos.email}`,
      `Teléfono: ${campos.telefono}`,
      `Pedido: ${campos.pedido}`,
      `Producto/s: ${campos.productos}`,
      campos.comentario && `Comentario: ${campos.comentario}`,
    ].filter(Boolean);

    const url = `https://wa.me/${CONTACTO.whatsappNumero}?text=${encodeURIComponent(lineas.join('\n'))}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setEnviado(true);
  };

  if (enviado) {
    return (
      <div className="arrep-enviado" role="status">
        <h2 className="legal-h2" style={{ marginTop: 0 }}>Solicitud enviada</h2>
        <p className="legal-p">
          Te vamos a responder dentro de las 24 horas con el número de código de identificación del
          trámite. Si no llegaste a enviar el mensaje de WhatsApp, escribinos a{' '}
          <a href={`mailto:${CONTACTO.email}`} className="legal-link">{CONTACTO.email}</a> con el
          asunto &ldquo;Arrepentimiento&rdquo;.
        </p>
        <button type="button" className="gift-aplicar" onClick={() => { setCampos(VACIO); setEnviado(false); }}>
          Enviar otra solicitud
        </button>
      </div>
    );
  }

  return (
    <form className="form-card arrep-form" onSubmit={enviar}>
      <div className="campos">
        <div className="campo">
          <label htmlFor="a-nombre">Nombre y apellido</label>
          <input id="a-nombre" required value={campos.nombre} onChange={actualizar('nombre')} />
        </div>

        <div className="campo-fila">
          <div className="campo">
            <label htmlFor="a-email">Email de la compra</label>
            <input id="a-email" type="email" required value={campos.email} onChange={actualizar('email')}
                   placeholder="nombre@email.com" />
          </div>
          <div className="campo">
            <label htmlFor="a-tel">Teléfono</label>
            <input id="a-tel" type="tel" required value={campos.telefono} onChange={actualizar('telefono')}
                   placeholder="381 214 6172" />
          </div>
        </div>

        <div className="campo">
          <label htmlFor="a-pedido">Número de pedido</label>
          <input id="a-pedido" required value={campos.pedido} onChange={actualizar('pedido')}
                 placeholder="YE-1234" />
        </div>

        <div className="campo">
          <label htmlFor="a-productos">Producto o productos que querés devolver</label>
          <input id="a-productos" required value={campos.productos} onChange={actualizar('productos')} />
        </div>

        <div className="campo">
          <label htmlFor="a-comentario">
            Comentario <span className="opcion-nota">(opcional — no hace falta que expliques el motivo)</span>
          </label>
          <textarea id="a-comentario" rows={3} value={campos.comentario} onChange={actualizar('comentario')} />
        </div>

        <button type="submit" className="btn-carrito" style={{ marginBottom: 0 }}>
          Enviar solicitud de arrepentimiento
        </button>
      </div>
    </form>
  );
}
