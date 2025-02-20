"use client";

import { TransactionCategory } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../core/data-table/data-table-column-header";
import { Select, SelectTrigger } from "../ui/select";
import React from "react";

const ParentSelect = () => {
  return (
    <Select>
      <SelectTrigger></SelectTrigger>
    </Select>
  );
};

export const transactionColumns: ColumnDef<TransactionCategory>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "parentId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Parent Category" />
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
