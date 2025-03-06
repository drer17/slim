/*
 * Header Component
 *
 * Author: Andre Repanich
 * Date: 05-10-24
 *
 * Component Requirements
 * - navigation header
 */

import { SidebarTrigger } from "@/components/ui/sidebar";

const Header = () => {
  return (
    <div className="flex md:justify-between w-full items-center gap-2">
      <div className="flex space-x-3 items-center">
        <SidebarTrigger className="text-zinc-500 hover:bg-background w-6 h-6" />
      </div>
    </div>
  );
};

export default Header;
