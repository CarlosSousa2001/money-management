import { TransactionStatusBase } from "@/app/(main)/home/types/home-types-schema";

export function getTransactionStatusTag(status: string) {
    switch (status) {
        case TransactionStatusBase.PENDING:
            return "bg-yellow-100 text-yellow-800"; // Amarelo
        case TransactionStatusBase.COMPLETED:
            return "bg-green-100 text-green-800"; // Verde
        case TransactionStatusBase.FAILED:
            return "bg-red-100 text-red-800"; // Vermelho
        default:
            return "bg-gray-100 text-gray-800"; // Cor padrão (Cinza)
    }
}
