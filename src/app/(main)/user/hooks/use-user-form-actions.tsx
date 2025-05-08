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
      imgUrl: data.imgUrl ? data.imgUrl.split("/").pop() ?? "" : "",
      addresses: data.address
        ? {
          id: data.address.id,
          street: data.address.street,
          city: data.address.city,
          state: data.address.state,
          zipCode: data.address.zipCode,
          neighborhood: data.address.neighborhood,
          complement: data.address.complement,
        }
        :
        {
          id: "",
          street: "",
          city: "",
          state: "",
          zipCode: "",
          neighborhood: "",
          complement: "",
        },

    });
  }

  return {
    resetUserForm,
    // aqui você pode adicionar mais ações, como formatadores, normalizadores etc.
  };
}
