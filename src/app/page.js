"use client"

import React, { useEffect, useState } from "react";
import Market from "@/components/market";
import Book from "@/components/book";

export default function Home() {
  const [currencyId, setCurrencyId] = useState("BTC-USD");
  const [time, setTime] = useState("1m")
  return (
    <main>
      <div>
        <Market currencyId={currencyId} time={time}></Market>
        <Book currencyId={currencyId} time={time}></Book>
      </div>
    </main>
  )
}
