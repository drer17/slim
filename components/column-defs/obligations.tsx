import { Obligation } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../core/data-table/data-table-column-header";

export const obligationColumns: ColumnDef<Obligation>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Portfolio ID" />
    ),
    cell: ({ row }) =>
      row.original.createdAt.toLocaleString("en-AU", {
        timeZone: "Australia/Adelaide",
      }),
  },
  {
    accessorKey: "portfolioId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Portfolio ID" />
    ),
  },
  {
    accessorKey: "label",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
  },
  {
    accessorKey: "entityId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Entity ID" />
    ),
  },
];
