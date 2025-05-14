"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { CreditCardFormData, creditCardSchema, defaultValuesCreditCardData } from "./zod/credit-card-schema"
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { cardTypeEnumBase, CreditDebitCardResponseList } from "./types/credit-card-types-schema"
import { CreditCardItem } from "@/components/credit-card"
import { formatCreditCardSecure } from "@/utils/format-credit-card-secure"
import { Swiper, SwiperSlide } from 'swiper/react';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';


// import required modules
import { EffectCards } from 'swiper/modules';
import { formatMonthYearInput } from "@/utils/format-date-moth-year"
import { translateCardType } from "@/utils/translatcard-type"
import { useEffect, useState, useTransition } from "react"
import { createCardCreditDebit } from "./_api/create-card-credit-debit"
import { toast } from "sonner"
import { CreditCard, Loader2Icon } from "lucide-react"
import { getColorNameFromArray, getColorsCard } from "@/utils/get-colors-card"
import { useData } from "@/hooks/use-data"
import { getAllCardCreditDebit } from "./_api/get-all-card-credit-debit"
import { getCardById } from "./_api/get-card-by-id"
import { updateCardCreditDebit } from "./_api/update-card-credit-debit"
import { StatusDefaultActiveInactive } from "@/utils/status-default-active-inactive"

export type Color = 'slate' | 'violet' | 'orange' | 'gold' | 'sky' | 'green';

