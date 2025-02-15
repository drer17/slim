import { ObligationRule } from "@prisma/client";
import { FormDialog, FormProps } from "./types";
import { usePortfolioContext } from "@/app/portfolio/portfolio-provider";
import DialogWrapper from "../core/other/dialog-wrapper";
import { ScrollArea } from "../ui/scroll-area";
import FormRenderer from "./form-renderer";
import React from "react";

const ObligationRuleForm: React.FC<
  FormProps<
    ObligationRule & { obligationRuleId?: string; obligationId?: string }
  >
> = ({
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
    openForm: controlledOpen,
    setOpenForm: onOpenChanged,
    setFormKwargs,
  } = usePortfolioContext();

  React.useEffect(() => {
    setFormKwargs({
      slug: [
        "obligation-rule",
        defaults?.obligationId,
        defaults?.obligationRuleId,
      ],
    });
  }, [setFormKwargs, defaults?.obligationRuleId, defaults?.obligationId]);

  return (
    <DialogWrapper
      className="h-8 w-full"
      variant="secondary"
      title={title || "Edit Obligation Rule"}
      label={label || "Edit"}
      trigger={trigger}
      invisible={invisible}
      tooltip={tooltip}
      disabled={disabled}
      open={controlledOpen === FormDialog.OBLIGATION_RULE || open}
      onOpenChange={() =>
        onOpenChanged(
          controlledOpen === undefined ? FormDialog.OBLIGATION_RULE : undefined,
        )
      }
    >
      <ScrollArea className="max-h-[calc(100vh-100px)]">
        <FormRenderer
          tableName="obligationRule"
          callback={callback}
          model={defaults}
          columns={[
            {
              column: "amount",
              label: "Amount",
              type: "number",
              placeholder: "Add the obligation amount",
              defaultValue: defaults && defaults.amount,
            },
            {
              column: "frequency",
              label: "Frequency",
              type: "number",
              placeholder: "The frequency of the rule",
              defaultValue: defaults && defaults.frequency,
            },
            {
              column: "frequencyUnits",
              label: "Frequency Unit",
              type: "select",
              possibleValues: [
                { label: "Day", id: "day" },
                { label: "Week", id: "week" },
                { label: "Fortnight", id: "fortnight" },
                { label: "Month", id: "month" },
                { label: "Year", id: "Year" },
              ],
              placeholder: "Select the duration",
              defaultValue: defaults && defaults.frequencyUnits,
            },
            {
              column: "startDate",
              label: "Start Date",
              type: "date",
              placeholder: "Select the starting date",
              defaultValue: defaults && defaults.startDate,
            },
            {
              column: "endDate",
              label: "End Date",
              type: "date",
              placeholder: "Select the ending date",
              optional: true,
              defaultValue: defaults && defaults.endDate,
            },
          ]}
        />
      </ScrollArea>
    </DialogWrapper>
  );
};

export default ObligationRuleForm;
