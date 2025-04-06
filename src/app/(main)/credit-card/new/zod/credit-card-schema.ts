import { format } from "date-fns";
import { z } from "zod";
import { cardTypeEnumBase } from "../types/credit-card-types-schema";
import { StatusDefaultActiveInactive } from "@/utils/status-default-active-inactive";
import { formatCreditCardSecure } from "@/utils/format-credit-card-secure";

export const creditCardSchema = z.object({
    name: z.string().min(1, { message: "Please enter a name." }),
    number: z
    .string()
    .min(1, { message: "Please enter a card number." })
    .max(18, {message: "Please enter a valid card number."})
    .transform((val) => formatCreditCardSecure(val))
    .refine(
      (val) => /^\d{4} •••• •••• \d{4}$/.test(val),
      { message: "The card number must be 16 digits in format: 1234 •••• •••• 5678" }
    ),
    company: z.string().min(1, { message: "Please enter a card company." }),
    flag: z.string().min(1, { message: "Please enter a card flag." }),
    expiredDate: z.coerce.date({
        required_error: "Please select a date.",
        invalid_type_error: "Please select a valid date.",
    }).transform((date) => {
        return format(date, 'dd/MM/yyyy HH:mm');
    }),
    cardType: z.nativeEnum(cardTypeEnumBase, { required_error: "Please select a card type." }),
    status: z.nativeEnum(StatusDefaultActiveInactive, { required_error: "Please select a card status." }),
})

export type CreditCardFormData = z.infer<typeof creditCardSchema>;


export const defaultValuesCreditCardData: Partial<CreditCardFormData> = {
    name: "",
    number: "",
    company: "",
    flag: "",
    expiredDate: format(new Date(), 'dd/MM/yyyy HH:mm'),
    cardType: cardTypeEnumBase.CREDIT,
    status: StatusDefaultActiveInactive.ACTIVE,
}