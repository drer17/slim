import {
  IconCalendarMonth,
  IconChartDots3,
  IconChecklist,
  IconCircleMinus2,
  IconCirclePlus2,
  IconLayoutDashboard,
  IconTable,
  IconUsers,
} from "@tabler/icons-react";

export const links = [
  {
    label: "Dashboard",
    href: "/portfolio",
    icon: (
      <IconLayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
    class: "",
  },
  {
    label: "Cash Flow",
    href: "/portfolio/table/transaction",
    icon: (
      <IconTable className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
    class: "mb-4",
  },
  {
    label: "Calendar",
    href: "/portfolio/calendar",
    icon: (
      <IconCalendarMonth className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
    class: "",
  },
  {
    label: "Graph",
    href: "/portfolio/graph",
    icon: (
      <IconChartDots3 className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
    class: "",
  },
];

export const coreLinks = [
  {
    label: "Assets",
    href: "/portfolio/table/asset-liability/asset",
    icon: (
      <IconCirclePlus2 className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
    class: "",
  },
  {
    label: "Liabilities",
    href: "/portfolio/table/asset-liability/liability",
    icon: (
      <IconCircleMinus2 className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
    class: "mb-2",
  },
  {
    label: "Obligations",
    href: "/portfolio/table/obligation",
    icon: (
      <IconChecklist className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
    class: "",
  },
  {
    label: "Entities",
    href: "/portfolio/table/entity",
    icon: (
      <IconUsers className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
    class: "mb-2",
  },
];
