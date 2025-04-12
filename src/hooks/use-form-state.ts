import { FormEvent, useState, useTransition } from 'react'
import { requestFormReset } from 'react-dom'
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
  const [isPending, startTransition] = useTransition()

  const [formState, setFormState] = useState(
    initialState ?? { success: false, message: null, errors: null },
  )

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const data = new FormData(form)

    startTransition(async () => {
      const state = await action(data)

      if (state.success && onSuccess) {
        toast.success("Sucesso!!")
        await onSuccess()
      }
      if (auth) {
        // const user_datails = await getDetailsMe()

        // localStorage.setItem('user', JSON.stringify(user_datails))
      }

      setFormState(state)
    })

    requestFormReset(form)
  }

  return [formState, handleSubmit, isPending] as const
}