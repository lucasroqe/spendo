"use server";
import { Category } from "@prisma/client";
import { prisma } from "./prisma";
import { headers } from "next/headers";
import { auth } from './auth'

interface TransactionData {
  category: Category;
  amount: number;
  date: Date;
  description?: string;
}

export async function getUsersTransactions() {

  const session = await auth.api.getSession({
    headers: await headers()
  });

  const transactions = await prisma.transactions.findMany({
    where: {
      userId: session?.session.userId
    },
    orderBy:{
      date: 'desc'
    }
  });

  return transactions.map((transaction) => ({
    ...transaction,
    date: transaction.date.toISOString().split("T")[0],
  }));
}

export async function createTransactions(transactionData: TransactionData) {
  
  const session = await auth.api.getSession({
    headers: await headers()
  });


  if (!session) {
    throw new Error("No session found");
  }

  console.log('Sessão', session);

  const user = await prisma.user.findUnique({
    where: { id: session.session.userId },
  });
  
  if (!user) {
    throw new Error("User not found");
  }

  const transaction = await prisma.transactions.create({
    data: {
      userId: session.session.userId,
      category: transactionData.category,
      amount: transactionData.amount,
      description: transactionData.description,
      date: transactionData.date,
    }
  });

  console.log('Transicao', transaction);
  

  return transaction;
}

export async function deleteTransactions(data: any) {
  
  const session = await auth.api.getSession({
    headers: await headers()
  });

  const transaction = await prisma.transactions.delete({
    where:{
      id: data
    }
  })

  return transaction
}