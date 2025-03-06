"use client";

import AssetLiabilityForm from "@/components/forms/asset-liability";
import { usePortfolioContext } from "./portfolio-provider";
import ObligationForm from "@/components/forms/obligations";
import EntityForm from "@/components/forms/entities";
import TransactionForm from "@/components/forms/transaction";
import ValuationForm from "@/components/forms/valuation";
import TransactionCategoryForm from "@/components/forms/transaction-category";
import AssetLiabilityTypeForm from "@/components/forms/asset-liability-type";

const Forms: React.FC = () => {
  const { formKwargs } = usePortfolioContext();
  return (
    <>
      <AssetLiabilityForm invisible={true} {...(formKwargs as any)} />
      <ObligationForm invisible={true} {...(formKwargs as any)} />
      <EntityForm invisible={true} {...(formKwargs as any)} />
      <TransactionForm invisible={true} {...(formKwargs as any)} />
      <TransactionCategoryForm invisible={true} {...(formKwargs as any)} />
      <ValuationForm invisible={true} {...(formKwargs as any)} />
      <AssetLiabilityTypeForm invisible={true} {...(formKwargs as any)} />
    </>
  );
};

export default Forms;
