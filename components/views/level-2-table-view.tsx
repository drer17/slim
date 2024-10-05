/*
 * Level 2 Table Model View
 *
 * Author: Andre Repanich
 * Date: 05-10-24
 *
 * Component Requirements
 * [x]- View as per ui design doc
 */

import { IconDots } from "@tabler/icons-react";
import Card, { CardProps } from "../core/card/card";
import { ScrollArea } from "../ui/scroll-area";
import PathToResource from "./path-to-resource";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";

export interface Level2TableViewProps {
  pathToResource: string[];
  title: string;
  items: (CardProps & { type: { label: string; icon?: React.ReactNode } })[];
  menuOptions: { label: string; callback: () => any }[];
}

const Level2TableView: React.FC<Level2TableViewProps> = ({
  pathToResource,
  title,
  items,
  menuOptions,
}) => {
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

  return (
    <div className="w-full flex-col">
      <PathToResource path={pathToResource} className="ml-2" />
      <div className="h-2" />
      <div className="flex w-full justify-between p-2">
        <h1 className="font-bold text-3xl">{title}</h1>
        <div>
          {menuOptions && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="secondary" size="icon" className="h-8">
                  <IconDots />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{title} Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {menuOptions.map((option, idx) => (
                  <DropdownMenuItem
                    key={`Menu${idx}`}
                    onClick={() => option.callback}
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
      <ScrollArea className="w-full">
        {Object.values(groupedByStarredAndType).map((item, idx) => (
          <div key={`Type${idx}`} className="mt-10">
            <div className="flex space-x-2 uppercase font-bold text-zinc-500">
              {item.type.icon}
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
