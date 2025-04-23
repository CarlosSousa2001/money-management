import { UseFormReset } from "react-hook-form";
import { ProfileFormValues } from "../_zod/user-schema";
import { UserProfileMeResponse } from "../types/user-schemas-types";

export function useUserFormActions(
  reset: UseFormReset<ProfileFormValues>
) {
  function resetUserForm(userData?: UserProfileMeResponse) {
    if (!userData) return;

    const { data } = userData;

    reset({
      id: data.id,
      name: data.name,
      email: data.email,
      birthDate: data.birthDate ?? "",
      phone: data.phone ?? "",
      imgUrl: data.imgUrl ?? "",
      addresses: (data.addresses && data.addresses.length > 0)
        ? data.addresses.map((address) => ({
            id: address.id ?? undefined,
            street: address.street,
            complement: address.complement ?? "",
            city: address.city,
            state: address.state,
            neighborhood: address.neighborhood,
            zipCode: address.zipCode,
          }))
        : [
            {
              id: "",
              street: "",
              city: "",
              state: "",
              zipCode: "",
              neighborhood: "",
              complement: "",
            },
          ],
    });
  }

  return {
    resetUserForm,
    // aqui você pode adicionar mais ações, como formatadores, normalizadores etc.
  };
}
