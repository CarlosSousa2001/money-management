import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePayerOrReceiver } from "../_api/delete-payer-or-receiver";
import { PayerOrReceiverResponse } from "../../transactions/types/transactions-schema-types";
import { toast } from "sonner";

export function useDeletePayerOrReceiver() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deletePayerOrReceiver(id),
        
        onMutate: async (deletedId) => {
            await queryClient.cancelQueries({ queryKey: ["payer"] });

            const previousData = queryClient.getQueryData<PayerOrReceiverResponse>(["payer"]);

            queryClient.setQueryData<PayerOrReceiverResponse>(["payer"], (oldData) => {
                if (!oldData) return oldData;
                return {
                    ...oldData,
                    data: oldData.data.filter(item => item.id !== deletedId),
                    meta: oldData.meta
                };
            });

            return { previousData }; // <- isso aqui é o contexto que vai para o onError
        },

        onError: (error, _deletedId, context) => {
            if (context?.previousData) {
                queryClient.setQueryData(["payer"], context.previousData); // faz rollback
            }
            console.error(error);
            toast.error("Erro ao deletar o item");
        },

        onSuccess: () => {
            toast.success("Item deletado com sucesso!");
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["payer"] });
        },
    });
}
