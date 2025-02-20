import { Occurrence } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../core/data-table/data-table-column-header";

export const occurrenceColumns: ColumnDef<
  Occurrence & { obligation: { name: string } }
>[] = [
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
    accessorKey: "obligationId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Obligation" />
    ),
    cell: ({ row }) => row.original.obligation.name,
  },
  {
    accessorKey: "subject",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Subject" />
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
    accessorKey: "transactionId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Transaction Id" />
    ),
  },
];

export const occurrenceVisibility = {
  id: false,
  obligationId: false,
  transactionId: false,
};
