"use client";

import AssetLiabilityForm from "@/components/forms/asset-liability";
import { usePortfolioContext } from "./portfolio-provider";
import { FormProps } from "react-hook-form";
import { AssetLiability } from "@prisma/client";

const Forms: React.FC = () => {
  const { formKwargs } = usePortfolioContext();
  return (
    <>
      <AssetLiabilityForm
        invisible={true}
        {...(formKwargs as FormProps<AssetLiability>)}
      />
    </>
  );
};

export default Forms;
