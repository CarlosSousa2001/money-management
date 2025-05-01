import { UseFormReset } from "react-hook-form";
import { TransactionResponse } from "../../transactions/types/transactions-schema-types";
import { transactionsFormData, transactionsUpdateFormData } from "../../transactions/form/zod/transactions-schema";

export function useTransactionFormActions(
    reset: UseFormReset<transactionsFormData | transactionsUpdateFormData>
) {
    function resetTransactionForm(transactionData?: TransactionResponse) {
        if (!transactionData) return;

        const { data } = transactionData;

        reset({
            id: data.id,
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
                id: payment.id,
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
