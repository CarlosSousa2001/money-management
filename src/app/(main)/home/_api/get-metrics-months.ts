import { http } from "@/lib/http";
import { MetricsResponse, TransactionStatusBase } from "../types/home-types-schema";

export async function getMetricsMonths(year: number, params: TransactionStatusBase) {

    

    const response = await http
        .get('dashboard',
            {
                searchParams: {
                    year,
                    statuses: params,
                }
            }
        )
        .json<MetricsResponse>()

    return response
}