import { TableNames } from "../base";
import { Level1Model } from "../levels/level-1";

export class DocumentModel<Document> extends Level1Model<Document> {
  tableName: TableNames = "document";

  constructor(id?: string) {
    super();
    this.id = id;
  }

  async create(data: Partial<Document>) {
    const dataWithPortfolio = { ...data, portfolioId: this.portfolioId };
    return super.create(dataWithPortfolio);
  }

  async delete() {
    // TODO delete file from document store SLIM-16
    super.delete();
  }
}
