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

export interface ContainerProps {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
  expandable: boolean;
}

const Container: React.FC<ContainerProps> = ({
  icon,
  title,
  content,
  expandable,
}) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);
};

export default Container;
