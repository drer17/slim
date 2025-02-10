"use client";

import { Table } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { IconColumns3, IconDownload } from "@tabler/icons-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";
import { DataTableFilter } from "./data-table-filter";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  hideManageColumns?: boolean;
  hideFilterColumns?: boolean;
  hideExportOptions?: boolean;
}

export function DataTableToolbar<TData>({
  table,
  hideManageColumns,
  hideFilterColumns,
  hideExportOptions,
}: DataTableToolbarProps<TData>) {
  const manageColumnContent = (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger>
          <DropdownMenuTrigger asChild>
            <div className="inline-flex p-1 px-2 dark:hover:bg-zinc-900 rounded items-center space-x-2">
              <IconColumns3 className="h-4 w-4" />
              <span className="text-sm uppercase font-medium">Columns</span>
            </div>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Select Columns</p>
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="end">
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const exportContent = (
    <Tooltip>
      <TooltipTrigger>
        <div className="inline-flex p-1 px-2 dark:hover:bg-zinc-900 rounded items-center space-x-2">
          <IconDownload className="h-4 w-4" />
        </div>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>Export</p>
      </TooltipContent>
    </Tooltip>
  );
  return (
    <div className="grid gap-2 grid-cols-10 py-2 items-center w-full">
      <div
        className={cn("flex items-center w-full", {
          "col-span-3":
            !hideManageColumns || !hideFilterColumns || !hideExportOptions,
          "col-span-10":
            hideManageColumns && hideFilterColumns && hideExportOptions,
        })}
      >
        <Input
          value={table.getState().globalFilter || ""}
          onChange={(e) => table.setGlobalFilter(String(e.target.value))}
          placeholder="Search..."
          className="h-8"
        />
      </div>
      {!hideManageColumns || !hideFilterColumns ? (
        <div className="col-span-6 flex">
          {!hideManageColumns && manageColumnContent}
          {!hideFilterColumns && <DataTableFilter table={table} />}
        </div>
      ) : null}
      {!hideExportOptions && (
        <div className="col-span-1 text-right">{exportContent}</div>
      )}
    </div>
  );
}
