import { Level2RowViewProps } from "@/components/views/level-2-row-view";
import { BaseModel, TableNames } from "../base";
import { Level2TableViewProps } from "@/components/views/level-2-table-view";
import { prisma } from "@/lib/prisma";
import { generateToast } from "@/lib/utilities/response";
import { Status } from "@/lib/definitions/response";
import { revalidatePath } from "next/cache";

export abstract class Level2Model<T> extends BaseModel<T> {
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
      revalidatePath("/portfolio/");
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
      revalidatePath("/portfolio/");
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
      revalidatePath("/portfolio/");
    } catch (error) {
      console.error("Error archiving asset:", error);
    }
  }

  public async createOrRemoveLink(
    linkingTable: TableNames,
    linkedId: string,
    linkedKey: string,
    remove?: boolean,
  ) {
    try {
      if (remove) {
        await prisma[linkingTable].delete({
          where: { [linkedKey]: linkedId },
        });
      } else {
        await prisma[linkingTable].create({
          data: { [linkedKey]: linkedId, [this.tableName + "Id"]: this.id },
        });
      }
      revalidatePath("/portfolio/");
    } catch (error) {
      console.error("Error archiving asset:", error);
      return generateToast(Status.failed);
    }
  }

  public async upsertLevel7(
    targetTable: TableNames,
    data: Record<string, any>,
    targetId?: string,
    link?: { linkingTable: TableNames; key: string },
  ) {
    console.log(targetTable, data, targetId, link);
    try {
      if (targetId) {
        await prisma[targetTable].update({
          where: { id: targetId },
          data: data,
        });
        console.log(`Updated ${this.tableName} with ID ${this.id}`);
      } else if (link) {
        const newRecord = await prisma[targetTable].create({
          data: { ...data, portfolioId: this.portfolioId },
        });
        const linkingRecord = await prisma[link.linkingTable].create({
          data: {
            [link.key]: newRecord.id,
            [this.tableName + "Id"]: this.id,
          },
        });
        this.id = newRecord.id;
        console.log(
          `Created new record in ${this.tableName} with ID ${newRecord.id} linked to ${link.linkingTable}: ${linkingRecord.id}`,
        );
      }
      revalidatePath("/portfolio/");
    } catch (error) {
      console.error("Error archiving asset:", error);
      return generateToast(Status.failed);
    }
  }
}
