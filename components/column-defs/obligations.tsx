import { Obligation, ObligationRule } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../core/data-table/data-table-column-header";
import { Button } from "../ui/button";
import Link from "next/link";
import ObligationRuleForm from "../forms/obligation-rule";

export const obligationColumns: ColumnDef<
  Obligation & { entity: { name: string }; ObligationRule: ObligationRule }
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
    accessorKey: "portfolioId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Portfolio ID" />
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
    accessorKey: "entityId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="To" />
    ),
    cell: ({ row }) => row.original.entity?.name,
  },
  {
    accessorKey: "ocurrences",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Occurrences" />
    ),
    cell: ({ row }) => (
      <Link href={`/portfolio/table/occurrence/${row.original.id}`}>
        <Button className="w-full h-full">See Occurrences</Button>
      </Link>
    ),
  },
  {
    accessorKey: "rule",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rule" />
    ),
    cell: ({ row }) => (
      <ObligationRuleForm
        label="Edit Rule"
        title="Edit Rule"
        defaults={{
          ...row.original.ObligationRule,
          obligationId: row.original.id,
        }}
      />
    ),
  },
];

export const obligationVisibility = {
  id: false,
  createdAt: false,
  portfolioId: false,
};
