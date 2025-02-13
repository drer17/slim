import { BaseModel } from "../base";
import { Status, ToastProps } from "@/lib/definitions/response";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { getPartial } from "@/lib/utilities/object";
import { generateToast } from "@/lib/utilities/response";
import { Level5TableViewProps } from "@/components/views/level-5-table-view";

export abstract class Level5Model<T> extends BaseModel<T> {
  public viewClass = "level-5";

  public abstract getDataForRow(): Promise<Level5RowViewProps>;

  public abstract getDataForTable(
    limit: number,
    page: number,
  ): Promise<Level5TableViewProps>;

  public async importData(data: Record<string, string>[]): Promise<ToastProps> {
    const capitalizedTableName =
      this.tableName.charAt(0).toUpperCase() + this.tableName.slice(1);

    const columns: string[] = Object.values(
      Prisma[`${capitalizedTableName}ScalarFieldEnum`],
    );

    const extractedData = [];

    for (const row of data) {
      const extractedRow: Record<string, string> = {};
      for (const key of columns) {
        extractedRow[key] = getPartial(row, key);
      }
      extractedData.push(extractedRow);
    }

    prisma[this.tableName].createMany({ data: extractedData });

    return generateToast(Status.success);
  }
}
