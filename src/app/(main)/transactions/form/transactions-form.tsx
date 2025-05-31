"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

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
import { defaultValuesTransactionsData, transactionsFormData, transactionsFormSchema, transactionsUpdateFormData, transactionsUpdateFormSchema } from "./zod/transactions-schema"
import { CreditCardItem } from "@/components/credit-card"
import { CurrencyType, PaymentType, TransactionCategory, TransactionStatusBase, TransactionTypeBase } from "../../home/types/home-types-schema"
import { useEffect, useState } from "react"
import { Check, ChevronLeft, ChevronRight, ChevronsUpDown } from "lucide-react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog"
import { gelAllPayerOrReceiver } from "../../payerOrReceiver/_api/get-all-payer-or-receiver"
import { PayerOrReceiverDialogForm } from "./payer-or-receiver-dialog-form"
import { translateTransactionType } from "@/utils/translations-transaction-type"
import { translateTransactionStatus } from "@/utils/translations-transactions-status"
import { translateTransactionCategory } from "@/utils/translations-transaction-category"
import { useCreateTransaction } from "../hooks/use-create-trasactions"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useTransactionFormActions } from "../../user/hooks/use-transaction-form-action"
import { useGetTransactionById } from "../hooks/use-get-transactions-by-id"
import { useUpdateTransaction } from "../hooks/use-update-transactions"
import { useGetAllCards } from "../../card/new/hooks/use-get-all-cards"
import { translatePaymentType } from "@/utils/translations-payment-type"
import { toast } from "sonner"



