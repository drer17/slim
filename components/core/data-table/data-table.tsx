"use client";

/*
 * Data Table
 *
 * Author: Andre Repanich
 * Date: 04-10-24
 *
 * Component Requirements
 * [x]- Hide Columns
 * [ ]- Hidden column breakpoints (screensize)
 * [x]- Filter
 * [x]- Lazy Load
 * [x]- Sort columns (ASC DSC)
 * [x]- Filter columns
 * [x]- Column header drop down
 *    [ ]- Custom menu items
 * [x]- Select row opens dialog
 * [ ]- Select rows
 * [ ]- Callback actions on selection
 * [ ]- export
 * [x]- Render jsx in cell
 * [ ]- horizontal and vertical scrolling
 * [x]- Editable cells
 */

import { motion, AnimatePresence } from "framer-motion";
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
import { useToast } from "@/hooks/use-toast";
import { ToastProps } from "@/components/ui/toast";
import InViewPort from "@/components/invisible/in-view-port";
import { Status } from "@/lib/definitions/response";
import { generateToast } from "@/lib/utilities/response";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

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

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  rows: TData[];

  dataModifier?: (
    rowIdx: number,
    colKey: string,
    value: any,
  ) => Promise<Status>;
  dataRetriever?: (numOfRows: number, forPage: number) => Promise<TData[]>;

  setFocussedRow?: (row: TData) => void;
  onRowClick?: (row: TData) => void;
  expandingRowContent?: (data: TData) => React.ReactNode;

  hideToolbar?: boolean;
  hideManageColumns?: boolean;
  hideFilterColumns?: boolean;
  hideExportOptions?: boolean;

  initColumnVisibility?: Partial<Record<keyof TData, boolean>>;
  initSortingState?: SortingState;
  initFilterState?: ColumnFiltersState;

  condensed?: boolean;
  height?: string; // to take up height. If both height and height offset are defined, height will be used
  heightOffset?: string; // to take up full height - offset

  dominantHeader?: boolean;
}

const ROW_LIMIT = 50;

export function DataTable<TData, TValue>({
  columns,
  rows,
  dataModifier,
  dataRetriever,
  setFocussedRow,
  onRowClick,
  expandingRowContent,
  hideManageColumns,
  hideFilterColumns,
  initSortingState,
  hideExportOptions,
  hideToolbar,
  initColumnVisibility,
  initFilterState,
  condensed,
  heightOffset,
  height,
  dominantHeader,
}: DataTableProps<TData, TValue>) {
  const { toast } = useToast();
  const [sorting, setSorting] = React.useState<SortingState>(
    initSortingState || [],
  );
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    initFilterState || [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>(
      (initColumnVisibility as unknown as VisibilityState) || {},
    );
  const [rowSelection, setRowSelection] = React.useState({});
  const [data, setData] = React.useState<TData[]>(rows);
  React.useEffect(() => {
    setData(rows);
  }, [rows]);

  const [page, setPage] = React.useState(1);
  const [isDone, setIsDone] = React.useState(false);

  const [expandedRows, setExpandedRows] = React.useState(new Set());
  const toggleRow = (rowId: string) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(rowId)) newSet.delete(rowId);
      else newSet.add(rowId);
      return newSet;
    });
  };

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
    <div className="max-w-full">
      {!hideToolbar && toolbar}
      <ScrollArea
        className="rounded-md border relative"
        style={{
          maxWidth: "100%",
          height: `calc(100vh - ${heightOffset})`,
          maxHeight: height,
        }}
      >
        <Table className="border-zinc-500" style={{ tableLayout: "auto" }}>
          <TableHeader
            className={cn(
              "bg-background/50 backdrop-blur",
              dominantHeader && "z-50",
            )}
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(condensed && "h-8")}
                      style={{
                        width:
                          header.getSize() === 150
                            ? undefined
                            : header.getSize(),
                      }}
                    >
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
                <React.Fragment key={row.id}>
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    onClick={() => {
                      setFocussedRow && setFocussedRow(row.original as TData);
                      onRowClick && onRowClick(row.original as TData);
                      expandingRowContent && toggleRow(row.id);
                    }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={cn(condensed && "h-8")}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>

                  {/* Collapsible Content */}
                  <AnimatePresence>
                    {expandedRows.has(row.id) && (
                      <motion.tr
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="w-full bg-card/50"
                      >
                        <TableCell colSpan={columns.length} className="p-4">
                          {expandingRowContent &&
                            expandingRowContent(row.original)}
                        </TableCell>
                      </motion.tr>
                    )}
                  </AnimatePresence>
                </React.Fragment>
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
      </ScrollArea>
    </div>
  );
}
