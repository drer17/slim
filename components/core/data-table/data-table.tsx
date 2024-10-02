export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>;
}

export const DataTable: React.FC<DataTableProps> = () => {};
