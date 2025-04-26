import { http } from "@/lib/http";
import { PayerOrReceiverResponse } from "../../transactions/types/transactions-schema-types";

export async function gelAllPayerOrReceiver(search?: string) {

    const response = await http
        .get(`payer-receivers`, {
            searchParams: {
                name: search || ""
            }
        })
        .json<PayerOrReceiverResponse>();

    return response;
}
