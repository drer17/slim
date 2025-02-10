import { revalidatePath } from "next/cache";
import { Status, ToastProps } from "../definitions/response";
import { prisma } from "../prisma";
import { generateToast } from "../utilities/response";

export type TableNames =
  | "assetLiabilityType"
  | "assetLiability"
  | "entity"
  | "obligation"
  | "note"
  | "noteLink"
  | "tag"
  | "tagLink"
  | "attribute"
  | "attributeLink"
  | "document"
  | "documentLink";

export abstract class BaseModel<T> {
  userId: string;
  portfolioId: string;
  viewClass!: string;
  tableName!: TableNames;
  id?: string;

  constructor() {
    this.userId = "732ec057-50bc-488f-ab6f-56f733ef2890";
    this.portfolioId = "4e2fd80e-4233-4bbd-bd2c-355ab6072a2f";
  }

  public async get(): Promise<T[] | ToastProps> {
    try {
      const result = await prisma[this.tableName].findMany({
        where: { id: this.id },
      });
      console.log(
        `Found ${this.tableName} with this id ${this.id} and returned successfully`,
      );
      return result;
    } catch (error) {
      console.error(`Error getting ${this.tableName}:`, error);
      return generateToast(Status.failed);
    }
  }

  public async update(data: Partial<T>): Promise<void | ToastProps> {
    try {
      await prisma[this.tableName].update({
        where: { id: this.id },
        data,
      });
      console.log(`${this.tableName} with ID ${this.id} updated successfully`);
      revalidatePath("/portfolio/");
      return generateToast(Status.success);
    } catch (error) {
      console.error("Error archiving asset:", error);
      return generateToast(Status.failed);
    }
  }

  public async create(data: Partial<T>): Promise<any | ToastProps> {
    try {
      const newRow = await prisma[this.tableName].create({
        data,
      });
      console.log(`An entry to ${this.tableName} was created successfully`);
      revalidatePath("/portfolio/");
      return { ...generateToast(Status.success), data: newRow };
    } catch (error) {
      console.error("Error creating row:", error);
      return generateToast(Status.failed);
    }
  }

  public async delete(): Promise<void | ToastProps> {
    // to avoid deleting everything
    if (!this.id) return;
    try {
      await prisma[this.tableName].delete({
        where: { id: this.id },
      });
      console.log(
        `An ${this.id} was deleted from ${this.tableName} successfully`,
      );
      revalidatePath("/portfolio/");
    } catch (error) {
      console.error("Error deleting row:", error);
      return generateToast(Status.failed);
    }
  }
}
