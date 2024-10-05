/*
 * Class Definitions for each model level and view type
 */

import { CardProps } from "@/components/core/card/card";
import { DataTableProps } from "@/components/core/data-table/data-table";
import { Level2TableViewProps } from "@/components/views/level-2-table-view";

export class Level1ModelView extends BaseModelView {
  public typeProps!: any;
}

export class Level2ModelView extends BaseModelView {
  public cardProps!: CardProps;
  public pageProps!: Level2TableViewProps;

  public parentHref!: string;
}

export class Level3ModelView<TData, TValue> extends BaseModelView {
  public cardProps!: CardProps;
  public pageProps!: any;
  public tableProps!: DataTableProps<TData, TValue>;
}

export class Level4ModelView<TData, TValue> extends BaseModelView {
  public tableProps!: DataTableProps<TData, TValue>;
  public pageProps!: any;
}

export class Level5ModelView extends BaseModelView {
  public calendarProps!: any;
}
