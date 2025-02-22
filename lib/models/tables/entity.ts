import { Level3TableViewProps } from "@/components/views/level-3-table-view";
import { Level3Model } from "../levels/level-3";
import { prisma } from "@/lib/prisma";
import { FormDialog } from "@/components/forms/types";
import { ToastProps } from "@/lib/definitions/response";

export class EntityModel<Entity> extends Level3Model<Entity> {
  constructor(id?: string) {
    super();
    this.tableName = "entity";
    this.id = id;
  }

  public async create(data: Partial<Entity>): Promise<any | ToastProps> {
    return super.create({ portfolioId: this.portfolioId, ...data });
  }

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

    const ents: Level3TableViewProps = {
      title: "Entities",
      pathToResource: [{ label: "portfolio", href: "/portfolio" }],
      rows: rows,
      formDialog: FormDialog.ENTITY,
      menuOptions: [],
      modelKey: "entities",
    };

    return ents;
  }
}
