"use client";

import { AssetLiability, TransactionCategory } from "@prisma/client";
import React, { createContext } from "react";
import { ModelContextProps } from "./model-contexts";
import { get } from "@/lib/actions/get";

interface TransactionCategoryContextProps {
  assetLiabilities: AssetLiability[];
  setAssetLiabilities: React.Dispatch<React.SetStateAction<AssetLiability[]>>;
  categories: TransactionCategory[];
  setCategories: React.Dispatch<React.SetStateAction<TransactionCategory[]>>;
}

const TransactionCategoryContext = createContext<
  TransactionCategoryContextProps | undefined
>(undefined);

export const TransactionCategoryProvider: React.FC<ModelContextProps> = ({
  children,
}) => {
  const [assetLiabilities, setAssetLiabilities] = React.useState<
    AssetLiability[]
  >([]);
  const [categories, setCategories] = React.useState<TransactionCategory[]>([]);

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
    <TransactionCategoryContext.Provider
      value={{
        assetLiabilities,
        setAssetLiabilities,
        categories,
        setCategories,
      }}
    >
      {children}
    </TransactionCategoryContext.Provider>
  );
};

export const useTransactionCategoryContext = () => {
  const context = React.useContext(TransactionCategoryContext);
  if (context === undefined)
    throw new Error("Cannot use context outside provider.");
  return context;
};
