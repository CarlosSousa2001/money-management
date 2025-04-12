'use client'

import { AlertTriangle, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/use-form-state'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { signUpActionsForms } from './action'

export function SignUpForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
    signUpActionsForms,
    () => {
      router.push('/auth/sign-in')
    },
  )

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-blue-200 px-4">
      <Card className="w-full max-w-lg shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800">Cadastrar</CardTitle>
          <CardDescription>Cadastre sua conta, aproveite!</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            {success === false && message && (
              <Alert variant="destructive">
                <AlertTriangle className="size-4" />
                <AlertTitle>Sign up failed!</AlertTitle>
                <AlertDescription>
                  <p>{message}</p>
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-3">
              <Label htmlFor="name">Nome</Label>
              <Input
                name="name"
                type="text"
                id="name"
                defaultValue={searchParams.get('name') ?? ''}
              />
              {errors?.name && (
                <p className="text-xs font-medium text-red-500 dark:text-red-400">
                  {errors.name[0]}
                </p>
              )}
            </div>

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
              <Label htmlFor="password">Password</Label>
              <Input name="password" type="password" id="password" />
              {errors?.password && (
                <p className="text-xs font-medium text-red-500 dark:text-red-400">
                  {errors.password[0]}
                </p>
              )}
            </div>

            <Button className="w-full mt-3" type="submit" disabled={isPending}>
              {isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                'Cadastrar'
              )}
            </Button>

            <Button className="w-full" variant="link" size="sm" asChild>
              <Link href="/auth/sign-in">Você possui uma conta? Entrar</Link>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
