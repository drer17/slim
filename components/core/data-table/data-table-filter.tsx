import React from "react";
import { Table, Column } from "@tanstack/react-table"; // Ensure you have proper imports from TanStack
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { IconCheck, IconFilter, IconX } from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableFilter<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const [filterValue, setFilterValue] = React.useState<string>("");
  const [selectedColumn, setSelectedColumn] = React.useState<string>("");

  const handleApplyFilter = () => {
    if (selectedColumn && filterValue) {
      const column = table.getColumn(selectedColumn);
      if (
        column?.columnDef.meta?.type === "number" &&
        isNaN(Number(filterValue))
      ) {
        alert("Please enter a valid number.");
        return;
      }
      table.getColumn(selectedColumn)?.setFilterValue(filterValue);
    }
  };

  const getFilterInput = (column: Column<TData>, enabled: boolean) => {
    if (!enabled) return <Input disabled={true} />;
    const columnType = column.columnDef.meta?.type;
    const commonProperties = {
      className: "border-0",
      value: filterValue,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setFilterValue(e.target.value),
      onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          handleApplyFilter();
        }
      },
    };

    if (columnType === "number") {
      return (
        <Input type="number" {...commonProperties} placeholder="Enter number" />
      );
    } else if (columnType === "date") {
      return (
        <Input type="date" {...commonProperties} placeholder="Enter date" />
      );
    }
    return <Input type="text" {...commonProperties} placeholder="Value" />;
  };

  return (
    <div className="flex space-x-2">
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger>
            <DropdownMenuTrigger asChild>
              <div className="inline-flex p-1 px-2 dark:hover:bg-zinc-900 rounded items-center space-x-2">
                <IconFilter className="h-4 w-4" />
                <span className="text-sm uppercase font-medium">Filter</span>
              </div>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Filter Columns</p>
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent align="end">
          <div className="flex flex-col rounded-md shadow-md">
            <div className="flex space-x-2 items-center">
              <Select
                defaultValue={selectedColumn}
                onValueChange={(value) => setSelectedColumn(value)}
              >
                <SelectTrigger className="border-0 capitalize">
                  <SelectValue placeholder="Column" />
                </SelectTrigger>
                <SelectContent>
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanFilter())
                    .map((column) => (
                      <SelectItem
                        key={column.id}
                        value={column.id}
                        className="capitalize"
                      >
                        {column.id}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              {getFilterInput(
                table.getColumn(selectedColumn) as Column<TData, unknown>,
                selectedColumn ? true : false,
              )}
              <Button onClick={handleApplyFilter} variant="ghost" size="sm">
                <IconCheck className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex flex-row">
        {table.getState().columnFilters.length > 0 && (
          <ScrollArea className="flex space-x-2 items-center w-56">
            {table.getState().columnFilters.map((filter, idx) => (
              <div
                key={idx}
                className="inline-flex justify-between items-center px-2 py-1 rounded-full text-xs group border dark:hover:bg-zinc-900"
              >
                <span className="capitalize">{String(filter.id)}</span>
                <div
                  onClick={() => table.getColumn(filter.id)?.setFilterValue("")}
                  className="ml-1 hover:text-red-500"
                >
                  <IconX className="w-3 h-3" />
                </div>
              </div>
            ))}
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}
      </div>
    </div>
  );
}
