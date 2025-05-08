import { useState } from "react";
import { ProfileFormValues } from "../_zod/user-schema";
import { updateUser } from "../_api/update-user";
import { toast } from "sonner";

export function useUpdateUser() {
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleUpdateUser(data: ProfileFormValues) {
        try {
            setLoadingUpdate(true);
            setError(null);
            const addressWithoutId = data.addresses?.id === "" 
                ? (({ id, ...rest }) => rest)(data.addresses) 
                : data.addresses;

            await updateUser({
                id: data.id ?? "",
                name: data.name,
                email: data.email,
                phone: data.phone,
                birthDate: data.birthDate ?? undefined,
                imgUrl: data.imgUrl ?? undefined,
                address: addressWithoutId ?? undefined,
            });
            toast.success("Usuário atualizado com sucesso!");
        } catch (err: any) {
            console.error("Erro ao atualizar usuário:", err);
            toast.error("Erro ao atualizar usuário");
            setError(err?.message ?? "Erro desconhecido");
        } finally {
            setLoadingUpdate(false);
        }
    }

    return {
        handleUpdateUser,
        loadingUpdate,
        error,
    };
}
