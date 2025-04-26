import { http } from "@/lib/http";
import { PayerOrRecebicerResponseSimple, PayerOrReceiverUpdate } from "../../transactions/types/transactions-schema-types";

export async function updatePayerOrReceiver({
    id,
    name,
    description,
    imgUrl,
    userType
}: PayerOrReceiverUpdate) {

    const response = await http
        .post(`payer-receivers/${id}`, {
            json: {
                id,
                name,
                description,
                imgUrl,
                userType
            },
        })
        .json<PayerOrRecebicerResponseSimple>();

    return response;
}
