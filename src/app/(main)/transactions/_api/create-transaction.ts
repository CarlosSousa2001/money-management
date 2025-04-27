import { http } from "@/lib/http";
import { TransactionRequest } from "../types/transactions-schema-types";

export async function createTransaction({
    description,
    email,
    currency,
    amount,
    transactionScheduledDate,
    category,
    transactionType,
    status,
    payerReceiverId,
    payments
}: TransactionRequest) {
    const response = await http
        .post("transactions", {
            json: {
                description,
                email,
                currency,
                amount,
                transactionScheduledDate,
                category,
                transactionType,
                status,
                payerReceiverId,
                payments
            }
        })
        .json()

    return response;
}