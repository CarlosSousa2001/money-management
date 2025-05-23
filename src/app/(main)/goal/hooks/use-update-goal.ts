import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateGoal } from "../_api/update-goal";
import { GoalUpdateSchemaData } from "../zod/goal-schema";


export function useUpdateGoal(onSuccessCallback: () => void) {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: GoalUpdateSchemaData) => {
            const convertedPayload = {
                ...payload,
                due: payload.due ? new Date(payload.due) : undefined,
            };
            return updateGoal(convertedPayload);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["goals"] });
            toast.success("Meta atualizada com sucesso!");
            onSuccessCallback();
        },
        onError: (error) => {
            toast.error("Erro ao atualizar meta");
            console.error(error);
        }
    });


}
