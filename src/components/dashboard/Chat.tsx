'use client'

import { useChat } from '@ai-sdk/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { LoaderCircle } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { MemoizedMarkdown } from '@/components/memoized-markdown'

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, status, stop } =
    useChat({
      api: '/api/chat',
    })

  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex max-h-screen items-center justify-center">
      <Card className="w-full max-w-4xl rounded-xl border shadow-lg">
        <CardHeader className="flex items-center justify-center rounded-t-xl bg-emerald-600 p-4 text-white">
          <CardTitle className="text-lg font-semibold">
            Spendo AI Assistant
          </CardTitle>
        </CardHeader>

        <CardContent className="h-[75vh] overflow-y-auto bg-card p-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`mb-3 flex ${
                m.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <span
                className={`inline-block max-w-[75%] rounded-lg p-3 shadow ${
                  m.role === 'user' ? 'bg-emerald-500' : 'bg-secondary'
                }`}
              >
                <div className="prose text-base/8 tracking-wide dark:prose-invert">
                  <MemoizedMarkdown id={m.id} content={m.content} />
                </div>
              </span>
            </div>
          ))}

          {status === 'submitted' || status === 'streaming' ? (
            <div className="mt-2 flex items-center space-x-2">
              <LoaderCircle className="h-5 w-5 animate-spin text-emerald-500" />
              <Button
                onClick={stop}
                variant="destructive"
                size="sm"
                className="ml-2"
              >
                Stop
              </Button>
            </div>
          ) : null}

          <div ref={messagesEndRef} />
        </CardContent>

        <CardFooter className="rounded-b-xl bg-card p-4">
          <form onSubmit={handleSubmit} className="flex w-full space-x-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask me anything..."
              className="flex-grow border-gray-300"
            />
            <Button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-600"
            >
              Send
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}
