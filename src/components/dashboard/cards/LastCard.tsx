'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { Category } from '@prisma/client'

interface Transaction {
  id: string
  category: Category
  amount: number
  date: string
  description?: string | null
  createdAt?: Date | null
  updatedAt?: Date | null
  userId?: string
}

interface LastCardProps {
  data: Transaction[]
  dateFilter?: 'total' | '3months' | '30days'
}

export function LastCard({ data, dateFilter = 'total' }: LastCardProps) {
  let descriptionText = 'Últimas transações'
  if (dateFilter === '3months') {
    descriptionText = 'Últimas transações (3 meses)'
  } else if (dateFilter === '30days') {
    descriptionText = 'Últimas transações (30 dias)'
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Últimas transações</CardTitle>
        <CardDescription>{descriptionText}</CardDescription>
      </CardHeader>
      <CardContent className="max-h-[calc(100%-5rem)] overflow-auto">
        <div className="space-y-4">
          {data.length === 0 ? (
            <div className="py-4 text-center text-muted-foreground">
              Nenhuma transação encontrada
            </div>
          ) : (
            data.slice(0, 5).map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between"
              >
                <div className="flex flex-col">
                  <span className="font-medium">
                    {transaction.category.charAt(0).toUpperCase() +
                      transaction.category.slice(1).toLowerCase()}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {transaction.date}
                  </span>
                </div>
                <div
                  className={`font-medium ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}`}
                >
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(transaction.amount)}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
