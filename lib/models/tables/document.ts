import { TableNames } from "../base";
import { Level1Model } from "../levels/level-1";

export class Document extends Level1Model {
  tableName: TableNames = "document";

  constructor(id?: string) {
    super();
    this.id = id;
  }

  async create(data: Record<string, any>) {
    const dataWithPortfolio = { ...data, portfolioId: this.portfolioId };
    super.create(dataWithPortfolio);
  }

  async delete() {
    // TODO delete file from document store SLIM-16
    super.delete();
  }
}
