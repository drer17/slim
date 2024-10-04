import Search from "./search";
import UserAvatar from "./user-avatar";
import UserNotification from "./user-notifications";

const Header = () => {
  return (
    <div className="flex justify-between w-full items-center">
      <h1 className="text-xl capitalize font-bold">Root</h1>
      <div className="flex space-x-3">
        <Search />
        <UserNotification />
        <UserAvatar />
      </div>
    </div>
  );
};

export default Header;
