import { AssetLiabilityType } from "@prisma/client";
import { FormDialog, FormProps } from "./types";
import { usePortfolioContext } from "@/app/portfolio/portfolio-provider";
import DialogWrapper from "../core/other/dialog-wrapper";
import { ScrollArea } from "../ui/scroll-area";
import FormRenderer from "./form-renderer";
import React from "react";

const AssetLiabilityTypeForm: React.FC<FormProps<AssetLiabilityType>> = ({
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

  return (
    <DialogWrapper
      className="h-8"
      variant="secondary"
      title={title || "Create Asset Liability Type"}
      label={label || "Create"}
      trigger={trigger}
      invisible={invisible}
      tooltip={tooltip}
      disabled={disabled}
      open={controlledOpen === FormDialog.ASSET_LIABILITY_TYPE || open}
      onOpenChange={() =>
        onOpenChanged(
          controlledOpen === undefined
            ? FormDialog.ASSET_LIABILITY_TYPE
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
              column: "asset",
              label: "Asset",
              type: "boolean",
              placeholder: "Is this an asset?",
              defaultValue: defaults && defaults.asset,
            },
          ]}
        />
      </ScrollArea>
    </DialogWrapper>
  );
};

export default AssetLiabilityTypeForm;
