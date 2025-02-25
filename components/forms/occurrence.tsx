import { Occurrence } from "@prisma/client";
import { FormDialog, FormProps } from "./types";
import { usePortfolioContext } from "@/app/portfolio/portfolio-provider";
import DialogWrapper from "../core/other/dialog-wrapper";
import { ScrollArea } from "../ui/scroll-area";
import FormRenderer from "./form-renderer";

const OccurrenceForm: React.FC<FormProps<Occurrence>> = ({
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
      title={title || "Create Obligation"}
      label={label || "Create"}
      trigger={trigger}
      invisible={invisible}
      tooltip={tooltip}
      disabled={disabled}
      open={controlledOpen === FormDialog.OCCURRENCE || open}
      onOpenChange={() =>
        onOpenChanged(
          controlledOpen === undefined ? FormDialog.OCCURRENCE : undefined,
        )
      }
    >
      <ScrollArea className="max-h-[calc(100vh-100px)]">
        <FormRenderer
          tableName="occurrence"
          callback={callback}
          model={defaults}
          columns={[
            {
              column: "amount",
              label: "Amount",
              type: "number",
              placeholder: "Occurence amount",
              defaultValue: defaults && defaults.amount,
            },
            {
              column: "description",
              label: "Description",
              type: "string",
              optional: true,
              placeholder: "Occurrence Description",
              defaultValue: defaults && defaults.description,
            },
            {
              column: "startDate",
              label: "Start Date",
              type: "date",
              placeholder: "Select the start date",
              defaultValue: defaults && defaults.startDate,
            },
          ]}
        />
      </ScrollArea>
    </DialogWrapper>
  );
};

export default OccurrenceForm;
