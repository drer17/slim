"use client";

import { AssetLiabilityType, Tag, TransactionCategory } from "@prisma/client";
import { createContext, useContext, useEffect, useState } from "react";
import Forms from "./forms";
import { FormDialog, FormKwargs } from "@/components/forms/types";
import { createOccurrences } from "@/lib/actions/create";

export interface PortfolioState {
  tags: Tag[];
  colorPresets: string[];
  author: string;

  assetLiabilityTypes: AssetLiabilityType[];
  transactionCategories: TransactionCategory[];
}

interface PortfolioContextProps {
  portfolioId: string | undefined;
  setPortfolioId: React.Dispatch<React.SetStateAction<string | undefined>>;
  portfolioState: PortfolioState;

  openForm: FormDialog | undefined;
  setOpenForm: React.Dispatch<React.SetStateAction<FormDialog | undefined>>;
  formKwargs: FormKwargs<any>;
  setFormKwargs: React.Dispatch<React.SetStateAction<FormKwargs<any>>>;
}

const PortfolioContext = createContext<PortfolioContextProps | undefined>(
  undefined,
);

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
  const [portfolioId, setPortfolioId] = useState<string | undefined>(undefined);
  const [formKwargs, setFormKwargs] = useState<Record<string, any>>({});
  const [openForm, setOpenForm] = useState<FormDialog | undefined>(undefined);

  // todo add delay to this
  useEffect(() => {
    const updateOccurrences = async () => {
      createOccurrences();
    };
    updateOccurrences();
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        portfolioId,
        setPortfolioId,
        formKwargs,
        setFormKwargs,
        openForm,
        setOpenForm,
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
      <Forms />
    </PortfolioContext.Provider>
  );
}

export const usePortfolioContext = () => {
  const context = useContext(PortfolioContext);
  if (!context)
    throw new Error("Must use portfolio context from within context provider.");
  return context;
};
