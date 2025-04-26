import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { PayerOrReceiverUpdateSchemaData } from "../zod/payer-or-receiver-schema";
import { updatePayerOrReceiver } from "../_api/update-payer-or-receiver";

export function useUpdatePayerOrReceiver(onSuccessCallback: () => void) {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: PayerOrReceiverUpdateSchemaData) => updatePayerOrReceiver(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["payer"] });
            toast.success("Usuário atualizado com sucesso!");
            onSuccessCallback();
        },
        onError: (error) => {
            toast.error("Erro ao atualizar usuário");
            console.error(error);
        }
    });


}
