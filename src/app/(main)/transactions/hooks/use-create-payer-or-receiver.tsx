import { useState } from "react";

import { toast } from "sonner";
import { PayerOrReceiverSchemaData } from "../new/zod/payer-or-receiver-schema";
import { createPayerOrReceiver } from "../_api/create-payer-or-receiver";

export function useCreatePayerOrReceiver() {
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleCreatePayerOrReceiver(data: PayerOrReceiverSchemaData) {
        try {
            setLoadingUpdate(true);
            setError(null);


            const res = await createPayerOrReceiver({
                name: data.name,
                description: data.description,
                imgUrl: data.imgUrl ?? undefined,
                userType: data.userType,
            });
            toast.success("Usuário atualizado com sucesso!");
            return res;
        } catch (err: any) {
            console.error("Erro ao atualizar usuário:", err);
            toast.error("Erro ao atualizar usuário");
            setError(err?.message ?? "Erro desconhecido");
        } finally {
            setLoadingUpdate(false);
        }
    }

    return {
        handleCreatePayerOrReceiver,
        loadingUpdate,
        error,
    };
}
