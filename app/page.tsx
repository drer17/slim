"use client";

import Card from "@/components/core/card/card";
import { cardPlaceholderData } from "@/components/core/card/data";

export default function Home() {
  return (
    <div className="space-y-9">
      <h1>SLIM</h1>
      <Card {...cardPlaceholderData} />
    </div>
  );
}
