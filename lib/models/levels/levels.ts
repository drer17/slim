/*
 * Class Definitions for each model level and view type
 */

import { DataTableProps } from "@/components/core/data-table/data-table";
import { Level2RowViewProps } from "@/components/views/level-2-row-view";
import { Level2TableViewProps } from "@/components/views/level-2-table-view";
import { BaseModel } from "../base";

export abstract class Level3Model extends BaseModel {
  public viewClass = "level-3";

  public abstract getDataForRow(): Promise<Level2RowViewProps>;
  public abstract getDataForTable(): Promise<Level2TableViewProps>;
}

export class Level4Model<TData, TValue> extends BaseModel {
  public viewClass = "level-4";

  public tableProps!: DataTableProps<TData, TValue>;
  public pageProps!: any;
}

export class Level5Model extends BaseModel {
  public viewClass = "level-5";
  public calendarProps!: any;
}
