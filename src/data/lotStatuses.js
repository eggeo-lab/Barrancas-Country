// Estado comercial real de cada lote.
// Todo lote que NO aparezca en ninguna de estas dos listas se considera
// "disponible" por defecto (ver getLotStatus más abajo).
//
// Para actualizar: sumá o sacá el ID del lote (formato "MANZANA-NUMERO",
// ej. "5-103") de la lista que corresponda.

export const VENDIDOS = [
  '1-101',
  '2-100',
  '2-101',
  '2-102',
  '2-104',
  '3-104',
  '3-106',
  '4-100',
  '4-106',
  '4-109',
  '4-110',
  '4-112',
  '5-101',
  '5-102',
  '5-103',
  '5-104',
  '5-105',
  '7-100',
  '7-103',
  '7-105',
  '7-107',
  '7-109',
];

export const CONSTRUIDOS = [
  '1-100',
  '3-105',
];

export function getLotStatus(id) {
  if (CONSTRUIDOS.includes(id)) return 'construido';
  if (VENDIDOS.includes(id)) return 'vendido';
  return 'disponible';
}
