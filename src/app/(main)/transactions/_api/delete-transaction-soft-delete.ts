import { http } from "@/lib/http";


export async function deleteTransactionSoftDelete(id: string) {
    const response = await http
        .delete(`transactions/soft-delete/${id}`)
        .json();

    return response;
}