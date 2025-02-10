import { Slug } from "../definitions/response";
import { BaseModel } from "./base";
import { AssetLiabilityModel } from "./tables/asset-liability";
import { AssetLiabilityTypeModel } from "./tables/asset-liability-type";
import { Attribute } from "./tables/attribute";
import { Document } from "./tables/document";
import { EntityModel } from "./tables/entity";
import { ObligationModel } from "./tables/obligation";
import { TagModel } from "./tables/tag";

export class ModelFactory {
  public static create(slug: Slug): BaseModel {
    if (!slug) return new AssetLiabilityModel();

    const model = slug[0];
    switch (model) {
      case "asset-liability-type": {
        const id = slug[1];
        return new AssetLiabilityTypeModel(id);
      }
      case "asset-liability": {
        const assetOrLiability = slug[1];
        const id = slug[2];
        return new AssetLiabilityModel(assetOrLiability, id);
      }
      case "tag": {
        const id = slug[1];
        return new TagModel(id);
      }
      case "attribute": {
        const id = slug[1];
        return new Attribute(id);
      }
      case "document": {
        const id = slug[1];
        return new Document(id);
      }
      case "obligation": {
        const id = slug[1];
        return new ObligationModel(id);
      }
      case "entity": {
        const id = slug[1];
        return new EntityModel(id);
      }
      default:
        return new AssetLiabilityModel();
    }
  }
}
