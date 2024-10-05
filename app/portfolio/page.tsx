"use client";

import ThemeToggle from "../theme/theme_toggle";
import { level2RowPlaceholderData } from "@/components/views/placeholder-data";
import Level2RowView from "@/components/views/level-2-row-view";

export default function Page() {
  return (
    <div className="space-y-9 w-full">
      <Level2RowView {...level2RowPlaceholderData} />
      <ThemeToggle />
    </div>
  );
}
