'use server'
import type { Category } from '@prisma/client'
import { prisma } from './prisma'
import { headers } from 'next/headers'
import { auth } from './auth'

interface TransactionData {
  category: Category
  amount: number
  date: Date
  description?: string
}

type DateFilter = 'total' | '3months' | '30days'

export async function getUsersTransactions(dateFilter: DateFilter = 'total') {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  let dateCondition = {}

  if (dateFilter !== 'total') {
    const today = new Date()
    const filterDate = new Date()

    if (dateFilter === '3months') {
      filterDate.setMonth(today.getMonth() - 3)
    } else if (dateFilter === '30days') {
      filterDate.setDate(today.getDate() - 30)
    }

    dateCondition = {
      date: {
        gte: filterDate,
      },
    }
  }

  const transactions = await prisma.transactions.findMany({
    where: {
      userId: session?.session.userId,
      ...dateCondition,
    },
    orderBy: {
      date: 'asc',
    },
  })

  return transactions.map((transaction) => ({
    ...transaction,
    date: new Date(transaction.date).toLocaleDateString('pt-BR'),
  }))
}

export async function getUserLastTransactions(
  dateFilter: DateFilter = 'total',
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  let dateCondition = {}

  if (dateFilter !== 'total') {
    const today = new Date()
    const filterDate = new Date()

    if (dateFilter === '3months') {
      filterDate.setMonth(today.getMonth() - 3)
    } else if (dateFilter === '30days') {
      filterDate.setDate(today.getDate() - 30)
    }

    dateCondition = {
      date: {
        gte: filterDate,
      },
    }
  }

  const transactions = await prisma.transactions.findMany({
    where: {
      userId: session?.session.userId,
      ...dateCondition,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return transactions.map((transaction) => ({
    ...transaction,
    date: transaction.date.toISOString().split('T')[0],
  }))
}

export async function createTransactions(transactionData: TransactionData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (!session) throw new Error('No session found')

  const user = await prisma.user.findUnique({
    where: { id: session.session.userId },
  })
  if (!user) throw new Error('User not found')

  const transaction = await prisma.transactions.create({
    data: {
      userId: session.session.userId,
      category: transactionData.category,
      amount: transactionData.amount,
      description: transactionData.description,
      date: transactionData.date,
    },
  })

  console.log('Transação', transaction)
  return transaction
}

export async function deleteTransactions(data: any) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const transaction = await prisma.transactions.delete({
    where: {
      id: data,
      userId: session?.session.userId,
    },
  })

  return transaction
}

export async function getTotalAmountsByCategory(
  dateFilter: DateFilter = 'total',
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  let dateCondition = {}

  if (dateFilter !== 'total') {
    const today = new Date()
    const filterDate = new Date()

    if (dateFilter === '3months') {
      filterDate.setMonth(today.getMonth() - 3)
    } else if (dateFilter === '30days') {
      filterDate.setDate(today.getDate() - 30)
    }

    dateCondition = {
      date: {
        gte: filterDate,
      },
    }
  }

  const transactions = await prisma.transactions.groupBy({
    by: ['category'],
    _sum: {
      amount: true,
    },
    where: {
      userId: session?.session.userId,
      ...dateCondition,
    },
  })

  return transactions
}
