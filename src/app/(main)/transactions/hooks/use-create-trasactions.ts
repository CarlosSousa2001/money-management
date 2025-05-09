import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTransaction } from "../_api/create-transaction";
import { toast } from "sonner";
import { TransactionRequest } from "../types/transactions-schema-types";
import { transactionsFormData } from "../form/zod/transactions-schema";

export function useCreateTransaction(onSuccessCallback?: () => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: transactionsFormData) => {
            const payload: TransactionRequest = {
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
                    cardId: payment.cardId === "" ? undefined : payment.cardId,
                    paymentType: payment.paymentType,
                    amount: payment.amount,
                    installments: payment.installments,
                })),
            };
            return createTransaction(payload);
        },
        onSuccess: () => {
            toast.success("Transação criada com sucesso!");
            queryClient.invalidateQueries({ queryKey: ["transactions"] });

            onSuccessCallback?.();
        },
        onError: (error) => {
            toast.error("Erro ao criar transação");
            console.error(error);
        }
    });
}
