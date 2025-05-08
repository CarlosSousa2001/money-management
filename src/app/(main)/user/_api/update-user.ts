import { http } from "@/lib/http";
import { UserProfileUpadate } from "../types/user-schemas-types";


export async function updateUser({
    id,
    name,
    birthDate,
    phone,
    imgUrl,
    address,
    cards,
}: UserProfileUpadate) {

    const response = await http
        .put<UserProfileUpadate>(`users`, {
            json: {
                name,
                birthDate,
                phone,
                imgUrl,
                address,
                cards,
            },
        })
        .json();

    return response;
}
