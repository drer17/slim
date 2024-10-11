import { TableNames } from "../base";
import { Level1Model } from "../levels/level-1";

export class Attribute extends Level1Model {
  tableName: TableNames = "attribute";

  constructor(id?: string) {
    super();
    this.id = id;
  }

  async create(data: Record<string, any>) {
    const dataWithPortfolio = { ...data, portfolioId: this.portfolioId };
    super.create(dataWithPortfolio);
  }
}
