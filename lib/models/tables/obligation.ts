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
        { label: "portfolio", href: "/portfolio/dashboard" },
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
}
