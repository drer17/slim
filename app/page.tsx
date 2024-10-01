"use client";

import Card from "@/components/core/card/card";
import Container from "@/components/core/container/container";
import { cardPlaceholderData } from "@/components/core/card/data";
import { containerPlaceholderData } from "@/components/core/container/data";

export default function Home() {
  return (
    <div className="space-y-9">
      <h1>SLIM</h1>
      <Card {...cardPlaceholderData} />
      <div className="w-[300px] h-[400px]">
        <Container {...containerPlaceholderData}>Hello</Container>
      </div>
    </div>
  );
}
