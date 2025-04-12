'use client'

import { AlertTriangle, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signInWithEmailAndPassword } from './action'
import { useFormState } from '@/hooks/use-form-state'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SignInForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
    signInWithEmailAndPassword,
    () => {
      router.push('/')
    },
    undefined,
    true,
  )

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
                <AlertTitle>Sign in failed!</AlertTitle>
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