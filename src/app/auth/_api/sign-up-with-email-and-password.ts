import { http } from "@/lib/http";

interface SignUpWithEmailAndPassword {
    name: string;
    email: string;
    password: string;
}

interface SignInWithEmailAndPasswordResponse {
    data: {
        name: string;
        email: string;
        jwToken: string;
    }
    message: string;
    success: boolean;
}

export async function signUp({ name, email, password }: SignUpWithEmailAndPassword) {

    const response = await http
        .post("auth/sign-up", {
            json: {
                name,
                email,
                password,
            },
        }).json<SignInWithEmailAndPasswordResponse>();

    return response.data.jwToken;
}