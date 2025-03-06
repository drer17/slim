import { revalidatePath } from "next/cache";
import { Status, ToastProps } from "../definitions/response";
import { prisma } from "../prisma";
import { generateToast } from "../utilities/response";
import { cookies } from "next/headers";
import { Prisma } from "@prisma/client";

export type TableNames =
  | "user"
  | "portfolio"
  | "assetLiabilityType"
  | "assetLiability"
  | "entity"
  | "transaction"
  | "transactionCategory"
  | "valuation"
  | "occurrence"
  | "obligation"
  | "obligationRule"
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
    const cookieStore = cookies();
    this.userId =
      cookieStore.get("user")?.value ?? "732ec057-50bc-488f-ab6f-56f733ef2890";
    this.portfolioId =
      cookieStore.get("portfolio")?.value ??
      "4e2fd80e-4233-4bbd-bd2c-355ab6072a2f";
  }

  public async get(): Promise<T[] | ToastProps> {
    try {
      const result = await (
        prisma[this.tableName] as Prisma.ObligationDelegate
      ).findMany({
        where: { id: this.id },
      });
      console.log(
        `Found ${this.tableName} with this id ${this.id} and returned successfully`,
      );
      return result as T[];
    } catch (error) {
      console.error(`Error getting ${this.tableName}:`, error);
      return generateToast(Status.failed);
    }
  }

  public async update(data: Partial<T>): Promise<void | ToastProps> {
    try {
      await (prisma[this.tableName] as Prisma.ObligationDelegate).update({
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
      const newRow = await (
        prisma[this.tableName] as Prisma.ObligationDelegate
      ).create({
        data: data as any,
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
      await (prisma[this.tableName] as Prisma.ObligationDelegate).delete({
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
