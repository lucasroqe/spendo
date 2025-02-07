"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CircleDollarSign } from "lucide-react";

export default function Header() {
  return (
    <header className="flex container mx-auto px-4 py-4 justify-between items-center bg-white border-b border-gray-100 ">
      <div>
        <Link
          href="/"
          className="flex flex-row items-center text-2xl font-bold gap-3"
        >
          <CircleDollarSign className="text-emerald-500" size={32} />
          <h2 className="font-semibold">Spendo</h2>
        </Link>
      </div>
      <div className="flex gap-3">
        <Button
          variant="outline"
          className="font-medium border-emerald-500 text-emerald-600 hover:bg-emerald-50"
        >
          <Link href="/sign-in">Sign in</Link>
        </Button>
        <Button className="font-medium bg-emerald-500 text-white hover:bg-emerald-600">
          <Link href="/sign-up">Get Started</Link>
        </Button>
      </div>
    </header>
  );
}
