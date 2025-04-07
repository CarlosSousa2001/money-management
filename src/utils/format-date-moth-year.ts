export function formatMonthYearInput(value: string): string {
    // Remove tudo que não for número
    const digitsOnly = value.replace(/\D/g, '');
  
    // Máximo de 6 dígitos (MMYYYY)
    const limited = digitsOnly.slice(0, 6);
  
    // Se já tem mais de 2 dígitos, insere a barra
    if (limited.length >= 3) {
      return `${limited.slice(0, 2)}/${limited.slice(2)}`;
    }
  
    return limited;
  }
  