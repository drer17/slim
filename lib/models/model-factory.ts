import { Slug } from "../definitions/response";
import { BaseModel } from "./base";
import { AssetLiabilityModel } from "./tables/asset-liability";
import { AssetLiabilityTypeModel } from "./tables/asset-liability-type";
import { Attribute } from "./tables/attribute";
import { Document } from "./tables/document";
import { EntityModel } from "./tables/entity";
import { ObligationModel } from "./tables/obligation";
import { ObligationRuleModel } from "./tables/obligation-rule";
import { OccurrenceModel } from "./tables/occurrence";
import { TagModel } from "./tables/tag";
import { TransactionModel } from "./tables/transaction";
import { TransactionCategoryModel } from "./tables/transaction-category";
import { ValuationModel } from "./tables/valuation";

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
        const assetLiabilityId = slug[1];
        const id = slug[2];
        return new ObligationModel(assetLiabilityId, id);
      }
      case "obligation-rule": {
        const obligationId = slug[1];
        const obligationRuleId = slug[2];
        return new ObligationRuleModel(obligationId, obligationRuleId);
      }
      case "entity": {
        const id = slug[1];
        return new EntityModel(id);
      }
      case "transaction": {
        const assetLiabilityId = slug[1];
        const id = slug[2];
        return new TransactionModel(assetLiabilityId, id);
      }
      case "transaction-category": {
        const parentId = slug[1];
        const id = slug[2];
        return new TransactionCategoryModel(parentId, id);
      }
      case "valuation": {
        const assetLiabilityId = slug[1];
        const id = slug[2];
        return new ValuationModel(assetLiabilityId, id);
      }
      case "occurrence": {
        const obligationId = slug[1];
        const id = slug[2];
        return new OccurrenceModel(obligationId, id);
      }
      default:
        return new AssetLiabilityModel();
    }
  }
}
