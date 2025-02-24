'use client'

import { Button } from '@/components/ui/button'
import { ChartNoAxesColumnIncreasing, DollarSign } from 'lucide-react'
import Link from 'next/link'

export default function Hero() {
  return (
    <div className="relative flex-grow bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
      <div
        className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTJlOGYwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]"
        style={{ opacity: 0.5 }}
      />
      <div className="container relative z-10 mx-auto px-4 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold text-gray-900">
            Manage your money with{' '}
            <span className="mt-2 block text-emerald-500">Spendo</span>
          </h1>
          <p className="mx-auto mt-6 text-lg text-gray-600">
            Take control of your finances and start saving with our simple
            platform for success
          </p>
          <div className="mt-10">
            <Button className="h-auto bg-emerald-500 px-8 py-6 text-lg font-medium text-white hover:bg-emerald-600">
              <Link href="/sign-up">Get started for free</Link>
            </Button>
          </div>
          <div className="mt-32 grid grid-cols-2 gap-6">
            <div className="flex flex-col items-center rounded-lg bg-white p-6 shadow-md">
              <DollarSign className="h-12 w-12 text-emerald-500" />
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                Manage expenses
              </h3>
              <p className="mt-2 text-gray-600">Set up your spending habits</p>
            </div>
            <div className="flex flex-col items-center rounded-lg bg-white p-6 shadow-md">
              <ChartNoAxesColumnIncreasing className="h-12 w-12 text-emerald-500" />
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                Track costs
              </h3>
              <p className="mt-2 text-gray-600">
                Monitor your financial spending
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
