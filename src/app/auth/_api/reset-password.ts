import { http } from "@/lib/http";

export async function resetPassword(password: string, token: string) {
    const response = await http
        .post("auth/reset-password", {
            json: {
                password,
                token,
            },
        })
        .json();
    return response;
}
