"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
    {
        date: "2023-06-01",
        transport: 600,
        shopping: 100,
        others: 750,
        food: 50,
        entertainment: 60,
    },
    {
        date: "2023-07-01",
        transport: 110,
        shopping: 110,
        others: 60,
        food: 80,
        entertainment: 970,
    },
    {
        date: "2023-08-01",
        transport: 620,
        shopping: 520,
        others: 350,
        food: 90,
        entertainment: 80,
    },
    {
        date: "2023-09-01",
        transport: 930,
        shopping: 130,
        others: 80,
        food: 100,
        entertainment: 90,
    },
    {
        date: "2023-10-01",
        transport: 240,
        shopping: 840,
        others: 90,
        food: 110,
        entertainment: 100,
    },
    {
        date: "2023-11-01",
        transport: 350,
        shopping: 150,
        others: 500,
        food: 120,
        entertainment: 110,
    },
    {
        date: "2023-12-01",
        transport: 260,
        shopping: 160,
        others: 110,
        food: 130,
        entertainment: 120,
    },
    {
        date: "2024-01-01",
        transport: 222,
        shopping: 150,
        others: 100,
        food: 80,
        entertainment: 90,
    },
    {
        date: "2024-02-01",
        transport: 170,
        shopping: 180,
        others: 120,
        food: 600,
        entertainment: 750,
    },
    {
        date: "2024-03-01",
        transport: 167,
        shopping: 120,
        others: 130,
        food: 950,
        entertainment: 850,
    },
    {
        date: "2024-04-01",
        transport: 242,
        shopping: 260,
        others: 140,
        food: 110,
        entertainment: 950,
    },
    {
        date: "2024-05-01",
        transport: 373,
        shopping: 290,
        others: 160,
        food: 130,
        entertainment: 510,
    },
    {
        date: "2024-06-01",
        transport: 701,
        shopping: 340,
        others: 180,
        food: 650,
        entertainment: 220,
    },
    {
        date: "2024-07-01",
        transport: 320,
        shopping: 360,
        others: 190,
        food: 160,
        entertainment: 130,
    },
    {
        date: "2024-08-01",
        transport: 310,
        shopping: 370,
        others: 400,
        food: 170,
        entertainment: 140,
    },
    {
        date: "2024-09-01",
        transport: 830,
        shopping: 180,
        others: 210,
        food: 180,
        entertainment: 150,
    },
];

const chartConfig = {
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
} satisfies ChartConfig;

export function BarCard() {
  return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Bar Chart - Multiple</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-96 w-full">
            <BarChart accessibilityLayer data={chartData} >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 7)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
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
              <Bar
                dataKey="others"
                fill={chartConfig.others.color}
                radius={4}
              />
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
          <div className="flex gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
  );
}
