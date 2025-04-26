import { http } from "@/lib/http";

export async function deletePayerOrReceiver(id: string) {

    const response = await http
        .delete(`payer-receivers/soft-delete/${id}`)
        .json();

    return response;
}
