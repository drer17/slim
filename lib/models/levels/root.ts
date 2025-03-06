import { DashboardCardProps } from "@/components/core/card/dashboard-card";
import { BaseModel } from "../base";
import { BalanceSheetProps } from "@/components/views/balance-sheet";

export abstract class RootModel<T> extends BaseModel<T> {
  public abstract getDataForDashboard(
    periodFrom: string,
    periodTo: string,
  ): Promise<{ cards: DashboardCardProps[] }>;

  public abstract getDataForBalance(
    periodFrom: string,
    periodTo: string,
  ): Promise<BalanceSheetProps>;
}
