import { http } from "@/lib/http";
import { PaginatedBaseParams } from "@/utils/paginated-base";
import { cleanObject } from "@/utils/clean-object-paginated-params";
import { GoalResponsePaginated } from "../types/goals-schema-types";

export async function getAllGoals(params?: PaginatedBaseParams) {

    const searchParams = params ? cleanObject(params) : undefined;

    const response = await http
        .get(`goals`, { searchParams })
        .json<GoalResponsePaginated>();

    return response;
}
