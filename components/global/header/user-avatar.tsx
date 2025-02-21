/*
 * User Avatar Component
 *
 * Author: Andre Repanich
 * Date: 05-10-24
 *
 * Component Requirements
 * [ ]- Display users avatar
 * [ ]- drop down for settings
 */

import React from "react";
import { Avatar, AvatarFallback } from "../../ui/avatar";

const UserAvatar = () => {
  return (
    <div className="hidden md:flex">
      <Avatar className="w-8 h-8">
        <AvatarFallback className="text-sm"></AvatarFallback>
      </Avatar>
    </div>
  );
};

export default UserAvatar;
