export type FilterOperator<C> = {
  name: string;
  underlyingTypeOfArgs: string;
  listOfArgs: boolean;
  operator: (cell: C, args: string | number | string[] | number[]) => boolean;
};

export type AggregateOperator<C> = {
  name: string;
  operator: (accumulator: number, cell: C) => number;
};

export type SortableComparators<C> = {
  name: string;
  comparator: (a: C, b: C) => number;
};

export type ColumnDef<T> = {
  field: keyof T;

  colSpan?: number;
  colClassName?: string;
  resisable?: boolean;

  cellClassName?: string;

  description?: string;
  headerName?: string;
  headerClassName?: string;
  renderHeader?: (header: string) => React.ReactNode;

  disableColumnMenu?: boolean;
  disableExport?: boolean;
  disableReorder?: boolean;

  expandable?: boolean;
  expandableContent?: (row: T) => React.ReactNode;

  hideable?: boolean;
  hidden?: boolean;
  hideIfWidthLessThan?: number;

  renderCell?: (cell: T[keyof T]) => React.ReactNode;
  valueFormatter?: (cell: T[keyof T]) => string;

  editable?: boolean;
  renderEditCell?: boolean;

  aggregable?: boolean;
  aggregableFunctions?: AggregateOperator<T[keyof T]>[];

  filterable?: boolean;
  filterOperators?: FilterOperator<T[keyof T]>[];

  sortable?: boolean;
  sortableComparators?: SortableComparators<T[keyof T]>[];
};
