"use server";

import { Level2RowViewProps } from "@/components/views/level-2-row-view";
import { Level2Model } from "../models/levels/level-2";
import { ModelFactory } from "../models/model-factory";
import { Slug, ToastProps } from "../definitions/response";
import { RootModel } from "../models/levels/root";
import { BalanceSheetProps } from "@/components/views/balance-sheet";
import { DashboardCardProps } from "@/components/core/card/dashboard-card";
import { ObligationModel } from "../models/tables/obligation";
import { Level1Model } from "../models/levels/level-1";
import { Level3Model } from "../models/levels/level-3";
import { Level4Model } from "../models/levels/level-4";
import { Level5Model } from "../models/levels/level-5";

export async function getRowData(
  slug: Slug,
): Promise<{ viewLevel: string; data: Level2RowViewProps } | undefined> {
  const model = ModelFactory.create(slug);
  if (model instanceof Level2Model) {
    return { viewLevel: "level-2", data: await model.getDataForRow() };
  }
  return undefined;
}

export async function getTableData(
  slug: Slug,
  page: number,
  limit: number,
): Promise<any[]> {
  const model = ModelFactory.create(slug);
  if (
    model instanceof Level1Model ||
    model instanceof Level3Model ||
    model instanceof Level4Model ||
    model instanceof Level5Model
  ) {
    const data = await model.getDataForTable(limit, page);
    return data.rows;
  }
  return [];
}

export async function get(slug: Slug): Promise<any[] | ToastProps> {
  const model = ModelFactory.create(slug);
  return model.get();
}

export async function getDashboardData(
  slug: Slug,
  dateFrom: string,
  dateTo: string,
): Promise<{ cards: DashboardCardProps[] }> {
  const model = ModelFactory.create(slug);
  if (model instanceof RootModel) {
    return await model.getDataForDashboard(dateFrom, dateTo);
  }
  return { cards: [] };
}

export async function getBalanceData(
  slug: Slug,
  dateFrom: string,
  dateTo: string,
): Promise<BalanceSheetProps | undefined> {
  const model = ModelFactory.create(slug);
  if (model instanceof RootModel) {
    return await model.getDataForBalance(dateFrom, dateTo);
  }
  return undefined;
}

export async function getLedgerData(slug: Slug) {
  console.log(slug[0]);
  const model = ModelFactory.create([
    "obligation",
    undefined,
    slug[0],
  ]) as ObligationModel;
  return await model.getLedger();
}
