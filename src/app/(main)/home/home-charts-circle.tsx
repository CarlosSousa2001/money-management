"use client"

import { Pie, PieChart } from "recharts"

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { browser: "chrome", visitors: 275, fill: "oklch(70% 0.18 240)" }, 
  { browser: "safari", visitors: 200, fill: "oklch(65% 0.17 230)" }, 
  { browser: "firefox", visitors: 187, fill: "oklch(60% 0.19 250)" }, 
  { browser: "edge", visitors: 173, fill: "oklch(55% 0.16 235)" }, 
  { browser: "other", visitors: 90, fill: "oklch(50% 0.15 245)" }, 
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "oklch(70% 0.18 240)",
  },
  safari: {
    label: "Safari",
    color: "oklch(65% 0.17 230)",
  },
  firefox: {
    label: "Firefox",
    color: "oklch(60% 0.19 250)",
  },
  edge: {
    label: "Edge",
    color: "oklch(55% 0.16 235)",
  },
  other: {
    label: "Other",
    color: "oklch(50% 0.15 245)",
  },
} satisfies ChartConfig

export function HomeChartsCircle() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Transações por categorias</CardTitle>
        <CardDescription>Janeiro - Junho 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            {/* Adicionando tooltip */}
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              stroke="0"
            />
            
            <ChartLegend
              content={<ChartLegendContent nameKey="browser" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
