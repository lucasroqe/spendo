"use client"

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

const chartConfig = {
  transport: {
    label: "Transport",
    color: "#3b82f6",
  },
  shopping: {
    label: "Shopping",
    color: "#f97316",
  },
  other: {
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

export function PizzaCard({ data }: any) {
  
  const chartData = data.map((item: any) => ({
    category: item.category.toLowerCase(),
    value: item._sum.amount,
    fill: chartConfig[item.category as keyof typeof chartConfig]?.color || "#000",
  }));

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Composition of total expenditure</CardTitle>
        <CardDescription className="py-4">January - December</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0 mt-5">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] px-0"
        >
          <PieChart className="">
            <ChartTooltip
              content={<ChartTooltipContent nameKey="category" hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
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
                    {payload.value}
                  </text>
                );
              }}
              nameKey="category"
            />
            <ChartLegend content={<ChartLegendContent nameKey="category" />} className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"/>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm h-screen">
        <div className="leading-none text-muted-foreground h-10">
          Showing total amount per category (2025)
        </div>
      </CardFooter>
    </Card>
  );
}
