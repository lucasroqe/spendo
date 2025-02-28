'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CircleDollarSign } from 'lucide-react'

export default function Header() {
  return (
    <header className="flex w-full items-center justify-between border-b border-gray-100 bg-white px-4 py-4">
      <div>
        <Link
          href="/"
          className="flex flex-row items-center gap-3 text-2xl font-bold"
        >
          <CircleDollarSign className="text-emerald-500" size={32} />
          <h2 className="font-semibold">Spendo</h2>
        </Link>
      </div>
      <div className="flex gap-3">
        <Button className="border-emerald-500 bg-emerald-200 font-medium text-emerald-600 hover:bg-emerald-100">
          <Link href="/sign-in">Sign in</Link>
        </Button>
        <Button className="bg-emerald-500 font-medium text-white hover:bg-emerald-600">
          <Link href="/sign-up">Get Started</Link>
        </Button>
      </div>
    </header>
  )
}
