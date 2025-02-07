"use client";

import { Button } from "@/components/ui/button";
import { ChartNoAxesColumnIncreasing, DollarSign } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative flex-grow bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
      <div
        className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTJlOGYwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]"
        style={{ opacity: 0.5 }}
      />
      <div className="container mx-auto px-4 relative z-10 py-24">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900">
            Manage your money with{" "}
            <span className="text-emerald-500 block mt-2">Spendo</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 mx-auto">
            Take control of your finances and start saving with our simple
            platform for success
          </p>
          <div className="mt-10">
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium text-lg px-8 py-6 h-auto">
              <Link href="/sign-up">Get started for free</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-6 mt-32">
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
              <DollarSign className="w-12 h-12 text-emerald-500" />
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                Manage expenses
              </h3>
              <p className="mt-2 text-gray-600">Set up your spending habits</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
              <ChartNoAxesColumnIncreasing className="w-12 h-12 text-emerald-500" />
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
  );
}
