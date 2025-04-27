import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTransaction } from "../_api/create-transaction";
import { toast } from "sonner";
import { TransactionRequest } from "../types/transactions-schema-types";

export function useCreateTransaction(onSuccessCallback?: () => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: TransactionRequest) => createTransaction(payload),
        onSuccess: () => {
            // queryClient.invalidateQueries({ queryKey: ["transactions"] });
            toast.success("Transação criada com sucesso!");
            onSuccessCallback?.();
        },
        onError: (error) => {
            toast.error("Erro ao criar transação");
            console.error(error);
        }
    });
}