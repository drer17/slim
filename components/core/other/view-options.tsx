"use client";

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
import React from "react";

interface ViewOptionProps {
  menuOptions: string[];
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="h-8 flex items-center rounded-sm bg-secondary p-2">
          <IconDots />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {menuOptions.map((option, idx) => (
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
            {
              availableMenuOptions[option as keyof typeof availableMenuOptions]
                .icon
            }
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ViewOptions;
