"use client";

/*
 * ExpandedContent
 *
 * Author: Andre Repanich
 * Date: 30-09-24
 *
 * Component Requirements
 *  - Handle Click Outside Component
 */

import React, { createContext, useContext, useEffect, useRef } from "react";

interface ExpandedContextProps {
  expanded: boolean;
}
const ExpandedContext = createContext<ExpandedContextProps | undefined>(
  undefined,
);
export const useExpandedContext = () =>
  useContext(ExpandedContext) || { expanded: undefined };

export interface ExpandedContentProps {
  expanded: boolean;
  onOutsideClick: () => void;
  height: string;
  children: React.ReactNode;
}

const ExpandedContent: React.FC<ExpandedContentProps> = ({
  expanded,
  onOutsideClick,
  height,
  children,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        onOutsideClick();
      }
    };

    if (expanded) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [expanded, onOutsideClick]);
  return (
    <ExpandedContext.Provider value={{ expanded }}>
      <div
        className="w-auto flex justify-center"
        style={{ height: height }}
        ref={cardRef}
      >
        {children}
      </div>
    </ExpandedContext.Provider>
  );
};

export default ExpandedContent;
