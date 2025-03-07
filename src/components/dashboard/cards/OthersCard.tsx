import React from 'react'
import { Grip } from 'lucide-react'
import { getTotalAmountsByCategory } from '@/lib/actions'

interface OthersCardProps {
  dateFilter?: 'total' | '3months' | '30days'
}

export default async function OthersCard({
  dateFilter = 'total',
}: OthersCardProps) {
  const totalData = await getTotalAmountsByCategory(dateFilter)

  const totalAmount =
    totalData.find((t) => t.category === 'other')?._sum.amount ?? 0

  const formatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(totalAmount)

  let descriptionText = 'Total spent'
  if (dateFilter === '3months') {
    descriptionText = 'Last 3 months'
  } else if (dateFilter === '30days') {
    descriptionText = 'Last 30 days'
  }

  return (
    <div className="relative flex items-center justify-between rounded-xl bg-slate-500 p-5 text-white drop-shadow-lg">
      <div>
        <p className="text-2xl font-bold">{formatted}</p>
        <p className="text-sm opacity-80">{descriptionText}</p>
      </div>

      <div className="rounded-full bg-white bg-opacity-20 p-3">
        <Grip size={28} />
      </div>
    </div>
  )
}
