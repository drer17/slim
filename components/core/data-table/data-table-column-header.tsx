import { Column } from "@tanstack/react-table";
import * as React from "react";

import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  IconArrowDown,
  IconArrowUp,
  IconDotsVertical,
  IconEyeX,
} from "@tabler/icons-react";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const [sortState, setSortState] = React.useState<undefined | true | false>(
    undefined,
  );

  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  const handleSortToggle = () => {
    if (sortState === false) {
      setSortState(true);
    } else if (sortState === true) {
      setSortState(undefined);
    } else {
      setSortState(false);
    }
    column.toggleSorting(sortState);
  };

  return (
    <div
      className={cn(
        "flex items-center space-x-2 w-full justify-between group",
        className,
      )}
    >
      <div className="flex items-center">
        <span>{title}</span>
        <Button
          variant="ghost"
          size="sm"
          className={`h-8 data-[state=open]:bg-accent ml-2 ${
            column.getIsSorted() ? "visible" : "invisible group-hover:visible"
          }`}
          onClick={() => handleSortToggle()}
        >
          {column.getIsSorted() === "desc" ? (
            <IconArrowDown className="h-4 w-4 dark:text-white" />
          ) : column.getIsSorted() === "asc" ? (
            <IconArrowUp className="h-4 w-4 dark:text-white" />
          ) : (
            <IconArrowUp className="h-4 w-4" />
          )}
        </Button>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 data-[state=open]:bg-accent invisible group-hover:visible"
          >
            <IconDotsVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            onClick={() => {
              column.toggleSorting(false);
              setSortState(false);
            }}
          >
            <IconArrowUp className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              column.toggleSorting(true);
              setSortState(true);
            }}
          >
            <IconArrowDown className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <IconEyeX className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
