import { DashboardViewProps } from "@/components/views/dashboard";
import { BaseModel } from "../base";

export abstract class RootModel<T> extends BaseModel<T> {
  public abstract getDataForDashboard(
    periodFrom: string,
    periodTo: string,
  ): Promise<DashboardViewProps>;

  public abstract getDataForBalance(
    periodFrom: string,
    periodTo: string,
  ): Promise<BalanceViewProps>;
}
