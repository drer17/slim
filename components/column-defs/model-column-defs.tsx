import { ColumnDef } from "@tanstack/react-table";
import { obligationColumns } from "./obligations";
import { entitiesColumns } from "./entities";

export const modelColumnDefs: Record<string, ColumnDef<any>[]> = {
  obligations: obligationColumns,
  entities: entitiesColumns,
};
