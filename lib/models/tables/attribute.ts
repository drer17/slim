import { TableNames } from "../base";
import { Level1Model } from "../levels/level-1";

export class AttributeModel<Attribute> extends Level1Model<Attribute> {
  tableName: TableNames = "attribute";

  constructor(id?: string) {
    super();
    this.id = id;
  }

  async create(data: Partial<Attribute>) {
    const dataWithPortfolio = { ...data, portfolioId: this.portfolioId };
    return super.create(dataWithPortfolio);
  }
}
