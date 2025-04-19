import { http } from "@/lib/http";


export async function validateToken(token: string) {

    const response = await http
        .post("auth/validate-token", {
            json: {
                token,
            },
        }).json<boolean>();
    return response;

}
