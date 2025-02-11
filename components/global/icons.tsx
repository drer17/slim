import {
  IconBuildingBank,
  IconChecklist,
  IconDatabaseDollar,
  IconHome,
  IconSquare,
} from "@tabler/icons-react";

const icons: Record<string, React.ReactNode> = {
  home: <IconHome />,
  bank: <IconBuildingBank />,
  transactions: <IconDatabaseDollar />,
  obligations: <IconChecklist />,
};

export const getIcon = (key: string | null | undefined) => {
  if (!key || !(key in icons)) return <IconSquare />;
  return icons[key];
};
