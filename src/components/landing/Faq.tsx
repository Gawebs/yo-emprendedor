'use client';

import { useState } from 'react';
import { FAQS } from './data';

export function Faq() {
  const [abierta, setAbierta] = useState<number | null>(null);

  return (
    <div className="faq-list">
      {FAQS.map((faq, i) => {
        const estaAbierta = abierta === i;
        return (
          <div key={faq.q} className={`faq-item reveal${estaAbierta ? ' open' : ''}`}>
            <button
              type="button"
              className="faq-q"
              aria-expanded={estaAbierta}
              aria-controls={`faq-panel-${i}`}
              onClick={() => setAbierta(estaAbierta ? null : i)}
            >
              {faq.q}
            </button>
            <div className="faq-a" id={`faq-panel-${i}`} role="region">
              {faq.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
