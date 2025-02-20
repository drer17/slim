"use client";

import { getIcon } from "@/components/global/icons";
/*
 * ViewOptions
 *
 * Common drop down menu for view models
 *
 * Author: Andre Repanich
 * Date: 9-10-24
 *
 * Component Requirements:
 * [X]- Render different options for a view
 */

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconDots } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

export type MenuOption = (string | { label: string; href: string })[];
interface ViewOptionProps {
  menuOptions: MenuOption;
  availableMenuOptions: {
    [key: string]: {
      icon: React.ReactNode;
      callable: () => void;
    };
  };
  isInDialog?: boolean;
}

const ViewOptions: React.FC<ViewOptionProps> = ({
  menuOptions,
  availableMenuOptions,
  isInDialog,
}) => {
  if (!menuOptions || isInDialog !== undefined) return null;
  console.log(menuOptions, isInDialog);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="h-8 flex items-center rounded-sm bg-secondary p-2">
          <IconDots />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {menuOptions.map((option, idx) =>
          typeof option === "object" ? (
            <Link href={option?.href} key={option.label}>
              <DropdownMenuItem key={`Menu${idx}`} className="capitalize gap-2">
                {getIcon(option.label)}
                {option.label}
              </DropdownMenuItem>
            </Link>
          ) : (
            <DropdownMenuItem
              key={`Menu${idx}`}
              className="capitalize"
              onClick={() =>
                option in availableMenuOptions &&
                availableMenuOptions[
                  option as keyof typeof availableMenuOptions
                ].callable()
              }
            >
              {getIcon(option)}
              {option}
            </DropdownMenuItem>
          ),
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ViewOptions;
