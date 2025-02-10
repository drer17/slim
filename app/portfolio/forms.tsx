"use client";

import AssetLiabilityForm from "@/components/forms/asset-liability";
import { usePortfolioContext } from "./portfolio-provider";
import { FormProps } from "react-hook-form";
import { AssetLiability, Entity, Obligation } from "@prisma/client";
import ObligationForm from "@/components/forms/obligations";
import EntityForm from "@/components/forms/entities";

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
    </>
  );
};

export default Forms;
