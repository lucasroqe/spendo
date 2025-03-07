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
  type ChartConfig,
  ChartContainer,
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
  category: Category
  amount: number
  date: string
  id?: string
  createdAt?: Date | null
  updatedAt?: Date | null
  userId?: string
  description?: string | null
}

interface TransactionsData {
  data: Transaction[]
  dateFilter?: 'total' | '3months' | '30days'
}

export function BarCard({ data, dateFilter = 'total' }: TransactionsData) {
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

  let descriptionText = 'January - December'
  if (dateFilter === '3months') {
    descriptionText = 'Last 3 months'
  } else if (dateFilter === '30days') {
    descriptionText = 'Last 30 days'
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Spending distribution</CardTitle>
        <CardDescription>{descriptionText}</CardDescription>
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
          {dateFilter === 'total'
            ? 'Showing spending progress in 2025'
            : `Showing spending progress for ${descriptionText.toLowerCase()}`}
        </div>
      </CardFooter>
    </Card>
  )
}
