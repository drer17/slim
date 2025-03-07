import { Level3TableViewProps } from "@/components/views/level-3-table-view";
import { prisma } from "@/lib/prisma";
import { FormDialog } from "@/components/forms/types";
import { Level4Model } from "../levels/level-4";
import { Status, ToastProps } from "@/lib/definitions/response";
import { generateToast } from "@/lib/utilities/response";
import { getPartial } from "@/lib/utilities/object";
import { Prisma, Transaction } from "@prisma/client";

export class TransactionModel extends Level4Model<Transaction> {
  assetLiabilityId: string | undefined;
  searchTerm?: string;
  limit?: number;

  constructor(
    assetLiabilityId?: string,
    id?: string,
    searchTerm?: string,
    limit?: number,
  ) {
    super();
    this.id = id;
    this.tableName = "transaction";
    this.assetLiabilityId = assetLiabilityId;
    this.searchTerm = searchTerm;
    this.limit = limit;
  }

  public async get(): Promise<ToastProps | Transaction[]> {
    try {
      const result = await prisma.transaction.findMany({
        where: {
          AND: [
            { id: this.id },
            ...(this.searchTerm
              ? [{ label: { contains: this.searchTerm } }]
              : [{}]),
          ],
        },
        ...(this.limit ? { take: this.limit } : {}),
        orderBy: { createdAt: "desc" },
      });
      console.log(
        `Found ${this.tableName} with this id ${this.id} and returned successfully`,
      );
      return result as Transaction[];
    } catch (error) {
      console.error(`Error getting ${this.tableName}:`, error);
      return generateToast(Status.failed);
    }
  }

  public async create(data: Partial<Transaction>): Promise<any | ToastProps> {
    return super.create({ assetLiabilityId: this.assetLiabilityId, ...data });
  }

  public async importData(data: Record<string, string>[]): Promise<ToastProps> {
    const columns: string[] = Object.values(Prisma.TransactionScalarFieldEnum);
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
      }

      if (this.assetLiabilityId)
        extractedRow["assetLiabilityId"] = this.assetLiabilityId;

      const [day, month, year] = extractedRow["date"].split("/");
      extractedRow["date"] = new Date(year, month - 1, day).toISOString();

      extractedRow["amount"] = parseFloat(
        extractedRow["amount"].replaceAll('"', ""),
      );
      extractedRow["label"] = extractedRow["label"].replaceAll('"', "");

      extractedData.push(extractedRow);
    }

    console.log(extractedData);

    const existingTransactions = await prisma.transaction.findMany({
      where: {
        OR: extractedData.map((txn) => ({
          name: txn.name,
          date: txn.date,
          amount: txn.amount,
        })),
      },
      select: { label: true, date: true, amount: true },
    });

    // Filter out transactions that already exist
    const newTransactions = extractedData.filter(
      (txn) =>
        !existingTransactions.some(
          (existing) =>
            existing.label === txn.label &&
            existing.date === txn.date &&
            existing.amount === txn.amount,
        ),
    );

    // Insert only new transactions
    if (newTransactions.length > 0) {
      await prisma.transaction.createMany({
        data: newTransactions as any,
      });
    } else {
      console.log("No new transactions to insert.");
    }

    console.info(
      `Imported ${Object.keys(extractedData).length} transactions for asset ${this.assetLiabilityId} in portfolio ${this.portfolioId}.`,
    );

    return generateToast(Status.success);
  }

  async getDataForTable(
    limit: number,
    page: number,
  ): Promise<Level3TableViewProps> {
    const rows = await prisma.transaction.findMany({
      where: {
        AND: [
          { assetLiability: { portfolioId: this.portfolioId } },
          ...(this.assetLiabilityId
            ? [{ assetLiabilityId: this.assetLiabilityId }]
            : []),
        ],
      },
      orderBy: { createdAt: "desc" },
      skip: limit * page,
      take: limit,
    });

    let assetLiability = undefined;
    if (this.assetLiabilityId)
      assetLiability = await prisma.assetLiability.findUnique({
        where: { id: this.assetLiabilityId },
        include: { assetType: { select: { asset: true } } },
      });

    const transactions: Level3TableViewProps = {
      title: "Transactions",
      modelKey: "transactions",
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
      rows,
      formDialog: FormDialog.TRANSACTION,
      menuOptions: [
        {
          label: "categories",
          href: "/portfolio/table/transaction-category",
        },
      ],
    };

    console.log(transactions);
    return transactions;
  }
}
