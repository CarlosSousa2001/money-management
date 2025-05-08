import { PaymentType } from "@/app/(main)/home/types/home-types-schema";

export const paymentTypeTranslations: Record<PaymentType, string> = {
    [PaymentType.PIX]: "PIX",
    [PaymentType.TED]: "TED",
    [PaymentType.BANK_SLIP]: "Boleto Bancário",
    [PaymentType.CREDIT]: "Cartão de Crédito",
    [PaymentType.DEBIT]: "Cartão de Débito",
    [PaymentType.CASH]: "Dinheiro",
  };
  
  export function translatePaymentType(key: PaymentType): string {
    return paymentTypeTranslations[key] || key;
  }
