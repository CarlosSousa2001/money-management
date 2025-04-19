import { http } from "@/lib/http";


export async function validateToken(token: string) {

    const response = await http
        .post("authentication/validate-token", {
            json: {
                token,
            },
        }).json<boolean>();
    return response;

}
