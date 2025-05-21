import { http } from "@/lib/http";
import { GoalRequest, GoalResponseSimple } from "../types/goals-schema-types";

export async function createGoal({
    name,
    target,
    goalType,
    due
}: GoalRequest) {

    const response = await http
        .post(`goals`, {
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
