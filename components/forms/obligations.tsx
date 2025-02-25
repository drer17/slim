import { FormDialog, FormProps } from "./types";
import { usePortfolioContext } from "@/app/portfolio/portfolio-provider";
import DialogWrapper from "../core/other/dialog-wrapper";
import { ScrollArea } from "../ui/scroll-area";
import FormRenderer from "./form-renderer";
import { Obligation } from "@prisma/client";

const ObligationForm: React.FC<FormProps<Obligation>> = ({
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
      open={controlledOpen === FormDialog.OBLIGATION || open}
      onOpenChange={() =>
        onOpenChanged(
          controlledOpen === undefined ? FormDialog.OBLIGATION : undefined,
        )
      }
    >
      <ScrollArea className="max-h-[calc(100vh-100px)]">
        <FormRenderer
          tableName="obligation"
          callback={callback}
          model={defaults}
          columns={[
            {
              column: "label",
              label: "Label",
              type: "string",
              placeholder: "Name your Obligation",
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
          ]}
        />
      </ScrollArea>
    </DialogWrapper>
  );
};

export default ObligationForm;
