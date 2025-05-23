import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateGoal } from "../_api/update-goal";
import { GoalSchemaData } from "../zod/goal-schema";
import { createGoal } from "../_api/create-goal";


export function useCreateGoal(onSuccessCallback: () => void) {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: GoalSchemaData) => createGoal(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["goal"] });
            toast.success("Meta criada com sucesso!");
            onSuccessCallback();
        },
        onError: (error) => {
            toast.error("Erro ao criar meta");
            console.error(error);
        }
    });


}
