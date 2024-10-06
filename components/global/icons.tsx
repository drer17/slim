import { IconBuildingBank, IconHome, IconSquare } from "@tabler/icons-react";

const icons: Record<string, React.ReactNode> = {
  home: <IconHome />,
  bank: <IconBuildingBank />,
};

export const getIcon = (key: string | null) => {
  if (!key || !(key in icons)) return <IconSquare />;
  return icons[key];
};
