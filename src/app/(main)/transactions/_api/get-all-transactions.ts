import { http } from "@/lib/http";
import { cleanObject } from "@/utils/clean-object-paginated-params";
import { PaginatedBaseParams } from "@/utils/paginated-base";
import { TransactionResponsePaginated } from "../types/transactions-schema-types";

export async function getAllTransactions(params: PaginatedBaseParams) {

    const searchParams = params ? cleanObject(params) : undefined;

    const response = await http
        .get(`transactions`, { searchParams })
        .json<TransactionResponsePaginated>();

    return response;
}