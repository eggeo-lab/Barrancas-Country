// Estado comercial de cada lote (metadata visual: etiqueta y color).
// El estado real de cada lote se define en src/data/lotStatuses.js.

export const STATUS_META = {
  disponible: { label: 'Disponible', cls: 'available', color: '#d3a039' },
  vendido: { label: 'Vendido', cls: 'sold', color: '#a94438' },
  construido: { label: 'Construido', cls: 'built', color: '#3c5f78' },
};

export function fmtArea(n) {
  return n.toLocaleString('es-AR') + ' m²';
}
