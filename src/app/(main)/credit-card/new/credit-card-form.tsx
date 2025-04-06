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
import { cardTypeEnumBase } from "./types/credit-card-types-schema"
import { CreditCardItem } from "@/components/credit-card"
import { formatCreditCardSecure } from "@/utils/format-credit-card-secure"
import { format } from "date-fns"
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';


// import required modules
import { EffectCards } from 'swiper/modules';

export function CreditCardForms() {

    const form = useForm<CreditCardFormData>({
        mode: "onChange",
        resolver: zodResolver(creditCardSchema),
        defaultValues: defaultValuesCreditCardData,
    })

    const watchedValues = form.watch();

    function onSubmit(data: CreditCardFormData) {
        console.log(data)
        console.log("--------------------")
        console.table(data)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 grid grid-cols-5 gap-8">
                <div className="col-span-2">

                    <>
                        <Swiper
                            effect={'cards'}
                            grabCursor={true}
                            modules={[EffectCards]}
                            className="mySwiper"
                        >
                            <SwiperSlide>
                                <CreditCardItem
                                    cardHolder={watchedValues.name}
                                    cardNumber={formatCreditCardSecure(watchedValues.number)}
                                    cardIssuer={watchedValues.company}
                                    cardType={watchedValues.cardType}
                                    cardValidity={format(watchedValues.expiredDate, "dd/MM")}
                                    cardFlag={watchedValues.flag}
                                    minHeight="h-58"
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <CreditCardItem
                                    cardHolder={watchedValues.name}
                                    cardNumber={formatCreditCardSecure(watchedValues.number)}
                                    cardIssuer={watchedValues.company}
                                    cardType={watchedValues.cardType}
                                    cardValidity={format(watchedValues.expiredDate, "dd/MM")}
                                    cardFlag={watchedValues.flag}
                                    minHeight="h-58"
                                    cardColors={["#4a00e0", "#8e2de2", "#4a00e0"]} // roxo escuro + claro

                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <CreditCardItem
                                    cardHolder={watchedValues.name}
                                    cardNumber={formatCreditCardSecure(watchedValues.number)}
                                    cardIssuer={watchedValues.company}
                                    cardType={watchedValues.cardType}
                                    cardValidity={format(watchedValues.expiredDate, "dd/MM")}
                                    cardFlag={watchedValues.flag}
                                    minHeight="h-58"
                                    cardColors={["#ff8000", "#ffaa00", "#ff8000"]}
                                />
                            </SwiperSlide>

                            <SwiperSlide>
                                <CreditCardItem
                                    cardHolder={watchedValues.name}
                                    cardNumber={formatCreditCardSecure(watchedValues.number)}
                                    cardIssuer={watchedValues.company}
                                    cardType={watchedValues.cardType}
                                    cardValidity={format(watchedValues.expiredDate, "dd/MM")}
                                    cardFlag={watchedValues.flag}
                                    minHeight="h-58"
                                    cardColors={["#b8860b", "#ffd700", "#b8860b"]}
                                />
                            </SwiperSlide>

                            <SwiperSlide>
                                <CreditCardItem
                                    cardHolder={watchedValues.name}
                                    cardNumber={formatCreditCardSecure(watchedValues.number)}
                                    cardIssuer={watchedValues.company}
                                    cardType={watchedValues.cardType}
                                    cardValidity={format(watchedValues.expiredDate, "dd/MM")}
                                    cardFlag={watchedValues.flag}
                                    minHeight="h-58"
                                    cardColors={["#0033cc", "#00ccff", "#0033cc"]}
                                />
                            </SwiperSlide>

                            <SwiperSlide>
                                <CreditCardItem
                                    cardHolder={watchedValues.name}
                                    cardNumber={formatCreditCardSecure(watchedValues.number)}
                                    cardIssuer={watchedValues.company}
                                    cardType={watchedValues.cardType}
                                    cardValidity={format(watchedValues.expiredDate, "dd/MM")}
                                    cardFlag={watchedValues.flag}
                                    minHeight="h-58"
                                    cardColors={["#005c4b", "#00c98d", "#005c4b"]}
                                />
                            </SwiperSlide>

                        </Swiper>
                    </>

                </div>
                <div className="grid grid-cols-1 col-span-3 gap-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="col-span-6 lg:col-span-2">
                                <FormLabel>Nome</FormLabel>
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

                    <FormField
                        control={form.control}
                        name="number"
                        render={({ field }) => (
                            <FormItem className="col-span-6 lg:col-span-2">
                                <FormLabel>Número do cartão</FormLabel>
                                <FormControl>
                                    <Input placeholder="62******9988" {...field} />
                                </FormControl>
                                <FormDescription className="text-red-500 font-bold">
                                    Seu cartão nunca será salvo com todos os digitos
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

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
                                    <Input type="date" {...field} />
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
                    <Button className="w-36" type="submit">Salvar</Button>
                </div>


            </form>
        </Form>
    )
}