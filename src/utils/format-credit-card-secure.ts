export function formatCreditCardSecure(raw?: string): string {
    if (!raw) return '';

    // Remove tudo que não for número
    const digits = raw.replace(/\D/g, '');

    // Se tiver menos de 8 dígitos, mostra só o que tem
    if (digits.length < 8) {
        return digits.replace(/(\d{4})(\d+)/, (_, first, rest) => `${first} ${'*'.repeat(rest.length)}`);
    }

    // Pega os primeiros 4, os últimos 4, e oculta o meio
    const first = digits.slice(0, 4);
    const last = digits.slice(-4);
    const masked = '•••• ••••';

    return `${first} ${masked} ${last}`;
}
