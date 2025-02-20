"use client";

import { Entity } from "@prisma/client";
import React, { createContext } from "react";
import { ModelContextProps } from "./model-contexts";
import { get } from "@/lib/actions/get";

interface ObligationContextProps {
  entities: Entity[];
  setEntities: React.Dispatch<React.SetStateAction<Entity[]>>;
}

const ObligationContext = createContext<ObligationContextProps | undefined>(
  undefined,
);

export const ObligationProvider: React.FC<ModelContextProps> = ({
  children,
}) => {
  const [entities, setEntities] = React.useState<Entity[]>([]);

  React.useEffect(() => {
    const getData = async () => {
      const data = await get(["entity"]);
      if (Array.isArray(data)) setEntities(data);
    };
    getData();
  }, []);

  return (
    <ObligationContext.Provider value={{ entities, setEntities }}>
      {children}
    </ObligationContext.Provider>
  );
};

export const useObligationContext = () => {
  const context = React.useContext(ObligationContext);
  if (context === undefined)
    throw new Error("Cannot use context outside provider.");
  return context;
};
