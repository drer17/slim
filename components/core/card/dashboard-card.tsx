"use client";

import { LineChartCardProps } from "./line-chart";
import { PieChartCardProps } from "./pie-chart";
import { DisplayCardProps } from "./display";
import { cn } from "@/lib/utils";
import { getIcon } from "@/components/global/icons";

export interface DashboardCardProps {
  type: "card" | "pie" | "line" | "pad";
  colspan: number;
  label?: string;
  icon?: string;
  data?: LineChartCardProps | PieChartCardProps | DisplayCardProps;
}

export const DashboardCard: React.FC<
  DashboardCardProps & { children: React.ReactNode }
> = ({ label, icon, colspan, children }) => {
  return (
    <div
      className={cn(
        "rounded-md backdrop-blur border border-foreground/30 bg-card p-3 relative",
      )}
      style={{ gridColumn: `span ${colspan}` }}
    >
      <div className="flex gap-3 items-center">
        {getIcon(icon)}
        <p className="font-light text-2xl">{label}</p>
      </div>
      {children}
    </div>
  );
};
