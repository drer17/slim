import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { IconCaretUpDownFilled, IconCheck } from "@tabler/icons-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface AutoCompleteProps {
  items: any[];
  labelKey: string;
  valueKey: string;
  idKey: string;
  placeholder?: string;
  buttonClassName?: string;
  commandPrompt?: string;
  values: string[];
  onValueChange: (values: string[]) => void;
  searchTerm?: string;
  onSearchTermChange?: (e: string) => void;
}

export const Combobox: React.FC<AutoCompleteProps> = ({
  items,
  labelKey,
  valueKey,
  idKey,
  placeholder,
  buttonClassName,
  commandPrompt,
  searchTerm,
  onSearchTermChange,
  values,
  onValueChange,
}) => {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between rounded-sm h-8 group",
            buttonClassName,
          )}
        >
          {values
            ?.reduce(
              (string, value) => value.slice(0, 4) + "..., " + string,
              "",
            )
            .slice(0, 20) || placeholder}
          <IconCaretUpDownFilled className="ml-2 h-4 w-4 shrink-0 opacity-50 invisible group-hover:visible" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder={commandPrompt || "Search item..."}
            className="h-8"
            value={searchTerm}
            onChangeCapture={(e) =>
              onSearchTermChange && onSearchTermChange(e.currentTarget.value)
            }
          />
          <CommandList>
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup>
              {items.map((item, idx) => {
                return (
                  <CommandItem
                    key={idx}
                    value={item[valueKey]}
                    aria-required={true}
                    onSelect={() => {
                      onValueChange(
                        values.includes(item[idKey])
                          ? values.filter((v) => v === item[idKey])
                          : [...(values ?? []), item[idKey]],
                      );
                      setOpen(false);
                    }}
                  >
                    <IconCheck
                      className={cn(
                        "h-4 w-4 mr-2",
                        values.includes(item[idKey])
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    {item[labelKey]}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
