import {
  IconArchive,
  IconBuildingBank,
  IconChartLine,
  IconChecklist,
  IconDatabaseDollar,
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
};

export const iconOptions = Object.keys(icons).map((icon) => ({
  id: icon,
  value: icon,
}));

export const getIcon = (key: string | null | undefined) => {
  if (!key || !(key in icons)) return <IconSquare />;
  return icons[key];
};
