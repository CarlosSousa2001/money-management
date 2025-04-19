import { z } from 'zod'
import { signUp } from '../_api/sign-up-with-email-and-password'

const signInSchema = z.object({
    name: z.string().min(1, { message: 'Please, provide your name.' }).max(75, { message: 'Name must be less than 75 characters.' }),
    email: z
        .string()
        .email({ message: 'Please, provide a valid e-mail address.' }),
    password: z.string().min(8, { message: 'Please, provide your password.' }).max(20, { message: 'Password must be less than 20 characters.' }),
})

export async function signUpActionsForms(data: FormData) {
    const result = signInSchema.safeParse(Object.fromEntries(data))

    if (!result.success) {
        const errors = result.error.flatten().fieldErrors

        return { success: false, message: null, errors }
    }

    const { name, email, password } = result.data

    try {
        const response = await signUp({
            name,
            email,
            password,
        })


    } catch (err) {
        if (err) {
            return { success: false, message: "error", errors: null }
        }

        console.error(err)

        return {
            success: false,
            message: 'Unexpected error, try again in a few minutes.',
            errors: null,
        }
    }

    return { success: true, message: null, errors: null }
}