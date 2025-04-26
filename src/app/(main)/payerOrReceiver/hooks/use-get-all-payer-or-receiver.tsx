import { useQuery } from "@tanstack/react-query";
import { PayerOrReceiverResponse } from "../../transactions/types/transactions-schema-types";
import { gelAllPayerOrReceiver } from "../_api/get-all-payer-or-receiver";


export function useGetAllPayerOrReceiver(params: string) {
    return useQuery<PayerOrReceiverResponse>({
        queryKey: ["payer"],
        queryFn: () => gelAllPayerOrReceiver(params),
        staleTime: 1000 * 60 * 5,
        placeholderData: (previousData) => previousData ?? undefined
    });
}
