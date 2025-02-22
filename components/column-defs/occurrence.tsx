import { Occurrence, Transaction } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../core/data-table/data-table-column-header";
import { FieldEditor } from "../core/other/cell-edit";

export const occurrenceColumns: ColumnDef<
  Occurrence & {
    obligation: { name: string };
    TransactionOccurrence: { transaction: Transaction }[];
  }
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
    cell: ({ row }) => (
      <FieldEditor
        field={"subject"}
        value={row.original.subject}
        slug={["occurence", undefined, row.original.id]}
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
        slug={["occurence", undefined, row.original.id]}
        type="text"
      />
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
    accessorKey: "satisfied",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Satisfied" />
    ),
    cell: ({ row }) => (
      <FieldEditor
        field={"satisfied"}
        value={row.original.satisfied}
        slug={["occurrence", row.original.id]}
        type="boolean"
      />
    ),
    size: 10,
  },
];

export const occurrenceVisibility = {
  id: false,
  obligationId: false,
  transactionId: false,
};
