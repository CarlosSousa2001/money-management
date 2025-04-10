import { CurrencyType, PaymentType, TransactionCategory, TransactionStatusBase, TransactionTypeBase } from "@/app/(main)/home/types/home-types-schema"
import { z } from "zod"
import { format } from "date-fns";

const paymentsTypesSchema = z.object({
    cardId: z.string(),
    paymentType: z.nativeEnum(PaymentType, { required_error: "Please select a payment type." }).optional(),
    amount: z
        .union([z.coerce.number(), z.null()])
        .transform((value) => (value === null ? 0 : value))
        .refine((value) => value > 0, {
            message: "Please enter a valid amount greater than zero.",
            path: ["amount"],
        }),
    installments: z.coerce.number({
        required_error: "Please enter the number of installments.",
        invalid_type_error: "Please enter a valid number of installments.",
    }).optional(),
    isCard: z.boolean().optional(),
})
    .transform((data) => ({
        ...data,
        isCard: !!data.paymentType && [PaymentType.CREDIT_CARD, PaymentType.DEBIT_CARD].includes(data.paymentType),
    }))
    .refine((data) => {
        if (!data.paymentType) return false; // Se for null ou undefined, retorna erro
        return true;
    }, {
        message: "Please select a payment type.",
        path: ["paymentType"],
    });


export const transactionsFormSchema = z.object({
    transactionType: z.nativeEnum(TransactionTypeBase, { required_error: "Please select a transaction type." }),
    transactionCategory: z.nativeEnum(TransactionCategory, { required_error: "Please select a transaction category." }),
    status: z.nativeEnum(TransactionStatusBase, { required_error: "Please select a transaction status." }),
    payerOurReceiver: z.string().min(1, "Please select a payer or receiver."),
    amount: z.coerce.number({
        required_error: "Please enter an amount.",
        invalid_type_error: "Please enter a valid amount.",
    }),
    currency: z.nativeEnum(CurrencyType, {
        required_error: "Please select a currency."
    }),
    TransactionScheduledDate: z.coerce.date({
        required_error: "Please select a transaction date.",
        invalid_type_error: "Please select a valid transaction date.",
    }).transform((date) => {
        return format(date, 'dd/MM/yyyy HH:mm');
    }),
    email: z
        .string({
            required_error: "Please select an email to display.",
        })
        .email(),
    description: z.string().max(160).min(4),
    paymentTypes: z.array(paymentsTypesSchema).min(1, "Please select at least one payment type."),
})

export type transactionsFormData = z.infer<typeof transactionsFormSchema>

export const defaultValuesTransactionsData: Partial<transactionsFormData> = {
    transactionType: undefined,
    transactionCategory: undefined,
    status: undefined,
    payerOurReceiver: "",
    amount: 0,
    currency: CurrencyType.BRL,
    TransactionScheduledDate: "",
    email: "",
    description: "",
    paymentTypes: [
        {
            cardId: "",
            paymentType: undefined,
            amount: 0,
            installments: 1,
            isCard: false
        }
    ]
}