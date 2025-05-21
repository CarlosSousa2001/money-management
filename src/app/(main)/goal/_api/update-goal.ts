import { http } from "@/lib/http";
import { GoalResponseSimple, GoalUpdateRequest } from "../types/goals-schema-types";

export async function updateGoal({
    id,
    name,
    target,
    goalType,
    due
}: GoalUpdateRequest) {

    const response = await http
        .post(`goals/${id}`, {
            json: {
                name,
                target,
                goalType,
                due
            },
        })
        .json<GoalResponseSimple>();

    return response;
}
