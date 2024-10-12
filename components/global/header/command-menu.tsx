"use client";

/*
 * Search Component
 *
 * Author: Andre Repanich
 * Date: 05-10-24
 *
 * Component Requirements
 * [ ]- Search site contents
 */

import React from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import { CommandSeparator } from "cmdk";
import { DialogTitle } from "@/components/ui/dialog";
import { usePortfolioContext } from "@/app/portfolio/portfolio-provider";
import Link from "next/link";

export interface CommandAction {
  id: string;
  label: string;
  shortcut?: string;
  link?: string;
  callback?: () => void;
}

const CommandMenu = () => {
  const [open, setOpen] = React.useState(false);
  const { commandState } = usePortfolioContext();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => {
          console.log(open);
          return !open;
        });
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <div
        className="h-8 flex items-center w-52 justify-between rounded-lg p-2 pl-4 dark:bg-zinc-900 dark:border-zinc-800 dark:hover:bg-zinc-800 border group"
        onClick={() => setOpen(true)}
      >
        <p className="text-sm text-muted-foreground dark:group-hover:text-white ">
          Command...
        </p>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </div>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        commandProps={{ shouldFilter: commandState.filterOn }}
      >
        <DialogTitle className="hidden">Command</DialogTitle>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions"></CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Actions">
            {commandState.commandActions.map((action, idx) =>
              action.link ? (
                <Link href={action.link} key={idx}>
                  <CommandItem>
                    <span>{action.label}</span>
                    {action.shortcut && (
                      <CommandShortcut>⌘{action.shortcut}</CommandShortcut>
                    )}
                  </CommandItem>
                </Link>
              ) : (
                <CommandItem
                  key={idx}
                  onClick={() => action.callback && action.callback()}
                >
                  <span>{action.label}</span>
                  {action.shortcut && (
                    <CommandShortcut>⌘{action.shortcut}</CommandShortcut>
                  )}
                </CommandItem>
              ),
            )}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CommandMenu;
