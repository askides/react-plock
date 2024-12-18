export function createSafeArray(data: number | number[]) {
  return Array.isArray(data) ? data : [data];
}
