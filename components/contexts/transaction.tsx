"use client";

import {
  AssetLiability,
  Obligation,
  TransactionCategory,
} from "@prisma/client";
import React, { createContext } from "react";
import { ModelContextProps } from "./model-contexts";
import { get } from "@/lib/actions/get";

interface TransactionContextProps {
  assetLiabilities: AssetLiability[];
  setAssetLiabilities: React.Dispatch<React.SetStateAction<AssetLiability[]>>;
  categories: TransactionCategory[];
  setCategories: React.Dispatch<React.SetStateAction<TransactionCategory[]>>;
  obligations: Obligation[];
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
  const [obligations, setObligations] = React.useState<Obligation[]>([]);
  const [categories, setCategories] = React.useState<TransactionCategory[]>([]);

  React.useEffect(() => {
    const getData = async () => {
      const als = await get(["asset-liability"]);
      const cats = await get(["transaction-category"]);
      const obls = await get(["obligation"]);
      if (Array.isArray(als)) setAssetLiabilities(als);
      if (Array.isArray(cats)) setCategories(cats);
      if (Array.isArray(obls)) setObligations(obls);
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
        obligations,
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
