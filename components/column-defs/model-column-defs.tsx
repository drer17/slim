import { ColumnDef, ColumnFiltersState } from "@tanstack/react-table";
import {
  obligationColumns,
  obligationFilter,
  obligationVisibility,
} from "./obligations";
import { entitiesColumns, entitiesVisibility } from "./entities";
import { transactionColumns, transactionVisibility } from "./transactions";
import { valuationColumns, valuationVisibility } from "./valuations";
import { occurrenceColumns, occurrenceVisibility } from "./occurrence";
import {
  transactionCategoryColumns,
  transactionCategoryVisibility,
} from "./transaction-categories";

export const modelColumnDefs: Record<string, ColumnDef<any>[]> = {
  obligations: obligationColumns,
  entities: entitiesColumns,
  transactions: transactionColumns,
  transactionCategories: transactionCategoryColumns,
  valuations: valuationColumns,
  occurrences: occurrenceColumns,
};

export const modelColumnVisibilities: Record<
  string,
  Record<string, boolean>
> = {
  obligations: obligationVisibility,
  entities: entitiesVisibility,
  transactions: transactionVisibility,
  transactionCategories: transactionCategoryVisibility,
  valuations: valuationVisibility,
  occurrences: occurrenceVisibility,
};

export const modelColumnFilters: Record<string, ColumnFiltersState> = {
  obligations: obligationFilter,
  entities: [],
  transactions: [],
  valuations: [],
  occurrences: [],
  transactionCategories: [],
};
