import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";

export interface DialogWrapperProps {
  label: string | React.ReactNode;
  title: string;
  children?: React.ReactNode;
  description?: string;
  open?: boolean;
  onOpenChange?: () => void;
  onOpenOverride?: boolean;
  invisible?: boolean;
  trigger?: React.ReactNode;
  contentProps?: string;
  tooltip?: string;
}

const DialogWrapper: React.FC<DialogWrapperProps & ButtonProps> = ({
  label,
  title,
  children,
  description,
  trigger,
  open,
  onOpenChange,
  onOpenOverride,
  invisible,
  contentProps,
  tooltip,
  ...props
}) => {
  return (
    <Dialog
      open={invisible ? open : undefined}
      onOpenChange={invisible || onOpenOverride ? onOpenChange : undefined}
    >
      {!invisible && (
        <Tooltip delayDuration={500}>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              {trigger || <Button {...props}>{label}</Button>}
            </DialogTrigger>
          </TooltipTrigger>
          {tooltip && <TooltipContent>{tooltip}</TooltipContent>}
        </Tooltip>
      )}
      <DialogContent className={cn(contentProps, "max-h-lvh")}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default DialogWrapper;
