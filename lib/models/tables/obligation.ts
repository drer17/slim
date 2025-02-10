import { Level3TableViewProps } from "@/components/views/level-3-table-view";
import { Level3Model } from "../levels/level-3";
import { prisma } from "@/lib/prisma";
import { FormDialog } from "@/components/forms/types";

export class ObligationModel<Obligation> extends Level3Model<Obligation> {
  constructor(id?: string) {
    super();
    this.tableName = "obligation";
    this.id = id;
  }

  async getDataForRow(): Promise<Level3RowViewProps> {}

  async getDataForTable(): Promise<Level3TableViewProps> {
    const rows = await prisma.obligation.findMany({
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
      title: "Obligations",
      columnDefinitionKey: "obligations",
      pathToResource: ["portfolio", "obligations"],
      rows: rows,
      formDialog: FormDialog.OBLIGATION,
      menuOptions: [],
    };

    return obligations;
  }
}
