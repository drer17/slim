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
    href: "/portfolio/dashboard/{asset}",
    icon: (
      <IconLayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
    class: "",
  },
  {
    label: "Cash Flow",
    href: "/portfolio/grid/{asset}",
    icon: (
      <IconTable className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
    class: "mb-4",
  },
  {
    label: "Calendar",
    href: "/portfolio/calendar/{asset}",
    icon: (
      <IconCalendarMonth className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
    class: "",
  },
  {
    label: "Graph",
    href: "/portfolio/graph/{asset}",
    icon: (
      <IconChartDots3 className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
    class: "",
  },
];

export const coreLinks = [
  {
    label: "Assets",
    href: "/portfolio/assets/",
    icon: (
      <IconCirclePlus2 className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
    class: "",
  },
  {
    label: "Liabilities",
    href: "/portfolio/table/asset-liability/liability/{asset}",
    icon: (
      <IconCircleMinus2 className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
    class: "mb-2",
  },
  {
    label: "Obligations",
    href: "/portfolio/table/obligations/{asset}",
    icon: (
      <IconChecklist className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
    class: "",
  },
  {
    label: "Entities",
    href: "/portfolio/table/entities/{asset}",
    icon: (
      <IconUsers className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
    class: "mb-2",
  },
];
