import { http } from "@/lib/http";
import { cleanObject } from "@/utils/clean-object-paginated-params";
import { PaginatedBaseParamsTransaction, TransactionResponsePaginated } from "../types/transactions-schema-types";

export async function getAllTransactions(params: PaginatedBaseParamsTransaction) {

    const searchParams = params ? cleanObject(params) : undefined;

    const response = await http
        .get(`transactions`, { searchParams })
        .json<TransactionResponsePaginated>();

    return response;
}