"use client";

/*
 * Level 2 Table Model View
 *
 * Author: Andre Repanich
 * Date: 05-10-24
 *
 * Component Requirements
 * [x]- View as per ui design doc
 */

import Card, { CardProps } from "../core/card/card";
import { ScrollArea } from "../ui/scroll-area";
import PathToResource from "../core/other/path-to-resource";
import { useToast } from "@/hooks/use-toast";
import ViewOptions from "../core/other/view-options";
import { usePortfolioContext } from "@/app/portfolio/portfolio-provider";
import React from "react";
import { CommandAction } from "../global/header/command-menu";

export interface Level2TableViewProps {
  pathToResource: string[];
  title: string;
  items: (CardProps & { type: { label: string; icon?: React.ReactNode } })[];
  menuOptions: string[];
  commandActions: string[];
}

const Level2TableView: React.FC<Level2TableViewProps> = ({
  pathToResource,
  title,
  items,
  menuOptions,
  commandActions,
}) => {
  const { commandState } = usePortfolioContext();
  const { toast } = useToast();

  const groupedByStarredAndType = items.reduce(
    (acc, item) => {
      const key = item.starred ? "starred" : item.type.label;
      if (!acc[key]) acc[key] = { type: item.type, cards: [] };
      acc[key].cards.push(item);
      return acc;
    },
    {} as Record<
      string,
      {
        type: { label: string; icon?: React.ReactNode };
        cards: (CardProps & {
          type: { label: string; icon?: React.ReactNode };
        })[];
      }
    >,
  );

  const availableCommandActions: CommandAction[] = [
    { id: "addNewAsset", label: "Add New Asset" },
    { id: "addNewLiability", label: "Add New Liability" },
    { id: "addNewType", label: "Add New Type" },
  ];

  React.useEffect(() => {
    commandState.setCommandActions(
      availableCommandActions.filter((command) =>
        commandActions.includes(command.id),
      ),
    );
    commandState.setFilterOn(false);
  }, [commandActions]);

  return (
    <div className="w-full flex-col">
      <PathToResource path={pathToResource} className="ml-2" />
      <div className="h-2" />
      <div className="flex w-full justify-between p-2">
        <h1 className="font-bold text-3xl">{title}</h1>
        <div>
          <ViewOptions menuOptions={menuOptions} availableMenuOptions={{}} />
        </div>
      </div>
      <div className="mt-7"></div>
      <ScrollArea className="w-full">
        {Object.values(groupedByStarredAndType).map((item, idx) => (
          <div key={`Type${idx}`} className="">
            {idx > 0 && <div className="h-10" />}
            <div className="flex uppercase font-bold text-zinc-500 px-2 mb-2">
              {item.type.icon}
              <div className="w-1" />
              {item.type.label}
            </div>
            <div className="grid gap-2 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 p-2">
              {item.cards.map((card, idx) => (
                <Card {...card} key={`Card${idx}`}></Card>
              ))}
            </div>
          </div>
        ))}
        <div className="h-[100px]" />
      </ScrollArea>
    </div>
  );
};

export default Level2TableView;
