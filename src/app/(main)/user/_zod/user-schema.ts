import { z } from "zod";

const addressSchema = z.object({
    street: z.string().min(1, "Street cannot be empty"),
    city: z.string().min(1, "City cannot be empty"),
    state: z.string().min(1, "State cannot be empty"),
    zip_code: z.string().min(1, "Zip code cannot be empty"),
    country: z.string().min(1, "Neighborhood cannot be empty"),
    complement: z.string().optional(),
});

export const profileFormSchema = z.object({
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
    birthDate: z.string().optional(),
    imgUrl: z.string().optional(),
    addresses: z.array(addressSchema).optional().default([]),
})
export type ProfileFormValues = z.infer<typeof profileFormSchema>

export const profileDefaultValues: Partial<z.infer<typeof profileFormSchema>> = {
    name: "",
    email: "",
    phone: "",
    birthDate: "",
    imgUrl: "",
    addresses: [
        {
            street: "",
            city: "",
            state: "",
            zip_code: "",
            country: "",
            complement: "",
        },
    ],
};

