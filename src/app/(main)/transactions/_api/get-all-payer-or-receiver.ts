import { http } from "@/lib/http";
import { PayerOrReceiverResponse } from "../types/transactions-schema-types";

export async function gelAllPayerOrReceiver(search?: string) {

    const response = await http
        .get(`payer-receivers`, {
            searchParams: {
                search: search || ""
            }
        })
        .json<PayerOrReceiverResponse>();

    return response;
}
