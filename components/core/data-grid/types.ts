export type Row = Record<string, number | string | boolean | any>;

export type Cell = number | string | boolean | any;

export type FilterOperator = {
  name: string;
  underlyingTypeOfArgs: string;
  listOfArgs: boolean;
  operator: (
    cell: Cell,
    args: string | number | string[] | number[],
  ) => boolean;
};

export type AggregateOperator = {
  name: string;
  operator: (accumulator: number, cell: number) => number;
};

export type SortableComparators = {
  name: string;
  comparator: (a: any, b: any) => number;
};

export type ColumnDef = {
  field: string;

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
  expandableContent?: (row: Row) => React.ReactNode;

  hideable?: boolean;
  hidden?: boolean;
  hideIfWidthLessThan?: number;

  renderCell?: (cell: Cell) => React.ReactNode;
  valueFormatter?: (cell: Cell) => string;

  editable?: boolean;
  renderEditCell?: boolean;

  aggregable?: boolean;
  aggregableFunctions?: AggregateOperator[];

  filterable?: boolean;
  filterOperators?: FilterOperator[];

  sortable?: boolean;
  sortableComparators?: SortableComparators[];
};
