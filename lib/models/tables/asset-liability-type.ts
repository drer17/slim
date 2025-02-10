import { TableNames } from "../base";
import { Level1Model } from "../levels/level-1";

export class AssetLiabilityTypeModel<
  AssetLiabilityType,
> extends Level1Model<AssetLiabilityType> {
  tableName: TableNames = "assetLiabilityType";

  constructor(id?: string) {
    super();
    this.id = id;
  }

  async create(data: Partial<AssetLiabilityType>) {
    const dataWithPortfolio = { ...data, portfolioId: this.portfolioId };
    return super.create(dataWithPortfolio);
  }
}
