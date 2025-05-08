import { useQuery } from "@tanstack/react-query";
import { PayerOrReceiverResponse } from "../../transactions/types/transactions-schema-types";
import { gelAllPayerOrReceiver } from "../_api/get-all-payer-or-receiver";
import { PaginatedBaseParams } from "@/utils/paginated-base";


export function useGetAllPayerOrReceiver(params: PaginatedBaseParams) {
    return useQuery<PayerOrReceiverResponse>({
        queryKey: ["payer", params],
        queryFn: () => gelAllPayerOrReceiver(params),
        staleTime: 1000 * 60 * 5,
        placeholderData: (previousData) => previousData ?? undefined
    });
}
