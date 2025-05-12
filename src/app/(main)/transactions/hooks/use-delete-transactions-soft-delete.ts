import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteTransactionSoftDelete } from "../_api/delete-transaction-soft-delete";
import { TransactionResponsePaginated } from "../types/transactions-schema-types";

export function useDeleteTransactionsSoftDelete(onSuccessCallback?: () => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteTransactionSoftDelete(id),

        onMutate: async (deletedId) => {
            await queryClient.cancelQueries({ queryKey: ["transactions"] });

            const previousData = queryClient.getQueryData<TransactionResponsePaginated>(["transactions"]);

            queryClient.setQueryData<TransactionResponsePaginated>(["transactions"], (oldData) => {
                if (!oldData) return oldData;
                return {
                    ...oldData,
                    data: oldData.data.filter(item => item.id !== deletedId),
                    meta: oldData.meta
                };
            });

            return { previousData };
        },
        onSuccess: () => {
            toast.success("Transação deletada com sucesso!");
            onSuccessCallback?.();
        },
        onError: (error, _deletedId, context) => {
            if (context?.previousData) {
                queryClient.setQueryData(["transactions"], context.previousData); 
            }
            console.error(error);
            toast.error("Erro ao deletar o item");
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
        },
    });
}
