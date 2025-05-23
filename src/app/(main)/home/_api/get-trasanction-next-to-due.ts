import { http } from "@/lib/http";
import { TransactionNextToDueResponse } from "../types/home-types-schema";

export async function getTransactionNextToDue() {

    const response = await http
        .get('transactions/next-to-due')
        .json<TransactionNextToDueResponse>()

    return response
}