"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
    { month: "January", pay: 186, receive: 80 },
    { month: "February", pay: 305, receive: 200 },
    { month: "March", pay: 237, receive: 120 },
    { month: "April", pay: 73, receive: 190 },
    { month: "May", pay: 209, receive: 130 },
    { month: "June", pay: 214, receive: 140 },
]
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

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
    return (
        <Card>
            <CardHeader>
                <div className="w-full flex items-center justify-between">
                    <CardTitle>Controle</CardTitle>
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Options" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light">Day</SelectItem>
                            <SelectItem value="dark">Moth</SelectItem>
                            <SelectItem value="system">Year</SelectItem>
                        </SelectContent>
                    </Select>

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
                            dataKey="receive"
                            type="natural"
                            fill="var(--color-receive)"
                            fillOpacity={0.4}
                            stroke="var(--color-receive)"
                            stackId="a"
                        />
                        <Area
                            dataKey="pay"
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
