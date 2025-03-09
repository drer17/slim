import { Level1TableViewProps } from "@/components/views/level-1-table-view";
import { TableNames } from "../base";
import { Level1Model } from "../levels/level-1";
import { FormDialog } from "@/components/forms/types";
import { prisma } from "@/lib/prisma";
import { AssetLiabilityType } from "@prisma/client";

export class AssetLiabilityTypeModel extends Level1Model<AssetLiabilityType> {
  tableName: TableNames = "assetLiabilityType";

  constructor(id?: string) {
    super();
    this.id = id;
  }

  async create(data: Partial<AssetLiabilityType>) {
    const dataWithPortfolio = { ...data, portfolioId: this.portfolioId };
    return super.create(dataWithPortfolio);
  }
  async getDataForTable(
    limit?: number,
    page?: number,
  ): Promise<Level1TableViewProps> {
    const rows = await prisma.assetLiabilityType.findMany({
      where: { portfolioId: this.portfolioId },
      ...(page && limit ? { skip: limit * page } : {}),
      ...(limit ? { take: limit } : {}),
    });
    const data: Level1TableViewProps = {
      title: "Asset Liability Types",
      modelKey: "assetLiabilityTypes",
      pathToResource: [{ label: "portfolio", href: "/portfolio" }],
      rows,
      formDialog: FormDialog.ASSET_LIABILITY_TYPE,
    };
    return data;
  }
}
