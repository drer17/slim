"use client";

import React, { useEffect } from "react";
import { DashboardCard, DashboardCardProps } from "../core/card/dashboard-card";
import { DisplayCard, DisplayCardProps } from "../core/card/display";
import { LineChartCard, LineChartCardProps } from "../core/card/line-chart";
import { PieChartCard, PieChartCardProps } from "../core/card/pie-chart";
import { DatePicker } from "../ui/date-picker";
import { ScrollArea } from "../ui/scroll-area";
import ThemeToggle from "@/app/theme/theme_toggle";
import { getDashboardData } from "@/lib/actions/get";
import { getFinancialYearStart } from "@/lib/utilities/date";
import { Label } from "../ui/label";

export interface DashboardViewProps {
  cards: DashboardCardProps[];
}

const Dashboard: React.FC<DashboardViewProps> = () => {
  const [cards, setCards] = React.useState<DashboardCardProps[]>([]);
  const [range, setRange] = React.useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({ from: getFinancialYearStart(), to: new Date() });

  useEffect(() => {
    const getCards = async () => {
      const newCards = await getDashboardData(
        ["portfolio"],
        range.from?.toISOString() || getFinancialYearStart().toISOString(),
        range.to?.toISOString() || new Date().toISOString(),
      );
      setCards(newCards.cards);
    };
    getCards();
  }, [range.to, range.from]);

  console.log(cards);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <Label>From</Label>
        <DatePicker
          date={range.from}
          setDate={(date) => setRange((prev) => ({ ...prev, from: date }))}
          placeholder="Select Date From"
        />
        <Label>To</Label>
        <DatePicker
          date={range.to}
          setDate={(date) => setRange((prev) => ({ ...prev, to: date }))}
          placeholder="Select Date To"
        />
      </div>
      <ScrollArea style={{ maxHeight: `calc(100vh)` }}>
        <div className="grid grid-cols-12 gap-4 w-full h-full">
          {cards?.map((card) => {
            let cardComponent;

            switch (card.type) {
              case "card":
                cardComponent = (
                  <DisplayCard {...(card.data as DisplayCardProps)} />
                );
                break;
              case "pie":
                cardComponent = (
                  <PieChartCard {...(card.data as PieChartCardProps)} />
                );
                break;
              case "line":
                cardComponent = (
                  <LineChartCard {...(card.data as LineChartCardProps)} />
                );
                break;
              case "pad":
                return (
                  <div
                    style={{
                      gridColumn: `span ${card.colspan}`,
                    }}
                  />
                );
              default:
                cardComponent = null;
            }

            return (
              <DashboardCard key={card.label} {...card}>
                {cardComponent}
              </DashboardCard>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Dashboard;
