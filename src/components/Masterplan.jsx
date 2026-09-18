import { useMemo, useState } from 'react';
import { LOTS } from '../data/masterplan';
import { getLotStatus } from '../data/lotStatuses';
import { STATUS_META, fmtArea } from './masterplan/statusUtils';
import MasterplanMap from './masterplan/MasterplanMap';

const FILTERS = [
  ['all', 'Todos'],
  ['disponible', 'Disponibles'],
  ['vendido', 'Vendidos'],
  ['construido', 'Construidos'],
];

export default function Masterplan() {
  const [statuses] = useState(() => {
    const s = {};
    LOTS.forEach((l) => {
      s[l.id] = getLotStatus(l.id);
    });
    return s;
  });
  const [selectedId, setSelectedId] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const counts = useMemo(() => {
    const c = { disponible: 0, vendido: 0, construido: 0 };
    LOTS.forEach((l) => c[statuses[l.id]]++);
    return c;
  }, [statuses]);

  const selectedLot = selectedId ? LOTS.find((l) => l.id === selectedId) : null;

  return (
    <section id="masterplan" className="bg-forest-dark py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-10">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4">Masterplan</p>
          <h2 className="font-display text-cream text-[clamp(28px,3.6vw,44px)] max-w-lg">
            Cada lote, pensado dentro del paisaje
          </h2>
        </div>

        {/* Filter chips + stats */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {FILTERS.map(([key, label]) => {
            const count = key === 'all' ? LOTS.length : counts[key];
            const active = activeFilter === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveFilter(key)}
                className={`text-xs sm:text-sm px-4 py-2 rounded-full border transition-colors ${
                  active
                    ? 'bg-gold text-forest-dark border-gold'
                    : 'border-cream/25 text-cream/80 hover:border-gold hover:text-gold'
                }`}
              >
                {label} ({count})
              </button>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          <MasterplanMap
            statuses={statuses}
            activeFilter={activeFilter}
            selected={selectedId}
            onSelect={setSelectedId}
          />

          {/* Side panel */}
          <aside className="bg-forest/40 border border-cream/10 rounded-sm p-6 flex flex-col">
            {selectedLot ? (
              <>
                <p className="text-cream/50 text-xs tracking-[0.2em] uppercase mb-2">
                  Lote seleccionado
                </p>
                <h4 className="font-display text-cream text-2xl mb-1">{selectedLot.id}</h4>
                <p className="text-sage text-sm mb-4">
                  Manzana {selectedLot.manzana} · Lote {selectedLot.num}
                </p>
                <span
                  className="inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-5"
                  style={{ background: STATUS_META[statuses[selectedLot.id]].color, color: '#16281b' }}
                >
                  {STATUS_META[statuses[selectedLot.id]].label}
                </span>

                <dl className="text-sm space-y-2 mb-6">
                  <div className="flex justify-between border-b border-cream/10 pb-2">
                    <dt className="text-cream/50">Superficie</dt>
                    <dd className="text-cream">{fmtArea(selectedLot.area)}</dd>
                  </div>
                  <div className="flex justify-between border-b border-cream/10 pb-2">
                    <dt className="text-cream/50">Manzana</dt>
                    <dd className="text-cream">{selectedLot.manzana}</dd>
                  </div>
                  <div className="flex justify-between border-b border-cream/10 pb-2">
                    <dt className="text-cream/50">N° de lote</dt>
                    <dd className="text-cream">{selectedLot.num}</dd>
                  </div>
                </dl>

                {statuses[selectedLot.id] === 'disponible' ? (
                  <a
                    href={`https://wa.me/5493571610239?text=${encodeURIComponent(
                      `Hola! Quiero consultar disponibilidad del lote ${selectedLot.id} (${fmtArea(selectedLot.area)}).`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-auto inline-flex justify-center items-center gap-2 bg-gold text-forest-dark text-sm font-medium px-5 py-3 rounded-full hover:bg-cream transition-colors"
                  >
                    Consultar disponibilidad
                  </a>
                ) : (
                  <p className="mt-auto text-sage text-sm border-t border-cream/10 pt-4">
                    {statuses[selectedLot.id] === 'vendido'
                      ? 'Este lote ya fue vendido.'
                      : 'Este lote ya cuenta con una construcción.'}
                  </p>
                )}
              </>
            ) : (
              <>
                <p className="text-cream/50 text-xs tracking-[0.2em] uppercase mb-4">Selección</p>
                <div className="flex-1 flex flex-col items-center justify-center text-center gap-3 py-6">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#5b6b57" strokeWidth="1.4">
                    <path d="M3 11l9-7 9 7" />
                    <path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" />
                  </svg>
                  <p className="text-sage text-sm">
                    Tocá cualquier lote del plano para ver su ficha: número, manzana, superficie y
                    estado comercial.
                  </p>
                </div>
              </>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
