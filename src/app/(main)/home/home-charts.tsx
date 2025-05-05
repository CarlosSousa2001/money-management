"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react"
import { getMetricsMonths } from "./_api/get-metrics-months"
import { translateTransactionStatus } from "@/utils/translations-transactions-status"
import { TransactionStatusBase } from "./types/home-types-schema"

const chartConfig = {
    pay: {
        label: "Pay",
        color: "oklch(0.768 0.233 130.85)",
    },
    receive: {
        label: "Receive",
        color: "oklch(0.704 0.191 22.216)",
    },
} satisfies ChartConfig
export function HomeCharts() {
    const [chartData, setChartData] = useState<any[]>([])
    const [status, setStatus] = useState<TransactionStatusBase>(TransactionStatusBase.COMPLETED)
    const [year, setYear] = useState<number>(new Date().getFullYear())
    const years = Array.from({ length: 6 }, (_, i) => 2020 + i)

    async function getMetrics() {
        const response = await getMetricsMonths(year, status)

        setChartData(response.data)
    }

    useEffect(() => {
        getMetrics()
    }, [status, year])


    return (
        <Card>
            <CardHeader>
                <div className="w-full flex items-center justify-between">
                    <CardTitle>Controle</CardTitle>

                    <div className="flex gap-2 items-center justify-end">
                        <Select onValueChange={(value) => setStatus(value as TransactionStatusBase)} value={status}>
                            <SelectTrigger className="max-w-[160px]">
                                <SelectValue placeholder="Selecione..." />
                            </SelectTrigger>
                            <SelectContent >
                                {Object.entries(TransactionStatusBase).map(([key, value]) => (
                                    <SelectItem key={value} value={value}>
                                        {translateTransactionStatus(value)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select onValueChange={(value) => setYear(Number(value))} value={String(year)}>
                            <SelectTrigger className="max-w-[160px]">
                                <SelectValue placeholder="Selecione o ano..." />
                            </SelectTrigger>
                            <SelectContent>
                                {years.map((y) => (
                                    <SelectItem key={y} value={String(y)}>
                                        {y}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                    </div>

                </div>
                <CardDescription>
                    Showing total visitors for the last 6 months
                </CardDescription>
            </CardHeader>
            <CardContent className="max-h-[300px] h-full">
                <ChartContainer config={chartConfig} className="max-h-[300px] h-full min-w-full">
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dot" />}
                        />
                        <Area
                            dataKey="received"
                            type="natural"
                            fill="var(--color-receive)"
                            fillOpacity={0.4}
                            stroke="var(--color-receive)"
                            stackId="a"
                        />
                        <Area
                            dataKey="paid"
                            type="natural"
                            fill="var(--color-pay)"
                            fillOpacity={0.4}
                            stroke="var(--color-pay)"
                            stackId="a"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
