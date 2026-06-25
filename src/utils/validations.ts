// src/utils/validacoes.ts
export function validateMatchup(timeA: string, timeB: string): boolean {
  if (!timeA.trim() || !timeB.trim()) return false; // Impede campos vazios
  if (timeA.trim().toLowerCase() === timeB.trim().toLowerCase()) return false; // Impede o time jogar contra ele mesmo
  return true;
}
