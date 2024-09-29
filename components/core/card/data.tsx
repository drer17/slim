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
      color: "#33001A",
      removeTagCallback: (_: string) => {},
    },
    {
      id: "2",
      label: "Property",
      color: "#001933",
      removeTagCallback: (_: string) => {},
    },
  ],
  starred: true,
  condensed: true,
  presetColors: ["#33001A", "#001933", "#190033", "#331A00"],
  expandedContent: "Hello",
  changeColorCallback: (_: string) => {},
  changeStarCallback: (_: boolean) => {},
  archiveCallback: () => {},
};
