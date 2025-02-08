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
import { getUsersTransactions } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { useState } from "react";

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

export function BarCard({ data }: any) {
  const groupedData: Record<string, any> = {};

  data.forEach((transaction: any) => {
    
    const { date, category, amount } = transaction;

    if (!groupedData[date]) {
      groupedData[date] = { date };
    }

    const categoryKey = category.toLowerCase();

    if (!groupedData[date][categoryKey]) {
      groupedData[date][categoryKey] = 0;
    }

    groupedData[date][categoryKey] += amount;
  });

  const chartData = Object.values(groupedData);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Spending distribution</CardTitle>
        <CardDescription>January - December 2025</CardDescription>
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
