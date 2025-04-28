import { UseFormReset } from "react-hook-form";
import { transactionsFormData } from "../../transactions/form/zod/transactions-schema";
import { TransactionResponse } from "../../transactions/types/transactions-schema-types";
import { TransactionCategory } from "../../home/types/home-types-schema";

export function useTransactionFormActions(
    reset: UseFormReset<transactionsFormData>
) {
    function resetTransactionForm(transactionData?: TransactionResponse) {
        if (!transactionData) return;

        const { data } = transactionData;

        reset({
            description: data.description,
            email: data.email,
            currency: data.currency,
            amount: data.amount,
            TransactionScheduledDate: data.transactionScheduledDate,
            category: data.category,
            transactionType: data.transactionType,
            status: data.status,
            payerOurReceiver: {
                id: data.payerReceiver.id,
                name: data.payerReceiver.name,
            },
            payments: data.payments.map((payment) => ({
                amount: payment.amount,
                installments: payment.installments,
                paymentType: payment.paymentType,
                cardId: payment.cardId
            }))
        })
    }

    return {
        resetTransactionForm
    }
}
