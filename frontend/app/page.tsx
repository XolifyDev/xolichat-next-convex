"use client";

import { useAppStore } from "@/lib/stores/store";
import { useEffect } from "react";

export default function Home() {
  const { user } = useAppStore();

  useEffect(() => {
    console.log(user)
  }, [user])
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-24">
      <h1 className="text-4xl font-bold">Hello World!</h1>
    </main>
  )
}
