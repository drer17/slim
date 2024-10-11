"use client";

/*
 * Tag
 *
 * Author: Andre Repanich
 * Date: 29-09-24
 *
 * Component Requirements
 *  - Display
 *    - Label
 *  - Highlight a color
 *  - OnHover
 *    - If condensed, show tooltip
 *  - OnRightClick show options to change color and remove
 */

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getComplementaryColor } from "@/lib/utilities/color";
import { Tag } from "@prisma/client";
import { IconMinus, IconX } from "@tabler/icons-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import SwatchesPicker from "@/components/ui/swatches-picker";
import { update } from "@/lib/actions/update";
import { useToast } from "@/hooks/use-toast";
import { ToastProps } from "@/components/ui/toast";
import React from "react";
import { usePortfolioContext } from "@/app/portfolio/portfolio-provider";
import { useDebouncedCallback } from "use-debounce";
import useUpdateEffect from "@/hooks/use-update-effect";
import { deleteItem } from "@/lib/actions/delete";

const TagComponent: React.FC<
  Tag & {
    detail?: boolean;
    removeTagCallback?: (id: string) => void;
  }
> = ({ id, label, color, detail, removeTagCallback }) => {
  const { toast } = useToast();
  const {
    portfolioState: { colorPresets },
  } = usePortfolioContext();
  const [newColor, setColor] = React.useState<string>(color || "");
  const changeColor = useDebouncedCallback((color: string) => {
    const change = async () => {
      const res = update(["tag", id], { color: color });
      if (res) toast(res as ToastProps);
    };
    change();
  }, 1000);
  useUpdateEffect(() => changeColor(newColor), [changeColor, newColor]);

  const deleteTag = async () => {
    const res = deleteItem(["tag", id]);
    if (res) toast(res as ToastProps);
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger
        className="w-full"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Tooltip>
          <TooltipTrigger
            className="rounded-sm justify-between max-h-4 flex w-auto items-center p-2 bg-zinc-500 group"
            style={{
              background: newColor || undefined,
              height: !detail ? "16px" : undefined,
              width: !detail ? "100%" : undefined,
            }}
          >
            {detail && (
              <p
                className="text-xs uppercase font-medium"
                style={{ color: getComplementaryColor(newColor || undefined) }}
              >
                {label}
              </p>
            )}
          </TooltipTrigger>
          {!detail && (
            <TooltipContent side="right" className="capitalize">
              {label}
            </TooltipContent>
          )}
        </Tooltip>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuSub>
          <ContextMenuSubTrigger onClick={(e) => e.stopPropagation()}>
            Change Color
          </ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <SwatchesPicker
              color={newColor || ""}
              onChange={setColor}
              presetColors={colorPresets}
            />
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuItem
          onClick={(e) => {
            e.stopPropagation();
            removeTagCallback && removeTagCallback(id);
          }}
        >
          <span>
            <IconMinus className="h-4 w-4 mr-2" />
          </span>
          Remove Tag Link
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem
          onClick={(e) => {
            e.stopPropagation();
            deleteTag();
          }}
        >
          <span className="dark:text-red-700 text-red-300">
            <IconX className="h-4 w-4 mr-2" />
          </span>
          Delete Tag
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default TagComponent;
