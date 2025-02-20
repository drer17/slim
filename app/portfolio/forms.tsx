"use client";

import AssetLiabilityForm from "@/components/forms/asset-liability";
import { usePortfolioContext } from "./portfolio-provider";
import { FormProps } from "react-hook-form";
import {
  AssetLiability,
  AssetLiabilityType,
  Entity,
  Obligation,
  Transaction,
  TransactionCategory,
  Valuation,
} from "@prisma/client";
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
      <AssetLiabilityForm
        invisible={true}
        {...(formKwargs as FormProps<AssetLiability>)}
      />
      <ObligationForm
        invisible={true}
        {...(formKwargs as FormProps<Obligation>)}
      />
      <EntityForm invisible={true} {...(formKwargs as FormProps<Entity>)} />
      <TransactionForm
        invisible={true}
        {...(formKwargs as FormProps<Transaction>)}
      />
      <TransactionCategoryForm
        invisible={true}
        {...(formKwargs as FormProps<TransactionCategory>)}
      />
      <ValuationForm
        invisible={true}
        {...(formKwargs as FormProps<Valuation>)}
      />
      <AssetLiabilityTypeForm
        invisible={true}
        {...(formKwargs as FormProps<AssetLiabilityType>)}
      />
    </>
  );
};

export default Forms;
