import { Level2RowViewProps } from "@/components/views/level-2-row-view";
import { BaseModelView } from "../base";
import { Level2TableViewProps } from "@/components/views/level-2-table-view";
import { prisma } from "@/lib/prisma";

export abstract class Level2ModelView extends BaseModelView {
  viewClass = "level-2";
  id?: string;

  public abstract getDataForRow(): Promise<Level2RowViewProps>;
  public abstract getDataForTable(): Promise<Level2TableViewProps>;

  public async changeColor(newColor: string) {
    try {
      await prisma[this.tableName].update({
        where: { id: this.id },
        data: { color: newColor },
      });
      console.log(
        `Color updated to ${newColor} for ${this.tableName} with ID ${this.id}`,
      );
    } catch (error) {
      console.error("Error updating color:", error);
    }
  }

  public async changeStar(starred: boolean) {
    try {
      await prisma[this.tableName].update({
        where: { id: this.id },
        data: { starred },
      });
      console.log(
        `Starred status updated to ${starred} for ${this.tableName} with ID ${this.id}`,
      );
    } catch (error) {
      console.error("Error updating starred status:", error);
    }
  }

  public async archive() {
    try {
      await prisma[this.tableName].update({
        where: { id: this.id },
        data: { archivedAt: new Date() },
      });
      console.log(`${this.tableName} with ID ${this.id} archived successfully`);
    } catch (error) {
      console.error("Error archiving asset:", error);
    }
  }
}
