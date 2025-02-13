import { Level5Model } from "../levels/level-5";
import { Level5TableViewProps } from "@/components/views/level-5-table-view";
import { FormDialog } from "@/components/forms/types";
import { prisma } from "@/lib/prisma";

export class ValuationModel<Valuation> extends Level5Model<Valuation> {
  assetLiabilityId?: string;

  constructor(assetLiabilityId?: string, id?: string) {
    super();
    this.tableName = "valuation";
    this.id = id;
    this.assetLiabilityId = assetLiabilityId;
  }
  async getDataForTable(
    limit: number,
    page: number,
  ): Promise<Level5TableViewProps> {
    const rows = await prisma.transaction.findMany({
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
      columnDefinitionKey: "valuations",
      pathToResource: [
        { label: "portfolio", href: "/portfolio/dashboard" },
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
