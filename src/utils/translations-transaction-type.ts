import { TransactionTypeBase } from "@/app/(main)/home/types/home-types-schema";



export const transactionTypeTranslations: Record<TransactionTypeBase, string> = {
    [TransactionTypeBase.PAY]: "Pagamento",
    [TransactionTypeBase.RECEIVE]: "Recebimento",
};

export function translateTransactionType(key: TransactionTypeBase): string {
    return transactionTypeTranslations[key] || key;
}