export function CreditCardForms() {

    const { data, isLoading, error, fetchData } = useData<CreditDebitCardResponseList>();
    const [invalidateQuery, setInvalidateQuery] = useState(false)
    const [color, setColor] = useState<Color>("slate");
    const [cardId, setCardId] = useState<string>("")

    const [isPending, startTransition] = useState(false)

    const form = useForm<CreditCardFormData>({
        mode: "onChange",
        resolver: zodResolver(creditCardSchema),
        defaultValues: defaultValuesCreditCardData,
    })

    const { handleSubmit, setValue, getValues, trigger, watch, formState: { errors }, reset } = form;

    console.log(errors)

    async function onSubmit(data: CreditCardFormData) {
        // startTransition(true)

        if (cardId) {
            const response = await updateCardCreditDebit({ id: cardId, ...data });
            if (response.status !== 200) {
                console.error("Error updating name:");
                toast.error("Erro ao atualizar cartão")
                return;
            }

            toast.success("Cartão atualizado com sucesso")
            setInvalidateQuery(prev => !prev)
            reset(defaultValuesCreditCardData)
            return;
        }
        const response = await createCardCreditDebit(data);

        if (response.status !== 201) {
            console.error("Error updating name:");
            toast.error("Erro ao criar cartão")
            // startTransition(false)
            return;
        }
        // startTransition(false)
        toast.success("Cartão criado com sucesso", { id: "toast-success" })
        setInvalidateQuery(prev => !prev)
        reset(defaultValuesCreditCardData)
    }

    useEffect(() => {
        console.log("Re-fetching cards:", invalidateQuery);
        fetchData(getAllCardCreditDebit);
    }, [fetchData, invalidateQuery]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async function handleSlideChange(swiper: any) {
        const currentIndex = swiper.realIndex; // índice do slide visível
        const currentCard = data?.data?.[currentIndex];
        if (currentCard) {
            const response = await getCardById(currentCard.id);

            const colorName = getColorNameFromArray(response.data.colors as [string, string, string]);

            if (colorName) {
                setColor(colorName); // atualiza o Select visualmente
            }
            setCardId(response.data.id)
            reset(
                {
                    name: response.data.name,
                    number: response.data.number,
                    company: response.data.company,
                    flag: response.data.flag,
                    expiredDate: response.data.expiredDate.toString(),
                    cardType: response.data.cardType,
                    colors: response.data.colors,
                    status: response.data.status.toLowerCase() as StatusDefaultActiveInactive,
                }
            )
        }
    }

    function handleNewCard() {
        setCardId("");
        reset(defaultValuesCreditCardData);
        setColor("slate")
    }

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 grid grid-cols-1 2md:grid-cols-5 gap-8">
                <div className="col-span-2 mr-4">
                    <>
                        <Swiper
                            effect={'cards'}
                            grabCursor={true}
                            modules={[EffectCards]}
                            className="max-w-[360px]"
                            onSlideChange={handleSlideChange}
                        >

                            {data?.data?.map((card) => (
                                <SwiperSlide key={card.id}>
                                    <CreditCardItem key={card.id}
                                        cardHolder={card.name}
                                        cardNumber={formatCreditCardSecure(card.number)}
                                        cardIssuer={card.company}
                                        cardType={card.cardType}
                                        cardValidity={card.expiredDate.toString()}
                                        cardFlag={card.flag}
                                        minHeight="h-58"
                                        cardColors={card.colors as [string, string, string]}
                                    />
                                </SwiperSlide>
                            ))}

                        </Swiper>

                        {
                            (!data?.data || data.data.length === 0) && (
                                <div className="w-full h-58 m-auto rounded-2xl border border-black dark:border-white dark:text-slate-100 flex flex-col items-center justify-center space-y-3">
                                    <CreditCard className="size-8 dark:text-slate-300" />
                                    <span className="text-center text-sm sm:text-base">
                                        Você ainda não possui cartões cadastrados
                                    </span>
                                </div>
                            )
                        }

                    </>

                </div>
                <div className="grid grid-cols-1 col-span-3 gap-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="col-span-6 lg:col-span-2">
                                <FormLabel>Nome do titular</FormLabel>
                                <FormControl>
                                    <Input  {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is value of the transaction.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="col-span-6 lg:col-span-2 flex max-2md:flex-col 2md:items-start gap-4">
                        <FormField
                            control={form.control}
                            name="number"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Número do cartão</FormLabel>
                                    <FormControl>
                                        <Input placeholder="62******9988" maxLength={19} {...field} />
                                    </FormControl>
                                    <FormDescription className="text-red-500 font-bold">
                                        Seu cartão nunca será salvo com todos os digitos
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Select value={color} onValueChange={(value) => {
                            const selectedColor = value as Color;
                            setColor(selectedColor);

                            const colorArray = getColorsCard(selectedColor);
                            setValue("colors", colorArray);
                            trigger("colors");
                        }}>
                            <SelectTrigger data-testid="select-cores" className="2md:mt-[22px] max-2md:w-full">
                                <SelectValue defaultValue={"green"} placeholder="Cores" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="violet">
                                    <div className="flex items-center">
                                        <span className="w-4 h-4 rounded-full bg-violet-500 mr-2"></span>
                                        <span>Violeta</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="orange">
                                    <div className="flex items-center">
                                        <span className="w-4 h-4 rounded-full bg-orange-500 mr-2"></span>
                                        <span>Laranja</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="gold">
                                    <div className="flex items-center">
                                        <span className="w-4 h-4 rounded-full bg-yellow-600 mr-2"></span>
                                        <span>Gold</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="sky">
                                    <div className="flex items-center">
                                        <span className="w-4 h-4 rounded-full bg-sky-500 mr-2"></span>
                                        <span>Azul</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="slate">
                                    <div className="flex items-center">
                                        <span className="w-4 h-4 rounded-full bg-green-500 mr-2"></span>
                                        <span>Verde</span>
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                            <FormItem className="col-span-6 lg:col-span-2">
                                <FormLabel>Empresa emissora</FormLabel>
                                <FormControl>
                                    <Input placeholder="C6" {...field} />
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
                        name="flag"
                        render={({ field }) => (
                            <FormItem className="col-span-6 lg:col-span-2">
                                <FormLabel>Bandeira</FormLabel>
                                <FormControl>
                                    <Input placeholder="Visa" {...field} />
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
                        name="expiredDate"
                        render={({ field }) => (
                            <FormItem className="col-span-6 lg:col-span-2">
                                <FormLabel>Data de vencimento</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="MM/YYYY"
                                        maxLength={7}
                                        value={field.value}
                                        onChange={(e) => {
                                            const formatted = formatMonthYearInput(e.target.value);
                                            field.onChange(formatted);
                                        }}
                                    />
                                </FormControl>
                                <FormDescription>Este é o vencimento do cartão.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <FormField
                        control={form.control}
                        name="cardType"
                        render={({ field }) => (
                            <FormItem className="col-span-6 lg:col-span-2">
                                <FormLabel>Tipo do cartão</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="min-w-full">
                                            <SelectValue placeholder="Selecione uma moeda" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {Object.entries(cardTypeEnumBase).map(([key, value]) => (
                                            <SelectItem key={value} value={key}>
                                                {translateCardType(value as cardTypeEnumBase)}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormDescription>Escolha a moeda</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {isPending ? (
                        <Button className="w-36" disabled={isPending || isLoading}>
                            <Loader2Icon className="animate-spin" />
                        </Button>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Button type="submit" className="w-36" disabled={isPending || isLoading}>
                                Salvar
                            </Button>

                            <Button variant="new" type="button" className="w-36" disabled={isPending || isLoading} onClick={() => handleNewCard()}>
                                Novo cartão
                            </Button>
                        </div>
                    )}



                </div>


            </form>
        </Form>
    )
}