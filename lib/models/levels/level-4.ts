import { Level4TableViewProps } from "@/components/views/level-4-table-view";
import { BaseModel } from "../base";

export abstract class Level4Model<T> extends BaseModel<T> {
  public viewClass = "level-4";

  public abstract getDataForRow(): Promise<Level4RowViewProps>;
  public abstract getDataForTable(
    limit: number,
    page: number,
  ): Promise<Level4TableViewProps>;
}
