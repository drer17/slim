import { Level4TableViewProps } from "@/components/views/level-4-table-view";
import { BaseModel } from "../base";
import { ToastProps } from "@/lib/definitions/response";

export abstract class Level4Model<T> extends BaseModel<T> {
  public viewClass = "level-4";

  public abstract getDataForTable(
    limit: number,
    page: number,
  ): Promise<Level4TableViewProps>;

  public abstract importData(
    data: Record<string, string>[],
  ): Promise<ToastProps>;
}
