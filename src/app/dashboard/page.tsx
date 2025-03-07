import TransportCard from '@/components/dashboard/cards/TransportCard'
import ShoppingCard from '@/components/dashboard/cards/ShoppingCard'
import OthersCard from '@/components/dashboard/cards/OthersCard'
import FoodCard from '@/components/dashboard/cards/FoodCard'
import EntertainmentCard from '@/components/dashboard/cards/EntertainmentCard'
import { BarCard } from '@/components/dashboard/cards/BarCard'
import { PizzaCard } from '@/components/dashboard/cards/PizzaCard'
import { LastCard } from '@/components/dashboard/cards/LastCard'
import { DateFilter } from '@/components/dashboard/DateFilter'
import {
  getTotalAmountsByCategory,
  getUserLastTransactions,
  getUsersTransactions,
} from '@/lib/actions'

type DateRange = 'total' | '3months' | '30days'

interface PageProps {
  searchParams: { filter?: string }
}

export default async function Page(props: PageProps) {
  let dateFilter: DateRange = 'total'

  const { filter } = await props.searchParams
  if (filter === '3months' || filter === '30days') {
    dateFilter = filter as DateRange
  }

  const lastTransactions = await getUserLastTransactions(dateFilter)
  const transactions = await getUsersTransactions(dateFilter)
  const totalTransactions = await getTotalAmountsByCategory(dateFilter)

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <DateFilter />

      <div className="grid gap-4 md:grid-cols-5">
        <TransportCard dateFilter={dateFilter} />
        <ShoppingCard dateFilter={dateFilter} />
        <FoodCard dateFilter={dateFilter} />
        <EntertainmentCard dateFilter={dateFilter} />
        <OthersCard dateFilter={dateFilter} />
      </div>

      <div className="grid gap-4 md:grid-cols-1">
        <BarCard data={transactions} dateFilter={dateFilter} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="aspect-video h-full rounded-xl">
          <PizzaCard data={totalTransactions} dateFilter={dateFilter} />
        </div>
        <div className="aspect-video h-full rounded-xl">
          <LastCard data={lastTransactions} dateFilter={dateFilter} />
        </div>
      </div>
    </div>
  )
}
