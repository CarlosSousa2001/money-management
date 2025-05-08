import { TransactionCategory } from "@/app/(main)/home/types/home-types-schema";

export const transactionCategoryTranslations: Record<TransactionCategory, string> = {
    [TransactionCategory.SERVICES]: "Serviços",
    [TransactionCategory.FOOD]: "Alimentação",
    [TransactionCategory.TRANSPORT]: "Transporte",
    [TransactionCategory.HOUSING]: "Moradia",
    [TransactionCategory.HEALTH]: "Saúde",
    [TransactionCategory.EDUCATION]: "Educação",
    [TransactionCategory.LEISURE]: "Lazer",
    [TransactionCategory.SHOPPING]: "Compras",
    [TransactionCategory.SALARY]: "Salário",
    [TransactionCategory.TAXES]: "Impostos",
    [TransactionCategory.INVESTMENTS]: "Investimentos",
    [TransactionCategory.ENTERTAINMENT]: "Entretenimento",
    [TransactionCategory.DONATIONS]: "Doações",
    [TransactionCategory.GIFTS]: "Presentes",
    [TransactionCategory.TRAVEL]: "Viagens",
    [TransactionCategory.OTHER]: "Outros",
};

export function translateTransactionCategory(key: TransactionCategory): string {
    return transactionCategoryTranslations[key] || key;
}
