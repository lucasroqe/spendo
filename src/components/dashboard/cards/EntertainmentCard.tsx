import React from 'react'
import { Clapperboard } from 'lucide-react'
import { getTotalAmountsByCategory } from '@/lib/actions'

export default async function EntertainmentCard() {
  const totalData = await getTotalAmountsByCategory()

  const totalAmount =
    totalData.find((t) => t.category === 'entertainment')?._sum.amount ?? 0

  const formatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(totalAmount)

  return (
    <div className="relative flex items-center justify-between rounded-xl bg-green-500 p-5 text-white drop-shadow-lg">
      <div>
        <p className="text-2xl font-bold">{formatted}</p>
        <p className="text-sm">Total spent</p>
      </div>

      <div className="rounded-full bg-white bg-opacity-20 p-3">
        <Clapperboard size={28} />
      </div>
    </div>
  )
}
