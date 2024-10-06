"use client";

import { createContext, useContext, useState } from "react";

interface PortfolioContextProps {
  target: string | undefined;
  setTarget: (target: string | undefined) => void;
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

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [target, setTarget] = useState<string | undefined>(undefined);

  return (
    <PortfolioContext.Provider value={{ target, setTarget }}>
      {children}
    </PortfolioContext.Provider>
  );
}
