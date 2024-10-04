"use client";

import * as React from "react";
import "@tanstack/react-table";
import {
  ColumnDef,
  ColumnFiltersState,
  RowData,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTableToolbar } from "./data-table-toolbar";
import { defaultColumn } from "./data-table-cell-edit";
import { Status, generateToast } from "@/interfaces/response";
import { useToast } from "@/hooks/use-toast";
import { ToastProps } from "@/components/ui/toast";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    type?: string;
    renderCell?: (row: RowData) => React.ReactNode;
    renderEditCell?: (
      row: RowData,
      onBlur: () => void,
      onChange: (value: unknown) => void,
    ) => React.ReactNode;
  }
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
    dataModifier?: (rowIdx: number, colKey: string, value: any) => void;
  }
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  rows: TData[];
  dataModifier?: (
    rowIdx: number,
    colKey: string,
    value: any,
  ) => Promise<Status>;
  hideToolbar?: boolean;
  hideManageColumns?: boolean;
  hideFilterColumns?: boolean;
  hideExportOptions?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  rows,
  dataModifier,
  hideManageColumns,
  hideFilterColumns,
  hideExportOptions,
  hideToolbar,
}: DataTableProps<TData, TValue>) {
  const { toast } = useToast();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [data, setData] = React.useState<TData[]>(rows);

  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    meta: {
      updateData: async (rowIndex: number, columnId: string, value: any) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              };
            }
            return row;
          }),
        );
        if (dataModifier) {
          const response = await dataModifier(rowIndex, columnId, value);
          toast(generateToast(response) as ToastProps);
        }
      },
      dataModifier,
    },
  });

  const toolbar = (
    <DataTableToolbar
      table={table}
      hideManageColumns={hideManageColumns}
      hideFilterColumns={hideFilterColumns}
      hideExportOptions={hideExportOptions}
    />
  );

  return (
    <div>
      {!hideToolbar && toolbar}
      <div className="rounded-md border">
        <Table className="border-zinc-500">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
