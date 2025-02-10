import { TableNames } from "../base";
import { Level1Model } from "../levels/level-1";

export class TagModel<Tag> extends Level1Model<Tag> {
  tableName: TableNames = "tag";

  constructor(id?: string) {
    super();
    this.id = id;
  }

  async create(data: Partial<Tag>) {
    const dataWithPortfolio = { ...data, portfolioId: this.portfolioId };
    super.create(dataWithPortfolio);
  }
}
