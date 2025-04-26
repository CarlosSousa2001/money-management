import { http } from "@/lib/http";
import { PayerOrRecebicerResponseSimple, PayerOrReceiverRequest } from "../../transactions/types/transactions-schema-types";

export async function createPayerOrReceiver({
    name,
    description,
    imgUrl,
    userType
}: PayerOrReceiverRequest) {

    const response = await http
        .post(`payer-receivers`, {
            json: {
                name,
                description,
                imgUrl,
                userType
            },
        })
        .json<PayerOrRecebicerResponseSimple>();

    return response;
}
