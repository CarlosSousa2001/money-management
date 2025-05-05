import { useQuery } from "@tanstack/react-query";
import { PaginatedBaseParams } from "@/utils/paginated-base";
import { getAllTransactions } from "../_api/get-all-transactions";
import { TransactionResponsePaginated } from "../types/transactions-schema-types";


export function useGetAllTransactions(params: PaginatedBaseParams) {
    return useQuery<TransactionResponsePaginated>({
        queryKey: ["transactions", params],
        queryFn: () => getAllTransactions(params),
        staleTime: 1000 * 60 * 5,
        placeholderData: (previousData) => previousData ?? undefined
    });
}
