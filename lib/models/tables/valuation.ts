import { Level5Model } from "../levels/level-5";
import { Level5TableViewProps } from "@/components/views/level-5-table-view";
import { FormDialog } from "@/components/forms/types";
import { prisma } from "@/lib/prisma";
import { ToastProps } from "@/lib/definitions/response";

export class ValuationModel<Valuation> extends Level5Model<Valuation> {
  assetLiabilityId?: string;

  constructor(assetLiabilityId?: string, id?: string) {
    super();
    this.tableName = "valuation";
    this.id = id;
    this.assetLiabilityId = assetLiabilityId;
  }

  public async create(data: Partial<Valuation>): Promise<any | ToastProps> {
    return super.create({
      assetLiabilityId: this.assetLiabilityId,
      ...data,
      value: parseFloat(data.value),
    });
  }

  async getDataForTable(
    limit: number,
    page: number,
  ): Promise<Level5TableViewProps> {
    const rows = await prisma.valuation.findMany({
      where: {
        assetLiabilityId: this.assetLiabilityId,
      },
      orderBy: { createdAt: "desc" },
      skip: limit * page,
      take: limit,
    });

    const assetLiability = await prisma.assetLiability.findUnique({
      where: { id: this.assetLiabilityId },
      include: { assetType: { select: { asset: true } } },
    });

    const obligations: Level5TableViewProps = {
      title: "Valuations",
      modelKey: "valuations",
      pathToResource: [
        { label: "portfolio", href: "/portfolio" },
        ...(assetLiability
          ? [
              {
                label: "assets",
                href: `/portfolio/table/${assetLiability ? "asset" : "liability"}`,
              },
              {
                label: assetLiability.label,
                href: `/portfolio/row/asset-liability/${assetLiability.assetType.asset ? "asset" : "liability"}/${this.assetLiabilityId}`,
              },
            ]
          : []),
      ],
      rows: rows,
      formDialog: FormDialog.VALUATION,
      menuOptions: [],
    };

    return obligations;
  }
}
