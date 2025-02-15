import { Level3TableViewProps } from "@/components/views/level-3-table-view";
import { prisma } from "@/lib/prisma";
import { FormDialog } from "@/components/forms/types";
import { Level4Model } from "../levels/level-4";
import { Status, ToastProps } from "@/lib/definitions/response";
import { generateToast } from "@/lib/utilities/response";
import { getPartial } from "@/lib/utilities/object";
import { Prisma } from "@prisma/client";

export class TransactionModel<Transaction> extends Level4Model<Transaction> {
  assetLiabilityId: string | undefined;

  constructor(assetLiabilityId?: string, id?: string) {
    super();
    this.id = id;
    this.tableName = "transaction";
    this.assetLiabilityId = assetLiabilityId;
  }

  public async create(data: Partial<Transaction>): Promise<any | ToastProps> {
    console.log(data);
    return super.create({ assetLiabilityId: this.assetLiabilityId, ...data });
  }

  public async importData(data: Record<string, string>[]): Promise<ToastProps> {
    const capitalizedTableName =
      this.tableName.charAt(0).toUpperCase() + this.tableName.slice(1);

    const columns: string[] = Object.values(
      Prisma[`${capitalizedTableName}ScalarFieldEnum`],
    );

    const transactionColumns = ["date", "amount", "label"];

    const extractedData = [];

    for (const row of data) {
      const extractedRow: Record<string, any> = {};

      for (const key of columns) {
        if (transactionColumns.includes(key))
          extractedRow[key] = getPartial(
            row,
            key,
            transactionColumns.findIndex((i) => i === key),
          );
        else extractedRow[key] = getPartial(row, key);
      }

      if (this.assetLiabilityId)
        extractedRow["assetLiabilityId"] = this.assetLiabilityId;

      const [day, month, year] = extractedRow["date"].split("/");
      extractedRow["date"] = new Date(year, month - 1, day).toISOString();

      extractedRow["amount"] = parseFloat(
        extractedRow["amount"].replace('"', ""),
      );
      extractedRow["label"] = extractedRow["label"].replaceAll('"', "");

      extractedData.push(extractedRow);
    }

    prisma[this.tableName].createMany({
      data: extractedData,
    });

    return generateToast(Status.success);
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

    const transactions: Level3TableViewProps = {
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

    console.log(transactions);
    return transactions;
  }
}
