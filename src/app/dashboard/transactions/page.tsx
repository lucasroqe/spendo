import { DataTableDemo } from '@/components/dashboard/DataTable'
import { getUsersTransactions } from '@/lib/actions'

export default async function Transactions() {
  const transactions = await getUsersTransactions()

  return <DataTableDemo data={transactions} />
}
