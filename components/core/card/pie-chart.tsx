"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export interface PieChartCardProps {
  config: ChartConfig;
  axis: { dataKey: string; nameKey: string };
  data: Record<string, string | number>[];
  total: number;
}

export const PieChartCard: React.FC<PieChartCardProps> = ({
  config,
  axis,
  data,
  total,
}) => {
  if (!data) return null;
  return (
    <div className="h-64">
      <ChartContainer
        config={config}
        className="mx-auto aspect-square h-58 min-w-60"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={data}
            dataKey={axis?.dataKey || "month"}
            nameKey={axis?.nameKey || "month"}
            innerRadius={60}
            strokeWidth={5}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {total.toLocaleString()}
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  );
};
