import { AssetLiability, TransactionCategory } from "@prisma/client";
import { FormDialog, FormProps } from "./types";
import { usePortfolioContext } from "@/app/portfolio/portfolio-provider";
import DialogWrapper from "../core/other/dialog-wrapper";
import { ScrollArea } from "../ui/scroll-area";
import FormRenderer from "./form-renderer";
import React from "react";
import { get } from "@/lib/actions/get";

const TransactionCategoryForm: React.FC<FormProps<TransactionCategory>> = ({
  title,
  label,
  trigger,
  invisible,
  tooltip,
  open,
  disabled,
  callback,
  defaults,
}) => {
  const { openForm: controlledOpen, setOpenForm: onOpenChanged } =
    usePortfolioContext();
  const [categories, setCategories] = React.useState<TransactionCategory[]>([]);
  const [assets, setAssets] = React.useState<AssetLiability[]>([]);

  React.useEffect(() => {
    const getData = async () => {
      const cats = await get(["transaction-categories"]);
      const als = await get(["asset-liability"]);
      if (Array.isArray(cats)) setCategories(cats);
      if (Array.isArray(als)) setAssets(als);
    };
    getData();
  }, []);

  return (
    <DialogWrapper
      className="h-8"
      variant="secondary"
      title={title || "Create Transaction Category"}
      label={label || "Create"}
      trigger={trigger}
      invisible={invisible}
      tooltip={tooltip}
      disabled={disabled}
      open={controlledOpen === FormDialog.TRANSACTION_CATEGORY || open}
      onOpenChange={() =>
        onOpenChanged(
          controlledOpen === undefined
            ? FormDialog.TRANSACTION_CATEGORY
            : undefined,
        )
      }
    >
      <ScrollArea className="max-h-[calc(100vh-100px)]">
        <FormRenderer
          tableName="transactionCategory"
          callback={callback}
          model={defaults}
          columns={[
            {
              column: "label",
              label: "Label",
              type: "string",
              placeholder: "Name your Category",
              defaultValue: defaults && defaults.label,
            },
            {
              column: "parentId",
              label: "Parent",
              type: "select",
              possibleValues: categories,
              optional: true,
              placeholder: "Create a nested category",
              defaultValue: defaults && defaults.parentId,
            },
            {
              column: "assetId",
              label: "Asset",
              type: "select",
              possibleValues: assets,
              placeholder: "Create a category for an asset or liability",
              defaultValue: defaults && defaults.assetId,
            },
            {
              column: "expense",
              label: "Expense",
              type: "boolean",
              placeholder: "Is this an expense category?",
              defaultValue: defaults && defaults.expense,
            },
          ]}
        />
      </ScrollArea>
    </DialogWrapper>
  );
};

export default TransactionCategoryForm;
