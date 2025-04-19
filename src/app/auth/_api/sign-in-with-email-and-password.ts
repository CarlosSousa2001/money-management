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
        .post("authentication/sign-in", {
            json: {
                email,
                password,
            },
        }).json<SignInWithEmailAndPasswordResponse>();

    return response.data.jwToken;
}