import { http } from "@/lib/http";
import { CreateCreditDebitCard, CreditDebitCardResponse } from "../types/credit-card-types-schema";

export async function createCardCreditDebit({
    name,
    number,
    company,
    flag,
    expiredDate,
    cardType,
}: CreateCreditDebitCard) {

    const response = await http
        .post("credit-debit-cards", {
            json: {
                name,
                number,
                company,
                flag,
                expiredDate,
                cardType,
            },
        })


    const data = await response.json<CreditDebitCardResponse>();

    return {
        data,
        status: response.status,
    };

}
