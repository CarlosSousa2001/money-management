import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {transactionsUpdateFormData } from "../form/zod/transactions-schema";
import { TransactioUpdateRequest } from "../types/transactions-schema-types";
import { updateTransaction } from "../_api/update-transaction";

export function useUpdateTransaction(onSuccessCallback?: () => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: transactionsUpdateFormData) => {
            const payload: TransactioUpdateRequest = {
                id: data.id,
                transactionType: data.transactionType,
                category: data.category,
                status: data.status,
                payerReceiverId: data.payerOurReceiver.id,
                amount: data.amount,
                currency: data.currency,
                transactionScheduledDate: data.TransactionScheduledDate,
                email: data.email,
                description: data.description,
                payments: data.payments.map(payment => ({
                    id: payment.id,
                    cardId: payment.cardId === "" ? undefined : payment.cardId,
                    paymentType: payment.paymentType,
                    amount: payment.amount,
                    installments: payment.installments,
                })),
            };
            return updateTransaction(payload);
        },
        onSuccess: () => {
            toast.success("Transação criada com sucesso!");
            onSuccessCallback?.();
        },
        onError: (error) => {
            toast.error("Erro ao criar transação");
            console.error(error);
        }
    });
}
