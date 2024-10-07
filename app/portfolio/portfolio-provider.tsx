"use client";

import { AssetLiabilityType, Tag, TransactionCategory } from "@prisma/client";
import { createContext, useContext, useState } from "react";

export interface PortfolioState {
  tags: Tag[];
  colorPresets: string[];
  author: string;

  assetLiabilityTypes: AssetLiabilityType[];
  transactionCategories: TransactionCategory[];
}

interface PortfolioContextProps {
  target: string | undefined;
  setTarget: React.Dispatch<React.SetStateAction<string | undefined>>;
  portfolioState: PortfolioState;
}

const PortfolioContext = createContext<PortfolioContextProps | undefined>(
  undefined,
);

export const usePortfolioContext = () => {
  const context = useContext(PortfolioContext);
  if (!context)
    throw new Error("Must use portfolio context from within context provider.");
  return context;
};

interface PortfolioProviderProps {
  tags: Tag[];
  author: string;
  colorPresets: string[];
  assetLiabilityTypes: AssetLiabilityType[];
  transactionCategories: TransactionCategory[];
  children: React.ReactNode;
}

export function PortfolioProvider({
  tags,
  author,
  colorPresets,
  assetLiabilityTypes,
  transactionCategories,
  children,
}: PortfolioProviderProps) {
  const [target, setTarget] = useState<string | undefined>(undefined);

  return (
    <PortfolioContext.Provider
      value={{
        target,
        setTarget,
        portfolioState: {
          author,
          tags,
          colorPresets,
          assetLiabilityTypes,
          transactionCategories,
        },
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}
