"use client";

import { Transaction } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../core/data-table/data-table-column-header";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import HiddenInput from "../core/other/hidden-input";
import { useDebouncedCallback } from "use-debounce";
import { update } from "@/lib/actions/update";
import React from "react";
import { useToast } from "@/hooks/use-toast";
import { ToastProps } from "../ui/toast";
import { useTransactionContext } from "../contexts/transaction";

const Description: React.FC<{
  initDescription: string | null;
  transactionId: string;
}> = ({ initDescription, transactionId }) => {
  const [description, setDescription] = React.useState(initDescription);

  const updateData = async (description: string) => {
    update(["transaction", undefined, transactionId], {
      description: description,
    });
  };

  const updateDataDebounced = useDebouncedCallback((d) => updateData(d), 500);

  return (
    <HiddenInput
      value={description || "Add description"}
      onChange={(e) => {
        setDescription(e.target.value);
        updateDataDebounced(e.target.value);
      }}
      className="w-full h-full"
    />
  );
};

const MoveTo: React.FC<{ transactionId: string }> = ({ transactionId }) => {
  const { assetLiabilities } = useTransactionContext();
  const { toast } = useToast();

  const onMove = async (transactionId: string, newAlId: string) => {
    const result = await update(["transaction", undefined, transactionId], {
      assetLiabilityId: newAlId,
    });
    if (result) toast(result as ToastProps);
  };

  return (
    <Select>
      <SelectTrigger>Select A/L</SelectTrigger>
      <SelectContent>
        {assetLiabilities.map((al) => (
          <SelectItem
            value={al.id}
            key={al.id}
            onClick={() => onMove(transactionId, al.id)}
          >
            {al.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export const transactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) =>
      row.original.createdAt.toLocaleString("en-AU", {
        timeZone: "Australia/Adelaide",
      }),
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" className="w-24" />
    ),
    size: 20,
    cell: ({ row }) =>
      row.original.date.toLocaleString("en-AU", {
        timeZone: "Australia/Adelaide",
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      }),
  },
  {
    accessorKey: "assetLiabilityId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Asset Liability Id" />
    ),
  },
  {
    accessorKey: "label",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Label" />
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => (
      <Description
        initDescription={row.original.description}
        transactionId={row.original.id}
      />
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    size: 20,
    cell: ({ row }) =>
      row.original.amount.toLocaleString("en-AU", {
        style: "currency",
        currency: "AUD",
      }),
  },
  {
    accessorKey: "categoryId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      return (
        <Select>
          <SelectTrigger>Select Category</SelectTrigger>
        </Select>
      );
    },
  },
  {
    accessorKey: "move",
    header: () => "Move To",
    size: 10,
    cell: ({ row }) => <MoveTo transactionId={row.id} />,
  },
];

export const transactionVisibility = {
  id: false,
  createdAt: false,
  assetLiabilityId: false,
};
