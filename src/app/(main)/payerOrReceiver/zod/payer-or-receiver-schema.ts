import { TransactionPayerReceiverBase } from "@/app/(main)/home/types/home-types-schema";
import { z } from "zod";

export const payerOrReceiverSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    imgUrl: z.string().url({ message: "Invalid URL" }).optional(),
    userType: z.nativeEnum(TransactionPayerReceiverBase)
}).strict();

export type PayerOrReceiverSchemaData = z.infer<typeof payerOrReceiverSchema>;

export const payerOrReceiverSchemaDefault: Partial<PayerOrReceiverSchemaData> = {
    name: "",
    description: "",
    imgUrl: "",
    userType: TransactionPayerReceiverBase.COMPANY
};

// schemas para update 

export const payerOrReceiverUpdateSchema = payerOrReceiverSchema.extend({
    id: z.string() // ou só z.string() se não for UUID
});

export type PayerOrReceiverUpdateSchemaData = z.infer<typeof payerOrReceiverUpdateSchema>;

export const payerOrReceiverUpdateSchemaDefault: Partial<PayerOrReceiverUpdateSchemaData> = {
    id: "",
    name: "",
    description: "",
    imgUrl: "",
    userType: TransactionPayerReceiverBase.COMPANY
};