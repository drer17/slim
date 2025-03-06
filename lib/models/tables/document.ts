import { Document } from "@prisma/client";
import { TableNames } from "../base";
import { Level1Model } from "../levels/level-1";
import { Level1TableViewProps } from "@/components/views/level-1-table-view";

export class DocumentModel extends Level1Model<Document> {
  tableName: TableNames = "document";

  constructor(id?: string) {
    super();
    this.id = id;
  }

  // not used
  async getDataForTable(
    limit: number,
    page: number,
  ): Promise<Level1TableViewProps> {
    const rows = await prisma.documents.findMany({
      where: { portfolioId: this.portfolioId },
      skip: limit * page,
      take: limit,
    });
    const data: Level1TableViewProps = {
      title: "Documents",
      modelKey: "document",
      pathToResource: [],
      rows,
    } as unknown as Level1TableViewProps;
    return data;
  }

  async create(data: Record<string, any>) {
    const dataWithPortfolio = { ...data, portfolioId: this.portfolioId };
    super.create(dataWithPortfolio as unknown as Partial<Document>);
  }

  async delete() {
    // TODO delete file from document store SLIM-16
    super.delete();
  }
}
