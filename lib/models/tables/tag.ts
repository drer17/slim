import { TableNames } from "../base";
import { Level1Model } from "../levels/level-1";

export class Tag extends Level1Model {
  tableName: TableNames = "tag";

  constructor(id?: string) {
    super();
    this.id = id;
  }

  async create(data: Record<string, any>) {
    const dataWithPortfolio = { ...data, portfolioId: this.portfolioId };
    super.create(dataWithPortfolio);
  }
}
