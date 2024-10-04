import { Avatar, AvatarFallback } from "../../ui/avatar";

const UserAvatar = () => {
  return (
    <Avatar className="w-8 h-8">
      <AvatarFallback className="text-sm">AR</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
