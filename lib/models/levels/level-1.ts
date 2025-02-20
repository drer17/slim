import { BaseModel } from "../base";

export abstract class Level1Model<T> extends BaseModel<T> {
  public abstract getDataForTable(
    limit: number,
    page: number,
  ): Promise<Level1TableViewProps>;
}
