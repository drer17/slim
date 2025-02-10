import { Entity } from "@prisma/client";
import { FormDialog, FormProps } from "./types";
import { usePortfolioContext } from "@/app/portfolio/portfolio-provider";
import DialogWrapper from "../core/other/dialog-wrapper";
import { ScrollArea } from "../ui/scroll-area";
import FormRenderer from "./form-renderer";

const EntityForm: React.FC<FormProps<Entity>> = ({
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
      title={title || "Create Entity"}
      label={label || "Create"}
      trigger={trigger}
      invisible={invisible}
      tooltip={tooltip}
      disabled={disabled}
      open={controlledOpen === FormDialog.ENTITY || open}
      onOpenChange={() =>
        onOpenChanged(
          controlledOpen === undefined ? FormDialog.ENTITY : undefined,
        )
      }
    >
      <ScrollArea className="max-h-[calc(100vh-100px)]">
        <FormRenderer
          tableName="entity"
          callback={callback}
          model={defaults}
          columns={[
            {
              column: "name",
              label: "Label",
              type: "string",
              placeholder: "Name your Entity",
              defaultValue: defaults && defaults.name,
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

export default EntityForm;
