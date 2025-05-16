import { http } from "@/lib/http";

export async function sendEmail(email: string, subject: string, message: string) {
    const response = await http.get("email-sender", {
        searchParams: {
            email,
            subject,
            body: message, 
        },
    });

    return response;
}
