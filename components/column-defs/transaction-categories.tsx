"use client";

import { AssetLiability, TransactionCategory } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../core/data-table/data-table-column-header";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import React from "react";
import { useTransactionCategoryContext } from "../contexts/transaction-categories";
import { get } from "@/lib/actions/get";
import { update } from "@/lib/actions/update";
import { deleteItem } from "@/lib/actions/delete";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { IconDots, IconTrash } from "@tabler/icons-react";

const ParentSelect = ({ parentId }: { parentId: string | null }) => {
  const { categories } = useTransactionCategoryContext();

  const [selectedParent, setSelectedParent] = React.useState<string | null>(
    parentId,
  );
  const [selectedName, setSelectedName] = React.useState<string | undefined>(
    undefined,
  );

  React.useEffect(() => {
    const getEntity = async () => {
      if (!selectedParent) return;
      const entity = (await get([
        "transaction-category",
        selectedParent,
      ])) as TransactionCategory[];
      setSelectedName(entity[0].label);
    };
    getEntity();
  }, [selectedParent]);

  const updateData = async (categoryId: string) => {
    await update(["transaction-category", undefined, categoryId], {
      parent: categoryId,
    });
    setSelectedParent(categoryId);
  };

  return (
    <Select
      value={selectedParent || undefined}
      onValueChange={(id) => updateData(id)}
    >
      <SelectTrigger>{selectedName || "Select Category"}</SelectTrigger>
      <SelectContent>
        {categories &&
          categories.map((cat) => (
            <SelectItem key={cat.id} value={cat.id}>
              {cat.label}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

const AssetSelect = ({ assetId }: { assetId: string | null }) => {
  const { assetLiabilities } = useTransactionCategoryContext();

  const [selectedAsset, setSelectedAsset] = React.useState<string | null>(
    assetId,
  );
  const [selectedName, setSelectedName] = React.useState<string | undefined>(
    undefined,
  );

  React.useEffect(() => {
    const getEntity = async () => {
      if (!selectedAsset) return;
      const entity = (await get([
        "asset-liability",
        selectedAsset,
      ])) as AssetLiability[];
      setSelectedName(entity[0].label);
    };
    getEntity();
  }, [selectedAsset]);

  const updateData = async (alId: string) => {
    await update(["transaction-category", undefined, alId], {
      assetId: alId,
    });
    setSelectedAsset(alId);
  };

  return (
    <Select
      value={selectedAsset || undefined}
      onValueChange={(id) => updateData(id)}
    >
      <SelectTrigger>{selectedName || "Select Category"}</SelectTrigger>
      <SelectContent>
        {assetLiabilities &&
          assetLiabilities.map((als) => (
            <SelectItem key={als.id} value={als.id}>
              {als.label}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

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

export const transactionCategoryColumns: ColumnDef<TransactionCategory>[] = [
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
    accessorKey: "parentId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Parent Category" />
    ),
    cell: ({ row }) => <ParentSelect parentId={row.original.parentId} />,
  },
  {
    accessorKey: "assetId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Parent Category" />
    ),
    cell: ({ row }) => <AssetSelect assetId={row.original.assetId} />,
  },
  {
    accessorKey: "expense",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Expense" />
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

export const transactionCategoryVisibility = {
  id: false,
};
