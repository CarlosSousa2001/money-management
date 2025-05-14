import { http } from "@/lib/http";
import { toast } from "sonner";

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

    try {
        const response = await http
            .post("auth/sign-in", {
                json: {
                    email,
                    password,
                },
            })
            .json<SignInWithEmailAndPasswordResponse>();

        console.log("Resposta da API:", response);

        if (!response?.data.jwToken) {
            return null;
        }

        return response.data.jwToken;

    } catch (error) {
        console.error("Erro ao autenticar:", error);
        return null
    }

}