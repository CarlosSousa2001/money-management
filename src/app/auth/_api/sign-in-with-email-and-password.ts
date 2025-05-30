import { http } from "@/lib/http";

interface SignInWithEmailAndPassword {
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

export async function SignInWithEmailAndPassword({ email, password }: SignInWithEmailAndPassword) {

    const response = await http
        .post("auth/sign-in", {
            json: {
                email,
                password,
            },
        })
        .json<SignInWithEmailAndPasswordResponse>();

    console.log("Resposta da API:", response);

    return response.data.jwToken;
}