import { Entity } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../core/data-table/data-table-column-header";

export const entitiesColumns: ColumnDef<Entity>[] = [
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
    accessorKey: "portfolioId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Portfolio ID" />
    ),
  },
  {
    accessorKey: "name",
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
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone Number" />
    ),
  },
  {
    accessorKey: "isCompany",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Company" />
    ),
  },
];
