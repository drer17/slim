import { Level3TableViewProps } from "@/components/views/level-3-table-view";
import { prisma } from "@/lib/prisma";
import { FormDialog } from "@/components/forms/types";
import { Level4Model } from "../levels/level-4";
import { Status, ToastProps } from "@/lib/definitions/response";
import { Transaction } from "@prisma/client";
import { generateToast } from "@/lib/utilities/response";

export class TransactionModel<Obligation> extends Level4Model<Obligation> {
  assetLiabilityId: string | undefined;

  constructor(assetLiabilityId?: string, id?: string) {
    super();
    this.id = id;
    this.tableName = "transaction";
    this.assetLiabilityId = assetLiabilityId;
  }

  async getDataForRow(): Promise<Level3RowViewProps> {}

  async getDataForTable(
    limit: number,
    page: number,
  ): Promise<Level3TableViewProps> {
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

    const obligations: Level3TableViewProps = {
      title: "Transactions",
      columnDefinitionKey: "transactions",
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
      formDialog: FormDialog.TRANSACTION,
      menuOptions: [],
    };

    return obligations;
  }
}
