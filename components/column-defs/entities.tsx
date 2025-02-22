"use client";

import { Entity } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../core/data-table/data-table-column-header";
import { FieldEditor } from "../core/other/cell-edit";

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
    cell: ({ row }) => (
      <FieldEditor
        field={"name"}
        value={row.original.name}
        slug={["entity", row.original.id]}
        type="text"
      />
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => (
      <FieldEditor
        field={"description"}
        value={row.original.description}
        slug={["entity", row.original.id]}
        type="text"
      />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => (
      <FieldEditor
        field={"email"}
        value={row.original.email}
        slug={["entity", row.original.id]}
        type="text"
      />
    ),
    size: 300,
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone Number" />
    ),
    cell: ({ row }) => (
      <FieldEditor
        field={"phone"}
        value={row.original.phone}
        slug={["entity", row.original.id]}
        type="text"
      />
    ),
    size: 200,
  },
  {
    accessorKey: "isCompany",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Company" />
    ),
    cell: ({ row }) => (
      <FieldEditor
        field={"isCompany"}
        value={row.original.isCompany}
        slug={["entity", row.original.id]}
        type="boolean"
      />
    ),
    size: 90,
  },
];

export const entitiesVisibility = {
  id: false,
  createdAt: false,
  portfolioId: false,
};
