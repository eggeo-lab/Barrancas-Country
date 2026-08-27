// Estado comercial real de cada lote.
// Todo lote que NO aparezca en ninguna de estas dos listas se considera
// "disponible" por defecto (ver getLotStatus más abajo).
//
// Para actualizar: sumá o sacá el ID del lote (formato "MANZANA-NUMERO",
// ej. "E-103") de la lista que corresponda.

export const VENDIDOS = [
  'E-103',
  'E-104',
  'B-101',
  'B-102',
  'D-110',
];

export const CONSTRUIDOS = [
  'A-100',
  'C-105',
];

export function getLotStatus(id) {
  if (CONSTRUIDOS.includes(id)) return 'construido';
  if (VENDIDOS.includes(id)) return 'vendido';
  return 'disponible';
}
