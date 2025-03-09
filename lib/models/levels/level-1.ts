import { Level1TableViewProps } from "@/components/views/level-1-table-view";
import { BaseModel } from "../base";

export abstract class Level1Model<T> extends BaseModel<T> {
  public abstract getDataForTable(
    limit?: number,
    page?: number,
  ): Promise<Level1TableViewProps>;
}
