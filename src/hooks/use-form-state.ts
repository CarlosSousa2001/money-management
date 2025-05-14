import { getProfile } from '@/app/(main)/user/_api/get-me'
import { FormEvent, useState } from 'react'
import { toast } from 'sonner'

interface FormState {
  success: boolean
  message: string | null
  errors: Record<string, string[]> | null
}

export function useFormState(
  action: (data: FormData) => Promise<FormState>,
  onSuccess?: () => Promise<void> | void,
  initialState?: FormState,
  auth?: boolean,
) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formState, setFormState] = useState(
    initialState ?? { success: false, message: null, errors: null },
  )

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const data = new FormData(form)

    setIsSubmitting(true)

    try {
      const state = await action(data)

      if (state.success && onSuccess) {
        toast.success("Sucesso!!")
        await onSuccess()
      } else {
        toast.error("Erro ao realizar login")
      }

      if (auth) {
        const user_datails = await getProfile()
        localStorage.setItem('user', JSON.stringify(user_datails.data))
      }

      setFormState(state)

      if (state.success) {
        form.reset() // ✅ Corrigido aqui
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return [formState, handleSubmit, isSubmitting] as const
}
