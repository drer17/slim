import { FormDialog } from "@/app/portfolio/forms";
import DialogWrapper from "../core/other/dialog-wrapper";
import { ScrollArea } from "../ui/scroll-area";
import { FormProps } from "./types";
import FormRenderer from "./form-renderer";
import { AssetLiability } from "@prisma/client";
import { usePortfolioContext } from "@/app/portfolio/portfolio-provider";

const AssetLiabilityForm: React.FC<FormProps<AssetLiability>> = ({
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
  const {
    portfolioState,
    openForm: controlledOpen,
    setOpenForm: onOpenChanged,
  } = usePortfolioContext();

  return (
    <DialogWrapper
      className="h-8"
      variant="secondary"
      title={title || "Create Asset Liability"}
      label={label || "Create"}
      trigger={trigger}
      invisible={invisible}
      tooltip={tooltip}
      disabled={disabled}
      open={controlledOpen === FormDialog.ASSET_LIABILITY || open}
      onOpenChange={() =>
        onOpenChanged(
          controlledOpen === undefined ? FormDialog.ASSET_LIABILITY : undefined,
        )
      }
    >
      <ScrollArea className="max-h-[calc(100vh-100px)]">
        <FormRenderer
          tableName="Model"
          callback={callback}
          model={defaults}
          columns={[
            {
              column: "label",
              label: "Label",
              type: "string",
              placeholder: "Name your Asset or Liability",
              defaultValue: defaults && defaults.label,
            },
            {
              column: "description",
              label: "Description",
              type: "string",
              optional: true,
              placeholder: "Add a description",
              defaultValue: defaults && defaults.description,
            },
            {
              column: "assetTypeId",
              label: "Type",
              type: "select",
              placeholder: "Select the type",
              possibleValues: portfolioState.assetLiabilityTypes,
              defaultValue: defaults && defaults.assetTypeId,
            },
          ]}
        />
      </ScrollArea>
    </DialogWrapper>
  );
};

export default AssetLiabilityForm;
