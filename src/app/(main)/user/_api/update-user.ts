import { http } from "@/lib/http";
import { UserProfileUpadate } from "../types/user-schemas-types";


export async function updateUser({
    id,
    name,
    birthDate,
    phone,
    imgUrl,
    addresses,
    cards,
}: UserProfileUpadate) {

    const response = await http
        .put<UserProfileUpadate>(`users/${id}`, {
            json: {
                name,
                birthDate,
                phone,
                imgUrl,
                addresses,
                cards,
            },
        })
        .json();

    return response;
}
