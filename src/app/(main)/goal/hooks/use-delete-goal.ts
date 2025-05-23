import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteGoal } from "../_api/delete-goal";
import { GoalResponsePaginated } from "../types/goals-schema-types";

export function useDeleteGoal() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteGoal(id),

        onMutate: async (deletedId) => {
            await queryClient.cancelQueries({ queryKey: ["goals"] });

            const previousData = queryClient.getQueryData<GoalResponsePaginated>(["goals"]);

            queryClient.setQueryData<GoalResponsePaginated>(["goals"], (oldData) => {
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
                queryClient.setQueryData(["goals"], context.previousData); // faz rollback
            }
            console.error(error);
            toast.error("Erro ao deletar o item");
        },

        onSuccess: () => {
            toast.success("Item deletado com sucesso!");
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["goals"] });
        },
    });
}
