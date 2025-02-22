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

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconArchive, IconArrowUpRight } from "@tabler/icons-react";
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
import Level2RowView, {
  Level2RowViewProps,
} from "@/components/views/level-2-row-view";
import { getRowData } from "@/lib/actions/get";
import useUpdateEffect from "@/hooks/use-update-effect";
import { archive, updateColor, updateStar } from "@/lib/actions/update";
import { useToast } from "@/hooks/use-toast";
import { ToastProps } from "@/components/ui/toast";
import { getIcon } from "@/components/global/icons";
import { cn } from "@/lib/utils";

export interface CardProps {
  icon?: string;
  title: string;
  secondary?: string;
  primary: React.ReactNode | string;
  tags: Tag[];
  starred?: boolean;
  category?: string;
  condensed?: boolean;
  color?: string;
  presetColors?: string[];
  href?: string;
  slug: string[];
  children?: React.ReactNode;
  getRowAsChild?: boolean;
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
  slug,
  children,
  getRowAsChild,
}) => {
  const [focussed, setFocussed] = React.useState<boolean>(false);
  const [newColor, setColor] = React.useState<string>(color || "#FFF");
  const [rowDataLevel2, setRowDataLevel2] = React.useState<
    Level2RowViewProps | undefined
  >(undefined);
  const { toast } = useToast();

  useUpdateEffect(() => {
    const getData = async () => {
      if (!slug) return;
      const data = await getRowData(slug);
      if (!data) return;
      switch (data.viewLevel) {
        case "level-2":
          setRowDataLevel2(data.data);
      }
    };
    if (getRowAsChild && focussed) {
      getData();
    }
  }, [getRowAsChild, focussed]);

  const changeColor = useDebouncedCallback((color: string) => {
    const update = async () => {
      const res = await updateColor(slug, color);
      if (res) toast(res as ToastProps);
    };
    update();
  }, 1000);

  const changeStar = async (star: boolean) => {
    const res = await updateStar(slug, star);
    if (res) toast(res as ToastProps);
  };

  const archiveItem = async () => {
    const res = await archive(slug);
    if (res) toast(res as ToastProps);
  };

  useUpdateEffect(() => changeColor(newColor), [changeColor, newColor]);

  const cardContents = (
    <div
      style={{ backgroundColor: `${newColor}99` }}
      className={cn(
        "rounded-md w-64 h-28 grid grid-cols-5 gap-2 p-4 pt-2 group transition-transform transform duration-300 hover:scale-105 backdrop-blur border border-foreground/30",
        color === "#ffffff" || !color ? "!bg-card" : "",
      )}
    >
      <div className="flex items-center justify-center">{getIcon(icon)}</div>
      <div className="col-span-3 flex items-center ml-1 mt-1 h-full w-full relative">
        <Tooltip>
          <TooltipTrigger className="absolute top-1">
            {href ? (
              <Link
                href={href + slug?.join("/")}
                onClick={(e) => e.stopPropagation()}
              >
                <p className="font-medium text-left text-sm uppercase">
                  {title}
                </p>
              </Link>
            ) : (
              <p className="font-medium text-left text-sm uppercase">{title}</p>
            )}
          </TooltipTrigger>
          {secondary && <TooltipContent>{secondary}</TooltipContent>}
        </Tooltip>
      </div>
      <Favourite
        starred={starred}
        changeStarCallback={(star: boolean) => changeStar(star)}
      />

      <div className="col-span-4"></div>
      <div className="col-span-4 flex items-end text-lg font-mono font-medium absolute bottom-[5px] left-4 bg-card/80 px-1 rounded shadow">
        {primary}
      </div>
      <ScrollArea className="row-span-2 flex justify-start flex-col">
        {tags.map((tag) => (
          <React.Fragment key={tag.id}>
            <TagComponent {...tag} />
            <div className="h-1" />
          </React.Fragment>
        ))}
      </ScrollArea>
    </div>
  );

  const condensedContents = (
    <div className="dark:bg-zinc-900 bg-zinc-100 rounded-md min-w-44 h-24 grid grid-cols-5 gap-2 p-4 pt-2 group transition-transform transform hover:scale-105">
      <div className="col-span-4 flex items-center">
        {href ? (
          <Link
            href={href + slug?.join("/")}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-medium text-left">{title}</p>
          </Link>
        ) : (
          <p className="font-medium text-left">{title}</p>
        )}
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
    <div className="flex">
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
                presetColors={presetColors || []}
              />
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuItem
            className="dark:text-red-700 text-red-300"
            onClick={() => archiveItem()}
          >
            <span>
              <IconArchive className="h-4 w-4 mr-2" />
            </span>
            Archive
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <AnimatePresence>
        {focussed && (children || getRowAsChild) && (
          <motion.div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ExpandedContent
              height={""}
              expanded={focussed}
              onOutsideClick={() => setFocussed(false)}
            >
              <motion.div
                className="dark:bg-zinc-900/60 backdrop-blur bg-zinc-100 rounded-lg w-full max-w-screen-md max-h-screen-md p-4"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
              >
                <div className="flex justify-between mb-2">
                  <h1 className="text-2xl font-bold">{secondary}</h1>
                  {href && (
                    <Link href={href + slug?.join("/")}>
                      <IconArrowUpRight className="text-zinc-500 w-5 h-5 dark:hover:text-zinc-400 hover:text-zinc-600" />
                    </Link>
                  )}
                </div>
                {getRowAsChild ? (
                  rowDataLevel2 ? (
                    <Level2RowView {...rowDataLevel2} />
                  ) : (
                    children
                  )
                ) : (
                  children
                )}
              </motion.div>
            </ExpandedContent>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Card;
