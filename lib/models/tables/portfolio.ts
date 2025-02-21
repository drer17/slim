import { Status, ToastProps } from "@/lib/definitions/response";
import { TableNames } from "../base";
import { generateToast } from "@/lib/utilities/response";
import { prisma } from "@/lib/prisma";
import { RootModel } from "../levels/root";
import { cookies } from "next/headers";

export class PortfolioModel<Portfolio> extends RootModel<Portfolio> {
  tableName: TableNames = "portfolio";
  target?: string;

  constructor() {
    super();
    const cookieStore = cookies();
    this.target = cookieStore.get("target")?.value;
  }

  public async get(): Promise<Portfolio[] | ToastProps> {
    try {
      const result = await prisma.portfolio.findMany({
        where: {
          id: this.id,
          PortfolioUsers: {
            some: {
              userId: this.userId,
            },
          },
        },
      });
      console.log(
        `Found ${this.tableName} with this id ${this.id} and returned successfully`,
      );
      return result as Portfolio[] | ToastProps;
    } catch (error) {
      console.error(`Error getting ${this.tableName}:`, error);
      return generateToast(Status.failed);
    }
  }

  /*
   * - networth
   *   total assets
   *   total liabilities
   *   income (period)
   *   expense (period)
   *
   * - number of obligations
   *   obligation in (period)
   *   obligation out (period)
   *
   * - networth over time (period)
   *
   */
  public async getDataForDashboard(periodFrom: string, periodTo: string) {
    const assetsLiabilities = await prisma.assetLiability.findMany({
      where: {
        AND: [
          { portfolioId: this.portfolioId },
          { OR: [{ parentId: this.target }, { id: this.target }] },
          { createdAt: { gte: new Date(periodFrom) } },
          { createdAt: { lt: new Date(periodTo) } },
          { archivedAt: null },
        ],
      },
      include: {
        valuations: {
          select: { value: true },
          orderBy: { createdAt: "desc" },
          where: {
            AND: [
              { createdAt: { gte: new Date(periodFrom) } },
              { createdAt: { lt: new Date(periodTo) } },
            ],
          },
        },
        obligations: {
          where: { archivedAt: null },
          select: {
            id: true,
            Occurrence: {
              where: {
                AND: [
                  { createdAt: { gte: new Date(periodFrom) } },
                  { createdAt: { lt: new Date(periodTo) } },
                ],
              },
              select: { amount: true },
              orderBy: { createdAt: "desc" },
            },
          },
        },
        transactions: {
          where: {
            AND: [
              { createdAt: { gte: new Date(periodFrom) } },
              { createdAt: { lt: new Date(periodTo) } },
            ],
          },
          select: { amount: true, category: { select: { expense: true } } },
        },
        assetType: { select: { asset: true } },
      },
    });

    const stats = assetsLiabilities.reduce(
      (acc, asset) => {
        const amount = asset.assetType.asset
          ? asset.valuations[0].value
          : -1 * asset.valuations[0].value;

        acc.networth + amount;

        if (asset.assetType.asset) acc.assetCount + 1;
        if (asset.assetType.asset) acc.assetValue + amount;

        if (!asset.assetType.asset) acc.liabilityCount + 1;
        if (!asset.assetType.asset) acc.liabilityValue - amount;

        asset.transactions.reduce((transAcc, trans) => {
          if (trans.category?.expense) transAcc.expense + trans.amount;
          if (trans.category?.expense) transAcc.expenseCount + 1;

          if (!trans.category?.expense) transAcc.income + trans.amount;
          if (!trans.category?.expense) transAcc.incomeCount + 1;
          return transAcc;
        }, acc);

        asset.obligations.reduce((obAcc, ob) => {
          ob.Occurrence.reduce((occAcc, occ) => {
            if (occ.amount > 0) occAcc.obligationsCount + 1;
            if (occ.amount > 0) occAcc.obligations + occ.amount;

            if (occ.amount < 0) occAcc.obligationsToCount + 1;
            if (occ.amount < 0) occAcc.obligationsTo + occ.amount;

            return occAcc;
          }, obAcc);

          return obAcc;
        }, acc);

        return acc;
      },
      {
        networth: 0,
        assetValue: 0,
        assetCount: 0,
        liabilityCount: 0,
        liabilityValue: 0,
        income: 0,
        incomeCount: 0,
        expense: 0,
        expenseCount: 0,
        obligations: 0,
        obligationsCount: 0,
        obligationsTo: 0,
        obligationsToCount: 0,
      },
    );

    return [
      {
        type: "card",
        label: "Networth",
        icon: "shares",
        primary: stats.networth,
        colspan: 2,
      },
      {
        type: "card",
        label: "Assets",
        icon: "assets",
        primary: stats.assetValue,
        secondary: stats.assetCount,
      },
      {
        type: "card",
        label: "Liabilities",
        icon: "liabilities",
        primary: stats.liabilityValue,
        secondary: stats.liabilityCount,
      },
      {
        type: "card",
        label: "Income",
        icon: "income",
        primary: stats.income,
        secondary: stats.incomeCount,
      },
      {
        type: "card",
        label: "Expenses",
        icon: "expense",
        primary: stats.expense,
        secondary: stats.expenseCount,
      },
      {
        type: "card",
        label: "Obligations",
        icon: "obligation",
        primary: stats.obligations,
        secondary: stats.obligationsCount,
      },
      {
        type: "card",
        label: "Obligations To",
        icon: "obligationTo",
        primary: stats.obligationsTo,
        secondary: stats.obligationsToCount,
      },
      {
        type: "line",
        label: "Net Worth Trend",
        icon: "shares",
        data: [],
        colspan: 4,
        rowspan: 2,
      },
      {
        type: "pie",
        label: "Income Categories",
        icon: "",
        data: [],
        colspan: 2,
        rowspan: 2,
      },
      {
        type: "pie",
        label: "Expense Categories",
        icon: "",
        data: [],
        colspan: 2,
        rowspan: 2,
      },
    ];
  }
}
