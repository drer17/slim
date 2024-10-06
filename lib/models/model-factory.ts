import { BaseModel } from "./base";
import { AssetLiabilityModel } from "./tables/asset-liability";

export class ModelFactory {
  public static create(slug: (string | undefined)[]): BaseModel {
    if (!slug) return new AssetLiabilityModel();

    const model = slug[0];
    switch (model) {
      case "asset-liability": {
        const assetOrLiability = slug[1];
        const id = slug[2];
        return new AssetLiabilityModel(assetOrLiability, id);
      }
      default:
        return new AssetLiabilityModel();
    }
  }
}
