import { useQuery } from "@tanstack/react-query";
import { getTransactionById } from "../_api/get-transaction-by-id";
import { TransactionResponse } from "../types/transactions-schema-types";

export function useGetTransactionById(id: string) {
    return useQuery({
        queryKey: ["transaction", id],
        queryFn: () => getTransactionById(id),
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
    });
}
