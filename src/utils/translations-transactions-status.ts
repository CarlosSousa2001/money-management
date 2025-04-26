import { TransactionStatusBase } from "@/app/(main)/home/types/home-types-schema";



export const transactionStatusTranslations: Record<TransactionStatusBase, string> = {
    [TransactionStatusBase.PENDING]: "Pendente",
    [TransactionStatusBase.COMPLETED]: "Concluído",
    [TransactionStatusBase.FAILED]: "Cancelado",
};

export function translateTransactionStatus(key: TransactionStatusBase): string {
    return transactionStatusTranslations[key] || key;
}
