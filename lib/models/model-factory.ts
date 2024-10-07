import { Slug } from "../definitions/response";
import { BaseModel } from "./base";
import { AssetLiabilityModel } from "./tables/asset-liability";
import { Attribute } from "./tables/attribute";
import { Tag } from "./tables/tag";

export class ModelFactory {
  public static create(slug: Slug): BaseModel {
    if (!slug) return new AssetLiabilityModel();

    const model = slug[0];
    switch (model) {
      case "asset-liability": {
        const assetOrLiability = slug[1];
        const id = slug[2];
        return new AssetLiabilityModel(assetOrLiability, id);
      }
      case "tag": {
        const id = slug[1];
        return new Tag(id);
      }
      case "attribute": {
        const id = slug[1];
        return new Attribute(id);
      }
      default:
        return new AssetLiabilityModel();
    }
  }
}
