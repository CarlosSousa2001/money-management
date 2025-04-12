import { http } from "@/lib/http";

interface ValidateTokenResponse {
    valid: boolean;
    message?: string;
}

export async function validateToken(token: string) {
    // const response = await http
    //     .post("auth/validate-token", {
    //         json: {
    //             token,
    //         },
    //     }).json<ValidateTokenResponse>();

    // return response;

    return {
        valid: true,
        message: "error"
    }
}
