import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createPayerOrReceiver } from "../_api/create-payer-or-receiver";
import { PayerOrReceiverRequest } from "../../transactions/types/transactions-schema-types";

export function useCreateTanstaclPayerOrReceiver(onSuccessCallback?: () => void) {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: PayerOrReceiverRequest) => createPayerOrReceiver(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["payer"] });
            toast.success("Usuário criado com sucesso!");
            onSuccessCallback?.();
        },
        onError: (error) => {
            toast.error("Erro ao criar usuário");
            console.error(error);
        }
    });


}
