"use client";

import Card from "@/components/core/card/card";
import Container from "@/components/core/container/container";
import { cardPlaceholderData } from "@/components/core/card/data";
import { containerPlaceholderData } from "@/components/core/container/data";
import { DataTable } from "@/components/core/data-table/data-table";
import { columns, rows } from "@/components/core/data-table/placeholder-data";
import ThemeToggle from "../theme/theme_toggle";

export default function Page() {
  return (
    <div className="space-y-9 w-full">
      <div className="h-4" />
      <Card {...cardPlaceholderData} />
      <div className="w-[300px] h-[400px]">
        <Container {...containerPlaceholderData}>Hello</Container>
      </div>
      <div className="w-full">
        <DataTable columns={columns} rows={rows} expandedContent={"hello"} />
      </div>
      <ThemeToggle />
    </div>
  );
}
