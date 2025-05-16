'use client'

import { AlertTriangle, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState } from 'react'
import { signInWithEmailAndPassword } from './action'
import { getProfile } from '@/app/(main)/user/_api/get-me'
import { toast } from 'sonner'

export function SignInForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [isPending, setIsPending] = useState(false)
  const [success, setSuccess] = useState<boolean | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string[]> | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsPending(true)
    setSuccess(null)
    setMessage(null)
    setErrors(null)

    const formData = new FormData(event.currentTarget)
    const result = await signInWithEmailAndPassword(formData)

    setIsPending(false)
    setSuccess(result.success)
    setMessage(result.message)
    setErrors(result.errors)

     if (result.success) {
      try {
        const user_details = await getProfile()
        localStorage.setItem('user', JSON.stringify(user_details.data))
      } catch (err) {
        toast.error('Erro ao buscar detalhes do usuário')
      }

      router.push('/home')
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-blue-200 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 min-w-[300px]">
            {success === false && message && (
              <Alert variant="destructive">
                <AlertTriangle className="size-4" />
                <AlertTitle>Erro ao realizar login!</AlertTitle>
                <AlertDescription>
                  <p>{message}</p>
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-3">
              <Label htmlFor="email">E-mail</Label>
              <Input
                name="email"
                type="email"
                id="email"
                defaultValue={searchParams.get('email') ?? ''}
              />

              {errors?.email && (
                <p className="text-xs font-medium text-red-500 dark:text-red-400">
                  {errors.email[0]}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="password">Senha</Label>
              <Input name="password" type="password" id="password" />

              {errors?.password && (
                <p className="text-xs font-medium text-red-500 dark:text-red-400">
                  {errors.password[0]}
                </p>
              )}

              {errors && (
                <p className="text-xs font-medium text-red-500 dark:text-red-400">
                  teste
                </p>
              )}

              <Link
                href="/auth/forgot-password"
                className="text-xs font-medium text-foreground hover:underline"
              >
                Esqueceu a senha?
              </Link>
            </div>

            <Button className="w-full" type="submit" disabled={isPending}>
              {isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                'Login'
              )}
            </Button>

            <Button className="w-full" variant="link" size="sm" asChild>
              <Link href="/auth/sign-up">Crie uma nova conta</Link>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>

  )
}