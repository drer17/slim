"use client";

/*
 * Card
 *
 * Author: Andre Repanich
 * Date: 29-09-24
 *
 * Component Requirements
 *  - Display
 *    - Icon
 *    - Title text
 *    - Secondary text
 *    - Primary content
 *    - Tags
 *    - Starred
 *  - Has two height options
 *  - Highlight a color
 *  - OnHover
 *    - Change background
 *    - Tooltip
 *  - OnClick / Press
 *    - Expand card
 *    - Option to go to href
 *  - OnRightClick / Hold
 *    - Display context menu
 *      - Callbacks
 *        - Change color
 *        - Star
 *        - Archive
 */

import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  IconArchive,
  IconArrowUpRight,
  IconStar,
  IconStarFilled,
} from "@tabler/icons-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { ContextMenuSeparator } from "@radix-ui/react-context-menu";
import { useDebouncedCallback } from "use-debounce";
import TagComponent from "../tag/tag";
import ExpandedContent from "../expanded-content/expanded-content";
import { ScrollArea } from "@/components/ui/scroll-area";
import SwatchesPicker from "@/components/ui/swatches-picker";
import Link from "next/link";
import Favourite from "../other/favourite";
import { Tag } from "@prisma/client";

export interface CardProps {
  icon: React.ReactNode;
  title: string;
  secondary?: string;
  primary: React.ReactNode;
  tags: Tag[];
  starred?: boolean;
  condensed?: boolean;
  color?: string;
  presetColors: string[];
  href?: string;
  children?: React.ReactNode;
  changeColorCallback: (color: string) => void;
  changeStarCallback: (star: boolean) => void;
  archiveCallback: () => void;
}

const Card: React.FC<CardProps> = ({
  icon,
  title,
  secondary,
  primary,
  tags,
  starred,
  condensed,
  color,
  presetColors,
  href,
  children,
  changeColorCallback,
  changeStarCallback,
  archiveCallback,
}) => {
  const [focussed, setFocussed] = React.useState<boolean>(false);
  const [newColor, setColor] = React.useState<string>(color || "#18181b");

  const changeColor = useDebouncedCallback((color: string) => {
    changeColorCallback(color);
  }, 1000);

  useEffect(() => changeColor(newColor), [changeColor, newColor]);

  const cardContents = (
    <div className="dark:bg-zinc-900 bg-zinc-100 rounded-md min-w-44 h-36 grid grid-cols-5 gap-2 p-4 pt-2 group transition-transform transform hover:scale-105">
      <div
        className="flex items-center justify-center text-zinc-500"
        style={{ color: newColor }}
      >
        {icon}
      </div>
      <div className="col-span-3 flex items-center">
        <Tooltip>
          <TooltipTrigger>
            <div className="font-bold">{title}</div>
          </TooltipTrigger>
          {secondary && <TooltipContent>{secondary}</TooltipContent>}
        </Tooltip>
      </div>
      <Favourite starred={starred} changeStarCallback={changeStarCallback} />
      <ScrollArea className="row-span-2 flex justify-start flex-col">
        {tags.map((tag) => (
          <React.Fragment key={tag.id}>
            <TagComponent {...tag} />
            <div className="h-1" />
          </React.Fragment>
        ))}
      </ScrollArea>
      <div className="col-span-4"></div>
      <div className="col-span-4 flex items-end text-lg">{primary}</div>
    </div>
  );

  const condensedContents = (
    <div className="dark:bg-zinc-900 bg-zinc-100 rounded-md min-w-44 h-24 grid grid-cols-5 gap-2 p-4 pt-2 group transition-transform transform hover:scale-105">
      <div className="col-span-4 flex items-center">
        <div className="font-bold">{title}</div>
      </div>
      <ScrollArea className="row-span-2 flex justify-start flex-col">
        {tags.map((tag) => (
          <React.Fragment key={tag.id}>
            <TagComponent {...tag} />
            <div className="h-1" />
          </React.Fragment>
        ))}
      </ScrollArea>
      <div className="col-span-4 flex items-end">{secondary}</div>
    </div>
  );

  return (
    <div className="flex w-full">
      <ContextMenu>
        <ContextMenuTrigger className="w-full">
          <div onClick={() => setFocussed(true)}>
            {condensed ? condensedContents : cardContents}
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuSub>
            <ContextMenuSubTrigger>Change Color</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <SwatchesPicker
                color={newColor}
                onChange={setColor}
                presetColors={presetColors}
              />
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuItem
            className="dark:text-red-700 text-red-300"
            onClick={() => archiveCallback()}
          >
            <span>
              <IconArchive className="h-4 w-4 mr-2" />
            </span>
            Archive
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <AnimatePresence>
        {focussed && children && (
          <motion.div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ExpandedContent
              height={"500px"}
              expanded={focussed}
              onOutsideClick={() => setFocussed(false)}
            >
              <motion.div
                className="dark:bg-zinc-900 bg-zinc-100 rounded-lg w-full h-[500px] max-w-screen-md max-h-screen-md p-4"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
              >
                <div className="flex justify-between mb-2">
                  <h1 className="text-2xl font-bold">{title}</h1>
                  {href && (
                    <Link href={href}>
                      <IconArrowUpRight className="text-zinc-500 w-5 h-5 dark:hover:text-zinc-400 hover:text-zinc-600" />
                    </Link>
                  )}
                </div>
                {children}
              </motion.div>
            </ExpandedContent>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Card;
