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
import { profileDefaultValues, profileFormSchema, ProfileFormValues } from "../_zod/user-schema"
import { formatPhone } from "@/utils/format-phone"
import { DateTimePicker } from "@/components/extends/date-picker"
import { ptBR } from "date-fns/locale"
import { getAddressByZipCode } from "@/utils/viacep-get-addresses-http"
import { useEffect, useRef } from "react"
import { Search } from "lucide-react"
import Image from "next/image"
import { uploadFileMinio } from "./upload-file-minio"



export function UsersProfileForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: profileDefaultValues,
    mode: "onChange",
  })

  const { register, setValue, watch, formState: { errors }, getValues } = form

  console.log(errors)

  const { fields, append } = useFieldArray({
    name: "addresses",
    control: form.control,
  })

  const zipCode = watch(`addresses.${fields.length - 1}.zip_code`)

  async function fetchAddresViaCep() {

    if (!zipCode) return
    if (zipCode.length < 8) return

    const res = await getAddressByZipCode(zipCode)
    setValue(`addresses.${fields.length - 1}.street`, res.street)
    setValue(`addresses.${fields.length - 1}.city`, res.city)
    setValue(`addresses.${fields.length - 1}.state`, res.state)
    setValue(`addresses.${fields.length - 1}.zip_code`, res.zip_code)
    setValue(`addresses.${fields.length - 1}.country`, res.country)
    setValue(`addresses.${fields.length - 1}.complement`, res.complement)
  }

  function onSubmit(data: ProfileFormValues) {
    console.log(data)
  }

  const fileInputRef = useRef<HTMLInputElement | null>(null);


  async function handleUploadFile() {
    const file = fileInputRef.current?.files?.[0];

    console.log(file)

    if (!file) {
      console.warn("Nenhum arquivo selecionado");
      return;
    }

    const res = await uploadFileMinio({
      fileName: file.name,
      contentType: file.type,
    });

    const uploadUrl = decodeURIComponent(res.data.uploadUrl);
    const publicUrl = res.data.fileUrl

    await uploadToMinio(file, uploadUrl);

    setValue("imgUrl", publicUrl);
  }


  async function uploadToMinio(file: File, presignedUrl: string) {
    try {
      const formData = new FormData();
      formData.append("file", file); // nome do campo não importa com presigned PUT

      const response = await fetch(presignedUrl, {
        method: "PUT",
        body: file, // <- diretamente o arquivo, não FormData
        headers: {
          'Content-Type': file.type, // ex: image/jpeg
        }
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar imagem para o MinIO");
      }

      console.log("Upload feito com sucesso!");
    } catch (error) {
      console.error(error);
    }
  }



  // useEffect(() => {
  //   fetchAddresViaCep
  // }, [fetchAddresViaCep])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">

        <div className="flex items-center gap-4">
          <div className="w-22 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            <Image src={getValues("imgUrl") || ""} width={100} height={100} alt="profile-image-user" />
          </div>
          <div className="flex items-center gap-2">
            <Input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="file:px-2 file:rounded-md file:bg-blue-500 file:text-white hover:file:bg-blue-600"
            />
            <Button type="button" onClick={() => handleUploadFile()}>Enviar</Button>
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
                  name={`addresses.${index}.zip_code`}
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
                name={`addresses.${index}.country`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>País</FormLabel>
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
        <Button type="submit">Atualizar perfil</Button>
      </form>
    </Form>
  )
}