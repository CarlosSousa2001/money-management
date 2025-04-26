import { http } from "@/lib/http";
import { PayerOrReceiverResponse } from "../../transactions/types/transactions-schema-types";
import { PaginatedBaseParams } from "@/utils/paginated-base";
import { cleanObject } from "@/utils/clean-object-paginated-params";

export async function gelAllPayerOrReceiver(params?: PaginatedBaseParams) {

    const searchParams = params ? cleanObject(params) : undefined;

    const response = await http
        .get(`payer-receivers`, { searchParams })
        .json<PayerOrReceiverResponse>();

    return response;
}
