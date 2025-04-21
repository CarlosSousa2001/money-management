export function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11); // Limita a 11 dígitos

  const parts = [];

  if (digits.length > 0) {
    parts.push('(' + digits.slice(0, 2));
  }
  if (digits.length >= 3) {
    parts.push(') ' + digits.slice(2, 3));
  }
  if (digits.length >= 4) {
    parts.push(digits.slice(3, 7));
  }
  if (digits.length >= 8) {
    parts.push(digits.slice(7, 11));
  }

  return parts.join(' ').trim();
}
