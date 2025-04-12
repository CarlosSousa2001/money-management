import { http } from "@/lib/http";

interface SignInWithEmailAndPassword {
    email: string;
    password: string;
}

interface SignInWithEmailAndPasswordResponse {
    data: {
        name: string;
        email: string;
        jwtToken: string;
    }
    message: string;
    success: boolean;
}

export async function SignInWithEmailAndPassword({ email, password }: SignInWithEmailAndPassword) {

    const response = await http
        .post("auth/sign-up", {
            json: {
                email,
                password,
            },
        }).json<SignInWithEmailAndPasswordResponse>();

    return response.data.jwtToken;
}