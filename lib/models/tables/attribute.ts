import { Attribute } from "@prisma/client";
import { TableNames } from "../base";
import { Level1Model } from "../levels/level-1";
import { Level1TableViewProps } from "@/components/views/level-1-table-view";
import { FormDialog } from "@/components/forms/types";

export class AttributeModel extends Level1Model<Attribute> {
  tableName: TableNames = "attribute";

  constructor(id?: string) {
    super();
    this.id = id;
  }

  // not used
  async getDataForTable(
    limit: number,
    page: number,
  ): Promise<Level1TableViewProps> {
    const rows = await prisma.attribute.findMany({
      where: { portfolioId: this.portfolioId },
      skip: limit * page,
      take: limit,
    });
    const data: Level1TableViewProps = {
      title: "Attribute",
      modelKey: "attribute",
      pathToResource: [],
      rows,
      formDialog: FormDialog.ATTRIBUTE,
    };
    return data;
  }

  async create(data: Record<string, any>) {
    const dataWithPortfolio = { ...data, portfolioId: this.portfolioId };
    super.create(dataWithPortfolio as unknown as Partial<Attribute>);
  }
}
