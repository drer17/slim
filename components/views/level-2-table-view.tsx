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

import { IconDots, IconPlus } from "@tabler/icons-react";
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
import PathToResource from "../core/other/path-to-resource";
import { ToastProps } from "../ui/toast";
import { useToast } from "@/hooks/use-toast";
import { archive } from "@/lib/actions/update";
import ViewOptions from "../core/other/view-options";

export interface Level2TableViewProps {
  pathToResource: string[];
  title: string;
  slug: string[];
  items: (CardProps & { type: { label: string; icon?: React.ReactNode } })[];
  menuOptions: string[];
}

const Level2TableView: React.FC<Level2TableViewProps> = ({
  pathToResource,
  title,
  slug,
  items,
  menuOptions,
}) => {
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

  const availableMenuOptions = {
    archive: {
      icon: <IconPlus className="text-red-500 mr-2 w-4 h-4" />,
      callable: async () => {
        const res = await archive(slug);
        if (res) toast(res as ToastProps);
      },
    },
  };

  return (
    <div className="w-full flex-col">
      <PathToResource path={pathToResource} className="ml-2" />
      <div className="h-2" />
      <div className="flex w-full justify-between p-2">
        <h1 className="font-bold text-3xl">{title}</h1>
        <div>
          <ViewOptions
            menuOptions={menuOptions}
            availableMenuOptions={availableMenuOptions}
          />
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
