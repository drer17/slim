"use client";

import { AssetLiability } from "@prisma/client";
import React, { createContext } from "react";
import { ModelContextProps } from "./model-contexts";
import { get } from "@/lib/actions/get";

interface TransactionContextProps {
  assetLiabilities: AssetLiability[];
  setAssetLiabilities: React.Dispatch<React.SetStateAction<AssetLiability[]>>;
}

const TransactionContext = createContext<TransactionContextProps | undefined>(
  undefined,
);

export const TransactionProvider: React.FC<ModelContextProps> = ({
  children,
}) => {
  const [assetLiabilities, setAssetLiabilities] = React.useState<
    AssetLiability[]
  >([]);

  React.useEffect(() => {
    const getData = async () => {
      const data = await get(["asset-liability"]);
      console.log(data);
      if (Array.isArray(data)) setAssetLiabilities(data);
    };
    getData();
  }, []);

  return (
    <TransactionContext.Provider
      value={{ assetLiabilities, setAssetLiabilities }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  const context = React.useContext(TransactionContext);
  if (context === undefined)
    throw new Error("Cannot use context outside provider.");
  return context;
};
