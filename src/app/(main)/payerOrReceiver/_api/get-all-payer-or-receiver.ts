import { http } from "@/lib/http";
import { PayerOrReceiverResponse } from "../../transactions/types/transactions-schema-types";

export async function gelAllPayerOrReceiver(search?: string) {

    console.log("Executando a função gelAllPayerOrReceiver")
    const response = await http
        .get(`payer-receivers`, {
            searchParams: {
                search: search || ""
            }
        })
        .json<PayerOrReceiverResponse>();

    console.log("Resposta da função gelAllPayerOrReceiver")
    console.log(response)

    return response;
}
