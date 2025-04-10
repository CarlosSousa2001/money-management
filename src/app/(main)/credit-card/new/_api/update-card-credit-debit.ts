import { http } from "@/lib/http";
import { CreditDebitCardResponse, UpdateCreditDebitCard } from "../types/credit-card-types-schema";

export async function updateCardCreditDebit({
    id,
    name,
    number,
    company,
    flag,
    expiredDate,
    cardType,
    colors
}: UpdateCreditDebitCard) {

    const response = await http
        .put(`cards/${id}`, {
            json: {
                name,
                number,
                company,
                flag,
                expiredDate,
                cardType,
                colors
            },
        })

    const data = await response.json<CreditDebitCardResponse>();

    return {
        data,
        status: response.status,
    };

}
