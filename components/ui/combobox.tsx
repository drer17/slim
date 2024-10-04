"use client";

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
  placeholder?: string;
  buttonClassName?: string;
  commandPrompt?: string;
}

export const Combobox: React.FC<AutoCompleteProps> = ({
  items,
  labelKey,
  valueKey,
  placeholder,
  buttonClassName,
  commandPrompt,
}) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [value, setValue] = React.useState("");
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
          {value
            ? items.find((item) => item[valueKey] === value)?.label
            : placeholder
              ? placeholder
              : "Select account..."}
          <IconCaretUpDownFilled className="ml-2 h-4 w-4 shrink-0 opacity-50 invisible group-hover:visible" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder={commandPrompt || "Search item..."}
            className="h-8"
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
                    onSelect={(currentValue) => {
                      setValue(currentValue);
                      setOpen(false);
                    }}
                  >
                    {item[labelKey]}
                    <IconCheck
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === item[valueKey] ? "opacity-100" : "opacity-0",
                      )}
                    />
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