export function TransactionsForm() {

  const { data } = useGetAllCards()
  const [trasanctionParamsId, setTransactionParamsId] = useState<string | null>(null);

  const router = useRouter()
  const params = useSearchParams()
  const pathname = usePathname()

  useEffect(() => {
    const id = params.get("id")
    setTransactionParamsId(id)
  }, [pathname, params])

  const [open, setOpen] = useState(false)
  const [openDialogNewPayerOrReceiver, setOpenDialogNewPayorReceiver] = useState(false)
  const [users, setUsers] = useState<{ id: string; name: string }[]>([])

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCard, setShowCard] = useState(false);

  const form = useForm<transactionsFormData | transactionsUpdateFormData>({
    resolver: zodResolver(trasanctionParamsId ? transactionsUpdateFormSchema : transactionsFormSchema),
    defaultValues: defaultValuesTransactionsData,
    mode: "onChange",
  })

  const { setValue, watch, formState: { errors }, reset, clearErrors } = form

  const selectedUserId = watch("payerOurReceiver")

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "payments",
  })

  const selectedPaymentType = form.watch(`payments.${currentIndex}.paymentType`);

  function handleAppendMethodPaymeent() {
    append({
      cardId: "",
      paymentType: PaymentType.CASH,
      amount: 0,
      installments: 0,
      isCard: false,
    })
  }

  const nextMethodPayment = () => {
    if (currentIndex < fields.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevMethodPayment = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const onClose = () => {
    reset(defaultValuesTransactionsData)
    clearErrors()
    router.replace("/transactions/form")
  }

  const { mutate: handleCreateTransactionsFn } = useCreateTransaction(onClose)
  const { mutate: handleUpdateTransactionsFn } = useUpdateTransaction(onClose)
  const transactionQuery = useGetTransactionById(trasanctionParamsId || "");
  const transactionData = transactionQuery.data;
  const isLoadingTransaction = transactionQuery.isLoading;
  const { resetTransactionForm } = useTransactionFormActions(reset)

  function onSubmit(data: transactionsFormData | transactionsUpdateFormData) {
    console.log(data)

    if (trasanctionParamsId) {
      handleUpdateTransactionsFn(data as transactionsUpdateFormData)
      return
    }

    handleCreateTransactionsFn(data);
  }
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (transactionData) {
      resetTransactionForm(transactionData);
    }
  }, [transactionData]);
  /* eslint-enable react-hooks/exhaustive-deps */

  useEffect(() => {
    if (selectedPaymentType === PaymentType.CREDIT || selectedPaymentType === PaymentType.DEBIT) {
      setShowCard(true);
      return
    }
    setShowCard(false);
  }, [selectedPaymentType]);

  async function fetchUsers(query?: string) {
    // Simulação de chamada ao backend
    const response = await gelAllPayerOrReceiver({
      search: "",
      page: undefined,
      perPage: undefined
    })

    const res = response.data.map((user) => ({
      id: user.id,
      name: user.name,
    }))
    setUsers(res)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    const hasErrors = Object.keys(errors).length > 0;
    if (hasErrors) {
      toast.error("O formulário contém erros. Verifique os campos destacados.");
    }
  }, [errors]);


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="gap-6 grid grid-cols-2 md:grid-cols-6 items-start">


          <FormItem className="col-span-6">
            <FormLabel>Link</FormLabel>
            <FormControl>
              <Input placeholder="https://whatsapp/hash?id=j43ohuh4iu43h2oiu4h32iu" />
            </FormControl>
            <FormDescription>
              This is your public display name. It can be your real name or a
              pseudonym. You can only change this once every 30 daysssssssss
            </FormDescription>
            <FormMessage />
          </FormItem>


          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="col-span-6 lg:col-span-2">
                <FormLabel>Valor</FormLabel>
                <FormControl>
                  <Input placeholder="$ 300.00" {...field} />
                </FormControl>
                <FormDescription>
                  This is value of the transaction.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
              <FormItem className="col-span-6 lg:col-span-2">
                <FormLabel>Moeda</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="min-w-full">
                      <SelectValue placeholder="Selecione uma moeda" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(CurrencyType).map(([key, value]) => (
                      <SelectItem key={value} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Escolha a moeda</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="col-span-6 lg:col-span-2">
                <FormLabel>status</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="min-w-full">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(TransactionStatusBase).map(([key, value]) => (
                      <SelectItem key={value} value={value}>
                        {translateTransactionStatus(value)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Status Atual da transação</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="col-span-6 lg:col-span-2">
                <FormLabel>Categoria</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="min-w-full">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(TransactionCategory).map(([key, value]) => (
                      <SelectItem key={value} value={value}>
                        {translateTransactionCategory(value)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>As categorias serevem para separar suas transações</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="transactionType"
            render={({ field }) => (
              <FormItem className="col-span-6 lg:col-span-2">
                <FormLabel>Tipo da transação</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="min-w-full">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(TransactionTypeBase).map(([key, value]) => (
                      <SelectItem key={value} value={value}>
                        {translateTransactionType(value)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Escolha o tipo da transação</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="TransactionScheduledDate"
            render={({ field }) => (
              <FormItem className="col-span-6 lg:col-span-2">
                <FormLabel>Data do pagamento</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormDescription>
                  A confirmação da sera realizada na data selecionada.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          
          {/* <FormField
            control={form.control}
            name="TransactionScheduledDate"
            render={({ field }) => {
              // converter valor do field para Date (supondo que venha string ISO ou Date)
              const date = field.value ? new Date(field.value) : undefined;

              return (
                <FormItem className="col-span-6 lg:col-span-2">
                  <FormLabel>Data do pagamento</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-[240px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(selectedDate) => {
                            field.onChange(selectedDate);
                          }}
                          autoFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormDescription>
                    A confirmação da sera realizada na data selecionada.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          /> */}

          {/* <FormField
            control={form.control}
            name="payerOurReceiver"
            render={({ field }) => (
              <FormItem className="col-span-6 lg:col-span-2">
                <FormLabel>Pagador | recebedor</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormDescription>
                  O pagador aquele que faz o pagamento e o recebedor é quem recebe o pagamento.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          <Popover
            open={open}
            onOpenChange={(isOpen) => {
              setOpen(isOpen)
              if (isOpen) {
                fetchUsers("") // Recarrega todos os usuários ao abrir
              }
            }}
          >
            <PopoverTrigger asChild>
              <Button variant="outline" role="combobox" aria-expanded={open} className={`col-span-6 lg:col-span-2 justify-between ${errors.payerOurReceiver && "text-red-500"} `}>
                {selectedUserId
                  ? selectedUserId.name
                  : "Pagador | Recebedor"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command>
                {/* Input normal para busca */}
                <div className="p-2">
                  <input
                    type="text"
                    placeholder="Search user..."
                    className="w-full border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => fetchUsers(e.target.value)}
                  />
                </div>
                <CommandList>
                  <div className="flex flex-col justify-center gap-2 p-2">
                    <CommandEmpty>Nenhum usuário encontrado</CommandEmpty>
                    <Dialog open={openDialogNewPayerOrReceiver} onOpenChange={setOpenDialogNewPayorReceiver}>
                      <DialogTrigger className="text-sm font-medium text-blue-500 hover:underline cursor-pointer">Novo pagador/recebedor</DialogTrigger>
                      <PayerOrReceiverDialogForm onClose={setOpenDialogNewPayorReceiver} setValueContext={setValue} />
                    </Dialog>
                  </div>
                  <CommandGroup>
                    {users.map((user) => (
                      <CommandItem
                        key={user.id}
                        value={user.id}
                        onSelect={() => {
                          setValue("payerOurReceiver", {
                            id: user.id,
                            name: user.name,
                          }) // Salva o ID no form
                          setOpen(false)
                        }}
                      >
                        <Check className={cn("mr-2 h-4 w-4", selectedUserId?.id === user.id ? "opacity-100" : "opacity-0")} />
                        {user.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>



          <div className="col-span-6">
            {fields.length > 0 && (
              <div key={fields[currentIndex].id} className="grid grid-cols-1  md:grid-cols-4 gap-6 items-start">
                {showCard && (
                  <FormField
                    control={form.control}
                    name={`payments.${currentIndex}.cardId`}
                    render={({ field }) => (
                      <FormItem className="space-y-1 col-span-4">
                        <FormLabel>Select your card</FormLabel>
                        <FormDescription>
                          Choose a card for the transaction by clicking on it.
                        </FormDescription>
                        <FormMessage />
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="flex items-center gap-4 overflow-auto"
                        >
                          {data?.data.map((card) => (
                            <FormItem key={card.id}>
                              <FormLabel
                                htmlFor={`card-${card.id}`}
                                className="cursor-pointer"
                              >
                                <FormControl>
                                  <RadioGroupItem
                                    value={card.id}
                                    id={`card-${card.id}`}
                                    className="sr-only"
                                  />
                                </FormControl>
                                {/* Aqui, verificamos se o cartão está selecionado */}
                                <div
                                  className={cn(
                                    "rounded-md w-[300px]",
                                    field.value === card.id && "border-2 border-orange-500 rounded-2xl w-[300px]",
                                  )}
                                >
                                  <CreditCardItem
                                    cardHolder={card.name}
                                    cardNumber={card.number}
                                    cardIssuer={card.company}
                                    cardType={card.cardType}
                                    cardValidity={card.expiredDate}
                                    cardFlag={card.flag}
                                  />
                                </div>
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name={`payments.${currentIndex}.paymentType`}
                  render={({ field }) => (
                    <FormItem className="col-span-4 lg:col-span-1">
                      <FormLabel>Tipo</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value ?? undefined}>
                        <FormControl>
                          <SelectTrigger className="min-w-full">
                            <SelectValue placeholder="Selecione..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(PaymentType).map(([key, value]) => (
                            <SelectItem key={value} value={key}>
                              {translatePaymentType(value)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>Status Atual da transação</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`payments.${currentIndex}.amount`}
                  render={({ field }) => (
                    <FormItem className="col-span-4 lg:col-span-1">
                      <FormLabel>Valor</FormLabel>
                      <FormControl>
                        <Input placeholder="$ 250.00" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is value of the transaction.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`payments.${currentIndex}.installments`}
                  render={({ field }) => (
                    <FormItem className="col-span-4 lg:col-span-1">
                      <FormLabel>Parcelas</FormLabel>
                      <FormControl>
                        <Input placeholder="8" {...field} disabled={!showCard} />
                      </FormControl>
                      <FormDescription>
                        Number of installments for the transaction.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <FormField
                  control={form.control}
                  name={`paymentTypes.${currentIndex}.isCard`}
                  render={({ field }) => (
                    <FormItem className="col-span-4 lg:col-span-1">
                      <FormLabel>Cartão de crédito</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value ?? false}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormDescription>
                        This value indicates if the payment is made with a credit card.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}

              </div>
            )}
            <div className="flex max-md:flex-col justify-between md:items-center gap-4 mt-4 mdl:mt-14">
              <div className="flex items-center gap-4 cursor-pointer">
                <span>{`${currentIndex + 1} de ${fields.length}`}</span>
                <Button size={"sm"} type="button" variant={"outline"} onClick={prevMethodPayment} disabled={currentIndex === 0}>
                  <ChevronLeft />
                </Button>
                <Button size={"sm"} type="button" variant={"outline"} onClick={nextMethodPayment} disabled={currentIndex === fields.length - 1}>
                  <ChevronRight />
                </Button>
              </div>

              <div className="flex max-md:w-full max-md:justify-end md:items-center gap-4 cursor-pointer">
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => {
                    remove(currentIndex);
                    setCurrentIndex((prev) => {
                      if (prev > 0) {
                        return prev - 1;
                      }
                      return 0;
                    });
                  }}
                >
                  Remover
                </Button>
                <Button
                  type="button"
                  variant="new"
                  onClick={() => {
                    handleAppendMethodPaymeent();
                    setCurrentIndex(fields.length); // Vai para o novo endereço
                  }}
                >
                  Novo
                </Button>

              </div>

            </div>

          </div>


          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="col-span-6">
                <FormLabel>Email</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="min-w-full">
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="m@example.com">m@example.com</SelectItem>
                    <SelectItem value="m@google.com">m@google.com</SelectItem>
                    <SelectItem value="m@support.com">m@support.com</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  You can manage verified email addresses in your{" "}
                  <Link href="/examples/forms">email settings</Link>.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-6">
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none bg-white"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Descreva a uma pouco sobre a transação, algo que ajude a identificar a transação.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Salvar</Button>
      </form>
    </Form>
  )
}