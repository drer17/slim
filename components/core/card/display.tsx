"use client";

import { cn } from "@/lib/utils";

export interface DisplayCardProps {
  primary: string;
  secondary?: string;
  color?: "red" | "green";
}

export const DisplayCard: React.FC<DisplayCardProps> = ({
  primary,
  secondary,
  color,
}) => {
  return (
    <div className="h-20 relative min-w-48 flex-grow flex-shrink">
      <div className="flex flex-col gap-3 absolute bottom-2 right-0 items-end">
        <p className="font-mono text-muted-foreground">{secondary}</p>
        <div
          className={cn(
            "px-2 bg-background/80 font-mono text-2xl rounded-lg shadow",
            color === "red"
              ? "text-rose-500"
              : color === "green"
                ? "text-emerald-500"
                : "",
          )}
        >
          {primary}
        </div>
      </div>
    </div>
  );
};
