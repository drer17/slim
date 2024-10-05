"use client";

import ThemeToggle from "../theme/theme_toggle";
import { level2PlaceholderData } from "@/components/views/placeholder-data";
import Level2TableView from "@/components/views/level-2-table-view";

export default function Page() {
  return (
    <div className="space-y-9 w-full">
      <Level2TableView {...level2PlaceholderData} />
      <ThemeToggle />
    </div>
  );
}
