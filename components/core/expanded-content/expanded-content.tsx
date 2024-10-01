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

import React, { useEffect, useRef } from "react";

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
    <div className="w-full" style={{ height: height }} ref={cardRef}>
      {children}
    </div>
  );
};

export default ExpandedContent;
