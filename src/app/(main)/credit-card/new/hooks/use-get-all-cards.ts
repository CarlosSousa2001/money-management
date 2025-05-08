import { useQuery } from "@tanstack/react-query";
import { PaginatedBaseParams } from "@/utils/paginated-base";
import { getAllCardCreditDebit } from "../_api/get-all-card-credit-debit";
import { CreditDebitCardResponseList } from "../types/credit-card-types-schema";



export function useGetAllCards() {
    return useQuery<CreditDebitCardResponseList>({
        queryKey: ["cards"],
        queryFn: () => getAllCardCreditDebit(),
        staleTime: 1000 * 60 * 5,
        placeholderData: (previousData) => previousData ?? undefined
    });
}
