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
import PathToResource, { PathSlug } from "../core/other/path-to-resource";
import ViewOptions, { MenuOption } from "../core/other/view-options";
import { Button } from "../ui/button";
import { usePortfolioContext } from "@/app/portfolio/portfolio-provider";
import { FormDialog } from "../forms/types";
import { IconPlus } from "@tabler/icons-react";
import { getIcon } from "../global/icons";
import { Slug } from "@/lib/definitions/response";

export interface Level2TableViewProps {
  pathToResource: PathSlug[];
  title: string;
  items: (CardProps & { type: { label: string; icon?: string } })[];
  menuOptions: MenuOption;
  formDialog: FormDialog;
  modelKey: string;
}

const Level2TableView: React.FC<Level2TableViewProps & { slug: Slug }> = ({
  pathToResource,
  title,
  items,
  slug,
  menuOptions,
  formDialog,
}) => {
  const { setOpenForm, setFormKwargs, portfolioState } = usePortfolioContext();

  const groupedByStarredAndType = items.reduce(
    (acc, item) => {
      const key = item.starred ? "starred" : item.type.label;
      if (!acc[key])
        acc[key] = { type: { ...item.type, label: key }, cards: [] };
      if (key === "starred") acc.starred.type.icon = "starred";
      acc[key].cards.push(item);
      return acc;
    },
    {} as Record<
      string,
      {
        type: { label: string; icon?: string };
        cards: (CardProps & {
          type: { label: string; icon?: string };
        })[];
      }
    >,
  );

  // Sort the keys by your preferred order
  const sortedGroupedByStarredAndType = Object.keys(groupedByStarredAndType)
    .sort((a, b) => {
      // Custom sorting logic here:
      // For example, always put "starred" first
      if (a === "starred") return -1;
      if (b === "starred") return 1;
      // Sort the rest alphabetically (or by some other condition)
      return a.localeCompare(b);
    })
    .reduce(
      (acc, key) => {
        acc[key] = groupedByStarredAndType[key];
        return acc;
      },
      {} as typeof groupedByStarredAndType,
    );

  const availableMenuOptions = {};

  return (
    <div className="w-full flex-col">
      <PathToResource path={pathToResource} className="ml-2" />
      <div className="h-2" />
      <div className="flex w-full justify-between p-2">
        <h1 className="font-bold text-3xl">{title}</h1>
        <div className="flex gap-2 items-center">
          <Button
            className="h-8"
            variant="outline"
            onClick={() => {
              setFormKwargs({ slug });
              setOpenForm(formDialog);
            }}
          >
            <IconPlus className="w-5 h-5" /> Create
          </Button>

          <ViewOptions
            menuOptions={menuOptions}
            availableMenuOptions={availableMenuOptions}
          />
        </div>
      </div>
      <ScrollArea className="w-full" style={{ height: `calc(100vh - 105px)` }}>
        {Object.values(sortedGroupedByStarredAndType).map((item, idx) => (
          <div key={`Type${idx}`} className="">
            {idx > 0 && <div className="h-4" />}
            <div className="flex gap-3 mb-2 ml-2 items-center text-muted-foreground ">
              {getIcon(item.type.icon)}
              <h3 className="uppercase">{item.type.label}</h3>
            </div>
            <div className="flex gap-2 p-2 flex-wrap">
              {item.cards.map((card, idx) => (
                <Card
                  {...card}
                  key={`Card${idx}`}
                  presetColors={portfolioState.colorPresets}
                />
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
