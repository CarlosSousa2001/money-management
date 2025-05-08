import { format, isValid, parseISO } from "date-fns";
import { z } from "zod";

const addressSchema = z.object({
    id: z.string().optional(),
    street: z.string().min(1, "Street cannot be empty"),
    city: z.string().min(1, "City cannot be empty"),
    state: z.string().min(1, "State cannot be empty"),
    zipCode: z.string().min(1, "Zip code cannot be empty"),
    neighborhood: z.string().min(1, "Neighborhood cannot be empty"),
    complement: z.string().optional(),
});

export const profileFormSchema = z.object({
    id: z.string().optional(),
    name: z
        .string()
        .min(2, {
            message: "Username must be at least 2 characters.",
        })
        .max(30, {
            message: "Username must not be longer than 30 characters.",
        }),
    email: z
        .string({
            required_error: "Please select an email to display.",
        })
        .email(),
    phone: z.string().optional(),
    birthDate: z.string().optional().transform((val) => {
        if (!val) return undefined;
        const parsed = parseISO(val);
        return isValid(parsed) ? format(parsed, 'yyyy-MM-dd') : undefined;
    }).refine((val) => !val || /^\d{4}-\d{2}-\d{2}$/.test(val), {
        message: 'Data inválida (esperado: yyyy-MM-dd)',
    }),

    imgUrl: z.string().optional(),
    addresses: addressSchema.optional(),
})
export type ProfileFormValues = z.infer<typeof profileFormSchema>

export const profileDefaultValues: Partial<z.infer<typeof profileFormSchema>> = {
    id: "",
    name: "",
    email: "",
    phone: "",
    birthDate: "",
    imgUrl: "",
    addresses:
    {
        id: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        neighborhood: "",
        complement: "",
    },

};

