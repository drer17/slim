import { Status, ToastProps } from "../interfaces/response";
import { generateToast } from "../utilities/response";

export type TableNames = "assetLiability" | "note" | "noteLink";

export abstract class BaseModel {
  userId: string;
  portfolioId: string;
  viewClass!: string;
  tableName!: TableNames;
  id?: string;

  constructor() {
    this.userId = "732ec057-50bc-488f-ab6f-56f733ef2890";
    this.portfolioId = "todo";
  }

  public async update(data: Record<string, any>): Promise<void | ToastProps> {
    try {
      await prisma[this.tableName].update({
        where: { id: this.id },
        data,
      });
      console.log(`${this.tableName} with ID ${this.id} updated successfully`);
    } catch (error) {
      console.error("Error archiving asset:", error);
      return generateToast(Status.failed);
    }
  }
}
