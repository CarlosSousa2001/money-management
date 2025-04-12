import { http } from "@/lib/http";

export async function forgotPassword(email: string,) {

    const response = await http
        .post("auth/forgot-password", {
            json: {
                email,
            },
        }).json();

    return response;
}