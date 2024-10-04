/*
 * Header Component
 *
 * Author: Andre Repanich
 * Date: 05-10-24
 *
 * Component Requirements
 * - navigation header
 */

import Search from "./search";
import Target from "./target";
import UserAvatar from "./user-avatar";
import UserNotification from "./user-notifications";

const Header = () => {
  return (
    <div className="flex md:justify-between w-full items-center gap-2">
      <Target />
      <div className="flex space-x-3">
        <Search />
        <UserNotification />
        <UserAvatar />
      </div>
    </div>
  );
};

export default Header;
