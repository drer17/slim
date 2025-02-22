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

  public async create(data: Occurrence): Promise<any | ToastProps> {
    return super.create({
      obligationId: this.obligationId,
      ...data,
      startTime: new Date(data.startDate),
      endDate: new Date(data.startDate),
      endTime: new Date(data.startDate),
      amount: parseFloat(data.amount),
    });
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
        TransactionOccurrence: { select: { transaction: true } },
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
      modelKey: "occurrences",
      pathToResource: [
        { label: "portfolio", href: "/portfolio" },
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

  public async updateTransactionLink(props: {
    occurrenceId: string;
    newTransactions: string[];
  }) {
    const transactions = await prisma.transactionOccurrence.findMany({
      where: { occurrenceId: props.occurrenceId },
    });

    // find new transaction in existing
    props.newTransactions.forEach(async (id) => {
      if (!transactions.find((trans) => trans.id === id)) {
        await prisma.transactionOccurrence.create({
          data: {
            transactionId: id,
            occurrenceId: props.occurrenceId,
          },
        });
      }
    });

    // find existing transactions not in new
    transactions.forEach(async (trans) => {
      if (!props.newTransactions.find((id) => id === trans.id))
        await prisma.transactionOccurrence.delete({
          where: { id: trans.id },
        });
    });
  }
}
