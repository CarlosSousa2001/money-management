import { http } from "@/lib/http";
import { TransactionStatusBase, WalletHealthResponse } from "../types/home-types-schema";

export async function getWalletHealth(params: TransactionStatusBase = TransactionStatusBase.COMPLETED) {

    const response = await http
        .get('dashboard/wallet-health',
            {
                searchParams: {
                    statuses: params,
                }
            }
        )
        .json<WalletHealthResponse>()

    return response
}