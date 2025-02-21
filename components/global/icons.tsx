import {
  IconArchive,
  IconBriefcase2,
  IconBuildingBank,
  IconCategory,
  IconChartLine,
  IconChecklist,
  IconCoins,
  IconDatabaseDollar,
  IconDiamond,
  IconGraph,
  IconHome,
  IconSquare,
  IconStarFilled,
  IconTrash,
} from "@tabler/icons-react";

const icons: Record<string, React.ReactNode> = {
  home: <IconHome />,
  bank: <IconBuildingBank />,
  transactions: <IconDatabaseDollar />,
  obligations: <IconChecklist />,
  valuations: <IconChartLine />,
  starred: <IconStarFilled />,
  archive: <IconArchive />,
  trash: <IconTrash />,
  shares: <IconGraph />,
  jewellery: <IconDiamond />,
  coins: <IconCoins />,
  types: <IconCategory />,
  categories: <IconCategory />,
  employment: <IconBriefcase2 />,
};

export const iconOptions = Object.keys(icons).map((icon) => ({
  id: icon,
  value: icon,
}));

export const getIcon = (key: string | null | undefined) => {
  if (!key || !(key in icons)) return <IconSquare />;
  return icons[key];
};
