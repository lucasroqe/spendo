'use client'

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

const chartConfig = {
  transport: {
    label: 'Transport',
    color: '#3b82f6',
  },
  shopping: {
    label: 'Shopping',
    color: '#f97316',
  },
  others: {
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

interface Transaction {
  category: string
  amount: number
  date: Date
}

interface TransactionsData {
  data: Transaction[]
}

export function BarCard({ data }: TransactionsData) {
  const groupedData: Record<string, any> = {}

  data.forEach((transaction: any) => {
    const { date, category, amount } = transaction

    if (!groupedData[date]) {
      groupedData[date] = { date }
    }

    const categoryKey = category.toLowerCase()

    if (!groupedData[date][categoryKey]) {
      groupedData[date][categoryKey] = 0
    }

    groupedData[date][categoryKey] += amount
  })

  const chartData = Object.values(groupedData)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Spending distribution</CardTitle>
        <CardDescription>January - December</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-96 w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar
              dataKey="transport"
              fill={chartConfig.transport.color}
              radius={4}
            />
            <Bar
              dataKey="shopping"
              fill={chartConfig.shopping.color}
              radius={4}
            />
            <Bar dataKey="other" fill={chartConfig.others.color} radius={4} />
            <Bar dataKey="food" fill={chartConfig.food.color} radius={4} />
            <Bar
              dataKey="entertainment"
              fill={chartConfig.entertainment.color}
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing spending progress in 2025
        </div>
      </CardFooter>
    </Card>
  )
}
