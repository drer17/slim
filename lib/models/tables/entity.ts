import { Level3TableViewProps } from "@/components/views/level-3-table-view";
import { Level3Model } from "../levels/level-3";
import { prisma } from "@/lib/prisma";
import { FormDialog } from "@/components/forms/types";

export class EntityModel<Obligation> extends Level3Model<Obligation> {
  constructor(id?: string) {
    super();
    this.tableName = "entity";
    this.id = id;
  }

  async getDataForRow(): Promise<Level3RowViewProps> {}

  async getDataForTable(): Promise<Level3TableViewProps> {
    const rows = await prisma.entity.findMany({
      where: {
        portfolio: {
          PortfolioUsers: {
            some: {
              userId: this.userId,
            },
          },
        },
      },
    });

    const obligations: Level3TableViewProps = {
      title: "Entities",
      columnDefinitionKey: "entities",
      pathToResource: ["portfolio", "entities"],
      rows: rows,
      formDialog: FormDialog.ENTITY,
      menuOptions: [],
    };

    return obligations;
  }
}
