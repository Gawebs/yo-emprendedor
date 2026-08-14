'use client';

import { useState } from 'react';
import { CONTACTO } from './data';

const VACIO = { nombre: '', telefono: '', rubro: '', mensaje: '' };

export function FormContacto() {
  const [campos, setCampos] = useState(VACIO);

  const actualizar = (campo: keyof typeof VACIO) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setCampos((prev) => ({ ...prev, [campo]: e.target.value }));

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();

    const lineas = [
      '¡Hola! Quiero saber más sobre Yo Emprendedor.',
      '',
      campos.nombre && `Nombre: ${campos.nombre}`,
      campos.telefono && `Teléfono: ${campos.telefono}`,
      campos.rubro && `Rubro: ${campos.rubro}`,
      campos.mensaje && `Sobre mi marca: ${campos.mensaje}`,
    ].filter(Boolean);

    const url = `https://wa.me/${CONTACTO.whatsappNumero}?text=${encodeURIComponent(lineas.join('\n'))}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <form className="form-card reveal" onSubmit={enviar}>
      <div className="form-campos">
        <div>
          <label className="form-label" htmlFor="f-nombre">Nombre</label>
          <input
            id="f-nombre" className="form-input" type="text" placeholder="Tu nombre"
            value={campos.nombre} onChange={actualizar('nombre')} required
          />
        </div>

        <div>
          <label className="form-label" htmlFor="f-telefono">Teléfono / WhatsApp</label>
          <input
            id="f-telefono" className="form-input" type="tel" placeholder="Ej. 381 214 6172"
            value={campos.telefono} onChange={actualizar('telefono')} required
          />
        </div>

        <div>
          <label className="form-label" htmlFor="f-rubro">
            Rubro <span className="form-label-opcional">(opcional)</span>
          </label>
          <input
            id="f-rubro" className="form-input" type="text"
            placeholder="Ej. indumentaria, deco, cosmética..."
            value={campos.rubro} onChange={actualizar('rubro')}
          />
        </div>

        <div>
          <label className="form-label" htmlFor="f-mensaje">Contanos sobre tu marca</label>
          <textarea
            id="f-mensaje" className="form-textarea" rows={4}
            placeholder="¿Qué vendés? ¿En qué etapa estás? ¿Qué plan te interesa?"
            value={campos.mensaje} onChange={actualizar('mensaje')}
          />
        </div>

        <button type="submit" className="form-btn">Enviar por WhatsApp</button>
        <p className="form-nota">Al enviar, se abre WhatsApp con tu mensaje prellenado.</p>
      </div>
    </form>
  );
}
