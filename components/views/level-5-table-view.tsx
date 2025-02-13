"use client";

/*
 * Level 5 Table Model View
 *
 * Author: Andre Repanich
 * Date: 13-02-25
 *
 * Component Requirements
 * [x]- View as per ui design doc
 */

import { IconDatabaseImport, IconDots, IconPlus } from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import PathToResource, { PathSlug } from "../core/other/path-to-resource";
import { FormDialog } from "../forms/types";
import { usePortfolioContext } from "@/app/portfolio/portfolio-provider";
import { DataTable } from "../core/data-table/data-table";
import {
  modelColumnDefs,
  modelColumnVisibilities,
} from "../column-defs/model-column-defs";

export interface Level5TableViewProps {
  pathToResource: PathSlug[];
  title: string;
  columnDefinitionKey: string;
  rows: any[];
  menuOptions: { label: string; callback: () => any }[];
  formDialog: FormDialog;
}

const Level5TableView: React.FC<Level5TableViewProps> = ({
  pathToResource,
  title,
  rows,
  menuOptions,
  formDialog,
  columnDefinitionKey,
}) => {
  const { setOpenForm } = usePortfolioContext();

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const csvText = reader.result;
        const parsedData = parseCSVToJSON(csvText);
      };
      reader.readAsText(file);
    }
  };

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
            <IconDatabaseImport className="w-5 h-5" /> Import
          </Button>

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
      <DataTable
        rows={rows}
        columns={modelColumnDefs[columnDefinitionKey]}
        initColumnVisibility={modelColumnVisibilities[columnDefinitionKey]}
      />
    </div>
  );
};

export default Level5TableView;
