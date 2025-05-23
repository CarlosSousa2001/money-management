import { PaginatedBase, ResponseDataBaseSimple } from "@/utils/paginated-base";


export enum GoalType {
    INVESTMENT = "INVESTMENT",
    SAVINGS = "SAVINGS",
    TRAVEL = "TRAVEL",
    EDUCATION = "EDUCATION",
    RETIREMENT = "RETIREMENT",
    REAL_ESTATE = "REAL_ESTATE",
    VEHICLE = "VEHICLE",
    EMERGENCY_FUND = "EMERGENCY_FUND",
    WEDDING = "WEDDING",
    BUSINESS = "BUSINESS",
    OTHER = "OTHER"
}

interface Goalbase {
    id: string;
    name: string;
    target: number;
    goalType: GoalType;
    due: Date;
}

export type GoalRequest = Omit<Goalbase, 'id'>;
export type GoalUpdateRequest = Partial<Goalbase>;
export type GoalResponseUnit = Goalbase;
export type GoalResponseSimple = ResponseDataBaseSimple<Goalbase>
export type GoalResponsePaginated = PaginatedBase<Goalbase>
