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
import { IconMaximize } from "@tabler/icons-react";
import ExpandedContent, {
  useExpandedContext,
} from "../expanded-content/expanded-content";

export interface ContainerProps {
  title: string;
  icon?: React.ReactNode;
  expandable: boolean;
  children?: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({
  title,
  icon,
  expandable,
  children,
}) => {
  const [focussed, setFocussed] = React.useState<boolean>(false);
  const { expanded: checkInDialog } = useExpandedContext();

  return (
    <div>
      <div className="w-full h-full flex flex-col group p-2 rounded-md">
        <div className="flex justify-between mb-2">
          <div className="flex items-center space-x-2">
            {icon}
            <h2 className="text-xl font-bold">{title}</h2>
          </div>
          {checkInDialog === undefined && (
            <button onClick={() => setFocussed(true)}>
              <IconMaximize className="text-zinc-500 w-5 h-5 invisible group-hover:visible" />
            </button>
          )}
        </div>
        {children}
      </div>
      <AnimatePresence>
        {focussed && expandable && (
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
                className="dark:bg-zinc-900 bg-zinc-100 rounded-md w-full h-[500px] max-w-screen-md max-h-screen-md p-4"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
              >
                <div className="flex justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {icon}
                    <h2 className="text-2xl font-bold">{title}</h2>
                  </div>
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

export default Container;
