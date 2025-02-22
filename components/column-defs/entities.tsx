"use client";

import { Entity } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../core/data-table/data-table-column-header";
import HiddenInput from "../core/other/hidden-input";
import { update } from "@/lib/actions/update";
import { useDebouncedCallback } from "use-debounce";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";

const FieldEditor: React.FC<{
  entityId: string;
  field: string;
  value: any;
  type: "text" | "boolean";
}> = ({ entityId, field, value, type }) => {
  const [edit, setEdit] = useState(value);
  const onChange = async (newValue: any) => {
    await update(["entity", entityId], { [field]: newValue });
  };

  const debouncedChange = useDebouncedCallback(
    async (update) => await onChange(update),
    300,
  );

  switch (type) {
    case "boolean":
      return (
        <Checkbox
          checked={edit}
          onCheckedChange={(e) => {
            setEdit(e);
            debouncedChange(e);
          }}
        />
      );
    default:
      return (
        <HiddenInput
          value={edit}
          placeholder="Edit"
          onChange={(e) => {
            setEdit(e.target.value);
            debouncedChange(e.target.value);
          }}
        />
      );
  }
};

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
        entityId={row.original.id}
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
        entityId={row.original.id}
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
        entityId={row.original.id}
        type="text"
      />
    ),
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
        entityId={row.original.id}
        type="text"
      />
    ),
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
        entityId={row.original.id}
        type="boolean"
      />
    ),
  },
];

export const entitiesVisibility = {
  id: false,
  createdAt: false,
  portfolioId: false,
};
