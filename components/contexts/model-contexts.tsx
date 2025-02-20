import { ObligationProvider } from "./obligations";
import { TransactionProvider } from "./transaction";
import { TransactionCategoryProvider } from "./transaction-categories";

export interface ModelContextProps {
  children: React.ReactNode;
}

export const ModelContext: React.FC<
  ModelContextProps & { modelKey: string }
> = ({ children, modelKey }) => {
  switch (modelKey) {
    case "transactions":
      return <TransactionProvider>{children}</TransactionProvider>;
    case "transactionCategories":
      return (
        <TransactionCategoryProvider>{children}</TransactionCategoryProvider>
      );
    case "obligations":
      return <ObligationProvider>{children}</ObligationProvider>;
    default:
      return <>{children}</>;
  }
};
