import { DataTableDemo } from "@/components/dashboard/data-table";
import { Button } from "@/components/ui/button";
import { getUsersTransactions } from "@/lib/actions";
import { authClient } from "@/lib/auth-client";

export default async function Transactions() {
  const transactions = await getUsersTransactions();


  return <DataTableDemo data={transactions} />;
}
