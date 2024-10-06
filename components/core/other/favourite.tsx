"use client";

import { IconStar, IconStarFilled } from "@tabler/icons-react";

interface FavouriteProps {
  starred?: boolean;
  changeStarCallback: (star: boolean) => void;
}

const Favourite: React.FC<FavouriteProps> = ({
  starred,
  changeStarCallback,
}) => {
  return (
    <div
      className="flex items-center justify-end"
      onClick={(e) => {
        e.stopPropagation();
        changeStarCallback(!starred);
      }}
    >
      {starred && (
        <IconStarFilled className="w-5 h-5 dark:text-yellow-700 text-yellow-400 hover:dark:text-yellow-600 hover:text-yellow-300" />
      )}
      {!starred && (
        <IconStar className="w-5 h-5 dark:text-yellow-700 text-yellow-400 invisible group-hover:visible hover:dark:text-yellow-600 hover:text-yellow-300" />
      )}
    </div>
  );
};

export default Favourite;
