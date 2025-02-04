"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { category: "transport", visitors: 275, fill: "var(--color-transport)" },
  { category: "shopping", visitors: 200, fill: "var(--color-shopping)" },
  { category: "others", visitors: 187, fill: "var(--color-others)" },
  { category: "food", visitors: 173, fill: "var(--color-food)" },
  { category: "entertainment", visitors: 90, fill: "var(--color-entertainment)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  transport: {
    label: "Transport",
    color: "#3b82f6",
  },
  shopping: {
    label: "Shopping",
    color: "#f97316",
  },
  others: {
    label: "Others",
    color: "#64748b",
  },
  food: {
    label: "Food",
    color: "#dc2626",
  },
  entertainment: {
    label: "Entertainment",
    color: "#22c55e",
  },
} satisfies ChartConfig

export function PizzaCard() {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Custom Label</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0 mt-5">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] px-0"
        >
          <PieChart className="">
            <ChartTooltip
              content={<ChartTooltipContent nameKey="visitors" hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              labelLine={false}
              label={({ payload, ...props }) => {
                return (
                  <text
                    cx={props.cx}
                    cy={props.cy}
                    x={props.x}
                    y={props.y}
                    textAnchor={props.textAnchor}
                    dominantBaseline={props.dominantBaseline}
                    fill="hsla(var(--foreground))"
                  >
                    {payload.visitors}
                  </text>
                )
              }}
              nameKey="category"
            />
            <ChartLegend content={<ChartLegendContent nameKey="category" />} className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"/>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
