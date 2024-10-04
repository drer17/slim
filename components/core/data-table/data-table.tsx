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
import { AnimatePresence, motion } from "framer-motion";
import ExpandedContent from "../expanded-content/expanded-content";
import InViewPort from "@/components/invisible/in-view-port";

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
  dataRetriever?: (numOfRows: number, forPage: number) => Promise<TData[]>;
  expandedContent?: React.ReactNode;
  hideToolbar?: boolean;
  hideManageColumns?: boolean;
  hideFilterColumns?: boolean;
  hideExportOptions?: boolean;
}

const ROW_LIMIT = 50;

export function DataTable<TData, TValue>({
  columns,
  rows,
  dataModifier,
  dataRetriever,
  expandedContent,
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
  const [focussedRow, setFocussedRow] = React.useState<number>(-1);
  const [page, setPage] = React.useState(1);
  const [isDone, setIsDone] = React.useState(false);

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

  const getMoreData = async () => {
    if (isDone || !dataRetriever) return;
    const newRows = await dataRetriever(ROW_LIMIT, page);

    if (newRows.length === 0) setIsDone(true);
    setData((prevData) => [...prevData, ...newRows]);
    setPage(page + 1);
  };

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
              table.getRowModel().rows.map((row, rowIdx) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => setFocussedRow(rowIdx)}
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
            <TableRow className="hidden border-0">
              <TableCell colSpan={columns.length} className="border-0">
                <InViewPort callback={() => getMoreData()} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <AnimatePresence>
        {focussedRow >= 0 && expandedContent && (
          <motion.div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ExpandedContent
              height={"500px"}
              expanded={focussedRow >= 0}
              onOutsideClick={() => setFocussedRow(-1)}
            >
              <motion.div
                className="dark:bg-zinc-900 bg-zinc-100 rounded-md w-full h-[500px] max-w-screen-md max-h-screen-md p-4"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
              >
                {expandedContent}
              </motion.div>
            </ExpandedContent>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
