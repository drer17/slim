import { Status, ToastProps } from "@/lib/definitions/response";
import { BaseModel, TableNames } from "../base";
import { generateToast } from "@/lib/utilities/response";
import { prisma } from "@/lib/prisma";

export class PortfolioModel<Portfolio> extends BaseModel<Portfolio> {
  tableName: TableNames = "portfolio";

  public async get(): Promise<Portfolio[] | ToastProps> {
    try {
      const result = await prisma[this.tableName].findMany({
        where: {
          id: this.id,
          PortfolioUsers: {
            some: {
              userId: this.userId,
            },
          },
        },
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
}
