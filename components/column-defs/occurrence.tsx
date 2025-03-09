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
    accessorKey: "startDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start Date" />
    ),
    size: 200,
    cell: ({ row }) =>
      row.original.startDate.toLocaleString("en-AU", {
        timeZone: "Australia/Adelaide",
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
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
        slug={["occurrence", undefined, row.original.id]}
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
        slug={["occurrence", undefined, row.original.id]}
        type="text"
      />
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    size: 300,
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
        slug={["occurrence", undefined, row.original.id]}
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
