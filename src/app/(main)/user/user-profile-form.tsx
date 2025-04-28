"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { profileDefaultValues, profileFormSchema, ProfileFormValues } from "./_zod/user-schema"
import { formatPhone } from "@/utils/format-phone"
import { DateTimePicker } from "@/components/extends/date-picker"
import { ptBR } from "date-fns/locale"
import { getAddressByZipCode } from "@/utils/viacep-get-addresses-http"
import { useEffect, useRef, useState } from "react"
import { LoaderCircle, Search } from "lucide-react"
import { uploadFileMinio } from "./_api/upload-file-minio"
import Image from "next/image"
import { updateUser } from "./_api/update-user"
import { useGetUserDetails } from "./hooks/use-get-user-datails"
import { useUserFormActions } from "./hooks/use-user-form-actions"
import { format, parseISO } from "date-fns"
import { UserProfileFormSkeleton } from "./user-profile-form-skeleton"
import { useUpdateUser } from "./hooks/use-update-user"



export function UsersProfileForm() {

  const { data: user, isLoading, error, refetch: manualRefetch } = useGetUserDetails();
  const { handleUpdateUser, loadingUpdate, error: errorUpdateUser } = useUpdateUser();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: profileDefaultValues,
    mode: "onChange",
  })

  const { reset, register, setValue, watch, formState: { errors }, getValues } = form

  const { resetUserForm } = useUserFormActions(reset);

  const imageProfile = watch("imgUrl")

  console.log(errors)

  const { fields, append } = useFieldArray({
    name: "addresses",
    control: form.control,
  })

  const zipCode = watch(`addresses.${fields.length - 1}.zipCode`)

  async function fetchAddresViaCep() {

    if (!zipCode) return
    if (zipCode.length < 8) return

    const res = await getAddressByZipCode(zipCode)
    setValue(`addresses.${fields.length - 1}.street`, res.street)
    setValue(`addresses.${fields.length - 1}.city`, res.city)
    setValue(`addresses.${fields.length - 1}.state`, res.state)
    setValue(`addresses.${fields.length - 1}.zipCode`, res.zip_code)
    setValue(`addresses.${fields.length - 1}.neighborhood`, res.neighborhood)
    setValue(`addresses.${fields.length - 1}.complement`, res.complement)
  }

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  async function onSubmit(data: ProfileFormValues) {

    const file = fileInputRef.current?.files?.[0];

    if (file) {

      const res = await uploadFileMinio({
        fileName: file.name,
        contentType: file.type,
      });

      const uploadUrl = decodeURIComponent(res.data.uploadUrl);
      const publicUrl = res.data.fileUrl
      console.log("uploadUrl", publicUrl)

      setValue("imgUrl", publicUrl);

      await uploadToMinio(file, uploadUrl);
    }

    const addresses = data.addresses?.map(address => {
      // remove o id se estiver vazio ou undefined
      if (!address.id) {
        const { id, ...rest } = address;
        return rest;
      }
      return address;
    });
    console.log(data)

    const birthDateFormatted = data.birthDate ? format(parseISO(data.birthDate), 'yyyy-MM-dd') : '';

    handleUpdateUser(data)
  }

  async function uploadToMinio(file: File, presignedUrl: string) {
    try {
      // Enviar o arquivo diretamente no corpo da requisição
      const response = await fetch(presignedUrl, {
        method: "PUT",
        body: file,  // Envio diretamente o arquivo binário
        headers: {
          'Content-Type': file.type,  // Tipo de conteúdo do arquivo, ex: image/jpeg
        }
      });

      if (!response.ok) {
        console.log("Erro ao fazer upload do arquivo:", response.statusText);
      }

      console.log("Upload feito com sucesso!");
    } catch (error) {
      console.error("Erro durante o upload:", error);
    }
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
              <Image src={imageProfile} width={100} height={100} alt="profile-image-user" />
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
          {fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-2 gap-4">
              <div className="col-span-2 flex items-center justify-between gap-4">
                <FormField
                  control={form.control}
                  name={`addresses.${index}.zipCode`}
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
                  name={`addresses.${index}.street`}
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
                name={`addresses.${index}.neighborhood`}
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
                name={`addresses.${index}.complement`}
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
                name={`addresses.${index}.city`}
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
                name={`addresses.${index}.state`}
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
          ))}

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