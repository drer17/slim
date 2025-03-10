import { Level3TableViewProps } from "@/components/views/level-3-table-view";
import { Level3Model } from "../levels/level-3";
import { prisma } from "@/lib/prisma";
import { FormDialog } from "@/components/forms/types";
import { ToastProps } from "@/lib/definitions/response";
import { Obligation } from "@prisma/client";

export class ObligationModel extends Level3Model<Obligation> {
  assetLiabilityId?: string;

  constructor(assetLiabilityId?: string, id?: string) {
    super();
    this.tableName = "obligation";
    this.id = id;
    this.assetLiabilityId = assetLiabilityId;
  }

  public async create(data: Partial<Obligation>): Promise<any | ToastProps> {
    return super.create({
      portfolioId: this.portfolioId,
      assetLiabilityId: this.assetLiabilityId,
      ...data,
    });
  }

  async getDataForTable(): Promise<Level3TableViewProps> {
    const rows = await prisma.obligation.findMany({
      where: {
        ...(this.assetLiabilityId
          ? { assetLiabilityId: this.assetLiabilityId }
          : {}),
        portfolio: {
          PortfolioUsers: {
            some: {
              userId: this.userId,
            },
          },
        },
      },
      include: {
        entity: { select: { name: true } },
        obligationRule: true,
      },
    });

    const asset = this.assetLiabilityId
      ? await prisma.assetLiability.findUnique({
          where: { id: this.assetLiabilityId },
          include: { assetType: { select: { asset: true } } },
        })
      : undefined;

    const obligations: Level3TableViewProps = {
      title: "Obligations",
      modelKey: "obligations",
      pathToResource: [
        { label: "portfolio", href: "/portfolio" },
        ...(asset
          ? [
              {
                label: "assets",
                href: `/portfolio/table/${asset ? "asset" : "liability"}`,
              },
              {
                label: asset.label,
                href: `/portfolio/row/asset-liability/${asset.assetType.asset ? "asset" : "liability"}/${this.assetLiabilityId}`,
              },
            ]
          : []),
      ],
      rows: rows,
      formDialog: FormDialog.OBLIGATION,
      menuOptions: [],
    };

    return obligations;
  }

  public async getLedger() {
    const obligation = await prisma.obligation.findUnique({
      where: { id: this.id },
      include: { Transaction: true, Occurrence: true },
    });

    const trans = obligation?.Transaction.reduce(
      (acc, trans) => {
        acc.push({
          label: trans.label,
          date: trans.date,
          amount: trans.amount,
          description: trans.description,
        });
        return acc;
      },
      [] as Record<string, any>[],
    );

    const occurrences = obligation?.Occurrence.reduce(
      (acc, occurrence) => {
        acc.push({
          label: occurrence.subject,
          date: occurrence.startDate,
          amount: -1 * occurrence.amount,
          description: occurrence.description,
        });
        return acc;
      },
      [] as Record<string, any>[],
    );

    const data = [...(trans || []), ...(occurrences || [])];

    return data
      ?.sort((a, b) => (a.date < b.date ? -1 : 1))
      .reduce((acc, row, i) => {
        const prevBalance = acc[i - 1]?.balance ?? 0;
        console.log(row.amount);
        acc.push({ ...row, balance: prevBalance + row.amount });
        return acc;
      }, []);
  }

  public async createOccurrences() {
    const obligations = await prisma.obligation.findMany({
      include: { obligationRule: true },
    });

    const frequencyMap: Record<string, number> = {
      day: 1,
      week: 7,
      fortnight: 14,
    };

    const createPromises = [];

    for (const ob of obligations) {
      if (!ob.obligationRule || !ob.obligationRule.startDate) continue;

      const { startDate, endDate, frequencyUnits, frequency } =
        ob.obligationRule;

      // Determine the interval in days for the frequency
      let periodDays = frequencyMap[frequencyUnits] * frequency || 0;

      // If no valid frequency is defined, skip this obligation
      if (periodDays <= 0) continue;

      // Find the most recent occurrence before now or the start date
      const lastOccurrence = await prisma.occurrence.findFirst({
        where: {
          obligationId: ob.id,
          startDate: {
            lte: new Date(),
          },
        },
        orderBy: {
          startDate: "desc",
        },
      });

      let nextOccurrenceDate = lastOccurrence
        ? new Date(lastOccurrence.startDate.getTime() + periodDays * 86400000)
        : new Date(startDate);

      //Keep creating occurrences until we reach the endDate or current date
      while (
        nextOccurrenceDate <= new Date() &&
        (!endDate || nextOccurrenceDate <= new Date(endDate))
      ) {
        // Check if the occurrence already exists
        const existingOccurrence = await prisma.occurrence.findFirst({
          where: {
            obligationId: ob.id,
            startDate: nextOccurrenceDate,
          },
        });

        if (!existingOccurrence) {
          createPromises.push(
            prisma.occurrence.create({
              data: {
                obligationId: ob.id,
                amount: ob.obligationRule.amount,
                startDate: nextOccurrenceDate,
              },
            }),
          );
        }

        // Move to the next occurrence
        nextOccurrenceDate = new Date(
          nextOccurrenceDate.getTime() + periodDays * 86400000,
        );
      }
    }

    await Promise.all(createPromises);
  }
}
