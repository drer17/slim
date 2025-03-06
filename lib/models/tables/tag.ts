import { Tag } from "@prisma/client";
import { TableNames } from "../base";
import { Level1Model } from "../levels/level-1";
import { Level1TableViewProps } from "@/components/views/level-1-table-view";

export class TagModel extends Level1Model<Tag> {
  tableName: TableNames = "tag";

  constructor(id?: string) {
    super();
    this.id = id;
  }

  // not used
  async getDataForTable(
    limit: number,
    page: number,
  ): Promise<Level1TableViewProps> {
    const rows = await prisma.tag.findMany({
      where: { portfolioId: this.portfolioId },
      skip: limit * page,
      take: limit,
    });
    const data: Level1TableViewProps = {
      title: "Tags",
      modelKey: "tag",
      pathToResource: [],
      rows,
    } as unknown as Level1TableViewProps;
    return data;
  }

  async create(data: Partial<Tag>) {
    const dataWithPortfolio = { ...data, portfolioId: this.portfolioId };
    super.create(dataWithPortfolio);
  }
}
