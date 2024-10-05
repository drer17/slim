/*
 * Class Definitions for each model level and view type
 */

import { DataTableProps } from "@/components/core/data-table/data-table";
import { Level2RowViewProps } from "@/components/views/level-2-row-view";
import { Level2TableViewProps } from "@/components/views/level-2-table-view";
import { BaseModelView } from "../base";

export class Level1ModelView extends BaseModelView {
  public viewClass = "level-1";

  public typeProps!: any;
}

export abstract class Level3ModelView extends BaseModelView {
  public viewClass = "level-3";

  public abstract getDataForRow(): Promise<Level2RowViewProps>;
  public abstract getDataForTable(): Promise<Level2TableViewProps>;
}

export class Level4ModelView<TData, TValue> extends BaseModelView {
  public viewClass = "level-4";

  public tableProps!: DataTableProps<TData, TValue>;
  public pageProps!: any;
}

export class Level5ModelView extends BaseModelView {
  public viewClass = "level-5";
  public calendarProps!: any;
}
