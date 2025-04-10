import { http } from "@/lib/http";
import { CreditDebitCardResponse } from "../types/credit-card-types-schema";


export async function getCardById(id: string) {
    const response = await http
        .get(`cards/${id}`)
        .json<CreditDebitCardResponse>();

    return response
}