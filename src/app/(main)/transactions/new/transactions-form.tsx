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
import { defaultValuesTransactionsData, transactionsFormData, transactionsFormSchema } from "./zod/transactions-schema"
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

// Exemplo de dados para os cartões
const datacardmocks = [
  {
    id: "12",
    cardHolder: "Carlos Sousa",
    cardNumber: "1234 5678 9012 3456",
    cardIssuer: "C6 Bank",
    cardType: "Carbon",
    cardValidity: "07/22",
    cardExpire: "07/27",
    cardFlag: "Visa", // Caminho para o logo da bandeira
  },
  {
    id: "123",
    cardHolder: "Maria Silva",
    cardNumber: "9876 5432 1098 7654",
    cardIssuer: "Nubank",
    cardType: "Platinum",
    cardValidity: "08/21",
    cardExpire: "08/25",
    cardFlag: "American Express",
  },
  {
    id: "1234",
    cardHolder: "João Oliveira",
    cardNumber: "1122 3344 5566 7788",
    cardIssuer: "Itaú",
    cardType: "Gold",
    cardValidity: "01/23",
    cardExpire: "01/27",
    cardFlag: "MasterCard",
  },
  {
    id: "12345",
    cardHolder: "Fernanda Costa",
    cardNumber: "5566 7788 9900 1122",
    cardIssuer: "Bradesco",
    cardType: "Black",
    cardValidity: "09/22",
    cardExpire: "09/26",
    cardFlag: "Visa",
  },
];


export function TransactionsForm() {

  const [open, setOpen] = useState(false)
  const [users, setUsers] = useState<{ id: string; name: string }[]>([])

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCard, setShowCard] = useState(false);

  const form = useForm<transactionsFormData>({
    resolver: zodResolver(transactionsFormSchema),
    defaultValues: defaultValuesTransactionsData,
    mode: "onChange",
  })

  const { setValue, watch } = form
  const selectedUserId = watch("payerOurReceiver")

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "paymentTypes",
  })

  const selectedPaymentType = form.watch(`paymentTypes.${currentIndex}.paymentType`);

  function handleAppendMethodPaymeent() {
    append({
      cardId: "",
      paymentType: undefined,
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


  function onSubmit(data: transactionsFormData) {
    console.log(data)
    console.log("--------------------")
    console.table(data)
  }

  useEffect(() => {
    if (selectedPaymentType === PaymentType.CREDIT_CARD || selectedPaymentType === PaymentType.DEBIT_CARD) {
      setShowCard(true);
      return
    }
    setShowCard(false);
  }, [selectedPaymentType]);

  async function fetchUsers(query: string) {
    // Simulação de chamada ao backend
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return [
      { id: "1", name: "Carlos Sousa" },
      { id: "2", name: "Maria Silva" },
      { id: "3", name: "João Oliveira" },
      { id: "4", name: "Fernanda Costa" },
    ].filter((user) => user.name.toLowerCase().includes(query.toLowerCase()))
  }


  useEffect(() => {
    fetchUsers("").then(setUsers) // Busca inicial sem filtro
  }, [])


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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="min-w-full">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(TransactionStatusBase).map(([key, value]) => (
                      <SelectItem key={value} value={value}>
                        {value}
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
            name="transactionCategory"
            render={({ field }) => (
              <FormItem className="col-span-6 lg:col-span-2">
                <FormLabel>Categoria</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="min-w-full">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(TransactionCategory).map(([key, value]) => (
                      <SelectItem key={value} value={value}>
                        {value}
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="min-w-full">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(TransactionTypeBase).map(([key, value]) => (
                      <SelectItem key={value} value={value}>
                        {value}
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
                fetchUsers("").then(setUsers) // Recarrega todos os usuários ao abrir
              }
            }}
          >
            <PopoverTrigger asChild>
              <Button variant="outline" role="combobox" aria-expanded={open} className="col-span-2 justify-between">
                {selectedUserId
                  ? users.find((user) => user.id === selectedUserId)?.name
                  : "Select user..."}
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
                    onChange={(e) => fetchUsers(e.target.value).then(setUsers)}
                  />
                </div>
                <CommandList>
                  <CommandEmpty>No user found.</CommandEmpty>
                  <CommandGroup>
                    {users.map((user) => (
                      <CommandItem
                        key={user.id}
                        value={user.id}
                        onSelect={() => {
                          setValue("payerOurReceiver", user.id) // Salva o ID no form
                          setOpen(false)
                        }}
                      >
                        <Check className={cn("mr-2 h-4 w-4", selectedUserId === user.id ? "opacity-100" : "opacity-0")} />
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
                    name={`paymentTypes.${currentIndex}.cardId`}
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
                          {datacardmocks.map((card) => (
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
                                    "rounded-md",
                                    field.value === card.id && "border-2 border-orange-500 rounded-2xl",
                                  )}
                                >
                                  <CreditCardItem
                                    cardHolder={card.cardHolder}
                                    cardNumber={card.cardNumber}
                                    cardIssuer={card.cardIssuer}
                                    cardType={card.cardType}
                                    cardValidity={card.cardValidity}
                                    cardFlag={card.cardFlag}
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
                  name={`paymentTypes.${currentIndex}.paymentType`}
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
                            <SelectItem key={value} value={value}>
                              {value}
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
                  name={`paymentTypes.${currentIndex}.amount`}
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
                  name={`paymentTypes.${currentIndex}.installments`}
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                    className="resize-none"
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
        <Button type="submit">Save</Button>
      </form>
    </Form>
  )
}