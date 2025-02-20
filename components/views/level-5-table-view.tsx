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

import { IconDatabaseImport, IconPlus } from "@tabler/icons-react";
import { Button } from "../ui/button";
import PathToResource, { PathSlug } from "../core/other/path-to-resource";
import { FormDialog } from "../forms/types";
import { usePortfolioContext } from "@/app/portfolio/portfolio-provider";
import { DataTable } from "../core/data-table/data-table";
import {
  modelColumnDefs,
  modelColumnFilters,
  modelColumnVisibilities,
} from "../column-defs/model-column-defs";
import { Slug } from "@/lib/definitions/response";
import { importData } from "@/lib/actions/create";
import React from "react";
import { parseCSVToJSON } from "@/lib/utilities/csv";
import ViewOptions, { MenuOption } from "../core/other/view-options";

export interface Level5TableViewProps {
  pathToResource: PathSlug[];
  title: string;
  modelKey: string;
  rows: any[];
  menuOptions: MenuOption;
  formDialog: FormDialog;
}

const Level5TableView: React.FC<Level5TableViewProps & { slug: Slug }> = ({
  pathToResource,
  title,
  slug,
  rows,
  menuOptions,
  formDialog,
  modelKey,
}) => {
  const { setOpenForm, setFormKwargs } = usePortfolioContext();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImport = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const csvText = reader.result;
        const parsedData = parseCSVToJSON(csvText as string);
        console.log(parsedData);
        importData(parsedData, slug);
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
          <input
            ref={fileInputRef}
            id="file-upload-handle"
            accept={".csv"}
            type="file"
            onChange={(e) => handleImport(e)}
            className="hidden"
          />
          <Button
            className="h-8"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
          >
            <IconDatabaseImport className="w-5 h-5" /> Import
          </Button>

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
        initFilterState={modelColumnFilters[modelKey]}
        heightOffset="220px"
      />
    </div>
  );
};

export default Level5TableView;
