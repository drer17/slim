import { Level2RowViewProps } from "@/components/views/level-2-row-view";
import { BaseModelView } from "../base";
import { Level2TableViewProps } from "@/components/views/level-2-table-view";
import { prisma } from "@/lib/prisma";
import { TableNames } from "../model-factory";

export abstract class Level2ModelView extends BaseModelView {
  viewClass = "level-2";

  public abstract getDataForRow(): Promise<Level2RowViewProps>;
  public abstract getDataForTable(): Promise<Level2TableViewProps>;

  public async changeColor(table: TableNames, id: string, newColor: string) {
    try {
      await prisma[table].update({
        where: { id },
        data: { color: newColor },
      });
      console.log(`Color updated to ${newColor} for ${table} with ID ${id}`);
    } catch (error) {
      console.error("Error updating color:", error);
    }
  }

  public async changeStar(table: TableNames, id: string, starred: boolean) {
    try {
      await prisma[table].update({
        where: { id },
        data: { starred },
      });
      console.log(
        `Starred status updated to ${starred} for ${table} with ID ${id}`,
      );
    } catch (error) {
      console.error("Error updating starred status:", error);
    }
  }

  public async archive(table: TableNames, id: string) {
    try {
      await prisma[table].update({
        where: { id },
        data: { archivedAt: new Date() },
      });
      console.log(`${table} with ID ${id} archived successfully`);
    } catch (error) {
      console.error("Error archiving asset:", error);
    }
  }
}
