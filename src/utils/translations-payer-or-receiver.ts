import { TransactionPayerReceiverBase } from "@/app/(main)/home/types/home-types-schema";


export const payerOrReceiverTranslations: Record<TransactionPayerReceiverBase, string> = {
    [TransactionPayerReceiverBase.COMPANY]: "Companhia",
    [TransactionPayerReceiverBase.PERSON]: "Pessoa",
};

export function translatePayerOrReceiver(key: TransactionPayerReceiverBase): string {
    return payerOrReceiverTranslations[key] || key;
}
