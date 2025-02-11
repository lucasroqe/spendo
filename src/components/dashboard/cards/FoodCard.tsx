import React from "react";
import { Pizza } from "lucide-react";
import { getTotalAmountsByCategory } from "@/lib/actions";

export default async function FoodCard() {
  const totalData = await getTotalAmountsByCategory();

  const totalAmount =
    totalData.find((t) => t.category === "food")?._sum.amount ?? 0;

  const formatted = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(totalAmount);

  return (
    <div className="relative flex items-center justify-between p-5 rounded-xl bg-red-600 text-white drop-shadow-lg">
      <div>
        <p className="text-2xl font-bold">{formatted}</p>
        <p className="text-sm opacity-80">Total spent</p>
      </div>

      <div className="bg-white bg-opacity-20 p-3 rounded-full">
        <Pizza size={28} />
      </div>
    </div>
  );
}
