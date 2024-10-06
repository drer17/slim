export type TableNames = "assetLiability";

export abstract class BaseModelView {
  userId: string;
  viewClass!: string;
  tableName!: TableNames;

  constructor() {
    this.userId = "732ec057-50bc-488f-ab6f-56f733ef2890";
  }
}
