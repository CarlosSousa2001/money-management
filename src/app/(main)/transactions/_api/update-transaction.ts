import { http } from "@/lib/http";
import { TransactioUpdateRequest } from "../types/transactions-schema-types";

export async function updateTransaction({
    id,
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
}: TransactioUpdateRequest) {
    const response = await http
        .post(`transactions/${id}`, {
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