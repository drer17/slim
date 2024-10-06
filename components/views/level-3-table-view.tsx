/*
 * Level 3 Table Model View
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import PathToResource from "../core/other/path-to-resource";

export interface Level3TableViewProps {
  pathToResource: string[];
  title: string;
  items: CardProps[];
  menuOptions: { label: string; callback: () => any }[];
}

const Level3TableView: React.FC<Level3TableViewProps> = ({
  pathToResource,
  title,
  items,
  menuOptions,
}) => {
  const groupedByStarredAndType = items.reduce(
    (acc, item) => {
      const key = item.starred ? "starred" : "other";
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    },
    {} as Record<string, CardProps[]>,
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
        {Object.entries(groupedByStarredAndType).map(([key, item], idx) => (
          <div key={`Type${idx}`} className="mt-10">
            <div className="flex space-x-2 uppercase font-bold text-zinc-500">
              {key === "starred" && key}
            </div>
            <div className="grid gap-2 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 p-2">
              {item.map((card, idx) => (
                <Card {...card} condensed={true} key={`Card${idx}`}></Card>
              ))}
            </div>
          </div>
        ))}
        <div className="h-[100px]" />
      </ScrollArea>
    </div>
  );
};

export default Level3TableView;
