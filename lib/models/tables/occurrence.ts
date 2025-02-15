import { Level5Model } from "../levels/level-5";
import { Level5TableViewProps } from "@/components/views/level-5-table-view";
import { FormDialog } from "@/components/forms/types";
import { prisma } from "@/lib/prisma";
import { ToastProps } from "@/lib/definitions/response";

export class OccurrenceModel<Occurrence> extends Level5Model<Occurrence> {
  obligationId?: string;

  constructor(obligationId?: string, id?: string) {
    super();
    this.tableName = "occurrence";
    this.id = id;
    this.obligationId = obligationId;
  }

  public async create(data: Partial<Occurrence>): Promise<any | ToastProps> {
    console.log(data);
    return super.create({ obligationId: this.obligationId, ...data });
  }

  async getDataForTable(
    limit: number,
    page: number,
  ): Promise<Level5TableViewProps> {
    const rows = await prisma.occurrence.findMany({
      where: {
        obligationId: this.obligationId,
      },
      include: {
        obligation: { select: { label: true } },
      },
      orderBy: { createdAt: "desc" },
      skip: limit * page,
      take: limit,
    });

    const obligation = await prisma.obligation.findUnique({
      where: { id: this.obligationId },
      include: { entity: { select: { name: true } } },
    });

    const obligations: Level5TableViewProps = {
      title: "Occurences",
      columnDefinitionKey: "occurrences",
      pathToResource: [
        { label: "portfolio", href: "/portfolio/dashboard" },
        ...(obligation
          ? [
              {
                label: "assets",
                href: `/portfolio/table/obligation`,
              },
              {
                label: obligation.label,
                href: `/portfolio/table/obligation/${this.obligationId}`,
              },
            ]
          : []),
      ],
      rows: rows,
      formDialog: FormDialog.OCCURRENCE,
      menuOptions: [],
    };

    return obligations;
  }
}
