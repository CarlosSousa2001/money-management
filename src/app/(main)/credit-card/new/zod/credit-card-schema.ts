import { format } from "date-fns";
import { z } from "zod";
import { cardTypeEnumBase } from "../types/credit-card-types-schema";
import { StatusDefaultActiveInactive } from "@/utils/status-default-active-inactive";
import { formatCreditCardSecure } from "@/utils/format-credit-card-secure";

export const creditCardSchema = z.object({
    name: z.string().min(1, { message: "Please enter a name." }).max(26, { message: "Please enter a valid name." }),
    number: z
        .string()
        .min(1, { message: "Please enter a card number." })
        .max(18, { message: "Please enter a valid card number." })
        .transform((val) => formatCreditCardSecure(val))
        .refine(
            (val) => /^\d{4} •••• •••• \d{4}$/.test(val),
            { message: "The card number must be 16 digits in format: 1234 •••• •••• 5678" }
        ),
    company: z.string().min(1, { message: "Please enter a company." }),
    flag: z.string().min(1, { message: "Please enter a flag." }).max(18, { message: "Please enter a valid flag." }),
    expiredDate: z.string().min(1, { message: "Please enter a expiration date." }),
    cardType: z.nativeEnum(cardTypeEnumBase),
    status: z.nativeEnum(StatusDefaultActiveInactive),
})


export type CreditCardFormData = z.infer<typeof creditCardSchema>;


export const defaultValuesCreditCardData: Partial<CreditCardFormData> = {
    name: undefined,
    number: undefined,
    company: undefined,
    flag: undefined,
    expiredDate: undefined,
    cardType: cardTypeEnumBase.CREDIT,
    status: StatusDefaultActiveInactive.ACTIVE,
}