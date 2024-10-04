/*
 * User Notifications Component
 *
 * Author: Andre Repanich
 * Date: 05-10-24
 *
 * Component Requirements
 * [ ]- Display a badge of notification
 * [ ]- drop down for notifications
 */

import { IconBell } from "@tabler/icons-react";

const UserNotification = () => {
  return (
    <div className="hidden md:flex items-center">
      <IconBell className="w-6 h-6 text-zinc-500 dark:hover:text-zinc-400 hover:text-zinc-600" />
    </div>
  );
};

export default UserNotification;
