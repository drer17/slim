"use client";

import { IconHomeFilled } from "@tabler/icons-react";
import { CardProps } from "./card";

export const cardPlaceholderData: CardProps = {
  icon: <IconHomeFilled />,
  title: "My House",
  primary: <p className="text-right w-full font-bold">$1,000,000.00</p>,
  secondary: "The house I live in.",
  tags: [
    {
      id: "1",
      label: "Personal",
      color: "#660033",
      removeTagCallback: (_: string) => {},
    },
    {
      id: "2",
      label: "Property",
      color: "#003366",
      removeTagCallback: (_: string) => {},
    },
  ],
  starred: true,
  condensed: false,
  presetColors: ["#660033", "#003366", "#330066", "#663300"],
  expandedContent: "Hello",
  changeColorCallback: (_: string) => {},
  changeStarCallback: (_: boolean) => {},
  archiveCallback: () => {},
};
