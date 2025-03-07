'use client'

import { Pie, PieChart } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import type { Category } from '@prisma/client'

const chartConfig = {
  transport: {
    label: 'Transport',
    color: '#3b82f6',
  },
  shopping: {
    label: 'Shopping',
    color: '#f97316',
  },
  other: {
    label: 'Others',
    color: '#64748b',
  },
  food: {
    label: 'Food',
    color: '#dc2626',
  },
  entertainment: {
    label: 'Entertainment',
    color: '#22c55e',
  },
} satisfies ChartConfig

interface CategoryTotal {
  category: Category
  _sum: {
    amount: number | null
  }
}

interface TransactionsData {
  data: CategoryTotal[]
  dateFilter?: 'total' | '3months' | '30days'
}

export function PizzaCard({ data, dateFilter = 'total' }: TransactionsData) {
  const chartData = data.map((item) => ({
    category: item.category.toLowerCase(),
    value: item._sum?.amount || 0,
    fill:
      chartConfig[item.category.toLowerCase() as keyof typeof chartConfig]
        ?.color || '#000',
  }))

  let descriptionText = 'Showing total amount per category in 2025'
  if (dateFilter === '3months') {
    descriptionText = 'Showing total amount per category in the last 3 months'
  } else if (dateFilter === '30days') {
    descriptionText = 'Showing total amount per category in the last 30 days'
  }

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Composition of total expenditure</CardTitle>
        <CardDescription className="py-4">{descriptionText}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[320px] px-0"
        >
          <PieChart>
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
                )
              }}
              nameKey="category"
            />
            <ChartLegend
              content={<ChartLegendContent nameKey="category" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
