import { useQuery } from "@tanstack/react-query";
import { getAllTransactions } from "../_api/get-all-transactions";
import { PaginatedBaseParamsTransaction, TransactionResponsePaginated } from "../types/transactions-schema-types";


export function useGetAllTransactions(params: PaginatedBaseParamsTransaction) {
    return useQuery<TransactionResponsePaginated>({
        queryKey: ["transactions", JSON.stringify(params)],
        queryFn: () => getAllTransactions(params),
        staleTime: 1000 * 60 * 5,
        placeholderData: (previousData) => previousData ?? undefined
    });
}
