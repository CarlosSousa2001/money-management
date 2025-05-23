import { useQuery } from "@tanstack/react-query";
import { PaginatedBaseParams } from "@/utils/paginated-base";
import { TransactionNextToDueResponse } from "../types/home-types-schema";
import { getTransactionNextToDue } from "../_api/get-trasanction-next-to-due";


export function useGetTransactionNextToDue() {
    return useQuery<TransactionNextToDueResponse>({
        queryKey: ["next-to-due"],
        queryFn: () => getTransactionNextToDue(),
        staleTime: 1000 * 60 * 5,
        placeholderData: (previousData) => previousData ?? undefined
    });
}
