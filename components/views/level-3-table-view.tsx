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

import { IconPlus } from "@tabler/icons-react";
import { Button } from "../ui/button";
import PathToResource, { PathSlug } from "../core/other/path-to-resource";
import { FormDialog } from "../forms/types";
import { usePortfolioContext } from "@/app/portfolio/portfolio-provider";
import { DataTable } from "../core/data-table/data-table";
import {
  modelColumnDefs,
  modelColumnVisibilities,
} from "../column-defs/model-column-defs";
import { Slug } from "@/lib/definitions/response";
import ViewOptions, { MenuOption } from "../core/other/view-options";

export interface Level3TableViewProps {
  pathToResource: PathSlug[];
  title: string;
  modelKey: string;
  rows: any[];
  menuOptions: MenuOption;
  formDialog: FormDialog;
}

const Level3TableView: React.FC<Level3TableViewProps & { slug: Slug }> = ({
  pathToResource,
  title,
  rows,
  slug,
  columns,
  menuOptions,
  formDialog,
  modelKey,
}) => {
  const { setOpenForm, setFormKwargs } = usePortfolioContext();

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
            onClick={() => {
              setFormKwargs({ slug });
              setOpenForm(formDialog);
            }}
          >
            <IconPlus className="w-5 h-5" /> Create
          </Button>

          <ViewOptions menuOptions={menuOptions} availableMenuOptions={{}} />
        </div>
      </div>
      <DataTable
        rows={rows}
        columns={modelColumnDefs[modelKey]}
        initColumnVisibility={modelColumnVisibilities[modelKey]}
      />
    </div>
  );
};

export default Level3TableView;
