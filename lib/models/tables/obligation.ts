import { Level3TableViewProps } from "@/components/views/level-3-table-view";
import { Level3Model } from "../levels/level-3";
import { prisma } from "@/lib/prisma";
import { FormDialog } from "@/components/forms/types";
import { ToastProps } from "@/lib/definitions/response";

export class ObligationModel<Obligation> extends Level3Model<Obligation> {
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

  async getDataForRow(): Promise<Level3RowViewProps> {}

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
          date: trans.date.toLocaleDateString(),
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
          date: occurrence.startDate.toLocaleDateString(),
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
      .reduce((acc, row) => {
        const prev = acc[acc.length - 1] ?? { amount: 0 };
        acc.push({ ...row, balance: prev.amount + row.amount });
        return acc;
      }, []);
  }

  public async createOccurrences() {
    const obligations = await prisma.obligation.findMany({
      include: { obligationRule: true },
    });

    obligations.forEach(async (ob) => {
      if (
        !ob.obligationRule?.startDate ||
        ob.obligationRule?.startDate > new Date()
      )
        return;

      // check if occurrence exists in period
      // // TODO fix this
      let periodDays = 0;
      switch (ob.obligationRule.frequencyUnits) {
        case "day":
          periodDays = 1 * ob.obligationRule.frequency;
          break;
        case "week":
          periodDays = 7 * ob.obligationRule.frequency;
          break;
        case "fortnight":
          periodDays = 14 * ob.obligationRule.frequency;
          break;
      }

      const fromDate = new Date();

      const occurence = await prisma.occurrence.findMany({
        where: {
          AND: [
            { startDate: { gt: fromDate } },
            { startDate: { lt: new Date() } },
          ],
        },
      });

      if (occurence.length > 0) return;

      await prisma.occurrence.create({
        data: {
          obligationId: this.id,
          amount: ob.obligationRule.amount,
          startDate: new Date(),
        },
      });
    });
  }
}
