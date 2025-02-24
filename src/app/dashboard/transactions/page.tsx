import { DataTableDemo } from '@/components/dashboard/data-table'
import { getUsersTransactions } from '@/lib/actions'

export default async function Transactions() {
  const transactions = await getUsersTransactions()

  return <DataTableDemo data={transactions} />
}
