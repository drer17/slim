import { BaseModelView } from "./base";
import { AssetLiabilityModel } from "./tables/asset-liability";

export type TableNames = "assetLiability";

export class ModelFactory {
  public static create(slug: string): BaseModelView {
    if (!slug) return new AssetLiabilityModel();

    const model = slug[0];
    switch (model) {
      case "asset-liability":
        return new AssetLiabilityModel(slug[1], slug[2]);
      default:
        return new AssetLiabilityModel();
    }
  }
}
