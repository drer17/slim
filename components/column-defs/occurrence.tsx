import { Occurrence, Transaction } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../core/data-table/data-table-column-header";
import { FieldEditor } from "../core/other/cell-edit";
import { Combobox } from "../ui/combobox";
import { useEffect, useState } from "react";
import { get } from "@/lib/actions/get";
import { updateTransactionLink } from "@/lib/actions/update";

const TransactionSelect: React.FC<{
  selected: Transaction[];
  occurrenceId: string;
}> = ({ selected: initSelected, occurrenceId }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(initSelected);
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const [selected, setSelected] = useState<string[]>(
    initSelected.map((s) => s.id),
  );

  useEffect(() => {
    const getData = async () => {
      const data = await get([
        "transaction",
        undefined,
        undefined,
        searchTerm,
        "5",
      ]);
      if (Array.isArray(data))
        setTransactions((prev) => {
          const updated = [...prev, ...data];
          const uniqueMap = new Map(updated.map((item) => [item.id, item]));
          return Array.from(uniqueMap.values());
        });
    };
    getData();
  }, [searchTerm]);

  const updateSelected = async (s: string[]) => {
    updateTransactionLink({
      occurrenceId: occurrenceId,
      newTransactions: s,
    });
  };

  return (
    <Combobox
      items={transactions}
      labelKey="label"
      valueKey="label"
      idKey="id"
      placeholder="Portfolio"
      commandPrompt="Search assets..."
      searchTerm={searchTerm}
      onSearchTermChange={(e) => setSearchTerm(e)}
      values={selected}
      onValueChange={(s) => {
        setSelected(s);
        updateSelected(s);
      }}
    />
  );
};

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
    accessorKey: "transactions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Transactions" />
    ),
    cell: ({ row }) => (
      <TransactionSelect
        selected={row.original.TransactionOccurrence.map((t) => t.transaction)}
        occurrenceId={row.original.id}
      />
    ),
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
