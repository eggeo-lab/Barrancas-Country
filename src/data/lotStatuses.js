// Estado comercial real de cada lote.
// Todo lote que NO aparezca en ninguna de estas dos listas se considera
// "disponible" por defecto (ver getLotStatus más abajo).
//
// Para actualizar: sumá o sacá el ID del lote (formato "MANZANA-NUMERO",
// ej. "5-103") de la lista que corresponda.

export const VENDIDOS = [
  '5-103',
  '5-104',
  '2-101',
  '2-102',
  '6-110',
];

export const CONSTRUIDOS = [
  '1-100',
  '4-105',
];

export function getLotStatus(id) {
  if (CONSTRUIDOS.includes(id)) return 'construido';
  if (VENDIDOS.includes(id)) return 'vendido';
  return 'disponible';
}
