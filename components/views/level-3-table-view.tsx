"use client";

/*
 * Level 3 Table Model View
 *
 * Author: Andre Repanich
 * Date: 05-10-24
 *
 * Component Requirements
 * [x]- View as per ui design doc
 */

import { IconDots, IconPlus } from "@tabler/icons-react";
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
import { FormDialog } from "../forms/types";
import { usePortfolioContext } from "@/app/portfolio/portfolio-provider";
import { DataTable } from "../core/data-table/data-table";
import { modelColumnDefs } from "../column-defs/model-column-defs";

export interface Level3TableViewProps {
  pathToResource: string[];
  title: string;
  columnDefinitionKey: string;
  rows: any[];
  menuOptions: { label: string; callback: () => any }[];
  formDialog: FormDialog;
}

const Level3TableView: React.FC<Level3TableViewProps> = ({
  pathToResource,
  title,
  rows,
  columns,
  menuOptions,
  formDialog,
  columnDefinitionKey,
}) => {
  const { setOpenForm } = usePortfolioContext();

  return (
    <div className="w-full flex-col">
      <PathToResource path={pathToResource} className="ml-2" />
      <div className="h-2" />
      <div className="flex w-full justify-between p-2">
        <h1 className="font-bold">{title}</h1>
        <div className="gap-2 flex">
          <Button
            className="h-8"
            variant="outline"
            onClick={() => setOpenForm(formDialog)}
          >
            <IconPlus className="w-5 h-5" /> Create
          </Button>

          {menuOptions && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
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
      <DataTable columns={modelColumnDefs[columnDefinitionKey]} rows={rows} />
    </div>
  );
};

export default Level3TableView;
