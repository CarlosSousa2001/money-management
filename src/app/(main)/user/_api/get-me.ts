import { http } from "@/lib/http";
import { UserProfileMeResponse, UserProfileUpadate } from "../types/user-schemas-types";


export async function getProfile() {

    const response = await http
        .get(`users/logged/id`).json<UserProfileMeResponse>();

    return response;
}
