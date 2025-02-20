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
import {
  assetLiabilityTypeColumns,
  assetLiabilityTypeVisibility,
} from "./asset-liability-type";

export const modelColumnDefs: Record<string, ColumnDef<any>[]> = {
  obligations: obligationColumns,
  entities: entitiesColumns,
  transactions: transactionColumns,
  transactionCategories: transactionCategoryColumns,
  valuations: valuationColumns,
  occurrences: occurrenceColumns,
  assetLiabilityTypes: assetLiabilityTypeColumns,
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
  assetLiabilityTypes: assetLiabilityTypeVisibility,
};

export const modelColumnFilters: Record<string, ColumnFiltersState> = {
  obligations: obligationFilter,
  entities: [],
  transactions: [],
  valuations: [],
  occurrences: [],
  transactionCategories: [],
  assetLiabilityTypes: [],
};
