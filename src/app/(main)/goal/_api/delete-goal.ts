import { http } from "@/lib/http";

export async function deleteGoal(id: string) {

    const response = await http
        .delete(`goals/soft-delete/${id}`)
        .json();

    return response;
}
