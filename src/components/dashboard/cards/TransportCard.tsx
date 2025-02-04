import React from "react";

import { Car, ArrowUp } from "lucide-react";

export default function TransportCard() {
  return (
    <div className="relative flex items-center justify-between p-5 rounded-xl bg-blue-500 text-white drop-shadow-lg">
      <div>
        <p className="text-2xl font-bold">14,245</p>
        <p className="text-sm opacity-80">Total Sales</p>
        <div className="flex items-center text-xs mt-1 opacity-80">
          <ArrowUp size={12} className="mr-1" />
          <span>16% Last Month</span>
        </div>
      </div>

      <div className="bg-white bg-opacity-20 p-3 rounded-full">
        <Car size={28} />
      </div>
    </div>
  );
}
