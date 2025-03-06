import { Level3TableViewProps } from "@/components/views/level-3-table-view";
import { BaseModel } from "../base";

export abstract class Level3Model<T> extends BaseModel<T> {
  public viewClass = "level-3";

  public abstract getDataForTable(): Promise<Level3TableViewProps>;
}
