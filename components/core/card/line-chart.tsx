"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export interface LineChartCardProps {
  config: ChartConfig;
  axis: { dataKey: string; lineKey: string };
  data: Record<string, string | number>[];
}

export const LineChartCard: React.FC<LineChartCardProps> = ({
  config,
  axis,
  data,
}) => {
  if (!data) return null;
  return (
    <div className="h-64 relative">
      <ChartContainer
        config={config}
        className="w-full max-h-56 absolute bottom-1"
      >
        <LineChart
          accessibilityLayer
          data={data}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey={axis.dataKey}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Line
            dataKey={axis.lineKey}
            type="natural"
            stroke="var(--color-desktop)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
};
