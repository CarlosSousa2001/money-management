'use server'
import { cookies } from 'next/headers'
import { z } from 'zod'
import { SignInWithEmailAndPassword } from '../_api/sign-in-with-email-and-password'


const signInSchema = z.object({
    email: z
        .string()
        .email({ message: 'Please, provide a valid e-mail address.' }),
    password: z.string().min(1, { message: 'Please, provide your password.' }),
})

export async function signInWithEmailAndPassword(data: FormData) {
    const result = signInSchema.safeParse(Object.fromEntries(data))

    if (!result.success) {
        const errors = result.error.flatten().fieldErrors

        return { success: false, message: null, errors }
    }

    const { email, password } = result.data


    try {
        const token = await SignInWithEmailAndPassword({
            email,
            password,
        })

        const cookieStore = await cookies();

        cookieStore.set('token', token, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            secure: process.env.NODE_ENV === 'production',
        })

    } catch (err) {
        if (err) {
                console.error(err)
            return { success: false, message: "Email os senha inválidos", errors: null }
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