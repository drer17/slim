import { Status, ToastProps } from "@/lib/definitions/response";
import { TableNames } from "../base";
import { generateToast } from "@/lib/utilities/response";
import { prisma } from "@/lib/prisma";
import { RootModel } from "../levels/root";
import { cookies } from "next/headers";
import { monthNames } from "@/lib/utilities/date";
import { BalanceSheetProps } from "@/components/views/balance-sheet";
import { DashboardCardProps } from "@/components/core/card/dashboard-card";
import { Portfolio } from "@prisma/client";

export class PortfolioModel extends RootModel<Portfolio> {
  tableName: TableNames = "portfolio";
  target?: string;

  constructor() {
    super();
    const cookieStore = cookies();
    this.target = cookieStore.get("target")?.value;
  }

  public async get(): Promise<Portfolio[] | ToastProps> {
    try {
      const resulte = await prisma.portfolio.findMany({
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
      return resulte as Portfolio[] | ToastProps;
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
  public async getDataForDashboard(
    periodFrom: string,
    periodTo: string,
  ): Promise<{ cards: DashboardCardProps[] }> {
    const assetsLiabilities = await prisma.assetLiability.findMany({
      where: {
        AND: [
          { portfolioId: this.portfolioId },
          { OR: [{ parentId: this.target }, { id: this.target }] },
          { createdAt: { gt: new Date(periodFrom) } },
          { createdAt: { lte: new Date(periodTo) } },
          { archivedAt: null },
        ],
      },
      include: {
        valuations: {
          select: { value: true, createdAt: true },
          orderBy: { createdAt: "desc" },
          where: {
            AND: [
              { createdAt: { gt: new Date(periodFrom) } },
              { createdAt: { lte: new Date(periodTo) } },
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
                  { createdAt: { gt: new Date(periodFrom) } },
                  { createdAt: { lte: new Date(periodTo) } },
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
              { createdAt: { gt: new Date(periodFrom) } },
              { createdAt: { lte: new Date(periodTo) } },
            ],
          },
          select: {
            amount: true,
            category: { select: { expense: true, label: true } },
          },
        },
        assetType: { select: { asset: true } },
      },
    });

    const stats = assetsLiabilities.reduce(
      (acc, asset) => {
        const amount = asset.assetType.asset
          ? (asset.valuations[asset.valuations.length - 1]?.value ?? 0)
          : -1 * asset.valuations[asset.valuations.length - 1]?.value || 0;

        acc.networth += amount;

        asset.valuations.reduce((valAcc, val) => {
          if (!val.createdAt) return valAcc;
          const key = `${monthNames[val.createdAt.getMonth()]} ${val.createdAt.getFullYear()}`;
          if (!(key in valAcc.networthTrend))
            valAcc.networthTrend[key] = { ...val, asset: asset.id };
          else if (valAcc.networthTrend[key].asset !== asset.id)
            valAcc.networthTrend[key] = {
              createdAt: val.createdAt,
              prevValue: valAcc.networthTrend[key].value,
              value: valAcc.networthTrend[key].value + val.value,
              asset: asset.id,
            };
          else if (
            valAcc.networthTrend[key].createdAt.getMonth() ===
              val.createdAt.getMonth() &&
            val.createdAt > valAcc.networthTrend[key].createdAt
          )
            valAcc.networthTrend[key] = {
              ...valAcc.networthTrend[key],
              createdAt: val.createdAt,
              value: valAcc.networthTrend[key].prevValue + val.value,
              asset: asset.id,
            };
          return valAcc;
        }, acc);

        if (asset.assetType.asset) acc.assetCount += 1;
        if (asset.assetType.asset) acc.assetValue += amount;

        if (!asset.assetType.asset) acc.liabilityCount += 1;
        if (!asset.assetType.asset) acc.liabilityValue -= amount;

        asset.transactions.reduce((transAcc, trans) => {
          if (trans.category?.expense) {
            transAcc.expense += trans.amount;
            transAcc.expenseCount += 1;

            if (!(trans.category.label in transAcc.expenseCategories))
              transAcc.expenseCategories[trans.category.label] = 0;
            transAcc.expenseCategories[trans.category.label] += trans.amount;
          }

          if (!trans.category?.expense) {
            transAcc.income += trans.amount;
            transAcc.incomeCount += 1;

            if (
              trans.category?.label &&
              !(trans.category.label in transAcc.incomeCategories)
            )
              transAcc.incomeCategories[trans.category.label] = 0;
            if (trans.category)
              transAcc.incomeCategories[trans.category.label] += trans.amount;
          }
          return transAcc;
        }, acc);

        asset.obligations.reduce((obAcc, ob) => {
          ob.Occurrence.reduce((occAcc, occ) => {
            if (occ.amount < 0) occAcc.obligationsCount += 1;
            if (occ.amount < 0) occAcc.obligations += occ.amount;

            if (occ.amount > 0) occAcc.obligationsToCount += 1;
            if (occ.amount > 0) occAcc.obligationsTo += occ.amount;

            return occAcc;
          }, obAcc);

          return obAcc;
        }, acc);

        return acc;
      },
      {
        networth: 0,
        networthTrend: {} as Record<string, any>,
        assetValue: 0,
        assetCount: 0,
        liabilityCount: 0,
        liabilityValue: 0,
        income: 0,
        incomeCount: 0,
        incomeCategories: {} as Record<string, number>,
        expense: 0,
        expenseCount: 0,
        expenseCategories: {} as Record<string, number>,
        obligations: 0,
        obligationsCount: 0,
        obligationsTo: 0,
        obligationsToCount: 0,
      },
    );

    return {
      cards: [
        {
          type: "card",
          label: "Networth",
          icon: "shares",
          colspan: 4,
          data: {
            primary: stats.networth.toLocaleString("en-AU", {
              style: "currency",
              currency: "AUD",
            }),
            color: stats.networth > 0 ? "green" : "red",
          },
        },
        {
          type: "card",
          label: "Assets",
          icon: "asset",
          colspan: 4,
          data: {
            color: "green",
            primary: stats.assetValue.toLocaleString("en-AU", {
              style: "currency",
              currency: "AUD",
            }),
            secondary: stats.assetCount.toString(),
          },
        },
        {
          type: "card",
          label: "Liabilities",
          icon: "liability",
          colspan: 4,
          data: {
            color: "red",
            primary: (-1 * stats.liabilityValue).toLocaleString("en-AU", {
              style: "currency",
              currency: "AUD",
            }),
            secondary: stats.liabilityCount.toString(),
          },
        },
        {
          type: "card",
          label: "Obligations",
          icon: "obligation",
          colspan: 4,
          data: {
            color: "red",
            primary: stats.obligations.toLocaleString("en-AU", {
              style: "currency",
              currency: "AUD",
            }),
            secondary: stats.obligationsCount.toString(),
          },
        },
        {
          type: "card",
          label: "Obligations To",
          icon: "obligationTo",
          colspan: 4,
          data: {
            color: "green",
            primary: stats.obligationsTo.toLocaleString("en-AU", {
              style: "currency",
              currency: "AUD",
            }),
            secondary: stats.obligationsToCount.toString(),
          },
        },
        {
          type: "pad",
          colspan: 4,
        },
        {
          type: "line",
          label: "Net Worth Trend",
          icon: "shares",
          colspan: 4,
          data: {
            config: {
              networth: { label: "Networth", color: "hsl(var(--chart-1))" },
            },
            axis: { dataKey: "month", lineKey: "networth" },
            data: Object.entries(stats.networthTrend).map(([key, value]) => ({
              month: key,
              networth: value.value,
            })),
          },
        },
        {
          type: "pie",
          label: "Income",
          icon: "income",
          colspan: 4,
          data: {
            total: stats.income,
            config: Object.keys(stats.incomeCategories).reduce(
              (acc, key, index) => {
                acc[key] = {
                  label: key,
                  color: `hsl(var(--chart-${(index % 5) + 1}))`,
                };
                return acc;
              },
              {} as Record<string, any>,
            ),
            axis: { dataKey: "amount", nameKey: "category" },
            data: Object.entries(stats.incomeCategories).map(
              ([key, value], index) => ({
                category: key,
                amount: value.toLocaleString("en-AU", {
                  style: "currency",
                  currency: "AUD",
                }),
                fill: `hsl(var(--chart-${(index % 5) + 1}))`,
              }),
            ),
          },
        },
        {
          type: "pie",
          label: "Expenses",
          icon: "expense",
          colspan: 4,
          data: {
            total: stats.expense,
            color: "red",
            config: Object.keys(stats.expenseCategories).reduce(
              (acc, key, index) => {
                acc[key] = {
                  label: key,
                  color: `hsl(var(--chart-${(index % 5) + 1}))`,
                };
                return acc;
              },
              {} as Record<string, any>,
            ),
            axis: { dataKey: "amount", nameKey: "category" },
            data: Object.entries(stats.expenseCategories).map(
              ([key, value], index) => ({
                category: key,
                amount: value.toLocaleString("en-AU", {
                  style: "currency",
                  currency: "AUD",
                }),
                fill: `hsl(var(--chart-${(index % 5) + 1}))`,
              }),
            ),
          },
        },
      ],
    };
  }

  public static generateMonthCols() {
    return [...monthNames, "Total"].reduce(
      (months, name) => {
        months[name] = 0;
        return months;
      },
      {} as Record<string, any>,
    );
  }

  /*
   * for each asset
   * split by category (down)
   * month (across)
   *
   * total for each category, month
   */
  public async getDataForBalance(
    periodFrom: string,
    periodTo: string,
  ): Promise<BalanceSheetProps> {
    const transactions = await prisma.transaction.findMany({
      where: {
        AND: [
          { assetLiability: { portfolioId: this.portfolioId } },
          { createdAt: { gt: periodFrom } },
          { createdAt: { lte: periodTo } },
        ],
      },
      include: {
        assetLiability: {
          select: {
            label: true,
            assetType: { select: { asset: true, icon: true } },
          },
        },
        category: { select: { label: true, expense: true } },
      },
    });

    const balance = transactions.reduce(
      (acc, trans) => {
        const assetKey = trans.assetLiabilityId || "Portfolio";
        const assetLabel = trans.assetLiability?.label || "Portfolio";
        const asset = trans.assetLiability?.assetType?.asset || true;
        const icon = trans.assetLiability?.assetType?.icon || "shares";

        if (!(assetKey in acc))
          acc[assetKey] = {
            icon,
            asset,
            label: assetLabel,
            expense: {
              Total: {
                label: "Total",
                months: PortfolioModel.generateMonthCols(),
              },
            },
            income: {
              Total: {
                label: "Total",
                months: PortfolioModel.generateMonthCols(),
              },
            },
          };

        const expense = trans.category?.expense || false ? "expense" : "income";
        const categoryId = trans.categoryId || "Uncategorised";
        const label = trans.category?.label || "Uncategorised";

        if (!(categoryId in acc[assetKey][expense]))
          acc[assetKey][expense][categoryId] = {
            label,
            months: PortfolioModel.generateMonthCols(),
          };

        // cell for month and category
        acc[assetKey][expense][categoryId].months[
          monthNames[trans.createdAt.getMonth()]
        ] += trans.amount;

        // right most total for each category
        acc[assetKey][expense][categoryId].months.Total += trans.amount;

        // bottom most total for each month
        acc[assetKey][expense].Total[monthNames[trans.createdAt.getMonth()]] +=
          trans.amount;

        // bottom right cell for overall total
        acc[assetKey][expense].Total.months.Total += trans.amount;

        return acc;
      },
      {} as Record<string, any>,
    );

    return balance;
  }
}
