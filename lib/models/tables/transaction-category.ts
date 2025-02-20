import { prisma } from "@/lib/prisma";
import { TableNames } from "../base";
import { Level1Model } from "../levels/level-1";
import { FormDialog } from "@/components/forms/types";
import { Level1TableViewProps } from "@/components/views/level-1-table-view";

export class TransactionCategoryModel<
  TransactionCategory,
> extends Level1Model<TransactionCategory> {
  tableName: TableNames = "transactionCategory";
  parentId?: string;

  constructor(parentId?: string, id?: string) {
    super();
    this.id = id;
    this.parentId = parentId;
  }

  async create(data: Partial<TransactionCategory>) {
    const dataWithPortfolio = { ...data, portfolioId: this.portfolioId };
    if (this.parentId) dataWithPortfolio.parentId = this.parentId;
    super.create(dataWithPortfolio);
  }

  async getDataForTable(
    limit: number,
    page: number,
  ): Promise<Level1TableViewProps> {
    const rows = await prisma.transactionCategory.findMany({
      where: { portfolioId: this.portfolioId },
      include: { parent: true, asset: { select: { label: true, id: true } } },
      skip: limit * page,
      take: limit,
    });
    const data: Level1TableViewProps = {
      title: "Transaction Categories",
      modelKey: "transactionCategories",
      pathToResource: [{ label: "portfolio", href: "/portfolio/dashboard" }],
      rows,
      formDialog: FormDialog.TRANSACTION_CATEGORY,
    };
    return data;
  }
}
