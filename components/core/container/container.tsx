"use client";

/*
 * Container
 *
 * Author: Andre Repanich
 * Date: 30-09-24
 *
 * Component Requirements
 *  - Display
 *    - Icon
 *    - Title text
 *    - Primary content
 *  - Full height and width
 *  - OnHover
 *    - Show expand icon
 *  - OnClick / Press
 *    - Expand card
 */

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconArrowUpRight } from "@tabler/icons-react";
import ExpandedContent from "../expanded-content/expanded-content";

export interface ContainerProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  expandable: boolean;
}

const Container: React.FC<ContainerProps> = ({
  icon,
  title,
  expandable,
  children,
}) => (
  <div>
    <div className="w-full h-full flex">
      <div className="flex justify-between mb-2">
        <h1 className="text-2xl font-bold">
          <span>{icon}</span> {title}
        </h1>
        <button onClick={() => setFocussed(true)}>
          <IconArrowUpRight className="text-zinc-500 w-5 h-5 dark:hover:text-zinc-400" />
        </button>
      </div>
      {children}
    </div>
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
                <h1 className="text-2xl font-bold">
                  <span>{icon}</span> {title}
                </h1>
              </div>
              {children}
            </motion.div>
          </ExpandedContent>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default Container;
