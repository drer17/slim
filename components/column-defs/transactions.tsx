import { Transaction } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../core/data-table/data-table-column-header";
import { Select, SelectTrigger } from "../ui/select";

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
      <DataTableColumnHeader column={column} title="Date" />
    ),
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
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
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
];

export const transactionVisibility = {
  id: false,
  createdAt: false,
  assetLiabilityId: false,
};
