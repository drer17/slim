"use client";

import { getLedgerData } from "@/lib/actions/get";
import { Slug } from "@/lib/definitions/response";
import { useEffect, useState } from "react";
import { DataTable } from "../core/data-table/data-table";
import { DataTableColumnHeader } from "../core/data-table/data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";

export interface LedgerRowProps {
  label: string;
  description?: string;
  amount: number;
  date: string;
  balance: number;
}

const columns: ColumnDef<LedgerRowProps>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
  },
  {
    accessorKey: "label",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Label" />
    ),
    cell: ({ row }) => row.original.label || "",
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => row.original.description || "",
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) =>
      row.original.amount.toLocaleString("en-Au", {
        style: "currency",
        currency: "AUD",
      }),
  },
  {
    accessorKey: "balance",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Balance" />
    ),
    cell: ({ row }) =>
      row.original.balance.toLocaleString("en-Au", {
        style: "currency",
        currency: "AUD",
      }),
  },
];

export const Ledger: React.FC<{ slug: Slug; obligation: string }> = ({
  slug,
  obligation,
}) => {
  const [data, setData] = useState<LedgerRowProps[]>([]);

  useEffect(() => {
    const getData = async () => {
      const res = (await getLedgerData(slug)) as LedgerRowProps[];
      setData(res);
    };
    getData();
  }, [slug]);

  return (
    <div className="flex flex-col gap-2">
      <h1>{obligation} Ledger</h1>
      <DataTable
        rows={data}
        columns={columns}
        hideFilterColumns
        initSortingState={[{ id: "date", desc: true }]}
      />
    </div>
  );
};
