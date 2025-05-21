import { GoalType } from "@/app/(main)/goal/types/goals-schema-types";

export const goalTypeTranslations: Record<GoalType, string> = {
    [GoalType.INVESTMENT]: "Investimento",
    [GoalType.SAVINGS]: "Poupança",
    [GoalType.TRAVEL]: "Viagem",
    [GoalType.EDUCATION]: "Educação",
    [GoalType.RETIREMENT]: "Aposentadoria",
    [GoalType.REAL_ESTATE]: "Imóvel",
    [GoalType.VEHICLE]: "Veículo",
    [GoalType.EMERGENCY_FUND]: "Fundo de Emergência",
    [GoalType.WEDDING]: "Casamento",
    [GoalType.BUSINESS]: "Negócio",
    [GoalType.OTHER]: "Outro",
};

export function translateGoalType(key: GoalType): string {
    return goalTypeTranslations[key] || key;
}
