import { http } from "@/lib/http";
import { TransactionResponse } from "../types/transactions-schema-types";
import { S } from "vitest/dist/chunks/config.d.DevWltVl.js";

export async function getTransactionById(id: string) {

    const response = await http
        .get(`transactions/${id}`)
        .json<TransactionResponse>();

    return response;
}