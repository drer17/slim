"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../core/data-table/data-table-column-header";
import React from "react";
import { deleteItem } from "@/lib/actions/delete";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { IconDots, IconTrash } from "@tabler/icons-react";
import { AssetLiabilityType } from "@prisma/client";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { iconOptions } from "../global/icons";
import { update } from "@/lib/actions/update";

const Options: React.FC<{ categoryId: string }> = ({ categoryId }) => {
  const deleteCategory = async () => {
    deleteItem(["transaction-category", undefined, categoryId]);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <IconDots className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => deleteCategory()}>
          <IconTrash className="text-red-500 w-4 h-4 mr-2" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const assetLiabilityTypeColumns: ColumnDef<AssetLiabilityType>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "label",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Label" />
    ),
  },
  {
    accessorKey: "icon",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Label" />
    ),
    cell: ({ row }) => (
      <Select
        value={row.original.icon || undefined}
        onValueChange={async (id) => {
          await update(["asset-liability-type", row.original.id], {
            icon: id,
          });
        }}
      >
        <SelectTrigger className="capitalize">
          {row.original.icon || "Select icon"}
        </SelectTrigger>
        <SelectContent>
          {iconOptions.map((icon) => (
            <SelectItem
              key={icon.value}
              value={icon.value}
              className="capitalize"
            >
              {icon.value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    ),
  },
  {
    accessorKey: "options",
    header: () => <></>,
    enableResizing: true,
    cell: ({ row }) => <Options categoryId={row.original.id} />,
    size: 290,
  },
];

export const assetLiabilityTypeVisibility = {
  id: false,
};
