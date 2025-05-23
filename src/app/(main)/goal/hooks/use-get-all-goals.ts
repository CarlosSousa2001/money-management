import { useQuery } from "@tanstack/react-query";
import { PaginatedBaseParams } from "@/utils/paginated-base";
import { getAllGoals } from "../_api/get-all-goals";
import { GoalResponsePaginated } from "../types/goals-schema-types";


export function useGetAllGoals(params: PaginatedBaseParams) {
    return useQuery<GoalResponsePaginated>({
        queryKey: ["goals", params],
        queryFn: () => getAllGoals(params),
        staleTime: 1000 * 60 * 5,
        placeholderData: (previousData) => previousData ?? undefined
    });
}
