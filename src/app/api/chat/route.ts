import { initialAiMessage } from '@/lib/ai-data'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { streamText } from 'ai'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
})

// export const runtime = 'edge'

const systemMessage = {
  role: 'system',

  content: initialAiMessage.content,
}

export async function POST(req: Request) {
  const { messages } = await req.json()

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const userExpenses = await prisma.transactions.findMany({
    where: {
      userId: session?.session.userId,
    },
  })

  const totalSum = userExpenses.reduce(
    (acc, transaction) => acc + transaction.amount,

    0,
  )

  console.log(totalSum)

  const fullMessages = [
    systemMessage,

    ...messages,

    {
      role: 'user',

      content: JSON.stringify({ transactions: userExpenses, totalSum }),
    },
  ]

  const result = streamText({
    model: google('gemini-2.0-flash'),

    messages: fullMessages,

    temperature: 0.15,
  })

  return result.toDataStreamResponse()
}
