"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { profileDefaultValues, profileFormSchema, ProfileFormValues } from "./_zod/user-schema"
import { formatPhone } from "@/utils/format-phone"
import { DateTimePicker } from "@/components/extends/date-picker"
import { ptBR } from "date-fns/locale"
import { getAddressByZipCode } from "@/utils/viacep-get-addresses-http"
import { useEffect, useRef, useState } from "react"
import { LoaderCircle, Search } from "lucide-react"
import Image from "next/image"
import { useGetUserDetails } from "./hooks/use-get-user-datails"
import { useUserFormActions } from "./hooks/use-user-form-actions"
import { format, parseISO } from "date-fns"
import { UserProfileFormSkeleton } from "./user-profile-form-skeleton"
import { useUpdateUser } from "./hooks/use-update-user"
import { uploadEasyupload } from "./_api/upload-file-minio"



export function UsersProfileForm() {

  const { data: user, isLoading, error, refetch: manualRefetch } = useGetUserDetails();
  const [image, setImage] = useState<string | null>(null)
  const { handleUpdateUser, loadingUpdate, error: errorUpdateUser } = useUpdateUser();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: profileDefaultValues,
    mode: "onChange",
  })

  const { reset, register, setValue, watch, formState: { errors }, getValues } = form

  const { resetUserForm } = useUserFormActions(reset);

  const imageProfile = watch("imgUrl")

  const zipCode = watch(`addresses.zipCode`)

  async function fetchAddresViaCep() {

    if (!zipCode) return
    if (zipCode.length < 8) return

    const res = await getAddressByZipCode(zipCode)
    setValue(`addresses.street`, res.street)
    setValue(`addresses.city`, res.city)
    setValue(`addresses.state`, res.state)
    setValue(`addresses.zipCode`, res.zip_code)
    setValue(`addresses.neighborhood`, res.neighborhood)
    setValue(`addresses.complement`, res.complement)
  }

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  async function onSubmit(data: ProfileFormValues) {
    const file = fileInputRef.current?.files?.[0];

    if (file) {
      const res = await uploadEasyupload(file);

      if (!res?.url) {
        console.error("Upload falhou: resposta sem URL");
        return;
      }

      setValue("imgUrl", res.url);
      data.imgUrl = res.url;
    }

    await handleUpdateUser(data);
  }



  useEffect(() => {
    if (user) {
      resetUserForm(user)
    }
  }, [user])

  if (isLoading) return <UserProfileFormSkeleton />

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">

        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center overflow-hidden">
            {imageProfile ? (
              <Image src={"/" + imageProfile.split("/").pop()} width={100} height={100} alt="profile-image-user" />
            ) : (
              <img className="w-[120px] h-[160px] bg-white" />
            )}
          </div>
          <div className="flex items-center gap-2">
            <Input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="file:px-2 file:rounded-md file:bg-blue-500 file:text-white hover:file:bg-blue-600"
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                Esse é o nome que será exibido para os outros usuários.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="teste@gmail.com" {...field} />
              </FormControl>
              <FormDescription>
                Esse é o email que será exibido para os outros usuários.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <Input
                  placeholder="(98) 9 9999 9999"
                  value={field.value}
                  onChange={(e) => field.onChange(formatPhone(e.target.value))}
                />
              </FormControl>
              <FormDescription>
                Número de celular no formato (98) 9 9999 9999.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Aniversário</FormLabel>
              <FormControl>
                {/* <Input type="date" {...field} /> */}
                <DateTimePicker
                  locale={ptBR}
                  granularity="day"
                  placeholder="Selecione uma data"
                  value={field.value ? new Date(field.value) : undefined}
                  onChange={(date: Date | undefined) =>
                    field.onChange(date ? date.toISOString() : null)
                  } />
              </FormControl>
              <FormDescription>
                Qual o seu aniversário? Não se preocupe, não vamos contar para ninguém.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 flex items-center justify-between gap-4">
              <FormField
                control={form.control}
                name={`addresses.zipCode`}
                render={({ field }) => (
                  <FormItem className="w-full max-w-[200px]">
                    <FormLabel>CEP</FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <Input {...field} />
                        <Search className="size-5 -ml-8" onClick={() => fetchAddresViaCep()} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              <FormField
                control={form.control}
                name={`addresses.street`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Rua</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name={`addresses.neighborhood`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bairro</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`addresses.complement`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Complemento</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`addresses.city`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cidade</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`addresses.state`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

        </div>
        {loadingUpdate ? (
          <Button type="button" disabled={loadingUpdate}>
            <LoaderCircle className="size-5 w-24" />
          </Button>
        ) : (
          <Button type="submit" disabled={loadingUpdate} className="w-28">Atualizar perfil</Button>
        )}

      </form>
    </Form>
  )
}