import TransportCard from "@/components/dashboard/cards/TransportCard";
import ShoppingCard from "@/components/dashboard/cards/ShoppingCard";
import OthersCard from "@/components/dashboard/cards/OthersCard";
import FoodCard from "@/components/dashboard/cards/FoodCard";
import EntertainmentCard from "@/components/dashboard/cards/EntertainmentCard";
import { BarCard } from "@/components/dashboard/cards/BarCard";
import { PizzaCard } from "@/components/dashboard/cards/PizzaCard";
import { LastCard } from "@/components/dashboard/cards/LastCard";
import { getUserLastTransactions, getUsersTransactions } from "@/lib/actions";

export default async function Page() {

  const lastTransactions = await getUserLastTransactions();
  
  const transactions = await getUsersTransactions();

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid gap-4 md:grid-cols-5">
        <TransportCard />
        <ShoppingCard />
        <FoodCard />
        <EntertainmentCard />
        <OthersCard />
      </div>
      <div className="grid gap-4 md:grid-cols-1">
        <BarCard data={transactions}/>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="aspect-video rounded-xl">
          <PizzaCard />
        </div>
        <div className="aspect-video rounded-xl">
          <LastCard data={lastTransactions} />
        </div>
      </div>
    </div>
  );
}
