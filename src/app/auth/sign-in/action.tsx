"use client"
import { z } from 'zod'
import { SignInWithEmailAndPassword } from '../_api/sign-in-with-email-and-password'
import { setCookie } from 'cookies-next'



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

        if (token === undefined) {
            return { success: false, message: "Token undefined", errors: null }
        }
        if (token === null) {
            return { success: false, message: "Token veio nulo no segundo if", errors: null }
        }

        setCookie('sshtk', token, {
            path: '/',
            maxAge: 60 * 60 * 7, // 7 days
            secure: process.env.NODE_ENV === 'production',
        })

    } catch (err) {
        if (err) {
            console.error(err)
            return { success: false, message: "Email os senha inválidos caio do catch", errors: null }
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