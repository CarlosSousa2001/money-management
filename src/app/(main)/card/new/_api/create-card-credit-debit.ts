import { http } from "@/lib/http";
import { CreateCreditDebitCard, CreditDebitCardResponse } from "../types/credit-card-types-schema";

export async function createCardCreditDebit({
    name,
    number,
    company,
    flag,
    expiredDate,
    cardType,
    colors
}: CreateCreditDebitCard) {

    const response = await http
        .post("cards", {
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
