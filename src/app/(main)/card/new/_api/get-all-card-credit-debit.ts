import { http } from "@/lib/http";
import { CreditDebitCardResponseList } from "../types/credit-card-types-schema";


export async function getAllCardCreditDebit() {
    const response = await http
        .get("cards")
        .json<CreditDebitCardResponseList>();

    return response
}