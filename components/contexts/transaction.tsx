"use client";

import { AssetLiability, TransactionCategory } from "@prisma/client";
import React, { createContext } from "react";
import { ModelContextProps } from "./model-contexts";
import { get } from "@/lib/actions/get";

interface TransactionContextProps {
  assetLiabilities: AssetLiability[];
  setAssetLiabilities: React.Dispatch<React.SetStateAction<AssetLiability[]>>;
  categories: TransactionCategory[];
  setCategories: React.Dispatch<React.SetStateAction<TransactionCategory[]>>;
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
  const [categories, setCategories] = React.useState<TransactionCategory[]>([]);
  console.log(assetLiabilities);

  React.useEffect(() => {
    const getData = async () => {
      const als = await get(["asset-liability"]);
      const cats = await get(["transaction-category"]);
      if (Array.isArray(als)) setAssetLiabilities(als);
      if (Array.isArray(cats)) setCategories(cats);
    };
    getData();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        assetLiabilities,
        setAssetLiabilities,
        categories,
        setCategories,
      }}
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
