import { TransactionProvider } from "./transaction";

export interface ModelContextProps {
  children: React.ReactNode;
}

export const ModelContext: React.FC<
  ModelContextProps & { modelKey: string }
> = ({ children, modelKey }) => {
  switch (modelKey) {
    case "transaction":
      return <TransactionProvider>{children}</TransactionProvider>;
    default:
      return <>{children}</>;
  }
};
