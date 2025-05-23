import { z } from "zod";
import { GoalType } from "../types/goals-schema-types";
import { format, isValid, parseISO } from "date-fns";

export const goalSchema = z.object({
    name: z.string().min(2).max(100),
    target: z.coerce.number().min(0).max(100000000),
    goalType: z.nativeEnum(GoalType),
    due: z.string().optional().transform((val) => {
        if (!val) return undefined;
        const parsed = parseISO(val);
        return isValid(parsed) ? format(parsed, 'yyyy-MM-dd HH:mm') : undefined;
    }).refine((val) => !val || /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(val), {
        message: 'Data inválida (esperado: yyyy-MM-dd HH:mm)',
    }),

});

export type GoalSchemaData = z.infer<typeof goalSchema>;

export const goalUpdateSchema = goalSchema.extend({
    id: z.string() // ou só z.string() se não for UUID
});

export type GoalUpdateSchemaData = z.infer<typeof goalUpdateSchema>;

export const goalsSchemaDefault: Partial<GoalSchemaData> = {
    name: "",
    target: 0,
    goalType: GoalType.INVESTMENT,
    due: format(new Date(), 'yyyy-MM-dd HH:mm'),
};
