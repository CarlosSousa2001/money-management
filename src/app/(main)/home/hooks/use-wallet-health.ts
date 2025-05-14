import { useQuery } from "@tanstack/react-query";
import { TransactionStatusBase, WalletHealthResponse } from "../types/home-types-schema";
import { getWalletHealth } from "../_api/get-wallet-health";

export function useWalletHealth(status: TransactionStatusBase = TransactionStatusBase.COMPLETED) {
    const {
        data,
        isLoading,
        isError,
        error,
    } = useQuery<WalletHealthResponse, Error>({
        queryKey: ["wallet-health", status],
        queryFn: () => getWalletHealth(status),
    });

    return {
        data,
        isLoading,
        isError,
        error,
    };
}
