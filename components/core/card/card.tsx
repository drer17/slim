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
import Tag, { TagProps } from "../tag/tag";
import ExpandedContent from "../expanded-content/expanded-content";
import { ScrollArea } from "@/components/ui/scroll-area";
import SwatchesPicker from "@/components/ui/swatches-picker";
import Link from "next/link";

export interface CardProps {
  icon: React.ReactNode;
  title: string;
  secondary?: string;
  primary: React.ReactNode;
  tags: TagProps[];
  starred?: Boolean;
  condensed?: Boolean;
  color?: string;
  presetColors: string[];
  href?: string;
  expandedContent?: React.ReactNode;
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
  expandedContent,
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
    <div className="dark:bg-zinc-900 rounded-md w-64 h-36 grid grid-cols-5 gap-2 p-4 pt-2 group transition-transform transform hover:scale-105">
      <div className="flex items-center justify-center text-zinc-500">
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
      <div
        className="flex items-center justify-end"
        onClick={() => changeStarCallback(!starred)}
      >
        {starred && (
          <IconStarFilled className="w-5 h-5 dark:text-yellow-700 hover:dark:text-yellow-600" />
        )}
        {!starred && (
          <IconStar className="w-5 h-5 dark:text-yellow-700 invisible group-hover:visible hover:dark:text-yellow-600" />
        )}
      </div>
      <ScrollArea className="row-span-2 flex justify-start flex-col">
        {tags.map((tag) => (
          <React.Fragment key={tag.id}>
            <Tag {...tag} />
            <div className="h-1" />
          </React.Fragment>
        ))}
      </ScrollArea>
      <div className="col-span-4"></div>
      <div className="col-span-4 flex items-end text-lg">{primary}</div>
    </div>
  );

  const condensedContents = (
    <div className="dark:bg-zinc-900 rounded-md w-64 h-24 grid grid-cols-5 gap-2 p-4 pt-2 group transition-transform transform hover:scale-105">
      <div className="col-span-4 flex items-center">
        <div className="font-bold">{title}</div>
      </div>
      <ScrollArea className="row-span-2 flex justify-start flex-col">
        {tags.map((tag) => (
          <React.Fragment key={tag.id}>
            <Tag {...tag} />
            <div className="h-1" />
          </React.Fragment>
        ))}
      </ScrollArea>
      <div className="col-span-4 flex items-end">{secondary}</div>
    </div>
  );

  return (
    <div>
      <ContextMenu>
        <ContextMenuTrigger>
          <div
            className="bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 p-0.5 rounded-md w-64"
            onClick={() => setFocussed(true)}
            style={{ background: newColor }}
          >
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
            className="dark:text-red-700"
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
        {focussed && expandedContent && (
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
                className="dark:bg-zinc-900 rounded-lg w-full h-[500px] max-w-screen-md max-h-screen-md p-4"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
              >
                <div className="flex justify-between mb-2">
                  <h1 className="text-2xl font-bold">{title}</h1>
                  {href && (
                    <Link href={href}>
                      <IconArrowUpRight className="text-zinc-500 w-5 h-5 dark:hover:text-zinc-400" />
                    </Link>
                  )}
                </div>
                {expandedContent}
              </motion.div>
            </ExpandedContent>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Card;
