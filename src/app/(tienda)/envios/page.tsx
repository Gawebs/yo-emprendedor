import type { Metadata } from 'next';
import { PaginaPolitica } from '@/components/tienda/PaginaPolitica';
import { ENVIOS, RESUMEN_ENVIOS } from '@/components/tienda/politicas';

export const metadata: Metadata = {
  title: 'Envíos y entregas · Yo Emprendedor',
  description: ENVIOS.bajada,
};

export default function Pagina() {
  return (
    <>
      <PaginaPolitica politica={ENVIOS} />

      {/* La tabla resumen del documento: es lo que la mayoria viene a buscar,
          asi que va entera y no obliga a leer los 20 puntos. */}
      <div className="contenedor">
        <section className="legal" aria-labelledby="resumen-envios">
          <h2 className="legal-h2" id="resumen-envios">Resumen de envíos</h2>
          <div className="tabla-wrap">
            <table className="tabla-envios">
              <thead>
                <tr>
                  <th scope="col">Modalidad</th>
                  <th scope="col">Cobertura</th>
                  <th scope="col">Costo</th>
                  <th scope="col">Tiempo</th>
                </tr>
              </thead>
              <tbody>
                {RESUMEN_ENVIOS.map((f) => (
                  <tr key={f.modalidad}>
                    <td data-etiqueta="Modalidad"><strong>{f.modalidad}</strong></td>
                    <td data-etiqueta="Cobertura">{f.cobertura}</td>
                    <td data-etiqueta="Costo">{f.costo}</td>
                    <td data-etiqueta="Tiempo">{f.tiempo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}
