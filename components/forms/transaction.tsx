import { Transaction } from "@prisma/client";
import { FormDialog, FormProps } from "./types";
import { usePortfolioContext } from "@/app/portfolio/portfolio-provider";
import DialogWrapper from "../core/other/dialog-wrapper";
import { ScrollArea } from "../ui/scroll-area";
import FormRenderer from "./form-renderer";

const TransactionForm: React.FC<FormProps<Transaction>> = ({
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
      title={title || "Create Transaction"}
      label={label || "Create"}
      trigger={trigger}
      invisible={invisible}
      tooltip={tooltip}
      disabled={disabled}
      open={controlledOpen === FormDialog.TRANSACTION || open}
      onOpenChange={() =>
        onOpenChanged(
          controlledOpen === undefined ? FormDialog.TRANSACTION : undefined,
        )
      }
    >
      <ScrollArea className="max-h-[calc(100vh-100px)]">
        <FormRenderer
          tableName="transaction"
          callback={callback}
          model={defaults}
          columns={[
            {
              column: "label",
              label: "Label",
              type: "string",
              placeholder: "Name your Entity",
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
              column: "date",
              label: "Date",
              type: "date",
              placeholder: "The transaction date",
              defaultValue: defaults && defaults.date,
            },
            {
              column: "amount",
              label: "Amount",
              type: "number",
              placeholder: "Add transaction amount",
              defaultValue: defaults && defaults.amount,
            },
          ]}
        />
      </ScrollArea>
    </DialogWrapper>
  );
};

export default TransactionForm;
